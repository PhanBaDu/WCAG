# Bố cục báo cáo WCAG 2.2

Tài liệu này là bản khung soạn nội dung theo đúng bố cục trong ảnh. Có thể dùng để viết báo cáo hoàn chỉnh, đồng thời giữ cho phần trình bày, thứ tự mục và cách chia chương nhất quán.

## Trang bìa
- Tên dự án
- Phiên bản
- Ngày đánh giá
- Người thực hiện
- Người phê duyệt
- Link website/demo
- Công nghệ chính
- Tiêu chuẩn mục tiêu: WCAG 2.2 AA

## Phần 1 - Tổng quan
Mục này nên trình bày ngắn gọn:
- Mục tiêu cuộc thi và mục tiêu của sản phẩm
- Phạm vi đánh giá
- 4 nguyên tắc POUR được áp dụng như thế nào
- Phương pháp đánh giá: tự động, thủ công, thực tế
- Các màn hình/luồng đã kiểm tra

## Phần 2 - Kết quả tổng hợp
Nên có 2 phần:

### 2.1 Bảng thống kê trạng thái
Ví dụ các nhóm:
- Hoàn thành
- Một phần
- Chưa hoàn thành

### 2.2 Biểu đồ tổng quan
Hiển thị trực quan tỷ lệ:
- 69% hoàn thành
- 31% còn lại cần cải thiện

Có thể dùng biểu đồ tròn hoặc thanh tiến độ, miễn là dễ đọc và nhất quán với toàn bộ báo cáo.

## Phần 3 - Các điểm ĐÃ hoàn thành
Mục này nên liệt kê từng tiêu chí hoặc từng nhóm tiêu chí đã đạt chuẩn:
- Có badge màu xanh lá
- Mô tả cụ thể hành vi/triển khai
- Ghi rõ màn hình hoặc component liên quan
- Có thể thêm ảnh chụp minh họa nếu cần

Gợi ý trình bày:
- Tên tiêu chí
- Mức độ
- Trạng thái
- Mô tả đạt chuẩn
- Ghi chú kiểm thử

## Phần 4 - Bảng chi tiết 28 tiêu chí WCAG 2.2
Đây là bảng quan trọng nhất của báo cáo.

Nên có các cột:
- Mã tiêu chí
- Tên tiêu chí
- Mức
- Trạng thái
- Bằng chứng triển khai
- Ghi chú

Nên dùng màu phân biệt rõ:
- Xanh: đạt
- Vàng: một phần
- Đỏ: chưa đạt

Ngoài các tiêu chí nền tảng, cần nhấn mạnh 5 tiêu chí mới của WCAG 2.2:
- 2.4.11 Focus Not Obscured
- 2.4.12 Focus Not Obscured (Enhanced)
- 2.4.13 Focus Appearance
- 2.5.7 Dragging Movements
- 2.5.8 Target Size

## Phần 5 - Các điểm CHƯA hoàn thành
Mục này nên phân loại theo 3 mức ưu tiên:
- Cao
- Trung bình
- Thấp

Mỗi dòng nên mô tả:
- Vấn đề cụ thể
- Tác động tới người dùng
- Nguyên nhân hiện tại
- Giải pháp đề xuất
- Độ ưu tiên

Nếu có thể, nên gắn thêm:
- component/page liên quan
- ước lượng effort
- rủi ro nếu để lại

## Phần 6 - Kế hoạch hành động
Lập bảng 7 hành động khắc phục theo sprint.

Khuyến nghị các cột:
- STT
- Hành động
- Trang/component liên quan
- Mức ưu tiên
- Sprint dự kiến
- Deadline
- Người phụ trách
- Trạng thái

Nên chọn 7 việc có giá trị nhất để đưa vào kế hoạch gần hạn, thay vì dàn trải quá nhiều mục nhỏ.

## Phần 7 - Kết luận
Phần chốt báo cáo nên nêu:
- Điểm mạnh nổi bật
- Những tiêu chí đã đáp ứng tốt nhất
- Các điểm cần ưu tiên cải thiện
- Cam kết hoàn thiện trước khi nộp
- Ô ký tên/người duyệt nếu cần

## Phụ lục
Nên bổ sung:
- Tài liệu tham khảo W3C chính thức
- Link WCAG 2.2
- Ảnh chụp màn hình minh họa
- Danh sách trang đã kiểm thử
- Ghi chú build/lint/test nếu cần

## Ghi chú khi hoàn thiện
- Giữ cách trình bày thống nhất giữa các bảng.
- Không để xen kẽ tiếng Anh nếu bản báo cáo là tiếng Việt.
- Nêu rõ bằng chứng kỹ thuật thay vì mô tả chung chung.
- Nếu có số liệu, nên ghi nguồn đo và thời điểm đo.

