/* Bài đọc dạng văn xuôi, đứng trước 10 phần của bài học.
   LRD(id, text) — text viết theo cú pháp rút gọn:
     "## "  tiêu đề mục        "> "  đoạn thoại mẫu
     "- "   gạch đầu dòng      "**đậm**" và "*nghiêng*" dùng như phần còn lại của app */
window.READING = {};
window.LRD = (id, text) => { window.READING[id] = text.trim(); };
