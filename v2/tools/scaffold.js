/* node tools/scaffold.js lesson <id> "<Tiêu đề VI>"
   node tools/scaffold.js case   <id> "<Tiêu đề VI>"
   In ra đúng những khối phải dán, kèm file đích. Không tự ghi file:
   người viết dán vào đúng chỗ rồi chạy `npm t`-tương-đương (4 file test) để nghiệm thu. */
const [,,kind,id,title="TODO tiêu đề"] = process.argv;
if(!kind||!id){ console.log("dùng: node tools/scaffold.js lesson|case <id> \"<tiêu đề>\""); process.exit(1); }
const mod = id.replace(/-\d+$/,"");
const B = (file,code) => console.log(`\n\x1b[1m── ${file}\x1b[0m\n${code}`);

if(kind==="lesson"){
console.log(`\n\x1b[1mBÀI MỚI: ${id} — ${title}\x1b[0m
Năm chỗ phải có mặt. Thiếu một chỗ là test chặn.`);

B(`assets/js/data/curriculum.js  → module "${mod}", thêm vào mảng lessons`,
`  {id:"${id}", t:"${title}", m:7, lv:2, out:"calculation"},`);

B(`assets/js/data/lessons/${mod}.js  → khuôn 10 phần`,
`LC("${id}", {
  why:"TODO 1–2 câu: bỏ qua bài này thì người học hỏng chỗ nào khi ngồi trước giám khảo (>30 ký tự).",
  outcome:"TODO người học làm được gì sau 7 phút — một động từ, một sản phẩm cụ thể.",
  scenario:{ text:"TODO tình huống có số liệu, 3–4 câu.", ask:"TODO câu hỏi đặt ra cho người học." },
  fw:{ title:"TODO tên framework", rows:[
        ["TODO bước 1","TODO làm gì, dựa vào con số nào"],
        ["TODO bước 2","TODO"],
        ["TODO bước 3","TODO"]],
       warn:"TODO khi nào framework này KHÔNG dùng được." },
  ex:{ label:"TODO nhãn bảng số", rows:[
        ["TODO chỉ tiêu","TODO giá trị","TODO thay đổi","up"],
        ["TODO","TODO"],
        ["TODO","TODO"]],
       read:"TODO một câu rút ra từ bảng — đây là phần dạy đọc số, không phải mô tả lại số." },
  mini:{ kind:"logic",   // logic · framework · calculation · exhibit · presentation
         q:"TODO câu hỏi mini case",
         opts:[["A","TODO",""],["B","TODO",""],["C","TODO",""],["D","TODO",""]],
         correct:"C" },
  calc:{ q:"TODO đề bài tính", unit:"TODO đơn vị", answer:0, tol:0,
         solution:"TODO lời giải PHẢI chứa con số đáp án viết kiểu Việt (dấu phẩy thập phân).",
         hint:"TODO gợi ý một bước, không lộ đáp án." },
  slide:{ headline:"TODO câu headline dạng khẳng định có số",
          left:"TODO nội dung cột trái", right:"TODO nội dung cột phải",
          rule:"TODO quy tắc trình bày rút ra" },
  mistakes:[["TODO lỗi 1","TODO vì sao sai và sửa thế nào"],
            ["TODO lỗi 2","TODO"],
            ["TODO lỗi 3","TODO"]],
  checklist:["TODO 1","TODO 2","TODO 3","TODO 4","TODO 5"],
  arena:"cl-01"   // case để người học mang kỹ năng vừa học sang luyện; phải tồn tại
});`);

B(`tests/lessons.test.js  → thêm một dòng vào RECOMPUTE`,
`  "${id}": ()=> /* TODO phép tính ĐỘC LẬP từ số liệu trong đề, không chép lại answer */ 0,`);

B(`assets/js/data/i18n-lessons.js  → tiêu đề tiếng Anh (bắt buộc, i18n.test chặn)`,
`  "${title}": "TODO English title",`);

B(`assets/js/data/lessons-en/${mod}.js  → bản EN (tuỳ chọn; nếu viết thì phải đủ 10 phần và trùng đáp án)`,
`LCEN("${id}", { /* cùng shape, mini.correct / calc.answer / calc.tol / mini.kind / arena phải TRÙNG bản VI */ });`);

console.log(`\nNghiệm thu:  node tests/lessons.test.js && node tests/i18n.test.js && node tests/views.smoke.js && node tools/content-status.js\n`);
}

else if(kind==="case"){
console.log(`\n\x1b[1mCASE MỚI: ${id} — ${title}\x1b[0m`);

B(`assets/js/data/library.js  → thẻ trong Case Library`,
`{ id:"${id}", t:"${title}", hook:"TODO một câu mồi", type:"TODO Profitability|Market Entry|…",
  ind:"TODO ngành", diff:3, m:20, tags:["TODO"] },`);

B(`assets/js/data/arenaN.js  → đề đầy đủ (chọn file arena nào còn chỗ, hoặc tạo arena6.js + thẻ script trong index.html)`,
`R({
  id:"${id}", title:"${title}",
  brief:{ context:"TODO bối cảnh có số liệu.", task:"TODO nhiệm vụ một câu, có ràng buộc thời gian/ngân sách." },
  exhibits:[
    { kind:"bars", title:"TODO", unit:"TODO", headline:"TODO", sub:"TODO",
      rows:[["TODO",0,"var(--series-good)"],["TODO",0,"var(--series-bad)"],["TODO",0,"var(--series-base)"]],
      max:0, ticks:[0], threshold:{v:0,label:"TODO"} },
    { kind:"table", title:"TODO", unit:"TODO", head:["TODO","TODO","TODO","TODO"],
      rows:[["TODO","TODO","TODO",{t:"TODO",d:"down"}]] },
    { kind:"metrics", title:"TODO", items:[["TODO","TODO","TODO"]] }
  ],
  options:[
    ["A","TODO phương án chữa triệu chứng","TODO vì sao yếu",40],
    ["B","TODO phương án quá tay","TODO vì sao yếu",35],
    ["C","TODO phương án đúng nguyên nhân gốc","TODO vì sao đúng",95],
    ["D","TODO phương án lạc đề","TODO vì sao yếu",30]
  ],
  correct:"C",
  framing:[["TODO từ khoá khung vấn đề"],["TODO"]],
  branches:[["TODO nhánh 1"],["TODO nhánh 2"],["TODO nhánh 3"]],
  numbers:[{v:0,tol:0,pts:60,core:true},{v:0,tol:0,pts:20},{v:0,tol:0,pts:10}],
  insight:[{kw:["TODO"],pts:40},{kw:["TODO"],pts:35},{kw:["TODO"],pts:25}],
  unit:"tỷ",
  model:{ problem:"TODO problem statement mẫu.",
          hyps:["TODO H1","TODO H2","TODO H3",""],
          evidence:"TODO đọc từng exhibit, bác bỏ giả thuyết sai, dẫn ra con số cốt lõi.",
          rec:"C" }
});`);

B(`tests/scoring.test.js  → khối tính lại (mọi số trong numbers phải ra được từ exhibit)`,
`t("${id} · TODO tên phép kiểm",()=>{
  /* TODO tính lại từ số liệu exhibit, assert đúng từng numbers[i].v */
});`);

B(`assets/js/data/i18n-data.js  → tiêu đề + câu mồi tiếng Anh (bắt buộc)`,
`  "${title}": "TODO English title",
  "TODO câu mồi": "TODO English hook",`);

console.log(`\nNghiệm thu:  node tests/scoring.test.js && node tests/i18n.test.js && node tests/views.smoke.js && node tools/content-status.js\n`);
}
