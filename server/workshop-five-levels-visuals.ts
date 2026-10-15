import type { WorkshopVisualExample } from '../content/workshop/types';
import type { PipelineId } from '../content/pipeline';
import { regeneratedFiveLevelExamples } from './workshop-regenerated-videos';
const examples: Partial<Record<PipelineId, WorkshopVisualExample[]>> = {
  "story": [
    {
      "id": "text-video",
      "title": "Tạo clip chỉ bằng chữ",
      "instruction": "Quan sát thiết kế chiếc đèn, hình dáng phần kính và bố trí căn phòng. Khi không có ảnh tham chiếu, model tự tạo những chi tiết này từ mô tả.",
      "promptVi": "Một chiếc đèn đồng nhỏ có quai tròn và phần kính hình trụ đặt trên bàn gỗ trong tiệm sửa đồ yên tĩnh lúc chạng vạng. Ban đầu đèn tắt, rồi ánh sáng vàng hổ phách bên trong từ từ sáng lên. Một cảnh quay liên tục 5 giây, medium shot, eye-level, locked camera. Chất liệu đồng và kính chân thực, ánh sáng xanh dịu từ cửa sổ bên trái. Chỉ ánh đèn thay đổi; chiếc đèn và máy quay đứng yên. Không có người, chữ, logo, lời thoại, âm nhạc hoặc cắt cảnh. Khung ngang 16:9.",
      "inputs": [],
      "outputs": [
        {
          "label": "Text-to-video: đèn do model tự thiết kế",
          "src": "/api/workshop/examples/lantern-text-vi-v1.mp4",
          "kind": "video",
          "width": 854,
          "height": 480,
          "poster": "/api/workshop/examples/lantern-text-vi-v1-poster.jpg"
        }
      ],
      "review": "Đèn sáng dần như yêu cầu, nhưng AI chọn kiểu đèn dầu có khung bảo vệ chéo. Nếu muốn một thiết kế cụ thể, cần mô tả rõ hơn hoặc cung cấp ảnh tham chiếu.",
      "settings": "OpenArt · Seedance 2.5 Draft · 480p · 5 giây · 1 take mỗi prompt · Audio On. Các clip gốc được giữ nguyên; bản dựng cuối bỏ âm thanh. Không có seed cố định nên đây là các lần thử, chưa đủ để xác định riêng từng yếu tố ảnh hưởng đến kết quả."
    },
    {
      "id": "image-video",
      "title": "Thêm start frame để giữ đúng thiết kế",
      "instruction": "Xem lần lượt hai clip để so sánh. Cả hai đều mô tả đèn sáng dần; clip này có thêm ảnh mở đầu để xác định thiết kế chiếc đèn và bố cục.",
      "promptVi": "Dùng ảnh đã tải làm khung hình mở đầu. Chiếc đèn đồng đứng yên trên bàn, ánh sáng vàng hổ phách bên trong từ từ sáng lên. Giữ nguyên quai, hình dáng kính, kích thước và vị trí chiếc đèn. Locked camera, một cảnh quay liên tục 5 giây. Không cắt cảnh, không thêm đồ vật, người, lời thoại hoặc âm nhạc.",
      "inputs": [
        {
          "label": "Start frame — đèn tắt",
          "src": "/api/workshop/examples/lantern-vi-v1.png"
        }
      ],
      "outputs": [
        {
          "label": "Image-to-video: giữ chiếc đèn trong ảnh mẫu",
          "src": "/api/workshop/examples/lantern-image-vi-v1.mp4",
          "kind": "video",
          "width": 852,
          "height": 480,
          "poster": "/api/workshop/examples/lantern-image-vi-v1-poster.jpg"
        }
      ],
      "review": "Quai tròn, phần kính hình trụ và cửa sổ giống ảnh tham chiếu hơn. Về cuối clip, ánh đèn tăng khá mạnh. Hai ví dụ dùng prompt khác nhau, nên chưa đủ để kết luận rằng thêm ảnh đầu vào luôn cho kết quả tốt hơn.",
      "settings": "OpenArt · Seedance 2.5 Draft · 480p · 5 giây · 1 take mỗi prompt · Audio On. Các clip gốc được giữ nguyên; bản dựng cuối bỏ âm thanh. Không có seed cố định nên đây là các lần thử, chưa đủ để xác định riêng từng yếu tố ảnh hưởng đến kết quả."
    },
    {
      "id": "missing-reference",
      "title": "Thiếu ảnh tham chiếu: AI tạo nhầm nhân vật",
      "instruction": "Trong lần thử này, ảnh nhân vật chưa tải lên thành công; công cụ vẫn dùng ảnh chiếc đèn từ lần trước. Chỉ viết “người thợ” trong prompt không đủ để AI biết cần dùng nhân vật nào.",
      "promptVi": "Dùng ảnh đã tải làm start frame. Đèn đã sáng từ đầu và luôn sáng dịu. Một cảnh 5 giây, locked camera. Người thợ nhìn vào đèn, từ giây 1 đến 3 khóe miệng nâng thành nụ cười nhẹ, từ giây 3 đến 5 giữ nụ cười và nhìn xuống đèn. Đầu, thân và hai tay giữ nguyên vị trí. Không nhìn camera, không thở khói, không hơi trắng, không thêm hành động hay người. Giữ áo chàm, tạp dề, bàn và ánh cửa sổ xanh. Không lời thoại, không âm nhạc, không cắt cảnh.",
      "settings": "OpenArt · Seedance 2.5 Draft · 480p · 5 giây · 1 take mỗi prompt · Audio On. Các clip gốc được giữ nguyên; bản dựng cuối bỏ âm thanh. Không có seed cố định nên đây là các lần thử, chưa đủ để xác định riêng từng yếu tố ảnh hưởng đến kết quả.",
      "inputs": [
        {
          "label": "Ảnh đèn còn gắn sau khi tải ảnh người thất bại",
          "src": "/api/workshop/examples/lantern-lit-vi-v1.png"
        }
      ],
      "outputs": [
        {
          "label": "Take sai nhân vật — không dùng trong phim",
          "src": "/api/workshop/examples/missing-reference-vi-v1.mp4",
          "kind": "video",
          "width": 852,
          "height": 480,
          "poster": "/api/workshop/examples/missing-reference-vi-v1-poster.jpg"
        }
      ],
      "review": "AI thêm một người hoàn toàn khác vào ảnh chiếc đèn. Trước khi bấm Generate, hãy kiểm tra ảnh thu nhỏ để chắc chắn đã tải đúng ảnh. Lỗi ở đây là thiếu ảnh nhân vật đầu vào; chưa thể dùng ví dụ này để đánh giá khả năng giữ nhất quán nhân vật của model."
    }
  ],
  "references": [
    {
      "id": "composite",
      "title": "Ghép nhân vật vào bối cảnh",
      "instruction": "Đính kèm hai ảnh và nêu rõ vai trò: ảnh 1 làm mẫu nhân vật, ảnh 2 làm mẫu chiếc đèn và căn phòng. Kết quả ghép sẽ được dùng làm đầu vào cho các bài thử tiếp theo.",
      "promptVi": "Ảnh 1 chỉ dùng làm mẫu khuôn mặt, tóc, áo chàm xắn tay và tạp dề be của người thợ. Ảnh 2 dùng làm mẫu chiếc đèn đồng và căn phòng. Tạo một ảnh điện ảnh chân thực duy nhất, khung ngang 16:9, medium shot, eye-level: cùng người thợ đứng sau bàn gỗ, bên trái chiếc đèn chưa sáng, nhìn xuống đèn. Hai bàn tay đặt tách nhau trên mặt bàn, thấy rõ từng tay. Giữ đúng quai tròn, phần kính hình trụ và thiết kế đèn. Ánh sáng xanh từ cửa sổ bên trái; giữ hình dáng cửa sổ và bố trí tiệm. Không thêm người, không chữ, không logo. Đây là ảnh mở đầu để làm video.",
      "inputs": [
        {
          "label": "Ảnh nhận diện nhân vật",
          "src": "/api/workshop/examples/repairer-front-vi-v1.png"
        },
        {
          "label": "Ảnh đèn tắt",
          "src": "/api/workshop/examples/lantern-vi-v1.png"
        }
      ],
      "outputs": [
        {
          "label": "Kết quả ghép hai ảnh",
          "src": "/api/workshop/examples/workshop-medium-vi-v1.png",
          "kind": "image",
          "width": 1672,
          "height": 941
        }
      ],
      "review": "Kết quả giữ được khuôn mặt, áo chàm và tạp dề của nhân vật. Người thợ đứng sau bàn, hai bàn tay tách nhau. Tuy nhiên, vị trí chưa hoàn toàn ở bên trái chiếc đèn như yêu cầu. Nếu vị trí này quan trọng với cảnh quay, hãy chỉnh bố cục trước khi tạo video.",
      "settings": "imagegen · ảnh tham chiếu đính kèm theo thứ tự bên dưới. Sao chép nguyên prompt tiếng Việt để thử lại."
    },
    {
      "id": "sizes",
      "title": "Năm cỡ cảnh — nhìn từ rộng đến gần",
      "instruction": "Đọc từ trái sang phải: extreme wide shot → wide shot → medium shot → close-up → extreme close-up. Mỗi cỡ cảnh giúp người xem tập trung vào một phần khác nhau của câu chuyện.",
      "promptVi": "Dùng ảnh tiệm sửa đèn đính kèm làm mẫu duy nhất. Tạo bảng so sánh 5 shot sizes bằng 5 ô ảnh chân thực xếp một hàng ngang, mỗi ô cùng tỷ lệ dọc và không có chữ. Từ trái sang phải: (1) extreme wide shot thấy toàn căn phòng và người thợ nhỏ trong phòng; (2) wide shot thấy toàn thân người thợ sau bàn và căn phòng; (3) medium shot thấy từ thắt lưng lên, hai tay trên bàn và chiếc đèn; (4) close-up khuôn mặt người thợ; (5) extreme close-up một mắt và một phần sống mũi. Mọi ô cùng một khoảnh khắc, cùng khuôn mặt, áo chàm, tạp dề be, chiếc đèn chưa sáng, cửa sổ bên trái và ánh sáng xanh chạng vạng. Máy quay eye-level ở tất cả ô, chỉ thay shot size. Không đổi biểu cảm, không thêm người, không chữ hoặc logo. Dùng trong bài học để nhìn rõ khác biệt giữa năm cỡ cảnh.",
      "inputs": [
        {
          "label": "Ảnh người thợ trong tiệm",
          "src": "/api/workshop/examples/workshop-medium-vi-v1.png"
        }
      ],
      "outputs": [
        {
          "label": "Toàn cảnh rất rộng → toàn thân → nửa người → cận mặt → cận mắt",
          "src": "/api/workshop/examples/shot-sizes-vi-v1.png",
          "kind": "image",
          "width": 2241,
          "height": 702
        }
      ],
      "review": "Các ô thể hiện rõ sự khác nhau về cỡ cảnh. Ở cảnh rộng, AI tự bổ sung phần không gian không có trong ảnh gốc, nên bố trí căn phòng chưa được giữ nguyên hoàn toàn. Ở cận cảnh, đồ vật có thể nằm ngoài khung hình để tập trung vào khuôn mặt hoặc chi tiết cần nhấn mạnh.",
      "settings": "imagegen · ảnh tham chiếu đính kèm theo thứ tự bên dưới. Sao chép nguyên prompt tiếng Việt để thử lại."
    },
    {
      "id": "angles",
      "title": "Bốn góc đặt camera",
      "instruction": "Trên trái: eye-level. Trên phải: high angle. Dưới trái: low angle. Dưới phải: over-the-shoulder, nhìn qua vai.",
      "promptVi": "Dùng ảnh tiệm sửa đèn đính kèm làm mẫu duy nhất. Tạo bảng so sánh bốn góc máy, bố trí 2×2, bốn ô ảnh chân thực cùng tỷ lệ ngang, không chữ. Ô trên trái: eye-level, người thợ nhìn xuống đèn trên bàn. Ô trên phải: high angle nhìn chéo từ trên cao xuống người thợ và bàn. Ô dưới trái: low angle nhìn từ dưới lên người thợ, thấy cạnh bàn phía trước. Ô dưới phải: over-the-shoulder từ sau vai phải người thợ; vai ở tiền cảnh bên phải, nhìn thấy chiếc đèn phía trước và cửa sổ bên trái. Cùng nhân vật, trang phục, đèn tắt, căn phòng và ánh sáng xanh từ cùng cửa sổ trong cả bốn ô. Không di chuyển bàn hoặc cửa sổ để giả góc máy. Chỉ đổi vị trí camera, không thay hành động. Bốn ô tách nhau bằng đường trắng mỏng, không chữ, không logo.",
      "inputs": [
        {
          "label": "Ảnh người thợ trong tiệm",
          "src": "/api/workshop/examples/workshop-medium-vi-v1.png"
        }
      ],
      "outputs": [
        {
          "label": "So sánh góc ngang mắt, từ trên, từ dưới và qua vai",
          "src": "/api/workshop/examples/camera-angles-vi-v1.png",
          "kind": "image",
          "width": 1672,
          "height": 941
        }
      ],
      "review": "Có thể phân biệt được bốn góc máy. Tuy nhiên, ở góc nhìn qua vai, AI đặt cửa sổ phía trước nhân vật, không khớp với bố trí ban đầu. Trước khi dùng để nối cảnh, hãy vẽ sơ đồ vị trí bàn, nhân vật và cửa sổ, rồi sửa lại ô này.",
      "settings": "imagegen · ảnh tham chiếu đính kèm theo thứ tự bên dưới. Sao chép nguyên prompt tiếng Việt để thử lại."
    },
    {
      "id": "relight",
      "title": "Đổi ánh sáng, giữ bố cục",
      "instruction": "So sánh cửa sổ xanh lúc chạng vạng với nắng vàng. Chỉ yêu cầu thay ánh sáng để dễ nhận ra chi tiết nào bị đổi ngoài ý muốn.",
      "promptVi": "Chỉnh ảnh người thợ trong tiệm đính kèm. Chỉ đổi ánh sáng: ánh nắng vàng ấm từ đúng cửa sổ bên trái thay cho ánh xanh chạng vạng. Giữ nguyên khuôn mặt, tư thế, hai bàn tay, áo chàm, tạp dề be, đèn tắt, vị trí bàn và mọi đồ vật. Không đổi góc máy hoặc crop. Không thêm chữ hay logo. Một ảnh ngang 16:9 chân thực để so sánh trước và sau relighting.",
      "inputs": [
        {
          "label": "Ảnh người thợ trong tiệm",
          "src": "/api/workshop/examples/workshop-medium-vi-v1.png"
        }
      ],
      "outputs": [
        {
          "label": "Trước: ánh xanh",
          "src": "/api/workshop/examples/workshop-medium-vi-v1.png",
          "kind": "image",
          "width": 1672,
          "height": 941
        },
        {
          "label": "Sau: nắng vàng",
          "src": "/api/workshop/examples/relight-vi-v1.png",
          "kind": "image",
          "width": 1672,
          "height": 941
        }
      ],
      "review": "Ánh sáng vẫn chiếu từ bên trái. Khuôn mặt, trang phục, hai bàn tay và chiếc đèn đang tắt khá giống ảnh gốc. Cảnh ngoài cửa sổ cũng chuyển sang ban ngày, tức là AI đã thay đổi thời điểm của cảnh chứ không chỉ chỉnh màu ánh sáng.",
      "settings": "imagegen · ảnh tham chiếu đính kèm theo thứ tự bên dưới. Sao chép nguyên prompt tiếng Việt để thử lại."
    },
    {
      "id": "wardrobe",
      "title": "Đổi áo, giữ người và bối cảnh",
      "instruction": "Tách yêu cầu trang phục khỏi ánh sáng. Dùng lại ảnh gốc, không dùng ảnh đã đổi sang nắng vàng.",
      "promptVi": "Chỉnh ảnh đính kèm, chỉ thay áo chàm bằng áo sơ mi xanh rêu xắn tay, giữ tạp dề be. Giữ tuyệt đối cùng khuôn mặt, tóc, biểu cảm, tư thế và hai bàn tay, chiếc đèn tắt, cửa sổ, ánh sáng, bàn và đồ vật. Không thay tuổi hoặc vóc dáng. Không đổi vị trí camera, không crop, không chữ, không logo. Một ảnh ngang chân thực để so sánh thay trang phục có kiểm soát.",
      "inputs": [
        {
          "label": "Ảnh người thợ trong tiệm",
          "src": "/api/workshop/examples/workshop-medium-vi-v1.png"
        }
      ],
      "outputs": [
        {
          "label": "Trước: áo chàm",
          "src": "/api/workshop/examples/workshop-medium-vi-v1.png",
          "kind": "image",
          "width": 1672,
          "height": 941
        },
        {
          "label": "Sau: áo xanh rêu",
          "src": "/api/workshop/examples/wardrobe-vi-v1.png",
          "kind": "image",
          "width": 1672,
          "height": 941
        }
      ],
      "review": "Áo đã đổi sang xanh rêu; khuôn mặt, tóc, tư thế và chiếc đèn khá giống ảnh gốc. Tuy nhiên, kiểu cổ áo cũng thay đổi. Nếu chỉ muốn đổi màu, hãy yêu cầu giữ nguyên kiểu cổ áo rồi kiểm tra lại kết quả.",
      "settings": "imagegen · ảnh tham chiếu đính kèm theo thứ tự bên dưới. Sao chép nguyên prompt tiếng Việt để thử lại."
    }
  ],
  "motion": [
    {
      "id": "static",
      "title": "Camera đứng yên — mốc để đối chiếu",
      "instruction": "Quan sát mép cửa sổ và cạnh bàn, thay vì chỉ nhìn mặt nhân vật. Các đường này giúp nhận ra camera có di chuyển ngoài ý muốn hay không.",
      "promptVi": "Dùng ảnh đã tải làm khung hình mở đầu chính xác. Người sửa đèn nhìn yên vào chiếc đèn chưa sáng, hai bàn tay đặt riêng trên bàn. Locked camera, eye-level, một cảnh liên tục 5 giây. Chỉ có nhịp thở rất nhẹ. Giữ nguyên khuôn mặt, áo chàm, tạp dề be, thiết kế đèn và ánh sáng từ cửa sổ bên trái. Đèn luôn tắt. Không lời thoại, không âm nhạc, không cắt cảnh.",
      "inputs": [
        {
          "label": "Ảnh người thợ trong tiệm",
          "src": "/api/workshop/examples/workshop-medium-vi-v1.png"
        }
      ],
      "outputs": [
        {
          "label": "Locked camera",
          "src": "/api/workshop/examples/camera-static-vi-v1.mp4",
          "kind": "video",
          "width": 852,
          "height": 480,
          "poster": "/api/workshop/examples/camera-static-vi-v1-poster.jpg"
        }
      ],
      "review": "Khung hình tương đối ổn định, nhưng nhân vật vẫn cúi đầu và cử động nhẹ dù prompt chỉ yêu cầu thở tự nhiên. Vì vậy, cần kiểm tra cả hành động của nhân vật lẫn chuyển động camera.",
      "settings": "OpenArt · Seedance 2.5 Draft · 480p · 5 giây · 1 take mỗi prompt · Audio On. Các clip gốc được giữ nguyên; bản dựng cuối bỏ âm thanh. Không có seed cố định nên đây là các lần thử, chưa đủ để xác định riêng từng yếu tố ảnh hưởng đến kết quả."
    },
    {
      "id": "dolly-first",
      "title": "Dolly-in lần 1 — phát hiện sai chuyển động",
      "instruction": "Dolly-in nghĩa là camera tiến về phía chủ thể. Nhân vật tự cúi về phía camera không phải cùng một kỹ thuật.",
      "promptVi": "Dùng ảnh đã tải làm khung hình mở đầu chính xác. Người sửa đèn nhìn yên vào chiếc đèn chưa sáng, hai bàn tay đặt riêng trên bàn. Slow dolly-in: camera từ từ tiến gần người thợ khoảng 30 cm, không zoom lens, eye-level, một cảnh liên tục 5 giây. Chỉ có nhịp thở rất nhẹ. Giữ nguyên khuôn mặt, áo chàm, tạp dề be, thiết kế đèn và ánh sáng từ cửa sổ bên trái. Đèn luôn tắt. Không lời thoại, không âm nhạc, không cắt cảnh.",
      "inputs": [
        {
          "label": "Ảnh người thợ trong tiệm",
          "src": "/api/workshop/examples/workshop-medium-vi-v1.png"
        }
      ],
      "outputs": [
        {
          "label": "Lần 1: người cúi, khung hình trượt ngang",
          "src": "/api/workshop/examples/camera-dolly-vi-v1.mp4",
          "kind": "video",
          "width": 852,
          "height": 480,
          "poster": "/api/workshop/examples/camera-dolly-vi-v1-poster.jpg"
        }
      ],
      "review": "Lần thử này chưa đạt: nhân vật nghiêng và cúi người khá rõ, còn cửa sổ dịch sang ngang trong khung hình. Kết quả chưa thể hiện đúng chuyển động dolly-in.",
      "settings": "OpenArt · Seedance 2.5 Draft · 480p · 5 giây · 1 take mỗi prompt · Audio On. Các clip gốc được giữ nguyên; bản dựng cuối bỏ âm thanh. Không có seed cố định nên đây là các lần thử, chưa đủ để xác định riêng từng yếu tố ảnh hưởng đến kết quả."
    },
    {
      "id": "dolly-revision",
      "title": "Sửa câu lệnh, rồi kiểm tra lại",
      "instruction": "Nêu rõ tư thế nhân vật cần giữ nguyên và yêu cầu camera không dịch sang ngang. Lần này chỉ sửa nhóm yêu cầu đó, giữ nguyên ảnh mở đầu và thiết lập.",
      "promptVi": "Dùng ảnh đã tải làm start frame chính xác. Camera duy nhất tiến thẳng về trước thật chậm theo trục lens, không trượt ngang, không orbit, không pan. Một cảnh liên tục 5 giây, slow dolly-in, từ medium shot tiến gần khoảng 30 cm. Người thợ giữ nguyên tư thế thẳng lưng, đầu và hai bàn tay bất động. Không cúi người, không quay đầu. Đèn luôn tắt. Giữ bố trí bàn, cửa sổ và ánh sáng xanh. Không lời thoại, không âm nhạc, không cắt cảnh.",
      "inputs": [
        {
          "label": "Ảnh người thợ trong tiệm",
          "src": "/api/workshop/examples/workshop-medium-vi-v1.png"
        }
      ],
      "outputs": [
        {
          "label": "Lần 2: tiến gần hơn nhưng vẫn lệch trục",
          "src": "/api/workshop/examples/camera-dolly-vi-v2.mp4",
          "kind": "video",
          "width": 852,
          "height": 480,
          "poster": "/api/workshop/examples/camera-dolly-vi-v2-poster.jpg"
        }
      ],
      "review": "Nhân vật bớt cúi và khung hình gần hơn, nhưng camera vẫn dịch sang ngang. Chuyển động dolly-in chưa đúng yêu cầu. Có thể thử mẫu chuyển động camera có sẵn (preset), đơn giản hóa cảnh hoặc tạo lại. Luôn đánh giá chuyển động thực tế trong clip.",
      "settings": "OpenArt · Seedance 2.5 Draft · 480p · 5 giây · 1 take mỗi prompt · Audio On. Các clip gốc được giữ nguyên; bản dựng cuối bỏ âm thanh. Không có seed cố định nên đây là các lần thử, chưa đủ để xác định riêng từng yếu tố ảnh hưởng đến kết quả."
    },
    {
      "id": "endpoints",
      "title": "Start/end frame — nối hai trạng thái",
      "instruction": "Gắn đèn tắt vào Start và đèn sáng vào End. So sánh với clip ở cấp độ 1 chỉ dùng ảnh mở đầu.",
      "promptVi": "Nối start frame đèn tắt và end frame đèn sáng. Một cảnh liên tục 5 giây, locked camera. Ngọn bấc ở đáy kính từ từ cháy sáng màu vàng hổ phách, phản sáng ấm xuất hiện nhẹ trên bàn. Không đổi thiết kế đèn, quai, kính, cửa sổ hoặc đồ vật. Không có người, không camera movement, không cắt cảnh, không chữ, không lời thoại, không âm nhạc.",
      "inputs": [
        {
          "label": "Start frame — đèn tắt",
          "src": "/api/workshop/examples/lantern-vi-v1.png"
        },
        {
          "label": "End frame — đèn sáng",
          "src": "/api/workshop/examples/lantern-lit-vi-v1.png"
        }
      ],
      "outputs": [
        {
          "label": "Đèn tắt → đèn sáng",
          "src": "/api/workshop/examples/endpoints-vi-v1.mp4",
          "kind": "video",
          "width": 852,
          "height": 480,
          "poster": "/api/workshop/examples/endpoints-vi-v1-poster.jpg"
        }
      ],
      "review": "Ngọn lửa xuất hiện ở đúng vị trí bấc đèn; camera gần như đứng yên. Lửa bùng lên rồi dịu xuống. Ảnh kết thúc giúp xác định trạng thái cuối clip, nhưng phần chuyển động ở giữa vẫn cần được kiểm tra.",
      "settings": "OpenArt · Seedance 2.5 Draft · 480p · 5 giây · 1 take mỗi prompt · Audio On. Các clip gốc được giữ nguyên; bản dựng cuối bỏ âm thanh. Không có seed cố định nên đây là các lần thử, chưa đủ để xác định riêng từng yếu tố ảnh hưởng đến kết quả."
    }
  ],
  "review": [
    {
      "id": "sheet",
      "title": "Bốn loại ảnh tham chiếu và cách sử dụng",
      "instruction": "Dùng ảnh khuôn mặt và ảnh trang phục riêng để mỗi ảnh có một vai trò rõ ràng. Dùng từng ô phù hợp với shot, không cần gắn cả bảng cho mọi lần tạo.",
      "promptVi": "Dùng ảnh chân dung đính kèm làm mẫu danh tính duy nhất. Tạo một bảng tham chiếu nhân vật gồm bốn ô bằng nhau trên nền xám nhạt, bố trí 2×2. Ô trên trái: cận mặt chính diện. Ô trên phải: cận mặt nghiêng đúng 90 độ, mũi hướng sang trái ảnh, chỉ thấy một mắt; không chỉ xoay vai. Ô dưới trái: toàn bộ trang phục từ cổ trở xuống, cố ý không có đầu trong ô này, áo chàm xắn tay, tạp dề be, quần tối và giày nâu. Ô dưới phải: toàn thân nhìn từ sau, thấy cả đầu, cùng trang phục. Giữ cùng khuôn mặt, tuổi, tóc và tỷ lệ cơ thể. Ánh sáng mềm đều, không chữ, không logo. Bốn ô tách nhau bằng khoảng trắng mỏng. Ảnh chân thực, dùng để dạy vai trò ảnh tham chiếu.",
      "inputs": [
        {
          "label": "Ảnh nhận diện nhân vật",
          "src": "/api/workshop/examples/repairer-front-vi-v1.png"
        }
      ],
      "outputs": [
        {
          "label": "Chính diện · nghiêng 90° · trang phục · mặt sau",
          "src": "/api/workshop/examples/repairer-sheet-vi-v1.png",
          "kind": "image",
          "width": 1145,
          "height": 1374
        }
      ],
      "review": "Ảnh góc nghiêng cho thấy một mắt và đường nét khuôn mặt nhìn từ bên cạnh. Ô dưới bên trái chỉ tập trung vào trang phục, nên không có đầu; ô mặt sau vẫn giữ toàn bộ nhân vật. AI đã tự bổ sung phần trang phục không có trong ảnh chân dung gốc, vì vậy cần kiểm tra trước khi dùng làm mẫu.",
      "settings": "imagegen · ảnh tham chiếu đính kèm theo thứ tự bên dưới. Sao chép nguyên prompt tiếng Việt để thử lại."
    },
    {
      "id": "acting",
      "title": "Chỉ đạo diễn xuất bằng mốc hành động",
      "instruction": "Nhìn xuống → thở ra → ngẩng mắt → mỉm cười → giữ. Mốc thời gian cụ thể giúp dễ đánh giá hơn từ chung chung như «buồn rồi vui».",
      "promptVi": "Dùng ảnh đã tải làm start frame. Một cảnh 5 giây, locked camera, medium shot. Người thợ nhìn xuống chiếc đèn tắt trong giây đầu, thở ra nhẹ, rồi từ giây 2 đến 4 ngẩng mắt lên và mỉm cười rất nhẹ, cuối cùng giữ biểu cảm một giây. Hai bàn tay luôn đặt riêng trên bàn, không giơ tay. Giữ cùng khuôn mặt, tóc, áo chàm, tạp dề và ánh sáng xanh từ cửa sổ. Không đổi đèn, không thêm người, không lời thoại, không âm nhạc, không cắt cảnh.",
      "inputs": [
        {
          "label": "Ảnh người thợ trong tiệm",
          "src": "/api/workshop/examples/workshop-medium-vi-v1.png"
        }
      ],
      "outputs": [
        {
          "label": "Diễn xuất có ba nhịp rõ",
          "src": "/api/workshop/examples/acting-vi-v1.mp4",
          "kind": "video",
          "width": 852,
          "height": 480,
          "poster": "/api/workshop/examples/acting-vi-v1-poster.jpg"
        }
      ],
      "review": "Nhân vật ngẩng mặt rồi mỉm cười đúng thứ tự, hai tay vẫn đặt trên bàn. Tuy nhiên, AI thêm làn hơi trắng khoảng giây thứ nhất và cho nhân vật nhìn về camera. Để biểu cảm nhẹ nhàng hơn, hãy bỏ yêu cầu “thở ra”, yêu cầu không có khói và giữ ánh mắt hướng vào đèn. Đây là video nhân vật AI, chưa phải ví dụ dùng video người thật hay Motion Control.",
      "settings": "OpenArt · Seedance 2.5 Draft · 480p · 5 giây · 1 take mỗi prompt · Audio On. Các clip gốc được giữ nguyên; bản dựng cuối bỏ âm thanh. Không có seed cố định nên đây là các lần thử, chưa đủ để xác định riêng từng yếu tố ảnh hưởng đến kết quả."
    },
    {
      "id": "lit-actor",
      "title": "Chuẩn bị frame phản ứng, giữ đèn đang sáng",
      "instruction": "Sau shot thắp đèn, shot phản ứng cũng phải có đèn sáng. Tạo frame này trước khi tạo video để tránh lỗi đèn tự tắt ở điểm cắt.",
      "promptVi": "Chỉnh ảnh đính kèm: người thợ vẫn nhìn xuống và giữ nguyên tư thế, hai tay, khuôn mặt, áo chàm và tạp dề. Chỉ thắp một ngọn lửa vàng hổ phách nhỏ ở bấc dưới đáy trong kính đèn và thêm phản sáng ấm rất nhẹ lên mặt, tạp dề và bàn. Đèn giữ nguyên hình dáng, quai và vị trí. Cửa sổ vẫn xanh chạng vạng, không đổi máy quay, không thêm khói, người hoặc chữ. Ảnh ngang như gốc.",
      "settings": "imagegen · chỉnh ảnh người thợ trong tiệm.",
      "inputs": [
        {
          "label": "Ảnh người thợ và đèn tắt",
          "src": "/api/workshop/examples/workshop-medium-vi-v1.png"
        }
      ],
      "outputs": [
        {
          "label": "Frame phản ứng đã thêm ánh đèn",
          "src": "/api/workshop/examples/workshop-lit-vi-v1.png",
          "kind": "image",
          "width": 1672,
          "height": 941
        }
      ],
      "review": "Ảnh giữ được khuôn mặt, vị trí hai tay và bố cục; ngọn lửa tạo thêm ánh vàng ấm phản chiếu nhẹ lên các bề mặt. Ảnh này được dùng làm đầu vào cho clip phản ứng đã chỉnh sửa bên dưới."
    },
    {
      "id": "reaction",
      "title": "Sửa diễn xuất — giữ ánh mắt và bỏ hơi trắng",
      "instruction": "So với lần trước: bỏ hành động thở ra, giữ mắt hướng về đèn và bắt đầu từ frame đèn đã sáng.",
      "promptVi": "Dùng ảnh đã tải làm start frame. Đèn đã sáng từ đầu và luôn sáng dịu. Một cảnh 5 giây, locked camera. Người thợ nhìn vào đèn, từ giây 1 đến 3 khóe miệng nâng thành nụ cười nhẹ, từ giây 3 đến 5 giữ nụ cười và nhìn xuống đèn. Đầu, thân và hai tay giữ nguyên vị trí. Không nhìn camera, không thở khói, không hơi trắng, không thêm hành động hay người. Giữ áo chàm, tạp dề, bàn và ánh cửa sổ xanh. Không lời thoại, không âm nhạc, không cắt cảnh.",
      "settings": "OpenArt · Seedance 2.5 Draft · 480p · 5 giây · 1 take mỗi prompt · Audio On. Các clip gốc được giữ nguyên; bản dựng cuối bỏ âm thanh. Không có seed cố định nên đây là các lần thử, chưa đủ để xác định riêng từng yếu tố ảnh hưởng đến kết quả.",
      "inputs": [
        {
          "label": "Start frame đúng — người thợ bên đèn sáng",
          "src": "/api/workshop/examples/workshop-lit-vi-v1.png"
        }
      ],
      "outputs": [
        {
          "label": "Take phản ứng đã sửa",
          "src": "/api/workshop/examples/reaction-vi-v1.mp4",
          "kind": "video",
          "width": 852,
          "height": 480,
          "poster": "/api/workshop/examples/reaction-vi-v1-poster.jpg"
        }
      ],
      "review": "Clip sau khi sửa giữ đúng nhân vật, chiếc đèn đang sáng và vị trí hai tay. Ánh mắt hướng xuống, không còn làn hơi trắng. Nụ cười rõ dần, dù đầu vẫn cử động nhẹ. Đây là clip được chọn cho bản dựng nháp đầu (v1); bản dựng mới dùng cận mặt reaction-close-vi-v2. Clip tạo nhầm nhân vật ở cấp độ 1 đã bị loại."
    }
  ],
  "delivery": [
    {
      "id": "storyboard",
      "title": "Từ kế hoạch hình ảnh đến bản dựng",
      "instruction": "Bốn phần của câu chuyện: chờ đợi → đèn sáng → người thợ phản ứng → cảnh chiếc đèn vẫn sáng. Storyboard giúp chọn những shot cần tạo trước khi dùng credit.",
      "promptVi": "Dùng ảnh người thợ trong tiệm làm mẫu nhân vật và không gian, ảnh đèn sáng làm mẫu đèn cuối phim. Tạo storyboard đen trắng bằng nét bút chì, 4 ô ngang xếp một hàng. Ô 1: medium shot người thợ nhìn đèn tắt, hai tay trên bàn. Ô 2: close-up chiếc đèn, ngọn lửa nhỏ bắt đầu sáng. Ô 3: close-up mặt người thợ, mắt ngẩng lên và mỉm cười nhẹ. Ô 4: chiếc đèn sáng trên bàn, không có người trong khung. Cùng áo chàm, tạp dề, cửa sổ bên trái. Đây là bản kế hoạch bố cục, không phải ảnh kết quả video. Không chữ, không logo.",
      "inputs": [
        {
          "label": "Ảnh người thợ trong tiệm",
          "src": "/api/workshop/examples/workshop-medium-vi-v1.png"
        },
        {
          "label": "Ảnh đèn sáng",
          "src": "/api/workshop/examples/lantern-lit-vi-v1.png"
        }
      ],
      "outputs": [
        {
          "label": "Storyboard bốn shot",
          "src": "/api/workshop/examples/storyboard-vi-v1.png",
          "kind": "image",
          "width": 2172,
          "height": 724
        }
      ],
      "review": "Bản dựng nháp đầu dùng trung cảnh thay cho cận mặt dự kiến; bản dựng mới đã tạo lại đúng cận mặt (reaction-close-vi-v2). Xem cả hai bản để đối chiếu kế hoạch hình ảnh với kết quả thực tế.",
      "settings": "imagegen · ảnh tham chiếu đính kèm theo thứ tự bên dưới. Sao chép nguyên prompt tiếng Việt để thử lại."
    },
    {
      "id": "hold",
      "title": "Shot kết — giữ đèn sáng xuyên suốt",
      "instruction": "Một shot ít chuyển động giúp người xem có thời gian cảm nhận phần kết. Gắn ảnh đèn đã sáng để tránh tạo thêm một lần bật đèn.",
      "promptVi": "Dùng ảnh đã tải làm start frame. Chiếc đèn đã sáng ngay từ đầu. Giữ camera đứng yên 5 giây, chỉ ngọn lửa nhỏ rung nhẹ tự nhiên và phản sáng ấm trên kính. Không tắt rồi thắp lại đèn, không thêm khói, không thay đồ vật, không có người, không cắt cảnh, không lời thoại, không nhạc.",
      "settings": "OpenArt · Seedance 2.5 Draft · 480p · 5 giây · 1 take mỗi prompt · Audio On. Các clip gốc được giữ nguyên; bản dựng cuối bỏ âm thanh. Không có seed cố định nên đây là các lần thử, chưa đủ để xác định riêng từng yếu tố ảnh hưởng đến kết quả.",
      "inputs": [
        {
          "label": "Start frame đèn sáng",
          "src": "/api/workshop/examples/lantern-lit-vi-v1.png"
        }
      ],
      "outputs": [
        {
          "label": "Shot kết 5 giây",
          "src": "/api/workshop/examples/lantern-hold-vi-v1.mp4",
          "kind": "video",
          "width": 852,
          "height": 480,
          "poster": "/api/workshop/examples/lantern-hold-vi-v1-poster.jpg"
        }
      ],
      "review": "Ngọn lửa dao động nhẹ, chiếc đèn sáng liên tục và khung hình gần như không thay đổi. Đoạn video này kết thúc bản nháp đầu (v1). Bản dựng mới dùng cảnh chèn có tay và tạp dề của người thợ."
    },
    {
      "id": "edit",
      "title": "Bản dựng nháp 20 giây — từ các take đã chọn",
      "instruction": "00:00–00:05: người thợ chờ bên đèn tắt. 00:05–00:10: đèn sáng. 00:10–00:15: người thợ mỉm cười. 00:15–00:20: chiếc đèn tiếp tục sáng. Tải bốn clip nguồn trong bài và xếp theo thứ tự này trong CapCut.",
      "settings": "Dựng từ 4 clip AI: camera-static-vi-v1 → endpoints-vi-v1 → reaction-vi-v1 → lantern-hold-vi-v1. Mỗi clip lấy 5 giây, hard cut, 852×480, 24 fps, H.264, bỏ audio. Đây là bản dựng hình để học nhịp; có thể bổ sung âm thanh sau.",
      "inputs": [{"label":"Shot 1 — chờ đợi","src":"/api/workshop/examples/camera-static-vi-v1.mp4"},{"label":"Shot 2 — thắp đèn","src":"/api/workshop/examples/endpoints-vi-v1.mp4"},{"label":"Shot 3 — phản ứng","src":"/api/workshop/examples/reaction-vi-v1.mp4"},{"label":"Shot 4 — hình kết","src":"/api/workshop/examples/lantern-hold-vi-v1.mp4"}],
      "outputs": [
        {
          "label": "Ngọn đèn cuối cùng — bản dựng hình 20 giây",
          "src": "/api/workshop/examples/last-lantern-edit-vi-v1.mp4",
          "kind": "video",
          "width": 852,
          "height": 480,
          "poster": "/api/workshop/examples/last-lantern-edit-vi-v1-poster.jpg"
        }
      ],
      "review": "So với storyboard, shot phản ứng trong phim dùng medium shot thay cho close-up dự kiến. Hãy kiểm tra độ sáng ngọn lửa tại hai điểm cắt, đồng thời chú ý người thợ không xuất hiện trong các shot chiếc đèn. Bản dựng này minh họa cách nối hình; các kỹ thuật giọng tham chiếu, lip-sync và VFX trên video người thật cần bài thử riêng."
    }
  ]
};
const english: Record<string, [string, string, string]> = {
  "text-video": [
    "Text-only video",
    "Watch the lantern design and room chosen without an image reference.",
    "The light comes on, but the model chose a different oil-lantern design. A material name alone does not lock a design."
  ],
  "image-video": [
    "Guide the video with a start frame",
    "Compare this image-guided take with the text-only take.",
    "The round handle, cylindrical glass and window are closer to the reference. The glow grows strong. These are different prompts and individual takes, not a controlled causal benchmark."
  ],
  "missing-reference": [
    "Missing character reference: a different person",
    "An upload failed and the previous lantern image remained attached. The word “repairer” did not carry identity over from earlier jobs.",
    "The model invented a different person. Check the attached thumbnail before generating. This is an input failure, not proof of identity loss with a correct reference."
  ],
  "composite": [
    "Combine character and setting",
    "Attach identity first, then the lantern and room reference. Use this composite as the shared starting point.",
    "Face, clothing and separated hands are recognizable. The person is behind the lantern rather than entirely to its left; revise if that placement is essential."
  ],
  "sizes": [
    "Five shot sizes",
    "Read left to right: extreme wide, wide, medium, close-up, extreme close-up.",
    "The sizes are distinct. Wider panels invent unseen space, so this is not proof of exact room continuity. Cropping outside a close-up’s subject is expected."
  ],
  "angles": [
    "Four camera angles",
    "Top left: eye-level. Top right: high angle. Bottom left: low angle. Bottom right: over-the-shoulder.",
    "The angles are recognizable, but the shoulder view rebuilds the window in front of the person. Map the room and repair this panel before using it for continuity."
  ],
  "relight": [
    "Change lighting, preserve composition",
    "Compare blue dusk with warm sunlight using the same source image.",
    "The light still comes from the left and the main features remain close. The exterior also changes to daytime; this is a time-of-day change, not merely color grading."
  ],
  "wardrobe": [
    "Change clothing, keep the character",
    "Edit the original blue-lit image, not the relit result.",
    "The shirt becomes olive and the face, pose and lantern stay close. The collar style also changes; explicitly lock it if only color may change."
  ],
  "static": [
    "A static-camera baseline",
    "Track the window and table edges as well as the face.",
    "The view is fairly stable, but the actor lowers his head despite the request for breathing only. Review action and camera independently."
  ],
  "dolly-first": [
    "Dolly-in take 1: spot the error",
    "A dolly-in moves the camera toward the subject; an actor leaning forward is not the same technique.",
    "This take fails the brief: the actor leans and the view drifts sideways. Do not present it as a correct dolly-in."
  ],
  "dolly-revision": [
    "Revise the instruction and inspect again",
    "Lock the pose and exclude sideways movement, keeping the same input and settings.",
    "The framing gets closer and the actor leans less, but lateral drift remains. This is still not a clean straight dolly. Try a camera preset or another take."
  ],
  "endpoints": [
    "Start/end frames: connect two states",
    "Attach the unlit image as Start and the lit image as End.",
    "The flame appears near the wick and the camera stays mostly still. The flame grows then settles; end frames constrain the destination, not every intervening moment."
  ],
  "sheet": [
    "Four reference roles",
    "Separate facial identity from clothing design; choose the panel needed for each shot.",
    "The profile shows one eye. The front clothing panel intentionally omits the head; the rear view retains it. Full-body clothing was invented from the portrait and must be approved."
  ],
  "acting": [
    "Direct performance with timed beats",
    "Look down, breathe out, look up, smile, hold. Specific beats are easier to evaluate than mood words.",
    "The actor follows the sequence and keeps his hands on the table. A white breath cloud appears around one second and the gaze meets the camera. This is an AI actor, not real footage or a Motion Control test."
  ],
  "lit-actor": [
    "Prepare continuity for the reaction shot",
    "The reaction needs a lit lantern after the ignition shot. Edit its start frame first.",
    "Face, hands and layout stay close while the wick and warm reflection are added. Use this image for the revised reaction."
  ],
  "reaction": [
    "Revise the performance and gaze",
    "Remove the exhale, keep the gaze on the lamp, and begin with a lit lantern.",
    "The revision retains the character, lit lantern, hands and downward gaze with no white breath cloud. The smile develops, though the head still moves slightly. This take was used in the original v1 rough cut; the new edit uses reaction-close-vi-v2."
  ],
  "storyboard": [
    "From storyboard to edit",
    "Four beats: waiting, ignition, reaction, ending. Plan compositions before spending video credits.",
    "The first rough cut used a medium shot instead of the planned close-up; the new edit regenerates the intended close-up (reaction-close-vi-v2). Compare both edits against the storyboard."
  ],
  "hold": [
    "An ending shot that stays lit",
    "Use an already-lit start frame to avoid another ignition.",
    "The flame flickers, the lantern stays lit and the view is nearly static. This is moving footage, not an extended still."
  ],
  "edit": [
    "A 20-second rough cut · diagnose continuity",
    "00:00–00:05 waiting; 00:05–00:10 ignition; 00:10–00:15 reaction; 00:15–00:20 lit lantern. Download the four source clips and assemble them in this order.",
    "Diagnostic assembly, not a continuity-approved film: shots 2 and 4 keep nearly the same view of the table as shot 1 but the repairer disappears. Use tighter inserts hiding his position, or regenerate with his hands/apron visible behind the lamp. The reaction is medium rather than the planned close-up, and no action explains the ignition. The silent edit does not demonstrate voice reference, lip-sync or live-action VFX."
  ]
};
export function fiveLevelVisualExamples(locale: 'vi' | 'en'): Partial<Record<PipelineId, WorkshopVisualExample[]>> {
  const localized = Object.fromEntries(Object.entries(examples).map(([id, items]) => [id, items.map(example => {
    if (example.id === 'edit') return {...example, title: 'Bản dựng nháp 20 giây · tìm lỗi nối cảnh', review: 'Bản mẫu chưa đạt continuity: shot 2 và 4 giữ gần cùng góc bàn và hậu cảnh của shot 1 nhưng người thợ biến mất. Dùng cảnh chèn cận đèn để không thấy chỗ anh đứng, hoặc tạo lại shot có tay/tạp dề phía sau. Phản ứng vẫn là trung cảnh thay vì cận mặt như storyboard, và chưa có hành động giải thích vì sao đèn sáng. Bản dựng không có âm thanh; chưa minh họa voice reference, lip-sync hay VFX trên người thật.'};
    if (example.id === 'missing-reference') return {...example, instruction: 'Lỗi ảnh đầu vào, không phải đối chứng text-to-video/image-to-video. ' + example.instruction};
    if (example.id === 'acting') return {...example, instruction: example.instruction + ' Mốc giây có thể hữu ích khi diễn xuất ít động tác. Với chuỗi hành động nhanh, hãy ưu tiên thứ tự và phản ứng; kiểm tra kết quả thay vì mặc định mốc thời gian luôn tốt hoặc luôn xấu.'};
    return example;
  })]));
  if (locale === 'vi') return Object.fromEntries(Object.entries(localized).map(([id, items]) => [id, [...items, ...regeneratedFiveLevelExamples(locale, id)]]));
  return Object.fromEntries(Object.entries(localized).map(([id, items]) => [id, [...items.map(example => {
    const [title, instruction, review] = english[example.id];
    return { ...example, title, instruction: instruction + (example.id === 'missing-reference' ? ' This is an input-error diagnosis, not a text/image comparison.' : example.id === 'acting' ? ' Timed beats can help a small performance; for fast action, prioritize order and response. Judge actual timing rather than treating timestamps as always good or bad.' : ''), review,
      settings: example.id === 'edit' ? 'Four 5-second AI clips: camera-static → endpoints → reaction → lantern-hold. Hard cuts, 852×480, 24 fps, H.264, audio removed.' : example.outputs.some(output => output.kind === 'video') ? 'OpenArt · Seedance 2.5 Draft · 480p · 5 seconds · one take per prompt · Audio On. Original downloads retained; the final edit removes audio. No fixed seed: these are individual trials, not a causal benchmark.' : 'imagegen · attach the input images in the order below. The exact tested Vietnamese prompt is preserved.',
      inputs: example.inputs.map((input, i) => ({ ...input, label: `Input ${i + 1}: ${input.src.split('/').pop()}` })),
      outputs: example.outputs.map((output, i) => ({ ...output, label: `${title}${example.outputs.length > 1 ? ` — ${i === 0 ? 'before' : 'after'}` : ''}` })),
    };
  }), ...regeneratedFiveLevelExamples(locale, id)]]));
}
