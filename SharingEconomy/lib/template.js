module.exports = {// myIP = "http://localhost:3000/location"
    HTML: (kakaoKey,myIP) => {
        return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Insert title here</title>
    <script type="text/javascript" src="${kakaoKey}"></script>
    <script src="http://code.jquery.com/jquery-1.11.0.js"></script>
    <script>
        $(function () {
            // Geolocation API에 액세스할 수 있는지를 확인
            if (navigator.geolocation) {
                //위치 정보를 정기적으로 얻기
                var id = navigator.geolocation.watchPosition(
                    function (pos) {
                        $('#latitude').html(pos.coords.latitude)    // 위도
                        $('#longitude').html(pos.coords.longitude) // 경도
                        console.dir(pos)
                        var mapContainer = document.getElementById('map'), // 지도를 표시할 div
                            mapOption = {
                                center: new daum.maps.LatLng(pos.coords.latitude, pos.coords.longitude), // 지도의 중심좌표
                                level: 3 // 지도의 확대 레벨
                            }

                        var map = new daum.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

                        // 마커가 표시될 위치입니다
                        var markerPosition = new daum.maps.LatLng(pos.coords.latitude, pos.coords.longitude)

                        // 마커를 생성합니다
                        var marker = new daum.maps.Marker({
                            position: markerPosition
                        })

                        // 마커가 지도 위에 표시되도록 설정합니다
                        marker.setMap(map)

                        // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
                        // marker.setMap(null);
                        // }
                        $(function () {
                            $.ajax({
                                    url: "${myIP}",
                                    dataType: 'json',
                                    type: 'POST',
                                    data: {
                                        'nowLocation': {'lat': pos.coords.latitude, 'lon': pos.coords.longitude}
                                    },
                                    success: function (result) {
                                        if (result['result'] == ture) {
                                            console.log(result)
                                        }
                                    }
                                }
                            )
                        })
                    })
                // 버튼 클릭으로 감시를 중지
                $('#btnStop').click(function () {
                    navigator.geolocation.clearWatch(id);
                })
            } else {
                alert("이 브라우저에서는 Geolocation이 지원되지 않습니다.")
            }
        })
    </script>
</head>
<body>
<div id="map" style="width:100%;height:1000px;"></div>
<ul>
    <li>위도:<span id="latitude"></span></li>
    <li>경도:<span id="longitude"></span></li>
</ul>
<input id="btnStop" type="button" value="감시를 끝낸다"/>
</body>
</html>
`
    }
}
