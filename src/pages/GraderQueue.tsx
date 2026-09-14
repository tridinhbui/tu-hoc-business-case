import { useState } from "react";
import { api, type QueueItem } from "../api";
import { ErrorNote, KindTag, Loading, navigate, since, useLoad, usePoll } from "../lib";

export function GraderQueuePage() {
  const { data, error, loading, reload } = useLoad(() => api<{ items: QueueItem[] }>("/api/grader/queue"), []);
  const [claimError, setClaimError] = useState<Error | null>(null);
  usePoll(true, reload, 10000);

  async function claim(item: QueueItem) {
    setClaimError(null);
    try {
      if (!item.mine) await api(`/api/grader/attempts/${item.attempt_id}/claim`, { method: "POST" });
      navigate(`/grader/${item.attempt_id}`);
    } catch (err) {
      setClaimError(err as Error);
      reload();
    }
  }

  return (
    <section className="wrap stack">
      <header className="page-head">
        <p className="eyebrow">Chấm bài</p>
        <h1>Hàng đợi chấm</h1>
        <p className="muted lede">Bài được ẩn danh. Nhận bài để giữ quyền chấm trong 2 giờ; quá hạn, bài quay lại hàng đợi.</p>
      </header>
      <ErrorNote error={claimError} />
      {loading && !data ? (
        <Loading />
      ) : !data ? (
        <ErrorNote error={error} />
      ) : data.items.length === 0 ? (
        <section className="panel"><p className="muted">Không có bài nào đang chờ bạn chấm.</p></section>
      ) : (
        <section className="panel">
          <div className="table-wrap">
            <table>
              <thead><tr><th>Bài</th><th>Loại</th><th>Người chấm</th><th>Chờ</th><th></th></tr></thead>
              <tbody>
                {data.items.map((item) => (
                  <tr key={item.attempt_id}>
                    <td><span className="mono muted">{item.lesson_id}</span> {item.lesson_title}</td>
                    <td><KindTag kind={item.lesson_kind} /></td>
                    <td>{item.needs === "instructor" ? "Giảng viên" : "Bạn học"}</td>
                    <td>{since(item.enqueued_at)}</td>
                    <td className="r">
                      <button className="btn-small" onClick={() => claim(item)}>{item.mine ? "Tiếp tục chấm" : "Nhận chấm"}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </section>
  );
}
