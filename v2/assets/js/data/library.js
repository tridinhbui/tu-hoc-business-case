/* ===== CASE LIBRARY ===== */
window.INDUSTRIES = [
 {id:"fmcg",n:"FMCG"},{id:"retail",n:"Retail"},{id:"banking",n:"Banking"},{id:"ecommerce",n:"E-commerce"},
 {id:"logistics",n:"Logistics"},{id:"saas",n:"SaaS"},{id:"healthcare",n:"Healthcare"},
 {id:"education",n:"Education"},{id:"fnb",n:"F&B"},{id:"aviation",n:"Aviation"}
];
window.CASE_TYPES = ["Profitability","Market Entry","Growth","Pricing","Operations","M&A","Market Sizing","Product Launch"];
const SK = {struct:"Structuring",math:"Case math",data:"Data analysis",insight:"Insight",story:"Storyline",fin:"Financial logic"};

/* diff: 1 Beginner · 2 Intermediate · 3 Advanced · 4 Competition
   mode: practice | competition | interview */
window.CASES = [
{id:"cl-01",t:"Chuỗi cà phê mất biên lợi nhuận",co:"Highlands Coffee",ind:"fnb",type:"Profitability",diff:2,min:20,mode:"practice",
 skills:["struct","math","insight"],hook:"Doanh thu tăng 18%. EBITDA margin rơi từ 16% xuống 9%."},
{id:"cl-02",t:"Mở đường bay Việt Nam – Nhật Bản",co:"Vietjet Air",ind:"aviation",type:"Market Entry",diff:2,min:18,mode:"practice",
 skills:["struct","math","fin"],hook:"10 phút để quyết định một cam kết 5 năm."},
{id:"cl-03",t:"Nâng take rate mà không mất người bán",co:"Shopee",ind:"ecommerce",type:"Pricing",diff:3,min:25,mode:"practice",
 skills:["math","insight","fin"],hook:"Tăng phí 1 điểm phần trăm. Ai sẽ bỏ đi?"},
{id:"cl-04",t:"Chuỗi bách hoá chưa bao giờ có lãi",co:"Bách Hoá Xanh",ind:"retail",type:"Profitability",diff:3,min:25,mode:"practice",
 skills:["struct","math","data"],hook:"1.700 cửa hàng. Chưa một năm nào có lãi."},
{id:"cl-05",t:"NIM giảm, chi phí rủi ro tăng",co:"Techcombank",ind:"banking",type:"Profitability",diff:3,min:28,mode:"practice",
 skills:["struct","fin","data"],hook:"Ngân hàng vẫn báo lãi. Chất lượng lãi đang xấu đi."},
{id:"cl-06",t:"Thị trường sữa hạt Việt Nam lớn cỡ nào?",co:"Vinamilk",ind:"fmcg",type:"Market Sizing",diff:1,min:12,mode:"practice",
 skills:["math","struct"],hook:"Không có báo cáo ngành. Chỉ có dân số và vài giả định."},
{id:"cl-07",t:"Chi phí mỗi bưu kiện không giảm nữa",co:"Viettel Post",ind:"logistics",type:"Operations",diff:2,min:20,mode:"practice",
 skills:["math","insight"],hook:"Sản lượng tăng 30%. Chi phí mỗi đơn đứng yên."},
{id:"cl-08",t:"Bệnh viện tư và bài toán giường trống",co:"Vinmec",ind:"healthcare",type:"Operations",diff:2,min:20,mode:"practice",
 skills:["math","fin"],hook:"Chi phí gần như cố định. Doanh thu thì không."},
{id:"cl-09",t:"SaaS tăng trưởng 40% nhưng đốt tiền",co:"Base.vn",ind:"saas",type:"Growth",diff:3,min:25,mode:"practice",
 skills:["fin","math","insight"],hook:"ARR tăng 40%. Dòng tiền âm nặng hơn."},
{id:"cl-10",t:"Trung tâm tiếng Anh mất học viên năm hai",co:"Chuỗi Anh ngữ",ind:"education",type:"Growth",diff:2,min:20,mode:"practice",
 skills:["data","insight","struct"],hook:"Tuyển sinh tốt. Tỷ lệ tái đăng ký 31%."},
{id:"cl-11",t:"Mua lại đối thủ hay tự mở rộng?",co:"Masan Group",ind:"retail",type:"M&A",diff:4,min:35,mode:"practice",
 skills:["fin","struct","insight"],hook:"Giá thương vụ 3.000 tỷ. Tự làm mất 4 năm."},
{id:"cl-12",t:"Ra mắt dòng sữa hạt cao cấp",co:"Vinamilk",ind:"fmcg",type:"Product Launch",diff:3,min:25,mode:"practice",
 skills:["story","math","insight"],hook:"Thị trường 12 nghìn tỷ. Ba đối thủ đã ở đó."},

/* Case competition — đề dài, có deadline */
{id:"cc-01",t:"Chiến lược 3 năm cho chuỗi F&B sau đại dịch",co:"Golden Gate",ind:"fnb",type:"Growth",diff:4,min:180,mode:"competition",
 skills:["struct","insight","story","fin"],hook:"Đề thi vòng chung kết. 3 giờ, 10 slide, 15 phút pitch."},
{id:"cc-02",t:"Đưa một ngân hàng số ra thị trường nông thôn",co:"Ngân hàng số",ind:"banking",type:"Market Entry",diff:4,min:180,mode:"competition",
 skills:["struct","fin","story"],hook:"60 triệu người chưa có tài khoản. Chi phí phục vụ quá cao."},
{id:"cc-03",t:"Tái thiết chuỗi cung ứng cho nhà bán lẻ đa kênh",co:"Nhà bán lẻ",ind:"retail",type:"Operations",diff:4,min:180,mode:"competition",
 skills:["data","math","story"],hook:"Giao hàng trễ 22%. Tồn kho tăng 40%."},

/* Interview mode — case đối thoại */
{id:"iv-01",t:"Profitability: nhà máy nhựa mất lợi nhuận",co:"Ẩn danh",ind:"fmcg",type:"Profitability",diff:2,min:30,mode:"interview",
 skills:["struct","math","story"],hook:"Case do người phỏng vấn dẫn dắt. 30 phút."},
{id:"iv-02",t:"Market entry: chuỗi cà phê vào Philippines",co:"Ẩn danh",ind:"fnb",type:"Market Entry",diff:3,min:30,mode:"interview",
 skills:["struct","fin","story"],hook:"Case do ứng viên tự dẫn. 30 phút."}
];
window.SKILL_NAMES = SK;
window.CASE_BY_ID = Object.fromEntries(window.CASES.map(c=>[c.id,c]));
