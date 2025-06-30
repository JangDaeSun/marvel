$(function() {
    let current = 1;
    let prefix = "img/gallery/";
    let suffix = ".jpg";

    function pad(num, size) {
        let s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }

    function checkImage(url, callback) {
        let img = new Image();
        img.onload = function() { callback(true); };
        img.onerror = function() { callback(false); };
        img.src = url;
    }

    function updateImage() {
        let next = current + 1;
        let nextUrl = prefix + pad(next, 3) + suffix;

        checkImage(nextUrl, function(exists) {
            if (exists) {
                current = next;
            } else {
                current = 1;
            }

            let newUrl = prefix + pad(current, 3) + suffix;

            // 뒷배경 img2에 다음 이미지 넣기
            $(".img2").attr("src", newUrl);

            // img1을 페이드아웃하고, 끝나면 img1에 새 이미지 덮어씌우기
            $(".img1").stop().fadeOut(1000, function() {
                // img1에 새로운 이미지로 교체
                $(this).attr("src", newUrl).show();
            });
        });
    }

    setInterval(updateImage, 3000);
});