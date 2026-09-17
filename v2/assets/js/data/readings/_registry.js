/* Bài đọc dạng văn xuôi, đứng trước 10 phần của bài học.
   LRD(id, text)  — bài đọc gốc.
   LRDX(id, text) — phần đào sâu (giám khảo hỏi tiếp, ngành khác, tự luyện), chèn trước mục
                    "## Trước khi sang phần bài tập" nếu có, nếu không thì nối vào cuối.
                    Không phụ thuộc thứ tự nạp file.
   Cú pháp rút gọn: "## " tiêu đề mục · "> " đoạn thoại mẫu · "- " gạch đầu dòng · "**đậm**", "*nghiêng*" */
window.READING = {};
window.READING_BASE = {};
window.READING_DEEP = {};
(function(){
  const BRIDGE = "\n## Trước khi sang phần bài tập";
  const build = id => {
    const base = window.READING_BASE[id]; if(base === undefined) return;
    const extra = (window.READING_DEEP[id] || []).join("\n\n");
    if(!extra){ window.READING[id] = base; return; }
    const i = base.lastIndexOf(BRIDGE);
    window.READING[id] = i < 0 ? base + "\n\n" + extra : base.slice(0, i) + "\n\n" + extra + "\n" + base.slice(i);
  };
  window.LRD  = (id, text) => { window.READING_BASE[id] = text.trim(); build(id); };
  window.LRDX = (id, text) => { (window.READING_DEEP[id] = window.READING_DEEP[id] || []).push(text.trim()); build(id); };
})();
