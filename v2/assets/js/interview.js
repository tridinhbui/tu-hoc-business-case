/* ═══ CASELAB · Interview engine ═══
   Phiên phỏng vấn 5 vòng: Clarify → Structure → Case math → Chart reading → Recommendation.
   Mỗi vòng chấm bằng từ khoá + con số tính lại được từ đề (dùng chung spec Arena của case).
   Phiên lưu ở State.data.iv[caseId]. Hàm score() thuần — tests/interview.test.js chạy bằng node. */
(function(){
const ROUNDS = [
  {key:"clarify",   n:"Clarify",        kind:"logic"},
  {key:"structure", n:"Structure",      kind:"framework"},
  {key:"math",      n:"Case math",      kind:"calculation"},
  {key:"chart",     n:"Chart reading",  kind:"exhibit"},
  {key:"reco",      n:"Recommendation", kind:"logic"}
];

const CFG = {
  "iv-01": {
    style:"Interviewer-led · người phỏng vấn dẫn từng bước",
    rounds:[
      {q:"Khách hàng là một nhà máy bao bì nhựa. Doanh thu năm nay tăng 5% nhưng lợi nhuận giảm mạnh. CEO muốn biết vì sao và nên làm gì. Bạn bắt đầu thế nào?",
       kw:["cả ngành","riêng công ty","mục tiêu","làm rõ"], num:null,
       model:"Em hiểu là lợi nhuận giảm mạnh dù doanh thu tăng 5%, và mình cần tìm nguyên nhân rồi đề xuất cách khôi phục. Em xin hỏi hai điều: mức giảm này là của riêng công ty hay cả ngành, và mục tiêu của CEO là khôi phục lợi nhuận hay giữ sản lượng?",
       note:"Nhắc lại đề trong một câu rồi hỏi tối đa 2–3 câu làm rõ — đúng thứ tự mở đầu."},
      {q:"Mức giảm là của riêng công ty; mục tiêu là khôi phục lợi nhuận. Bạn cấu trúc vấn đề thế nào?",
       kw:["doanh thu","chi phí","nguyên liệu","hạt nhựa"], num:null,
       model:"Em chia lợi nhuận thành doanh thu (giá bán × sản lượng) và chi phí, trong đó tách riêng chi phí hạt nhựa vì với nhà máy nhựa đây là khoản lớn nhất, rồi mới tới chi phí khác như nhân công và năng lượng.",
       note:"Với nhà máy sản xuất, nguyên liệu phải là một nhánh riêng — thiếu nhánh này là bỏ nguyên nhân chính."},
      {q:"Đây là số liệu hai năm (Exhibit 1). Lợi nhuận thay đổi bao nhiêu, và con số nào giải thích điều đó?",
       kw:["hạt nhựa","nguyên liệu"], num:70, tol:0.5,
       model:"Lợi nhuận từ 100 tỷ xuống 30 tỷ, giảm 70 tỷ. Chi phí hạt nhựa tăng 120 tỷ trong khi giá bán tăng 5% chỉ mang về thêm 50 tỷ.",
       note:"Nói ra con số của từng nhánh trước khi kết luận nhánh nào là nguyên nhân."},
      {q:"Nhìn Exhibit 2 về biến động giá. Nó nói thêm điều gì, và mình cần tăng giá bao nhiêu để giữ lợi nhuận cũ?",
       kw:["đối thủ","dư địa","10%"], num:12, tol:0.1,
       model:"Giá hạt nhựa tăng 20% còn giá bán của mình chỉ tăng 5%, trong khi đối thủ đã tăng 10% — nên vẫn còn dư địa giá. Muốn giữ 100 tỷ lợi nhuận cần doanh thu 1.120 tỷ, tức tăng giá khoảng 12%.",
       note:"Exhibit giá của đối thủ cho biết mức tăng giá nào là khả thi — đó là cầu nối sang khuyến nghị."},
      {q:"Vậy khuyến nghị của bạn cho CEO là gì?",
       kw:["điều khoản","điều chỉnh giá","hợp đồng","30%"], num:null,
       model:"Đưa điều khoản điều chỉnh giá theo giá hạt nhựa vào hợp đồng khi gia hạn, tăng giá ngay phần 30% doanh thu không bị cố định giá, và phòng ngừa giá nguyên liệu cho phần còn lại.",
       note:"Khuyến nghị phải gắn với ràng buộc hợp đồng — đó là lý do giá bán không theo kịp chi phí."}
    ]
  },
  "iv-02": {
    style:"Candidate-led · bạn tự dẫn case",
    rounds:[
      {q:"Một chuỗi cà phê Việt Nam muốn vào Philippines, bắt đầu từ Manila với kế hoạch 50 cửa hàng tự vận hành. Bạn dẫn case — bắt đầu đi.",
       kw:["mục tiêu","thời gian","ngân sách","tiêu chí"], num:null,
       model:"Em xin làm rõ ba điều trước: mục tiêu là lợi nhuận hay thị phần, khung thời gian bao lâu, và ngân sách tối đa cho việc mở rộng.",
       note:"Case tự dẫn vẫn phải làm rõ mục tiêu và ràng buộc trước khi dựng cấu trúc."},
      {q:"Mục tiêu là lợi nhuận trong 5 năm, ngân sách tối đa 400 tỷ. Cấu trúc của bạn?",
       kw:["thị trường","cạnh tranh","kinh tế","cách vào"], num:null,
       model:"Em đi ba tầng: thị trường Manila có hấp dẫn không, kinh tế một cửa hàng có lãi và hoàn vốn trong bao lâu, và mình có thắng được không — cộng thêm một nhánh về cách vào thị trường.",
       note:"Ba tầng thị trường – kinh tế – năng lực, cộng nhánh cách vào, là khung chuẩn của case thâm nhập."},
      {q:"Bắt đầu từ thị trường. Ước lượng quy mô thị trường cà phê quán ở Manila mỗi năm.",
       kw:["quy mô","tỷ"], num:14560, tol:10,
       model:"14 triệu dân đô thị × 20% uống cà phê quán hằng tuần × 2 ly × 52 tuần × 50.000đ = 14.560 tỷ đồng mỗi năm.",
       note:"Giữ đơn vị qua từng bước và nói rõ giả định — giám khảo chấm đường tính, không chỉ con số."},
      {q:"Đây là kinh tế một cửa hàng và thị phần các chuỗi (Exhibit 2–3). Bạn đọc ra gì?",
       kw:["hoàn vốn","thị phần"], num:6.2, tol:0.05,
       model:"Mỗi cửa hàng doanh thu 7,2 tỷ, EBITDA 18% tức 1,296 tỷ, vốn 8 tỷ nên hoàn vốn khoảng 6,2 năm. 50 cửa hàng chỉ đạt khoảng 2,5% thị phần trong khi ba chuỗi lớn đã chiếm 75%.",
       note:"Kết hợp hoàn vốn dài với thị phần nhỏ — đó là cặp số dẫn thẳng tới khuyến nghị về cách vào."},
      {q:"Kết luận của bạn là gì?",
       kw:["thí điểm","đối tác","liên doanh","nhượng quyền"], num:null,
       model:"Thị trường đủ lớn nhưng hoàn vốn 6,2 năm là rủi ro vốn lớn, nên em đề xuất thí điểm 10 cửa hàng cùng đối tác địa phương theo liên doanh hoặc nhượng quyền, đo doanh số mỗi cửa hàng và chỉ mở rộng khi vượt ngưỡng.",
       note:"Khuyến nghị tốt biến rủi ro đã đo được thành một cách vào thị trường cụ thể."}
    ]
  },
  "iv-03": {
    style:"Interviewer-led · người phỏng vấn dẫn từng bước",
    rounds:[
      {q:"Một chuỗi rạp chiếu phim định tăng giá vé 10% từ quý sau để cải thiện lợi nhuận. CEO hỏi có nên làm không. Bạn bắt đầu thế nào?",
       kw:["làm rõ","mục tiêu","lợi nhuận","co giãn"], num:null,
       model:"Em hiểu là chuỗi rạp muốn biết tăng giá vé 10% có làm lợi nhuận tăng không. Em xin làm rõ hai điều: mục tiêu là lợi nhuận hay lượt khách, và mình đã có số liệu co giãn của cầu theo giá chưa?",
       note:"Trước khi tính, phải hỏi mục tiêu và hỏi xem đã có dữ liệu co giãn hay chưa."},
      {q:"Mục tiêu là lợi nhuận, và có một thử nghiệm co giãn ở 12 rạp. Bạn cấu trúc thế nào?",
       kw:["giá vé","lượt xem","bắp nước","nhà phát hành"], num:null,
       model:"Em chia thành bốn nhánh: giá vé, lượt xem theo co giãn, lãi góp bắp nước đi kèm mỗi lượt, và phần chia doanh thu vé với nhà phát hành.",
       note:"Case định giá phải có nhánh sản phẩm đi kèm — ở rạp chiếu phim đó là bắp nước."},
      {q:"Đây là số liệu hiện tại và kết quả thử nghiệm co giãn (Exhibit 1–2). Lãi góp vé tăng bao nhiêu?",
       kw:["nhà phát hành","chia doanh thu","lãi góp"], num:12.24, tol:0.05,
       model:"Giá 99.000đ × 7,52 triệu lượt = 744,48 tỷ, doanh thu vé tăng 24,48 tỷ; rạp chỉ giữ 50% sau khi chia với nhà phát hành nên lãi góp vé tăng 12,24 tỷ.",
       note:"Phần chia doanh thu ăn mất một nửa mức tăng — bỏ qua nó là gấp đôi kết quả."},
      {q:"Còn phần bắp nước thì sao? Tính ra tác động ròng lên lợi nhuận.",
       kw:["bắp nước","lãi góp"], num:2.16, tol:0.05,
       model:"Mất 0,48 triệu lượt × 30.000đ × biên 70% = 10,08 tỷ lãi góp bắp nước, nên tác động ròng chỉ còn 2,16 tỷ.",
       note:"Tăng giá vé làm mất khách, mà mỗi khách mất đi kéo theo cả phần lãi bắp nước."},
      {q:"Vậy khuyến nghị của bạn cho CEO là gì?",
       kw:["khung giờ","ngày trong tuần","công suất"], num:null,
       model:"Không tăng giá đồng loạt. Em đề xuất định giá theo khung giờ và ngày trong tuần: tăng giá suất cuối tuần cao điểm, giảm giá suất trong tuần đang chỉ đạt công suất ghế 21%, và giữ giá bắp nước.",
       note:"Kết luận đúng của case định giá thường là phân tách giá, không phải một mức tăng chung."}
    ]
  },
  "iv-04": {
    style:"Candidate-led · bạn tự dẫn case",
    rounds:[
      {q:"Một ứng dụng gọi xe hai bánh thấy số tài xế hoạt động giảm dần dù vẫn tuyển liên tục. Bạn dẫn case — bắt đầu đi.",
       kw:["mục tiêu","làm rõ","thời gian","tài xế"], num:null,
       model:"Em xin làm rõ ba điều trước: mục tiêu là giữ số tài xế hay giữ số chuyến, tình trạng này kéo dài bao lâu, và mình có ngân sách nào cho việc giữ tài xế không.",
       note:"Case tự dẫn vẫn mở bằng làm rõ mục tiêu và ràng buộc."},
      {q:"Mục tiêu là giữ đội tài xế, tình trạng kéo dài 6 tháng. Cấu trúc của bạn?",
       kw:["tuyển mới","rời bỏ","thu nhập","đơn"], num:null,
       model:"Em coi đây là bài toán bể nước: dòng vào là tuyển mới, dòng ra là tài xế rời bỏ; rồi đi vào nguyên nhân dòng ra gồm thu nhập sau chiết khấu và chất lượng đơn.",
       note:"Bài toán giữ chân luôn tách dòng vào và dòng ra trước khi tìm nguyên nhân."},
      {q:"Đây là số liệu đội tài xế (Exhibit 1). Mỗi tháng mất bao nhiêu tài xế, và chi tuyển bao nhiêu?",
       kw:["rời bỏ","tuyển","chi phí tuyển"], num:4800, tol:5,
       model:"60.000 × 8% = 4.800 tài xế rời mỗi tháng trong khi chỉ tuyển 4.000, nên đội xe giảm 800 người; chi phí tuyển là 4.000 × 1,2 triệu = 4,8 tỷ mỗi tháng.",
       note:"Đưa cả hai dòng về cùng đơn vị mỗi tháng thì mới thấy được phần rò rỉ ròng."},
      {q:"Exhibit 2–3 về thu nhập và lý do rời bỏ. Nếu giảm chiết khấu từ 25% xuống 20%, mình mất bao nhiêu mỗi tháng?",
       kw:["chiết khấu","thu nhập","take rate"], num:3.6, tol:0.05,
       model:"Mất 5 điểm chiết khấu × GMV 12 triệu × 60.000 tài xế = 3,6 tỷ mỗi tháng, đổi lại thu nhập tài xế lên 9,6 triệu, gần sát mức 10 triệu họ cho là đủ.",
       note:"So sánh chi phí giữ chân với chi phí tuyển mới bằng cùng một đơn vị mỗi tháng."},
      {q:"Kết luận của bạn?",
       kw:["rẻ hơn","ngưỡng","chi phí tuyển"], num:null,
       model:"Giữ chân rẻ hơn tuyển mới: 3,6 tỷ so với 4,8 tỷ mỗi tháng. Em đề xuất giảm chiết khấu xuống 20% cho tài xế đạt ngưỡng số chuyến, rồi cắt dần ngân sách tuyển khi đội xe ổn định.",
       note:"Khuyến nghị tốt là so hai chi phí rồi gắn ưu đãi với một ngưỡng hành vi cụ thể."}
    ]
  },
  "iv-05": {
    style:"Interviewer-led · người phỏng vấn dẫn từng bước",
    rounds:[
      {q:"Một sàn thương mại điện tử trễ đơn nặng trong mùa cao điểm dù kho vừa mở rộng. COO muốn biết nên làm gì trước mùa sau. Bạn bắt đầu thế nào?",
       kw:["làm rõ","cao điểm","mục tiêu","bao nhiêu ngày"], num:null,
       model:"Em hiểu là kho trễ đơn trong mùa cao điểm và cần phương án trước mùa sau. Em xin hỏi: mùa cao điểm kéo dài bao nhiêu ngày mỗi năm, và mục tiêu là giao đúng hạn 100% hay giảm tỷ lệ trễ về mức chấp nhận được?",
       note:"Hỏi độ dài mùa cao điểm ngay từ đầu — nó quyết định phương án là cố định hay mùa vụ."},
      {q:"45 ngày cao điểm mỗi năm, mục tiêu là giao đúng hạn trong ngày cao điểm. Bạn cấu trúc thế nào?",
       kw:["nhu cầu","công suất","công đoạn","chi phí"], num:null,
       model:"Em so nhu cầu với công suất trước, rồi tách công suất theo công đoạn để tìm điểm nghẽn, cuối cùng so chi phí các phương án bù phần thiếu.",
       note:"Case vận hành: nhu cầu – công suất – điểm nghẽn – chi phí phương án."},
      {q:"Đây là công suất và sản lượng (Exhibit 1). Ngày cao điểm thiếu bao nhiêu đơn, và cần bao nhiêu người?",
       kw:["công suất","thiếu","nhân viên"], num:12000, tol:5,
       model:"Cao điểm nhận 52.000 đơn nhưng kho xử lý được 40.000, thiếu 12.000 đơn mỗi ngày tức 23% số đơn; ở năng suất 400 đơn mỗi ca thì phần thiếu tương đương 30 nhân viên mỗi ca.",
       note:"Quy phần thiếu về số người là bước bắt buộc trước khi bàn chi phí."},
      {q:"Exhibit 2–3 về thời gian công đoạn và chi phí. Mỗi ngày cao điểm tốn thêm bao nhiêu, và nên đầu tư hay thuê thời vụ?",
       kw:["nhặt hàng","điểm nghẽn","thời vụ"], num:18, tol:0.1,
       model:"30 người × 600.000đ = 18 triệu mỗi ngày, cho 45 ngày là 810 triệu — rẻ hơn nhiều so với 9 tỷ đầu tư cố định. Nhưng nhặt hàng chiếm 6,5 trên 12 phút mỗi đơn nên đó mới là điểm nghẽn thật.",
       note:"Chi phí mùa vụ so với chi phí cố định cả năm — đó là trục quyết định của case này."},
      {q:"Khuyến nghị của bạn cho COO?",
       kw:["tuyến nhặt hàng","thời vụ","điểm nghẽn"], num:null,
       model:"Tổ chức lại kệ và tuyến nhặt hàng để cắt thời gian ở đúng điểm nghẽn, đồng thời thuê 30 nhân viên thời vụ mỗi ca cho 45 ngày cao điểm, thay vì đầu tư cố định cả năm.",
       note:"Sửa điểm nghẽn trước, bù phần còn lại bằng nguồn lực mùa vụ."}
    ]
  },
  "iv-06": {
    style:"Candidate-led · bạn tự dẫn case",
    rounds:[
      {q:"Một chuỗi nhà thuốc lớn được chào mua chuỗi 300 nhà thuốc với giá 900 tỷ. Bạn dẫn case và cho tôi biết nên trả bao nhiêu.",
       kw:["mục tiêu","làm rõ","chiến lược","vì sao mua"], num:null,
       model:"Em xin làm rõ trước: mục tiêu của thương vụ là mở rộng mặt bằng hay mua thị phần, và mình có ràng buộc nào về vốn hay thời gian không.",
       note:"Case M&A mở bằng lý do chiến lược của thương vụ, không mở bằng con số."},
      {q:"Mục tiêu là mở rộng nhanh mạng lưới mặt bằng, vốn không phải ràng buộc. Cấu trúc của bạn?",
       kw:["ebitda","bội số","synergy","tự mở"], num:null,
       model:"Em đi bốn nhánh: EBITDA độc lập của mục tiêu, bội số so với thương vụ tương tự trên thị trường, synergy có thật, và phương án thay thế là tự mở.",
       note:"Không có nhánh phương án thay thế thì không trả lời được câu đắt hay rẻ."},
      {q:"Đây là số liệu chuỗi mục tiêu (Exhibit 1). Giá chào tương đương bao nhiêu lần EBITDA?",
       kw:["ebitda","bội số"], num:8.3, tol:0.05,
       model:"Doanh thu 300 × 6 tỷ = 1.800 tỷ, EBITDA 6% = 108 tỷ, nên 900 tỷ tương đương bội số 8,3 lần EBITDA.",
       note:"Luôn quy giá về bội số của một dòng lợi nhuận trước khi phán đắt rẻ."},
      {q:"Exhibit 2–3 về bội số ngành và synergy. Sau synergy thì bội số thực là bao nhiêu?",
       kw:["synergy","mua hàng","bội số"], num:6.7, tol:0.05,
       model:"Synergy mua hàng 1,5 điểm biên trên 1.800 tỷ doanh thu là 27 tỷ, đưa EBITDA lên 135 tỷ nên bội số thực về 6,7 lần, thấp hơn mặt bằng ngành khoảng 7 lần.",
       note:"Tách rõ giá trị độc lập và phần synergy — bên bán luôn muốn thu trước cả hai."},
      {q:"Vậy bạn khuyên trả bao nhiêu và trả thế nào?",
       kw:["trả theo kết quả","earn-out","rủi ro thực hiện"], num:null,
       model:"Em đề xuất vùng 945 tỷ, tức 7 lần EBITDA sau synergy, nhưng chia thành phần trả trước và phần trả theo kết quả khi synergy mua hàng thực sự đạt, để rủi ro thực hiện nằm ở bên bán.",
       note:"Khuyến nghị M&A phải nói cả mức giá lẫn cơ chế thanh toán."}
    ]
  },
  "iv-07": {
    style:"Interviewer-led · người phỏng vấn dẫn từng bước",
    rounds:[
      {q:"Ước lượng quy mô doanh thu hằng năm của dịch vụ sạc xe máy điện công cộng tại Việt Nam. Bạn bắt đầu thế nào?",
       kw:["làm rõ","phạm vi","doanh thu","định nghĩa"], num:null,
       model:"Em xin làm rõ phạm vi: mình tính doanh thu bán điện tại trạm công cộng trên toàn quốc, cho xe máy điện đang lưu hành, trong một năm — đúng không ạ?",
       note:"Market sizing bắt đầu bằng định nghĩa phạm vi, nếu không sẽ tính nhầm sang thứ khác."},
      {q:"Đúng vậy. Cấu trúc ước lượng của bạn?",
       kw:["số xe","kwh","sạc ngoài","giá"], num:null,
       model:"Em đi bốn tầng: số xe điện lưu hành, số kWh mỗi xe mỗi năm, tỷ lệ sạc ngoài thay vì sạc tại nhà, và giá mỗi kWh tại trạm.",
       note:"Mỗi tầng là một phép nhân có đơn vị rõ để người phỏng vấn theo được."},
      {q:"Đây là các giả định (Exhibit 1). Quy mô thị trường mỗi năm là bao nhiêu?",
       kw:["kwh","sạc ngoài","giả định"], num:525.6, tol:0.5,
       model:"Mỗi xe chạy 30 km/ngày × 3 kWh/100 km = 0,9 kWh/ngày, tức 328,5 kWh/năm; chỉ 20% sạc ngoài nên 65,7 kWh mỗi xe; nhân 2 triệu xe × 4.000đ = 525,6 tỷ đồng mỗi năm.",
       note:"Giữ đơn vị qua từng bước — giám khảo chấm đường tính chứ không chỉ con số cuối."},
      {q:"Exhibit 3 cho số trạm và doanh thu mỗi trạm. Kiểm tra chéo giúp tôi.",
       kw:["kiểm tra chéo","trạm","lệch"], num:540, tol:1,
       model:"3.000 trạm × 15 triệu × 12 tháng = 540 tỷ, lệch dưới 3% so với ước lượng 525,6 tỷ — hai cách độc lập cho kết quả gần nhau.",
       note:"Một ước lượng có kiểm tra chéo đáng tin hơn hẳn một con số đơn lẻ."},
      {q:"Bạn kết luận thế nào, và giả định nào rủi ro nhất?",
       kw:["độ nhạy","tỷ lệ sạc ngoài","giả định nhạy"], num:null,
       model:"Thị trường khoảng 525–540 tỷ đồng mỗi năm. Giả định nhạy nhất là tỷ lệ sạc ngoài 20%: mỗi 5 điểm phần trăm đổi khoảng 131 tỷ, nên em sẽ nêu độ nhạy kèm con số thay vì một đáp số duy nhất.",
       note:"Kết luận của market sizing luôn kèm biến nhạy nhất và độ nhạy của nó."}
    ]
  },
  "iv-08": {
    style:"Candidate-led · bạn tự dẫn case",
    rounds:[
      {q:"Một ngân hàng chuẩn bị ra mắt thẻ tín dụng hoàn tiền 1% với mục tiêu 200.000 thẻ năm đầu. Bạn dẫn case: sản phẩm này có lãi không?",
       kw:["làm rõ","mục tiêu","định nghĩa","có lãi"], num:null,
       model:"Em xin làm rõ: mình đo có lãi ở mức một thẻ hay cả danh mục, và trong khung thời gian mấy năm kể từ khi phát hành?",
       note:"Phải chốt đơn vị đo (một thẻ hay cả danh mục) trước khi tính."},
      {q:"Đo ở mức một thẻ, khung ba năm. Cấu trúc của bạn?",
       kw:["interchange","hoàn tiền","vận hành","chi phí thu hút"], num:null,
       model:"Em dựng kinh tế một thẻ: doanh thu interchange, trừ chi phí hoàn tiền, trừ chi phí vận hành, rồi so lãi góp còn lại với chi phí thu hút khách.",
       note:"Sản phẩm mới luôn bắt đầu từ kinh tế một đơn vị, chưa bàn quy mô."},
      {q:"Đây là giả định một thẻ (Exhibit 1). Lãi góp mỗi thẻ mỗi năm là bao nhiêu?",
       kw:["interchange","hoàn tiền","lãi góp"], num:0.276, tol:0.005,
       model:"Chi tiêu 8 triệu × 12 = 96 triệu, interchange 1,6% = 1,536 triệu; hoàn tiền 1% là 0,96 triệu; trừ vận hành 0,3 triệu còn lãi góp 0,276 triệu mỗi thẻ mỗi năm.",
       note:"Trừ đủ ba khoản trước khi nói sản phẩm có lãi hay không."},
      {q:"Exhibit 2–3 về chi tiêu theo nhóm và tỷ lệ bỏ thẻ. Hoàn vốn bao lâu, và điều đó nói lên gì?",
       kw:["hoàn vốn","bỏ thẻ","vòng đời"], num:4.3, tol:0.05,
       model:"Chi phí thu hút 1,2 triệu chia lãi góp 0,276 triệu là 4,3 năm, trong khi 18% khách bỏ thẻ ngay sau năm đầu — phần lớn thẻ không sống đủ lâu để hoàn vốn.",
       note:"Hoàn vốn chỉ có nghĩa khi đặt cạnh vòng đời khách hàng thật."},
      {q:"Kết luận của bạn?",
       kw:["phân khúc","nhóm chi tiêu","chi phí thu hút"], num:null,
       model:"Ra mắt nhưng đổi thiết kế: chỉ mở hoàn tiền 1% cho nhóm chi tiêu cao 24 triệu mỗi tháng, hạ mức hoàn tiền nhóm chi tiêu thấp, và cắt chi phí thu hút bằng kênh khách hàng sẵn có để kéo hoàn vốn về dưới hai năm.",
       note:"Kết luận nên là một thiết kế phân khúc cụ thể, không phải câu có hay không."}
    ]
  },
  "iv-09": {
    style:"Interviewer-led · người phỏng vấn dẫn từng bước",
    rounds:[
      {q:"Một trường tư thục giữ nguyên số học sinh và mức học phí nhưng lợi nhuận năm nay giảm gần một nửa. Hội đồng trường muốn biết vì sao. Bạn bắt đầu thế nào?",
       kw:["làm rõ","doanh thu","chi phí","mục tiêu"], num:null,
       model:"Em hiểu là doanh thu gần như không đổi mà lợi nhuận giảm gần một nửa, nên nguyên nhân nhiều khả năng nằm ở chi phí. Em xin hỏi: mục tiêu là khôi phục lợi nhuận về mức cũ trong bao lâu, và trường có cam kết nào ràng buộc không?",
       note:"Doanh thu không đổi thì khoanh ngay vùng chi phí, nhưng vẫn phải hỏi ràng buộc."},
      {q:"Mục tiêu là khôi phục trong một năm học, và có cam kết tuyển sinh. Bạn cấu trúc thế nào?",
       kw:["học phí","giáo viên","sĩ số","chi phí khác"], num:null,
       model:"Em chia doanh thu thành học phí × số học sinh, và chia chi phí thành lương giáo viên theo sĩ số mỗi lớp và chi phí khác về cơ sở vật chất, quản lý.",
       note:"Trường học là mô hình chi phí theo sĩ số — sĩ số phải là một nhánh riêng."},
      {q:"Đây là kết quả hai năm (Exhibit 1). Lợi nhuận giảm bao nhiêu, và khoản nào giải thích?",
       kw:["lương giáo viên","chi phí khác"], num:13.5, tol:0.05,
       model:"Lợi nhuận từ 240 − 30 − 180 = 30 tỷ xuống 240 − 37,5 − 186 = 16,5 tỷ, giảm 13,5 tỷ, trong đó lương giáo viên tăng 7,5 tỷ và chi phí khác chỉ tăng 6 tỷ.",
       note:"Lượng hoá từng nhánh chi phí trước khi kết luận nhánh nào là nguyên nhân."},
      {q:"Exhibit 2–3 về sĩ số và mặt bằng học phí. Cần tăng học phí bao nhiêu phần trăm để khôi phục?",
       kw:["sĩ số","dư địa","cam kết"], num:5.6, tol:0.1,
       model:"Sĩ số từ 20 xuống 16 làm số giáo viên tăng từ 100 lên 125 người. Cần thêm 13,5 tỷ trên doanh thu 240 tỷ, tức tăng học phí 5,6%, mà học phí hiện thấp hơn mặt bằng phân khúc 132 triệu nên vẫn còn dư địa.",
       note:"Mặt bằng giá của phân khúc cho biết mức tăng nào là khả thi."},
      {q:"Khuyến nghị của bạn cho hội đồng trường?",
       kw:["cam kết","lớp nhỏ","tuyển sinh"], num:null,
       model:"Giữ cam kết sĩ số tối đa 16 vì đó là lời hứa tuyển sinh, tăng học phí khoảng 5,6% cho khoá mới và truyền thông lớp nhỏ như lý do tăng giá, đồng thời đưa sĩ số các khối lớn về 18 ở nơi không vướng cam kết.",
       note:"Khuyến nghị phải tôn trọng ràng buộc cam kết đã công bố với phụ huynh."}
    ]
  },
  "iv-10": {
    style:"Candidate-led · bạn tự dẫn case",
    rounds:[
      {q:"Một chuỗi phòng gym ở Hà Nội cân nhắc mở tại một thành phố tỉnh 800.000 dân. Bạn dẫn case — bắt đầu đi.",
       kw:["mục tiêu","làm rõ","ngân sách","thời gian"], num:null,
       model:"Em xin làm rõ ba điều: mục tiêu là lợi nhuận hay phủ thương hiệu, khung thời gian bao lâu, và ngân sách tối đa cho thị trường này.",
       note:"Case tự dẫn mở bằng mục tiêu, thời gian và ngân sách."},
      {q:"Mục tiêu là lợi nhuận trong 5 năm, ngân sách tối đa 40 tỷ. Cấu trúc của bạn?",
       kw:["thị trường","cung","kinh tế","cách vào"], num:null,
       model:"Em đi bốn nhánh: quy mô thị trường hội viên, cung phòng tập hiện hữu, kinh tế một phòng tập, và cách vào thị trường.",
       note:"Bốn nhánh chuẩn của case thâm nhập, kết thúc bằng nhánh cách vào."},
      {q:"Đây là giả định thị trường (Exhibit 1). Thị trường mỗi năm lớn cỡ nào?",
       kw:["hội viên","thị trường"], num:34.56, tol:0.05,
       model:"800.000 dân × 15% nhóm mục tiêu × 8% tập gym trả phí = 9.600 hội viên, × 300.000đ × 12 tháng = 34,56 tỷ đồng mỗi năm.",
       note:"Nói rõ từng giả định khi đi từ dân số xuống số hội viên trả phí."},
      {q:"Exhibit 2–3 về cung hiện tại và kinh tế một phòng. Hoàn vốn bao lâu?",
       kw:["hoàn vốn","ebitda","sức chứa"], num:11.1, tol:0.1,
       model:"Một phòng đủ tải có doanh thu 1.200 × 300.000đ × 12 = 4,32 tỷ, EBITDA 25% là 1,08 tỷ, vốn 12 tỷ nên hoàn vốn 11,1 năm. Sáu phòng hiện có với sức chứa 1.200 mỗi phòng đã phủ 7.200 chỗ nên dư địa chỉ khoảng hai phòng.",
       note:"Ghép hoàn vốn dài với dư địa nhỏ — đó là cặp số dẫn tới khuyến nghị cách vào."},
      {q:"Kết luận của bạn?",
       kw:["nhượng quyền","đối tác địa phương","ít vốn"], num:null,
       model:"Thị trường còn chỗ nhưng hoàn vốn 11,1 năm là quá dài để tự bỏ vốn, nên em đề xuất vào bằng nhượng quyền cho chủ đầu tư địa phương, mình đưa thương hiệu và vận hành để thu 6% doanh thu, chỉ tự mở khi một phòng mẫu vượt ngưỡng hội viên.",
       note:"Khuyến nghị tốt biến rủi ro vốn đã đo được thành một cách vào ít vốn."}
    ]
  },
  "iv-11": {
    style:"Interviewer-led · người phỏng vấn dẫn từng bước",
    rounds:[
      {q:"Một chuỗi trà sữa 120 cửa hàng giữ nguyên doanh thu nhưng lợi nhuận năm nay chỉ còn một phần ba năm trước. Chủ chuỗi muốn biết vì sao. Bạn bắt đầu thế nào?",
       kw:["làm rõ","doanh thu","chi phí","mục tiêu"], num:null,
       model:"Em hiểu là doanh thu giữ nguyên mà lợi nhuận còn một phần ba, nên vấn đề nằm ở chi phí hoặc ở biên. Em xin làm rõ: mục tiêu là khôi phục lợi nhuận về mức cũ trong bao lâu, và số cửa hàng có thay đổi không?",
       note:"Doanh thu không đổi thì khoanh ngay vùng biên và chi phí, nhưng vẫn phải chốt mục tiêu."},
      {q:"Số cửa hàng không đổi, mục tiêu là khôi phục trong một năm. Bạn cấu trúc thế nào?",
       kw:["biên lãi gộp","kênh","chi phí cố định"], num:null,
       model:"Em tách lợi nhuận thành doanh thu, biên lãi gộp và chi phí cố định; trong biên lãi gộp em tách tiếp theo kênh bán vì kênh giao hàng có phí nền tảng và khuyến mãi riêng.",
       note:"Mô hình đa kênh phải tách biên theo kênh, nếu không sẽ đổ lỗi nhầm cho chi phí cố định."},
      {q:"Đây là kết quả hai năm (Exhibit 1). Lợi nhuận mất bao nhiêu và vì đâu?",
       kw:["biên lãi gộp","điểm biên"], num:25.2, tol:0.05,
       model:"Lợi nhuận từ 36 tỷ xuống 10,8 tỷ, mất 25,2 tỷ, và toàn bộ đến từ 7 điểm biên lãi gộp vì doanh thu lẫn chi phí cố định đều không đổi.",
       note:"Khi doanh thu và chi phí cố định đứng yên, mức giảm lợi nhuận bằng đúng phần biên mất."},
      {q:"Exhibit 2–3 về cơ cấu kênh và kinh tế một ly. Điều gì giải thích 7 điểm biên đó?",
       kw:["khuyến mãi","phí nền tảng","giá thực thu"], num:31500, tol:100,
       model:"Kênh giao hàng tăng lên 46% doanh thu, mà mỗi ly qua app chỉ thực thu 31.500đ sau khuyến mãi 30% rồi còn chịu phí nền tảng 20%, trong khi giá nguyên liệu không đổi.",
       note:"Ghép tỷ trọng kênh với giá thực thu mỗi ly mới ra được nguyên nhân thật."},
      {q:"Khuyến nghị của bạn?",
       kw:["giá riêng theo kênh","combo","khuyến mãi"], num:null,
       model:"Bỏ khuyến mãi sâu 30% trên app, chuyển sang combo giữ giá, và xây giá riêng cho kênh giao hàng để bù phí nền tảng thay vì dùng chung bảng giá với tại quán.",
       note:"Sửa ở cấu trúc giá theo kênh, không sửa bằng cắt marketing hay đổi nguyên liệu."}
    ]
  },
  "iv-12": {
    style:"Candidate-led · bạn tự dẫn case",
    rounds:[
      {q:"Một chuỗi siêu thị mini muốn vào một thành phố cấp 2 có 1,2 triệu dân. Bạn dẫn case và cho tôi biết nên mở bao nhiêu cửa hàng.",
       kw:["mục tiêu","làm rõ","ngân sách","thời gian"], num:null,
       model:"Em xin làm rõ ba điều: mục tiêu là lợi nhuận hay phủ thị trường, khung thời gian bao lâu, và ngân sách tối đa cho thành phố này.",
       note:"Câu hỏi mở bao nhiêu cửa hàng vẫn phải bắt đầu từ mục tiêu và ràng buộc vốn."},
      {q:"Mục tiêu là lợi nhuận trong 5 năm, ngân sách 40 tỷ. Cấu trúc của bạn?",
       kw:["chi tiêu","kênh hiện đại","kinh tế cửa hàng","nhịp mở"], num:null,
       model:"Em đi bốn nhánh: tổng chi tiêu tạp hoá của thành phố, phần thuộc kênh hiện đại và thị phần mình chiếm được, kinh tế một cửa hàng, rồi nhịp mở rộng.",
       note:"Thị trường có thể chiếm luôn nhỏ hơn tổng chi tiêu — phải có nhánh kênh."},
      {q:"Đây là giả định thị trường (Exhibit 1–2). Phần thị trường mình có thể chiếm là bao nhiêu?",
       kw:["kênh hiện đại","thị phần","chi tiêu"], num:86.4, tol:0.1,
       model:"300.000 hộ × 4 triệu × 12 tháng = 14.400 tỷ chi tiêu tạp hoá; kênh hiện đại 12% là 1.728 tỷ; thị phần mục tiêu 5% cho 86,4 tỷ doanh thu.",
       note:"Đi từ tổng chi tiêu xuống phần thật sự tranh được, đừng dừng ở con số to nhất."},
      {q:"Exhibit 3 về kinh tế một cửa hàng. Mở được bao nhiêu cửa hàng và hoàn vốn bao lâu?",
       kw:["hoàn vốn","cửa hàng","ebitda"], num:6.7, tol:0.1,
       model:"86,4 tỷ chia 12 tỷ mỗi cửa hàng là 7 cửa hàng; mỗi cửa hàng EBITDA 5% của 12 tỷ là 0,6 tỷ trên vốn 4 tỷ nên hoàn vốn 6,7 năm.",
       note:"Số cửa hàng là thị phần chia doanh thu một cửa hàng, không phải con số cảm tính."},
      {q:"Kết luận của bạn?",
       kw:["theo đợt","điều kiện","rủi ro vốn"], num:null,
       model:"Mở 7 cửa hàng nhưng chia ba đợt, lấy doanh thu thực mỗi cửa hàng sau 9 tháng làm điều kiện mở đợt tiếp theo, vì hoàn vốn 6,7 năm là rủi ro vốn lớn nếu mở đồng loạt.",
       note:"Biến hoàn vốn dài thành một nhịp mở có điều kiện, đó là khuyến nghị dùng được."}
    ]
  },
  "iv-13": {
    style:"Interviewer-led · người phỏng vấn dẫn từng bước",
    rounds:[
      {q:"Một sàn tuyển dụng online có 40.000 nhà tuyển dụng trả phí, doanh thu vẫn tăng nhưng chậm dần. CEO muốn biết chặn đà chậm lại ở đâu. Bạn bắt đầu thế nào?",
       kw:["làm rõ","mục tiêu","khách mới","rời bỏ"], num:null,
       model:"Em hiểu là doanh thu vẫn tăng nhưng chậm dần và cần tìm chỗ chặn. Em xin hỏi: mục tiêu là tăng số khách trả phí hay tăng doanh thu mỗi khách, và tỷ lệ khách rời bỏ hiện nay là bao nhiêu?",
       note:"Với mô hình thuê bao, câu hỏi làm rõ quan trọng nhất là về tỷ lệ rời bỏ."},
      {q:"Mục tiêu là tăng doanh thu chung. Bạn cấu trúc thế nào?",
       kw:["khách mới","rời bỏ","doanh thu mỗi khách","sử dụng"], num:null,
       model:"Em coi doanh thu là số khách nhân doanh thu mỗi khách, rồi tách số khách thành khách mới trừ khách rời bỏ, và thêm một nhánh về mức độ sử dụng vì nó dẫn tới rời bỏ.",
       note:"Doanh thu thuê bao là tích của ba dòng — thiếu nhánh nào cũng ra kết luận sai."},
      {q:"Đây là số liệu khách trả phí (Exhibit 1). Mỗi năm mất bao nhiêu doanh thu vì khách rời bỏ?",
       kw:["rời bỏ","doanh thu"], num:120, tol:0.5,
       model:"40.000 × 25% = 10.000 khách rời mỗi năm, nhân 12 triệu là 120 tỷ doanh thu mất trên nền 480 tỷ; khách mới 11.000 nên số khách ròng chỉ tăng 2,5%.",
       note:"Quy tỷ lệ rời bỏ thành tiền mới thấy vì sao tăng trưởng đứng lại."},
      {q:"Exhibit 2–3 về rời bỏ theo nhóm và hành vi dùng gói. Bạn đọc ra gì?",
       kw:["khách nhỏ","dùng hết gói","kết quả tuyển"], num:36, tol:0.5,
       model:"Khách nhỏ rời bỏ 36% mỗi năm so với khách lớn 12%, và chỉ 28% khách nhỏ dùng hết gói đăng tin với 34% tuyển được người trong 30 ngày — họ rời vì không có kết quả, không phải vì giá.",
       note:"Một tỷ lệ trung bình giấu mất nhóm đang thực sự rò rỉ."},
      {q:"Khuyến nghị của bạn cho CEO?",
       kw:["gia hạn","hỗ trợ","giữ chân"], num:null,
       model:"Đưa khách nhỏ vào quy trình hỗ trợ viết tin và gợi ý ứng viên trong 30 ngày đầu, rồi gắn gia hạn với kết quả tuyển được, thay vì giảm giá để giữ chân.",
       note:"Khuyến nghị phải đánh vào nguyên nhân rời bỏ đã chứng minh bằng dữ liệu."}
    ]
  },
  "iv-14": {
    style:"Candidate-led · bạn tự dẫn case",
    rounds:[
      {q:"Một nhà máy thép được hỏi mua 10.000 tấn mỗi năm với giá 16,5 triệu đồng một tấn, thấp hơn giá thị trường. Bạn dẫn case: có nên nhận không?",
       kw:["làm rõ","công suất","thời hạn","mục tiêu"], num:null,
       model:"Em xin làm rõ ba điều: nhà máy còn công suất dư không, hợp đồng kéo dài bao lâu, và mục tiêu là lấp công suất hay giữ mặt bằng giá.",
       note:"Câu hỏi công suất dư quyết định toàn bộ hướng trả lời của case báo giá."},
      {q:"Còn công suất dư, hợp đồng ba năm, mục tiêu là lợi nhuận. Cấu trúc của bạn?",
       kw:["chi phí biến đổi","chi phí cố định","công suất dư","khách hiện hữu"], num:null,
       model:"Em so giá đề nghị với chi phí biến đổi trước, rồi mới xét chi phí cố định và công suất dư, cuối cùng là tác động sang khách hiện hữu.",
       note:"Case báo giá luôn có nhánh tác động chéo sang các khách đang mua."},
      {q:"Đây là cơ cấu chi phí (Exhibit 1). Chi phí bình quân mỗi tấn là bao nhiêu, và hợp đồng này lãi hay lỗ?",
       kw:["chi phí biến đổi","chi phí bình quân","lãi góp"], num:25, tol:0.5,
       model:"Chi phí cố định 240 tỷ chia 60.000 tấn là 4 triệu mỗi tấn, cộng chi phí biến đổi 14 triệu cho chi phí bình quân 18 triệu. Giá 16,5 triệu thấp hơn mức bình quân nhưng vẫn cao hơn chi phí biến đổi 2,5 triệu, nên 10.000 tấn mang lại lãi góp 25 tỷ mỗi năm.",
       note:"Ở công suất dư, quyết định dựa trên chi phí biên chứ không dựa trên chi phí bình quân."},
      {q:"Exhibit 2–3 về giá các nhóm khách. Rủi ro thật là gì?",
       kw:["neo giá","khách hiện hữu","giá"], num:18.2, tol:0.05,
       model:"Khách lớn dài hạn đang mua 18,2 triệu và các khách cùng phân khúc biết giá của nhau, nên rủi ro thật là neo giá: một hợp đồng 16,5 triệu có thể kéo cả nhóm xuống.",
       note:"Rủi ro của giá thấp thường nằm ở khách hiện hữu, không nằm ở đơn hàng đó."},
      {q:"Kết luận của bạn?",
       kw:["điều khoản riêng","không bán lại","điều chỉnh"], num:null,
       model:"Nhận hợp đồng ở phần công suất dư nhưng tách thành quy cách và điều khoản riêng, ràng buộc không bán lại, kèm cơ chế điều chỉnh theo giá phôi cho ba năm.",
       note:"Xử lý rủi ro neo giá bằng điều khoản hợp đồng, không bằng lời hứa."}
    ]
  },
  "iv-15": {
    style:"Interviewer-led · người phỏng vấn dẫn từng bước",
    rounds:[
      {q:"Một bệnh viện có danh sách chờ mổ kéo dài 6 tuần dù phòng mổ không thiếu. Giám đốc muốn biết nên đầu tư thêm phòng mổ hay không. Bạn bắt đầu thế nào?",
       kw:["làm rõ","nhu cầu","công suất","mục tiêu"], num:null,
       model:"Em hiểu là danh sách chờ 6 tuần và câu hỏi là có cần thêm phòng mổ không. Em xin hỏi: nhu cầu mỗi ngày là bao nhiêu ca, và mục tiêu là rút danh sách chờ về mấy tuần?",
       note:"Phải chốt nhu cầu theo ngày thì mới so được với công suất."},
      {q:"Nhu cầu 40 ca mỗi ngày, mục tiêu rút về 2 tuần. Bạn cấu trúc thế nào?",
       kw:["công suất","trở phòng","nhu cầu","chi phí"], num:null,
       model:"Em so nhu cầu với công suất thật, trong đó công suất thật phải trừ thời gian trở phòng giữa hai ca; sau đó mới so chi phí giữa cải tiến quy trình và đầu tư phòng mới.",
       note:"Công suất thật luôn nhỏ hơn công suất danh nghĩa vì thời gian không mổ."},
      {q:"Đây là số liệu phòng mổ (Exhibit 1). Mỗi ngày mổ được bao nhiêu ca?",
       kw:["trở phòng","công suất"], num:29, tol:0.5,
       model:"Mỗi ca chiếm 2 giờ mổ cộng 45 phút trở phòng là 2,75 giờ, nên 80 giờ khả dụng chỉ cho 29 ca mỗi ngày, thiếu 11 ca so với nhu cầu 40.",
       note:"Cộng thời gian trở phòng vào mỗi ca trước khi chia tổng giờ."},
      {q:"Exhibit 2–3 về thời gian trở phòng. Nếu về chuẩn thì được bao nhiêu ca?",
       kw:["chuẩn","trở phòng","tham chiếu"], num:34, tol:0.5,
       model:"Trở phòng 45 phút so với chuẩn tham chiếu 20 phút; nếu về chuẩn thì mỗi ca chiếm 2,33 giờ và công suất lên 34 ca mỗi ngày, thêm 5 ca mà không cần phòng mới.",
       note:"Chuẩn tham chiếu cho biết phần thời gian mất là sửa được chứ không cố hữu."},
      {q:"Khuyến nghị của bạn cho giám đốc?",
       kw:["đội dọn","trước khi đầu tư","quy trình"], num:null,
       model:"Rút trở phòng về 20 phút bằng đội dọn chuyên trách và chuyển bệnh nhân lên trước giờ, đo lại công suất, rồi mới tính có cần 28 tỷ cho phòng mổ mới hay không.",
       note:"Sửa quy trình trước khi đầu tư — rẻ hơn và cho dữ liệu để quyết định tiếp."}
    ]
  },
  "iv-16": {
    style:"Candidate-led · bạn tự dẫn case",
    rounds:[
      {q:"Một công ty logistics được chào mua một đội 200 xe tải với giá 300 tỷ. Bạn dẫn case: nên mua không và trả bao nhiêu?",
       kw:["làm rõ","mục tiêu","chiến lược","vì sao mua"], num:null,
       model:"Em xin làm rõ trước: mục tiêu của thương vụ là lấy thêm tải trọng hay lấy tuyến và khách hàng, và mình có ràng buộc nào về vốn không.",
       note:"Phải biết mua để lấy gì thì mới định giá được phần synergy."},
      {q:"Mục tiêu là lấy tuyến và khách hàng để lấp chiều về. Cấu trúc của bạn?",
       kw:["ebitda","bội số","synergy","tuổi xe"], num:null,
       model:"Em đi bốn nhánh: EBITDA độc lập của đội xe, bội số so với thương vụ cùng ngành, synergy từ ghép mạng lưới, và rủi ro tuổi xe phải trừ vào giá.",
       note:"Bốn nhánh chuẩn của M&A, với nhánh rủi ro tài sản đặc thù ngành vận tải."},
      {q:"Đây là số liệu đội xe (Exhibit 1). Giá chào tương đương bội số bao nhiêu?",
       kw:["ebitda","bội số"], num:6.25, tol:0.05,
       model:"EBITDA 400 tỷ × 12% = 48 tỷ, nên 300 tỷ tương đương 6,25 lần EBITDA.",
       note:"Quy giá về bội số trước khi nói đắt hay rẻ."},
      {q:"Exhibit 2–3 về chạy rỗng và mặt bằng ngành. Sau synergy thì bội số còn bao nhiêu?",
       kw:["chiều về","chạy rỗng","synergy"], num:5, tol:0.05,
       model:"Ghép mạng lưới đưa chạy rỗng từ 38% về 19%, synergy chiều về 3% × 400 tỷ = 12 tỷ nên EBITDA lên 60 tỷ và bội số thực về 5 lần, đúng mặt bằng ngành.",
       note:"Phải nói synergy đến từ cơ chế nào thì con số mới đáng tin."},
      {q:"Kết luận của bạn?",
       kw:["giữ lái xe","thay mới","điều kiện"], num:null,
       model:"Đề nghị quanh 300 tỷ nhưng tính trên EBITDA sau synergy, kèm điều kiện giữ đội lái xe và trừ dần phần chi phí thay mới 1,8 tỷ mỗi xe sau 5 năm.",
       note:"Trong vận tải, giá trị nằm ở mạng lưới và người lái — phải ràng buộc vào hợp đồng."}
    ]
  },
  "iv-17": {
    style:"Interviewer-led · người phỏng vấn dẫn từng bước",
    rounds:[
      {q:"Ước lượng quy mô thị trường suất ăn trưa cho nhân viên văn phòng tại TP.HCM mỗi năm. Bạn bắt đầu thế nào?",
       kw:["phạm vi","làm rõ","định nghĩa"], num:null,
       model:"Em xin chốt phạm vi: chỉ tính bữa trưa của lao động văn phòng tại TP.HCM, phần mua ngoài hoặc đặt app, trong một năm làm việc — đúng không ạ?",
       note:"Sai phạm vi là sai toàn bộ ước lượng, dù các phép tính sau đều đúng."},
      {q:"Đúng vậy. Cấu trúc ước lượng của bạn?",
       kw:["số người","tỷ lệ mua","số ngày","giá suất"], num:null,
       model:"Em đi bốn tầng: số lao động văn phòng, tỷ lệ mua bữa trưa thay vì mang cơm, số ngày làm việc mỗi năm, và giá trung bình một suất.",
       note:"Mỗi tầng là một phép nhân có đơn vị rõ, đi từ người xuống tiền."},
      {q:"Đây là các giả định (Exhibit 1–2). Quy mô mỗi năm là bao nhiêu?",
       kw:["suất","tỷ lệ mua","giả định"], num:4752, tol:5,
       model:"1,2 triệu lao động văn phòng × 40% mua bữa trưa = 480.000 suất mỗi ngày làm việc; × 220 ngày × 45.000đ = 4.752 tỷ đồng mỗi năm.",
       note:"Giữ đơn vị qua từng bước để người phỏng vấn kiểm tra được đường tính."},
      {q:"Exhibit 3 cho số quán và doanh thu mỗi quán. Kiểm tra chéo giúp tôi.",
       kw:["kiểm tra chéo","quán","lệch"], num:4680, tol:5,
       model:"6.000 quán và bếp × 65 triệu × 12 tháng = 4.680 tỷ, lệch khoảng 1,5% so với ước lượng 4.752 tỷ — hai đường tính độc lập cho kết quả gần nhau.",
       note:"Kiểm tra chéo là thứ phân biệt một ước lượng có kỷ luật với một con số đoán."},
      {q:"Bạn kết luận thế nào, và giả định nào rủi ro nhất?",
       kw:["độ nhạy","giá suất","giả định nhạy"], num:null,
       model:"Thị trường khoảng 4.700–4.800 tỷ đồng mỗi năm. Giả định nhạy nhất là giá mỗi suất: mỗi 5.000đ đổi khoảng 528 tỷ, nên em nêu độ nhạy kèm con số thay vì một đáp số duy nhất.",
       note:"Kết luận market sizing luôn kèm biến nhạy nhất và mức độ nhạy của nó."}
    ]
  },
  "iv-18": {
    style:"Candidate-led · bạn tự dẫn case",
    rounds:[
      {q:"Một hãng xe máy điện định ra mẫu giá rẻ 22 triệu đồng để mở rộng tệp khách. Bạn dẫn case: nên làm không?",
       kw:["làm rõ","mục tiêu","danh mục","thời gian"], num:null,
       model:"Em xin làm rõ: mục tiêu là sản lượng hay lợi nhuận, khung thời gian đánh giá mấy năm, và mẫu mới nằm cạnh mẫu nào trong danh mục hiện tại.",
       note:"Ra mẫu mới trong một danh mục sẵn có thì câu hỏi ăn mòn phải đặt ngay từ đầu."},
      {q:"Mục tiêu là lợi nhuận trong 4 năm, mẫu bán chạy hiện tại giá 32 triệu. Cấu trúc của bạn?",
       kw:["lãi góp","hoà vốn","phân khúc","ăn mòn"], num:null,
       model:"Em đi bốn nhánh: lãi góp mỗi xe mới, sản lượng hoà vốn của khoản đầu tư khuôn, quy mô phân khúc giá rẻ, và phần ăn mòn từ mẫu 32 triệu.",
       note:"Nhánh ăn mòn là thứ phân biệt câu trả lời nghiệp dư với câu trả lời dùng được."},
      {q:"Đây là kinh tế mẫu mới (Exhibit 1). Cần bán bao nhiêu xe mới hoà vốn?",
       kw:["lãi góp","hoà vốn","khuôn"], num:30000, tol:50,
       model:"Lãi góp mỗi xe 22 − 17 = 5 triệu, nên đầu tư 150 tỷ cần 30.000 xe để hoà vốn, tương đương 10% thị trường 300.000 xe mỗi năm.",
       note:"Quy khoản đầu tư về sản lượng hoà vốn rồi mới so với thị phần khả thi."},
      {q:"Exhibit 2–3 về phân khúc và danh mục. Phần ăn mòn ảnh hưởng thế nào?",
       kw:["ăn mòn","chuyển xuống","lãi góp"], num:9, tol:0.1,
       model:"Phân khúc dưới 25 triệu chiếm 46% sản lượng nên 10% thị phần là khả thi, nhưng 25% khách cân nhắc mẫu 32 triệu sẽ chuyển xuống, mà mỗi xe đó đang mang 9 triệu lãi góp so với 5 triệu của mẫu mới.",
       note:"Ăn mòn có thể biến một sản phẩm có lãi thành một sản phẩm làm giảm lợi nhuận chung."},
      {q:"Kết luận của bạn?",
       kw:["thương hiệu phụ","khác kênh","khoảng cách"], num:null,
       model:"Ra mắt nhưng dưới thương hiệu phụ, bán ở kênh khác và giữ khoảng cách tính năng với mẫu 32 triệu, đặt mục tiêu 30.000 xe và theo dõi tỷ lệ khách chuyển xuống.",
       note:"Chặn ăn mòn bằng thiết kế thương hiệu và kênh, không bằng kỳ vọng."}
    ]
  },
  "iv-19": {
    style:"Interviewer-led · người phỏng vấn dẫn từng bước",
    rounds:[
      {q:"Một hãng hàng không giá rẻ có tỷ lệ chậm chuyến cao và lợi nhuận mỏng. CEO muốn biết chậm chuyến đang tốn bao nhiêu và nên làm gì. Bạn bắt đầu thế nào?",
       kw:["làm rõ","chi phí","mục tiêu","tỷ lệ chậm"], num:null,
       model:"Em hiểu là cần lượng hoá chi phí chậm chuyến rồi đề xuất cách giảm. Em xin hỏi: tỷ lệ chậm hiện nay là bao nhiêu và một chuyến chậm đang tốn những khoản gì?",
       note:"Hỏi định nghĩa chi phí mỗi chuyến chậm trước khi nhân ra con số lớn."},
      {q:"25% chuyến chậm trên 30 phút, mỗi chuyến chậm tốn 40 triệu. Bạn cấu trúc thế nào?",
       kw:["số chuyến","tỷ lệ chậm","nguyên nhân","lịch bay"], num:null,
       model:"Em nhân số chuyến với tỷ lệ chậm và chi phí mỗi chuyến để ra quy mô, rồi tách nguyên nhân thành dây chuyền từ chuyến trước và các nguyên nhân độc lập như thời tiết, kỹ thuật, cuối cùng nhìn lại lịch bay.",
       note:"Quy mô trước, nguyên nhân sau — thứ tự này giữ cho câu trả lời có trọng số."},
      {q:"Đây là số liệu bay (Exhibit 1). Chậm chuyến tốn bao nhiêu mỗi năm?",
       kw:["chuyến","chi phí","chậm"], num:1095, tol:1,
       model:"60 máy bay × 5 chuyến × 365 ngày = 109.500 chuyến; 25% chậm là 27.375 chuyến, nhân 40 triệu là 1.095 tỷ mỗi năm.",
       note:"Đưa tỷ lệ chậm về tiền mỗi năm thì CEO mới so được với các khoản đầu tư khác."},
      {q:"Exhibit 2–3 về nguyên nhân và thời gian quay đầu. Bạn đọc ra gì?",
       kw:["dây chuyền","quay đầu","thời gian đệm"], num:9, tol:0.1,
       model:"56% chuyến chậm là dây chuyền từ chuyến trước, còn thời tiết chỉ 18%; quay đầu thực tế 34 phút so với kế hoạch 25 phút, lệch 9 phút — chính lịch bay đang tạo ra dây chuyền.",
       note:"Lịch đặt quay đầu ngắn hơn thực tế là cỗ máy tự sinh ra chậm chuyến."},
      {q:"Khuyến nghị của bạn cho CEO?",
       kw:["sân bay nghẽn","tách lịch","thời gian đệm"], num:null,
       model:"Tăng thời gian đệm quay đầu về đúng mức thực tế ở ba sân bay nghẽn chiếm 61% chuyến và tách lịch để cắt dây chuyền, chấp nhận giảm nhẹ số chuyến mỗi máy bay.",
       note:"Khuyến nghị phải nói rõ đánh đổi: ít chuyến hơn nhưng rẻ hơn 1.095 tỷ chi phí chậm."}
    ]
  },
  "iv-20": {
    style:"Candidate-led · bạn tự dẫn case",
    rounds:[
      {q:"Một chuỗi khách sạn bình dân Việt Nam muốn mở tại Phnom Penh. Bạn dẫn case: có nên vào và vào bằng mô hình nào?",
       kw:["làm rõ","mục tiêu","ngân sách","thời gian"], num:null,
       model:"Em xin làm rõ ba điều: mục tiêu là lợi nhuận hay đặt chân vào thị trường khu vực, ngân sách tối đa, và khung thời gian đánh giá.",
       note:"Case tự dẫn mở bằng mục tiêu, ngân sách và thời gian."},
      {q:"Mục tiêu là lợi nhuận trong 7 năm, ngân sách 2 triệu USD. Cấu trúc của bạn?",
       kw:["thị trường","cung phòng","kinh tế","mô hình vào"], num:null,
       model:"Em đi bốn nhánh: quy mô thị trường phòng bình dân, cấu trúc cung hiện tại, kinh tế một khách sạn, và mô hình vào thị trường.",
       note:"Nhánh mô hình vào là chỗ biến phân tích thành khuyến nghị dùng được."},
      {q:"Đây là giả định thị trường (Exhibit 1). Thị trường mỗi năm lớn cỡ nào?",
       kw:["lượt khách","phân khúc","thị trường"], num:48, tol:0.5,
       model:"2 triệu lượt khách × 30% phân khúc bình dân = 600.000 lượt, × 2 đêm × 40 USD = 48 triệu USD mỗi năm.",
       note:"Thị trường lưu trú tính theo lượt nhân số đêm nhân giá phòng."},
      {q:"Exhibit 2–3 về cung phòng và kinh tế một khách sạn. Hoàn vốn bao lâu?",
       kw:["hoàn vốn","công suất","phân mảnh"], num:6.6, tol:0.1,
       model:"80 phòng × 365 × 65% × 40 USD = 0,76 triệu USD doanh thu, EBITDA 30% là 0,228 triệu, vốn thuê và cải tạo 1,5 triệu nên hoàn vốn 6,6 năm; cung lại phân mảnh với 62% là khách sạn gia đình.",
       note:"Ghép hoàn vốn với mức phân mảnh của cung để chọn mô hình vào."},
      {q:"Kết luận của bạn?",
       kw:["thuê toà nhà","nhận quản lý","đo công suất"], num:null,
       model:"Thuê toà nhà sẵn có để cải tạo thành khách sạn đầu tiên thay vì mua đất xây, đo công suất thực một năm, rồi mới nhân rộng hoặc chuyển sang nhận quản lý khách sạn gia đình.",
       note:"Giữ vốn thấp cho tới khi có dữ liệu thật là cách vào đúng của thị trường chưa kiểm chứng."}
    ]
  },
  "iv-21": {
    style:"Interviewer-led · người phỏng vấn dẫn từng bước",
    rounds:[
      {q:"Một ứng dụng học tiếng Anh có 500.000 người dùng hằng tháng và đang chi mạnh để lấy thêm. Nhà đầu tư hỏi mô hình này có bền không. Bạn bắt đầu thế nào?",
       kw:["làm rõ","bền","đơn vị","mục tiêu"], num:null,
       model:"Em hiểu câu hỏi là mô hình có bền không, nên em sẽ đo ở mức một khách trả phí. Em xin làm rõ: mình tính bền theo giá trị trọn đời so với chi phí thu hút, và trong khung mấy năm?",
       note:"Chốt đơn vị đo là một khách trả phí trước khi nói chuyện quy mô người dùng."},
      {q:"Đúng, đo ở mức một khách trả phí. Bạn cấu trúc thế nào?",
       kw:["chuyển đổi","biên đóng góp","vòng đời","chi phí thu hút"], num:null,
       model:"Em đi bốn nhánh: tỷ lệ chuyển sang trả phí, giá gói và biên đóng góp, vòng đời khách trước khi rời bỏ, và chi phí thu hút theo kênh.",
       note:"Thiếu nhánh vòng đời thì mọi con số doanh thu đều lạc quan giả."},
      {q:"Đây là số liệu người dùng (Exhibit 1) và vòng đời trung bình 11 tháng. Giá trị trọn đời mỗi khách là bao nhiêu?",
       kw:["biên đóng góp","vòng đời","giá trị trọn đời"], num:0.77, tol:0.01,
       model:"Gói 1,2 triệu mỗi năm, biên đóng góp 70% cho 0,84 triệu mỗi năm tức 0,07 triệu mỗi tháng; nhân vòng đời 11 tháng ra giá trị trọn đời khoảng 0,77 triệu mỗi khách.",
       note:"Giá trị trọn đời phải đi qua biên đóng góp, không lấy thẳng doanh thu."},
      {q:"Chi phí thu hút một khách trả phí là 0,9 triệu. Exhibit 2–3 nói thêm điều gì?",
       kw:["tuần đầu","3 buổi","giữ chân"], num:58, tol:0.5,
       model:"Giá trị trọn đời 0,77 triệu thấp hơn chi phí thu hút 0,9 triệu nên càng chi càng lỗ. Nhưng nhóm học đủ 3 buổi trong tuần đầu còn lại 58% sau 6 tháng, so với 12% ở nhóm không học đủ.",
       note:"Exhibit hành vi chỉ ra đòn bẩy giữ chân rẻ nhất, thay vì chi thêm quảng cáo."},
      {q:"Khuyến nghị của bạn cho nhà đầu tư?",
       kw:["tuần đầu","kênh giới thiệu","giữ chân"], num:null,
       model:"Dồn nguồn lực vào tuần đầu để khách học đủ 3 buổi, qua đó kéo dài vòng đời, đồng thời chuyển ngân sách quảng cáo sang kênh giới thiệu rẻ hơn để hạ chi phí thu hút.",
       note:"Sửa cả hai vế của tỷ số giá trị trọn đời trên chi phí thu hút."}
    ]
  },
  "iv-22": {
    style:"Candidate-led · bạn tự dẫn case",
    rounds:[
      {q:"Một công ty phần mềm kế toán đang bán bản quyền vĩnh viễn muốn chuyển sang thuê bao tháng. Bạn dẫn case: nên chuyển không?",
       kw:["làm rõ","mục tiêu","khách cũ","thời gian"], num:null,
       model:"Em xin làm rõ ba điều: mục tiêu là doanh thu định kỳ hay tổng doanh thu, khung thời gian đánh giá, và mình có bao nhiêu khách cũ đang dùng bản vĩnh viễn.",
       note:"Chuyển mô hình giá luôn có hai tệp khách — phải hỏi số khách cũ ngay từ đầu."},
      {q:"Mục tiêu là doanh thu định kỳ, đánh giá trong năm đầu, 20.000 khách cũ. Cấu trúc của bạn?",
       kw:["khách mới","khách cũ","giá thuê bao","rời bỏ"], num:null,
       model:"Em tách thành khách mới mặc định thuê bao và khách cũ chuyển đổi, nhân với giá thuê bao năm, rồi trừ rủi ro rời bỏ và chi phí hỗ trợ.",
       note:"Hai tệp khách có hành vi khác nhau nên phải tính riêng."},
      {q:"Đây là mô hình hiện tại và đề xuất (Exhibit 1–2). Doanh thu năm đầu là bao nhiêu?",
       kw:["thuê bao","khách cũ","doanh thu"], num:81.6, tol:0.1,
       model:"5.000 khách mới cộng 60% của 20.000 khách cũ là 12.000, tổng 17.000 thuê bao × 4,8 triệu = 81,6 tỷ, so với 60 tỷ của mô hình bán bản quyền hiện tại.",
       note:"So hai mô hình trên cùng một năm và cùng một tệp khách."},
      {q:"Exhibit 3 về ràng buộc. Rủi ro nằm ở đâu?",
       kw:["rời bỏ","cập nhật","doanh thu định kỳ"], num:78, tol:0.5,
       model:"78% khách cũ đang không trả phí cập nhật nên thuê bao mở ra dòng doanh thu định kỳ đang mất; nhưng 15% khách không chịu chuyển và thuê bao có tỷ lệ rời bỏ 10% mỗi năm.",
       note:"Lợi ích và rủi ro của chuyển mô hình nằm ở cùng một nhóm khách cũ."},
      {q:"Kết luận của bạn?",
       kw:["chạy song song","theo đợt","đo"], num:null,
       model:"Chạy song song 12 tháng: khách mới mặc định thuê bao, khách cũ được ưu đãi chuyển theo đợt, đo tỷ lệ rời bỏ thực rồi mới ngừng bán bản vĩnh viễn.",
       note:"Lộ trình có điều kiện giữ được doanh thu chắc chắn trong lúc kiểm chứng mô hình mới."}
    ]
  },
  "iv-23": {
    style:"Interviewer-led · người phỏng vấn dẫn từng bước",
    rounds:[
      {q:"Một nhà máy may nhận đơn lớn nhưng chuyền không ra đủ hàng dù không thiếu công nhân. Giám đốc sản xuất muốn biết nghẽn ở đâu. Bạn bắt đầu thế nào?",
       kw:["làm rõ","sản lượng","kế hoạch","mục tiêu"], num:null,
       model:"Em hiểu là sản lượng thực thấp hơn kế hoạch dù đủ người. Em xin hỏi: kế hoạch mỗi chuyền là bao nhiêu áo mỗi ngày và thực tế đang ra bao nhiêu?",
       note:"Có hai con số kế hoạch và thực tế thì mới đo được phần hụt."},
      {q:"Kế hoạch 480 áo mỗi chuyền mỗi ngày, thực tế 344. Bạn cấu trúc thế nào?",
       kw:["nhịp chuyền","công đoạn","nguồn lực","sản lượng"], num:null,
       model:"Em so nhịp chuyền mục tiêu với thời gian từng công đoạn để tìm công đoạn chậm nhất, rồi xem nguồn lực nào có thể dồn vào đó, gồm cả công nhân dự phòng và máy.",
       note:"Công suất chuyền bằng công suất công đoạn chậm nhất — cấu trúc phải đi theo đó."},
      {q:"Đây là thời gian chuẩn từng công đoạn (Exhibit 2). Công suất thật mỗi giờ là bao nhiêu?",
       kw:["công đoạn","nghẽn","nhịp chuyền"], num:43, tol:0.5,
       model:"Tra tay mất 1,4 phút mỗi áo, cao nhất trong các công đoạn, nên công suất chuyền chỉ 60 chia 1,4 tức 43 áo mỗi giờ thay vì 60 theo nhịp mục tiêu.",
       note:"Chia 60 phút cho thời gian công đoạn chậm nhất, không lấy trung bình các công đoạn."},
      {q:"Vậy nhà máy đang mất bao nhiêu phần trăm sản lượng, và các công đoạn khác thì sao?",
       kw:["cân bằng chuyền","công đoạn chậm nhất","chờ"], num:28, tol:0.5,
       model:"343 áo thực tế so với 480 kế hoạch là hụt 28%; các công đoạn khác đều dưới 1 phút nên họ đang chờ chứ không thiếu người — đây là bài toán cân bằng chuyền quanh công đoạn chậm nhất.",
       note:"Chỉ công đoạn vượt nhịp mới là nghẽn, phần còn lại chỉ đang chờ."},
      {q:"Khuyến nghị của bạn?",
       kw:["dồn nguồn lực","thêm máy","tra tay"], num:null,
       model:"Dồn công nhân dự phòng và thêm một máy vào công đoạn tra tay để kéo thời gian về nhịp 1 phút, nâng công suất từ 43 lên 60 áo mỗi giờ, thay vì tăng ca hay tuyển thêm.",
       note:"Đầu tư đúng vào công đoạn nghẽn cho hiệu quả gấp nhiều lần thêm người dàn đều."}
    ]
  },
  "iv-24": {
    style:"Candidate-led · bạn tự dẫn case",
    rounds:[
      {q:"Một ngân hàng được chào mua một công ty tài chính tiêu dùng với giá 15.000 tỷ. Bạn dẫn case: mức giá đó có hợp lý không?",
       kw:["làm rõ","mục tiêu","chiến lược","dư nợ"], num:null,
       model:"Em xin làm rõ: ngân hàng mua để có năng lực cho vay tiêu dùng hay để có tệp khách, và dư nợ cùng cơ cấu thu nhập của mục tiêu ra sao.",
       note:"Trong tài chính, phải hỏi dư nợ và cơ cấu biên trước khi nói tới giá."},
      {q:"Mua để có năng lực cho vay tiêu dùng; dư nợ 20.000 tỷ. Cấu trúc của bạn?",
       kw:["biên lãi thuần","chi phí rủi ro","bội số","kênh"], num:null,
       model:"Em dựng lợi nhuận từ biên lãi thuần trừ chi phí rủi ro và chi phí hoạt động, quy về bội số so với thị trường, rồi xét rủi ro chu kỳ và rủi ro phụ thuộc kênh đối tác.",
       note:"Lợi nhuận của tổ chức cho vay phải dựng từ cấu trúc biên trên dư nợ."},
      {q:"Đây là số liệu công ty mục tiêu (Exhibit 1). Lợi nhuận và bội số là bao nhiêu?",
       kw:["biên lãi thuần","chi phí rủi ro","bội số"], num:1000, tol:1,
       model:"Biên lãi thuần 20% trừ chi phí rủi ro 9% và chi phí hoạt động 6% còn 5% trên dư nợ 20.000 tỷ, tức lợi nhuận trước thuế 1.000 tỷ; giá 15.000 tỷ là 15 lần lợi nhuận và 5 lần vốn chủ 3.000 tỷ.",
       note:"Hai bội số lợi nhuận và vốn chủ nên nói cùng lúc trong case tài chính."},
      {q:"Exhibit 2–3 về chu kỳ rủi ro và mặt bằng thị trường. Bạn đọc ra gì?",
       kw:["chu kỳ","chuẩn hoá","mặt bằng"], num:14, tol:0.5,
       model:"Chi phí rủi ro từng lên 14% trong năm suy giảm so với 9% năm nay, nên lợi nhuận 1.000 tỷ là mức đỉnh chu kỳ; mặt bằng thương vụ là 10–12 lần lợi nhuận và 3 lần vốn chủ, thấp hơn giá chào.",
       note:"Mua ở đỉnh chu kỳ với lợi nhuận đỉnh là cách trả đắt mà bội số vẫn trông đẹp."},
      {q:"Kết luận của bạn?",
       kw:["chuẩn hoá","kênh đối tác","điều chỉnh giá"], num:null,
       model:"Đưa giá về vùng 10–12 lần lợi nhuận đã chuẩn hoá chi phí rủi ro qua chu kỳ, kèm điều kiện giữ hợp đồng kênh đối tác chiếm 46% dư nợ và cơ chế điều chỉnh giá nếu chi phí rủi ro vượt ngưỡng.",
       note:"Rủi ro chu kỳ và rủi ro tập trung phải nằm trong điều khoản, không nằm trong hy vọng."}
    ]
  },
  "iv-25": {
    style:"Interviewer-led · người phỏng vấn dẫn từng bước",
    rounds:[
      {q:"Ước lượng quy mô thị trường thức ăn đóng gói cho chó mèo ở các thành phố lớn Việt Nam mỗi năm. Bạn bắt đầu thế nào?",
       kw:["phạm vi","làm rõ","định nghĩa"], num:null,
       model:"Em xin chốt phạm vi: thức ăn đóng gói cho chó và mèo, ở hộ gia đình thành thị, tính theo doanh thu bán lẻ trong một năm — đúng không ạ?",
       note:"Chốt phạm vi trước, nếu không sẽ lẫn sang thú cưng nông thôn hoặc thức ăn tự nấu."},
      {q:"Đúng vậy. Cấu trúc ước lượng của bạn?",
       kw:["hộ nuôi","tỷ lệ dùng","lượng ăn","giá"], num:null,
       model:"Em đi bốn tầng: số hộ thành thị nuôi chó mèo, tỷ lệ dùng thức ăn đóng gói, lượng ăn mỗi hộ mỗi năm, và giá mỗi kilogram.",
       note:"Tầng hành vi là chỗ hay bị bỏ và cũng là chỗ làm lệch kết quả nhiều nhất."},
      {q:"Đây là các giả định (Exhibit 1–2). Quy mô mỗi năm là bao nhiêu?",
       kw:["hộ nuôi","tỷ lệ dùng","giả định"], num:2400, tol:5,
       model:"5 triệu hộ nuôi × 40% dùng thức ăn đóng gói = 2.000.000 hộ; × 15 kg × 80.000đ = 2.400 tỷ đồng mỗi năm.",
       note:"Giữ đơn vị qua từng tầng: hộ, kilogram rồi tới tiền."},
      {q:"Exhibit 3 cho số điểm bán và doanh thu mỗi điểm. Kiểm tra chéo giúp tôi.",
       kw:["kiểm tra chéo","điểm bán","online"], num:2268, tol:5,
       model:"4.500 điểm bán × 42 triệu × 12 tháng = 2.268 tỷ cho kênh cửa hàng; cộng thêm 24% bán online thì tổng xấp xỉ 2.400 tỷ, khớp với ước lượng từ phía nhu cầu.",
       note:"Hai đường tính độc lập khớp nhau thì ước lượng mới đáng tin."},
      {q:"Bạn kết luận thế nào, và giả định nào rủi ro nhất?",
       kw:["độ nhạy","lượng ăn","giả định nhạy"], num:null,
       model:"Thị trường khoảng 2.300–2.400 tỷ đồng mỗi năm. Giả định nhạy nhất là lượng ăn mỗi hộ: mỗi 3 kg đổi khoảng 480 tỷ, nên em nêu độ nhạy kèm con số.",
       note:"Nói rõ biến nhạy nhất là cách thể hiện mình hiểu giới hạn của ước lượng."}
    ]
  },
  "iv-26": {
    style:"Candidate-led · bạn tự dẫn case",
    rounds:[
      {q:"Một chuỗi 300 cửa hàng cà phê định ra dòng trà trái cây để kéo khách trẻ. Bạn dẫn case: dòng này đáng làm không?",
       kw:["làm rõ","mục tiêu","danh mục","thời gian"], num:null,
       model:"Em xin làm rõ: mục tiêu là lợi nhuận hay số khách trẻ, đánh giá trong bao lâu, và dòng trà sẽ nằm cạnh cà phê trong cùng danh mục hay tách riêng.",
       note:"Thêm dòng sản phẩm vào chuỗi sẵn có thì phải hỏi ngay về danh mục và ăn mòn."},
      {q:"Mục tiêu là lợi nhuận trong một năm, bán cùng danh mục. Cấu trúc của bạn?",
       kw:["lãi góp","sản lượng","ăn mòn","vận hành"], num:null,
       model:"Em đi bốn nhánh: lãi góp mỗi ly trà, sản lượng dòng trà mỗi cửa hàng, phần ăn mòn từ cà phê, và tác động vận hành lên thời gian phục vụ.",
       note:"Nhánh vận hành là thứ hay bị bỏ khi bàn sản phẩm mới trong chuỗi F&B."},
      {q:"Đây là giả định dòng mới và nguồn khách (Exhibit 1–2). Lãi góp tăng thêm mỗi năm là bao nhiêu?",
       kw:["ăn mòn","lãi góp","đổi món"], num:59.5, tol:0.5,
       model:"Mỗi cửa hàng bán 37,5 ly trà mỗi ngày, trong đó 15 ly là mua thêm đóng góp 31.500đ, còn 22,5 ly là khách cũ đổi món chỉ đóng góp phần chênh 3.500đ; tổng 551.250đ mỗi cửa hàng mỗi ngày, nhân 300 cửa hàng và 360 ngày ra khoảng 59,5 tỷ mỗi năm.",
       note:"Phần ăn mòn chỉ tính chênh lệch lãi góp, không tính toàn bộ ly mới."},
      {q:"Exhibit 3 về vận hành. Có ràng buộc gì?",
       kw:["giờ cao điểm","thời gian pha","hàng chờ"], num:46, tol:0.5,
       model:"Trà pha 2,5 phút so với cà phê 1,5 phút, trong khi giờ cao điểm chiếm 46% doanh số — đưa trà vào mọi khung giờ sẽ kéo dài hàng chờ đúng lúc đông nhất.",
       note:"Một sản phẩm có lãi vẫn có thể làm hỏng doanh số nếu làm chậm giờ cao điểm."},
      {q:"Kết luận của bạn?",
       kw:["giới hạn danh mục","giá cao hơn","cao điểm"], num:null,
       model:"Triển khai toàn chuỗi nhưng giới hạn danh mục trà ở giờ cao điểm và đặt giá cao hơn cà phê để bù phần ăn mòn, theo dõi thời gian phục vụ trong tháng đầu.",
       note:"Khuyến nghị tốt giữ phần lợi ích mà chặn đúng ràng buộc vận hành."}
    ]
  },
  "iv-27": {
    style:"Interviewer-led · người phỏng vấn dẫn từng bước",
    rounds:[
      {q:"Một chuỗi rửa xe nhượng quyền có 80 điểm nhưng công ty mẹ gần như không có lãi. Chủ tịch muốn biết mô hình hỏng ở đâu. Bạn bắt đầu thế nào?",
       kw:["làm rõ","công ty mẹ","phí nhượng quyền","mục tiêu"], num:null,
       model:"Em hiểu là mình đang xét lợi nhuận của công ty mẹ chứ không phải của từng điểm. Em xin hỏi: công ty mẹ thu phí nhượng quyền theo tỷ lệ nào và đang gánh những chi phí gì?",
       note:"Trong mô hình nhượng quyền, phải chốt ngay đang xét lợi nhuận của ai."},
      {q:"Phí 8% doanh thu điểm, công ty mẹ gánh chi phí hỗ trợ và giám sát. Bạn cấu trúc thế nào?",
       kw:["phí nhượng quyền","chi phí hỗ trợ","đóng cửa","mở mới"], num:null,
       model:"Em tách thành phí nhượng quyền thu được, chi phí hỗ trợ và giám sát, rồi thêm hai nhánh động là số điểm đóng cửa và chi phí mở mới để bù.",
       note:"Mô hình nhượng quyền sống bằng vòng đời điểm, nên phải có nhánh đóng và mở."},
      {q:"Đây là kinh tế công ty mẹ (Exhibit 1). Lợi nhuận còn lại bao nhiêu?",
       kw:["phí nhượng quyền","chi phí hỗ trợ"], num:11.52, tol:0.05,
       model:"80 điểm × 1,8 tỷ × 8% = 11,52 tỷ phí nhượng quyền, trừ 9 tỷ chi phí hỗ trợ còn 2,52 tỷ; nhưng 12 điểm đóng mỗi năm buộc mở bù 12 × 220 triệu = 2,64 tỷ, tức ăn hết phần còn lại.",
       note:"Chi phí mở bù là khoản thường xuyên, phải nằm trong kinh tế hằng năm."},
      {q:"Exhibit 2–3 về doanh thu theo tuổi điểm và tỷ lệ gia hạn. Bạn đọc ra gì?",
       kw:["điểm năm đầu","gia hạn","vòng đời"], num:1.1, tol:0.05,
       model:"Điểm năm đầu chỉ đạt 1,1 tỷ so với 2,1 tỷ từ năm ba trở đi, mà tuổi trung bình mạng lưới chỉ 1,9 năm và chỉ 41% chủ điểm gia hạn sau ba năm — mạng lưới toàn điểm non nên phí thu được luôn thấp.",
       note:"Mở nhanh mà giữ kém thì doanh thu bình quân mỗi điểm không bao giờ lên."},
      {q:"Khuyến nghị của bạn cho chủ tịch?",
       kw:["dừng mở rộng","giữ điểm","gia hạn"], num:null,
       model:"Dừng mở rộng một năm, dồn hỗ trợ kéo doanh thu điểm năm đầu lên và nâng tỷ lệ gia hạn, vì mỗi điểm giữ được đáng giá hơn một điểm mở mới tốn 220 triệu.",
       note:"Đổi trọng tâm từ số điểm sang vòng đời điểm — đó là cách sửa mô hình này."}
    ]
  },
  "iv-28": {
    style:"Candidate-led · bạn tự dẫn case",
    rounds:[
      {q:"Một hãng mỹ phẩm dược muốn vào kênh nhà thuốc Việt Nam thay vì chỉ bán online. Bạn dẫn case: kênh này có đáng không?",
       kw:["làm rõ","mục tiêu","ngân sách","online"], num:null,
       model:"Em xin làm rõ ba điều: mục tiêu là doanh thu tăng thêm hay tệp khách mua lại, ngân sách cho đội bán hàng, và kênh online hiện đang đóng góp bao nhiêu.",
       note:"Mở kênh mới luôn phải so với kênh đang có, nên hỏi số liệu kênh cũ ngay từ đầu."},
      {q:"Mục tiêu là doanh thu tăng thêm; online hiện 95 tỷ mỗi năm. Cấu trúc của bạn?",
       kw:["độ phủ","doanh thu mỗi nhà thuốc","chiết khấu","đội bán hàng"], num:null,
       model:"Em đi bốn nhánh: số nhà thuốc phủ được, doanh thu mỗi nhà thuốc, chiết khấu kênh, và chi phí đội bán hàng để phục vụ độ phủ đó.",
       note:"Case mở kênh phải có nhánh chi phí phục vụ kênh, không chỉ doanh thu."},
      {q:"Đây là giả định kênh (Exhibit 1). Doanh thu về hãng còn bao nhiêu?",
       kw:["chiết khấu","doanh thu","nhà thuốc"], num:46.8, tol:0.1,
       model:"3.000 nhà thuốc × 2 triệu × 12 tháng = 72 tỷ doanh thu kênh; sau chiết khấu 35% còn 46,8 tỷ về hãng; trừ 60 người × 300 triệu = 18 tỷ chi phí đội bán hàng vẫn còn 28,8 tỷ.",
       note:"Trừ đủ chiết khấu và chi phí phục vụ rồi mới so với kênh online."},
      {q:"Exhibit 2–3 về nhóm nhà thuốc và kênh online. Nên phủ tới đâu?",
       kw:["nhóm dẫn đầu","nhóm đuôi","dược sĩ"], num:0.4, tol:0.05,
       model:"Nhóm dẫn đầu bán 2 triệu mỗi tháng còn nhóm đuôi chỉ 0,4 triệu, không đỡ nổi chi phí viếng thăm; trong khi kênh nhà thuốc có tư vấn dược sĩ nên tỷ lệ mua lại cao hơn online, vốn đang tốn 28% doanh thu cho quảng cáo.",
       note:"Độ phủ tối ưu dừng ở nhóm mà doanh thu còn đỡ được chi phí phục vụ."},
      {q:"Kết luận của bạn?",
       kw:["mở rộng theo đợt","đo doanh thu","nhóm giữa"], num:null,
       model:"Phủ 3.000 nhà thuốc nhóm dẫn đầu với đội 60 người, đo doanh thu mỗi nhà thuốc sau 6 tháng, rồi mới mở rộng theo đợt sang nhóm giữa nếu vượt ngưỡng.",
       note:"Mở rộng theo dữ liệu thật thay vì phủ hết ngay từ đầu."}
    ]
  },
  "iv-29": {
    style:"Interviewer-led · người phỏng vấn dẫn từng bước",
    rounds:[
      {q:"Một chuỗi 12 phòng khám nha khoa muốn tăng doanh thu 20% mà không mở thêm cơ sở. Giám đốc hỏi có làm được không. Bạn bắt đầu thế nào?",
       kw:["làm rõ","công suất","mục tiêu","ràng buộc"], num:null,
       model:"Em hiểu ràng buộc là không mở cơ sở mới, nên dư địa phải đến từ công suất hiện có. Em xin hỏi: công suất ghế hiện nay bao nhiêu phần trăm và mức tốt nhất trong chuỗi là bao nhiêu?",
       note:"Khi ràng buộc đã rõ, câu hỏi làm rõ nên nhắm thẳng vào nguồn dư địa."},
      {q:"Công suất ghế trung bình 55%, phòng khám tốt nhất đạt 70%. Bạn cấu trúc thế nào?",
       kw:["công suất ghế","khung giờ","huỷ hẹn","doanh thu"], num:null,
       model:"Em đi bốn nhánh: công suất ghế hiện tại và mục tiêu, phân bố theo khung giờ, tổn thất do huỷ hẹn, và quy đổi tất cả sang doanh thu mỗi phòng khám.",
       note:"Dịch vụ theo lịch hẹn có hai nguồn mất công suất: giờ trống và huỷ hẹn."},
      {q:"Đây là số liệu chuỗi (Exhibit 1). Nâng công suất lên 70% thì doanh thu tăng bao nhiêu?",
       kw:["công suất ghế","doanh thu"], num:26.2, tol:0.2,
       model:"Doanh thu mỗi phòng khám tăng 8 tỷ × (70 chia 55 − 1) = 2,18 tỷ, nhân 12 phòng khám ra khoảng 26,2 tỷ, tức hơn 27% doanh thu hiện tại nên vượt mục tiêu 20%.",
       note:"Quy dư địa công suất thành tiền rồi mới so với mục tiêu tăng trưởng."},
      {q:"Exhibit 2–3 về khung giờ và huỷ hẹn. Dư địa nằm ở đâu?",
       kw:["khung giờ","giờ hành chính","huỷ hẹn"], num:38, tol:0.5,
       model:"Khung 8–11 giờ chỉ đạt 38% và 11–14 giờ 42%, trong khi 17–20 giờ đã 84%; cộng thêm 19% huỷ hẹn trong 24 giờ và chỉ 62% bệnh nhân hẹn lại đúng lịch.",
       note:"Công suất trung bình 55% giấu mất chỗ thật sự còn trống."},
      {q:"Khuyến nghị của bạn?",
       kw:["giá ưu đãi","nhắc lịch","đặt cọc"], num:null,
       model:"Lấp giờ hành chính bằng giá ưu đãi khung giờ cho nhóm bệnh nhân linh hoạt, đồng thời cắt huỷ hẹn bằng nhắc lịch và đặt cọc nhỏ, đưa công suất ghế từ 55% lên 70%.",
       note:"Hai đòn bẩy giá khung giờ và kỷ luật lịch hẹn rẻ hơn nhiều so với mở cơ sở."}
    ]
  },
  "iv-30": {
    style:"Interviewer-led · người phỏng vấn dẫn từng bước",
    rounds:[
      {q:"Một chuỗi siêu thị thấy ngành hàng tươi sống luôn lỗ dù bán chạy. Giám đốc ngành hàng muốn biết mất tiền ở đâu. Bạn bắt đầu thế nào?",
       kw:["làm rõ","hao hụt","giá vốn","mục tiêu"], num:null,
       model:"Em hiểu là hàng tươi bán chạy nhưng vẫn lỗ, nên em nghĩ tới hao hụt. Em xin hỏi: tỷ lệ hao hụt hiện nay tính trên giá vốn là bao nhiêu và mục tiêu đưa về mức nào?",
       note:"Hỏi ngay hao hụt tính trên giá vốn hay trên doanh thu — hai mức rất khác nhau."},
      {q:"9% trên giá vốn; chuỗi tốt nhất khu vực đạt 5%. Bạn cấu trúc thế nào?",
       kw:["giá vốn","hao hụt","nhóm hàng","đặt hàng"], num:null,
       model:"Em tính hao hụt bằng tiền trên nền giá vốn, rồi tách theo nhóm hàng để tìm chỗ tập trung, cuối cùng soi quy trình đặt hàng vì đó là nơi tạo ra hao hụt.",
       note:"Hao hụt là kết quả của cách đặt hàng — nhánh quy trình phải có mặt."},
      {q:"Đây là số liệu ngành hàng (Exhibit 1). Mỗi năm mất bao nhiêu tiền?",
       kw:["giá vốn","hao hụt"], num:81, tol:0.5,
       model:"Giá vốn hàng tươi 1.200 × 75% = 900 tỷ, hao hụt 9% là 81 tỷ mỗi năm; đưa về mức 5% của chuỗi tốt nhất khu vực tiết kiệm 36 tỷ.",
       note:"Hao hụt tính trên giá vốn, không tính trên doanh thu — nhầm là sai một phần tư."},
      {q:"Exhibit 2–3 về nhóm hàng và cách đặt hàng. Bạn đọc ra gì?",
       kw:["rau lá","thuỷ sản","đặt hàng"], num:15, tol:0.5,
       model:"Rau lá hao hụt 15% và thuỷ sản 12%, cao hơn hẳn thịt 6% và trái cây 5%; rau lá lại chỉ đặt 2 lần mỗi tuần theo dự báo tuần trước, mà 23% cửa hàng hết hàng trước 18 giờ nên họ đặt dư để phòng.",
       note:"Tỷ lệ chung 9% giấu mất hai nhóm đang tạo ra phần lớn tổn thất."},
      {q:"Khuyến nghị của bạn?",
       kw:["đặt hàng hằng ngày","giảm giá cuối ngày","dự báo"], num:null,
       model:"Chuyển rau lá và thuỷ sản sang đặt hàng hằng ngày theo dự báo từng cửa hàng, kèm quy tắc giảm giá cuối ngày, đặt mục tiêu hao hụt 5% mà không làm tăng tỷ lệ hết hàng.",
       note:"Sửa ở tần suất và dự báo đặt hàng, không sửa bằng cách cắt lượng đều tay."}
    ]
  }
};

const norm = s => String(s||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d");
const has = (s, ...w) => w.some(x => norm(s).includes(norm(x)));
const cap = n => Math.max(0, Math.min(100, Math.round(n)));

function scoreRound(cfgR, text){
  const t = String(text||"");
  if(!t.trim()) return 0;
  const kw = has(t, ...cfgR.kw);
  if(cfgR.num == null) return kw ? 100 : 0;
  return (kw ? 50 : 0) + (SCORING.mentionsNumber(t, cfgR.num, cfgR.tol) ? 50 : 0);
}

const FEEDBACK = {
  Clarify:"Nhắc lại đề trong một câu rồi hỏi 2–3 câu làm rõ về mục tiêu và phạm vi.",
  Structure:"Cấu trúc thiếu nhánh quan trọng của loại case này — xem lại khung ở bài học gợi ý.",
  "Case math":"Thiếu con số then chốt. Nói ra phép tính trước khi kết luận.",
  "Chart reading":"Chưa rút ra được \"vậy thì sao\" từ exhibit — con số nào làm đổi quyết định?",
  Recommendation:"Khuyến nghị cần gắn với ràng buộc và con số vừa tính, không chỉ nêu hướng chung."
};

function score(caseId, sess){
  const cfg = CFG[caseId], spec = SCORING.cases[caseId];
  const per = cfg.rounds.map((r,i) => scoreRound(r, (sess.answers||[])[i]));
  const dims = ROUNDS.map((r,i) => [r.n, cap(per[i])]);
  const total = cap(per.reduce((a,b)=>a+b,0) / per.length);
  const v = Object.fromEntries(dims);
  const skills = { struct: cap((v.Clarify + v.Structure)/2), math: v["Case math"], data: v["Chart reading"],
                   insight: v["Chart reading"], story: v.Recommendation, fin: v["Case math"] };
  const src = "Interview · " + spec.title;
  const mistakes = per.map((p,i) => p >= 60 ? null : {   // 50 = đúng cấu trúc nhưng thiếu con số → vẫn ghi lỗi
      kind: ROUNDS[i].kind, ref: caseId+"-r"+(i+1), src,
      bad: `Vòng ${i+1} · ${ROUNDS[i].n}: ${String((sess.answers||[])[i]||"").trim().slice(0,140) || "(bỏ trống)"}`,
      good: cfg.rounds[i].model,
      why: cfg.rounds[i].note,
      lesson: [["i-profit-1","i-profit-2","i-profit-2","i-chart-1","i-profit-3"][i] || "i-profit-1", ""]
    }).filter(Boolean);
  const weakest = dims.slice().sort((a,b)=>a[1]-b[1])[0];
  const feedback = total >= 90
    ? "Phiên phỏng vấn tốt: mở đầu có làm rõ, cấu trúc đủ nhánh, có con số ở mỗi bước và khuyến nghị gắn với ràng buộc."
    : `Vòng yếu nhất là ${weakest[0]} (${weakest[1]}). ${FEEDBACK[weakest[0]]}`;
  return {dims, total, skills, mistakes, feedback, per};
}

/* ── phiên phỏng vấn ── */
const store = () => State.data.iv || (State.data.iv = {});
const get = id => store()[id] || null;
const roundOf = sess => !sess ? -1 : sess.result ? 5 : (sess.answers||[]).length;

function start(id, now){
  store()[id] = {start:now, answers:[], usedModel:false, result:null};
  State.save(); return get(id);
}
function answer(id, text, now){
  const sess = get(id), i = roundOf(sess);
  if(i < 0 || i > 4) return null;
  sess.answers[i] = text; sess.last = now;
  if(i === 4){
    const r = score(id, sess);
    sess.result = {total:r.total, dims:r.dims, feedback:r.feedback, recorded:!sess.usedModel};
    if(!sess.usedModel){
      const res = State.recordAttempt(id, {scores:r.skills, total:r.total, answers:{rounds:sess.answers},
                                           seconds: Math.round((now - sess.start)/1000)});
      const rec = State.data.cases[id]; rec.lastDims = r.dims; rec.feedback = r.feedback;
      r.mistakes.forEach(m => State.addMistake(m));
      sess.result.gain = res.gain; sess.result.mistakes = r.mistakes.length;
    }
  }
  State.save(); return sess;
}
function reset(id){ delete store()[id]; State.save(); }
function markModel(id){ const s = get(id); if(s){ s.usedModel = true; State.save(); } }

window.IVIEW = { CFG, ROUNDS, score, scoreRound, get, roundOf, start, answer, reset, markModel };
})();
