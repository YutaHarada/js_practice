'use strict';

// geolocation
function success(pos) {
    ajaxRequest(pos.coords.latitude, pos.coords.longitude);
}

function fail(error) {
    alert(`位置情報の取得に失敗しました。エラーコード${error.code}`);
}

navigator.geolocation.getCurrentPosition(success, fail)


// UTCをmsに変換 <- UTCは秒単位の値。Dateオブジェクトで引数として渡せるのはms単位の値か年月日時指定の値。
function utcToJSTime(utcTime) {
    return utcTime * 1000
}

// データ取得
function ajaxRequest(lat, lon) {
    const url = 'https://api.openweathermap.org/data/2.5/forecast';
    const appId = '4abfac5017c19d86b5500d0b9d56555b';
    // 対象urlに対してdataで設定した値をパラメータとして送信する。
    $.ajax({
        url: url,
        data: {
            appid: appId,
            lat: lat,
            lon: lon,
            units: 'metric',
            lang: 'ja'

        }
    })
    .done(function(data) {
        console.log(data);

        // 都市名、国名
        $('#place').text(`${data.city.name}, ${data.city.country}`);

        // 天気予報データ
        data.list.forEach(function(forecast, index){
            const dataTime = new Date(utcToJSTime(forecast.dt));
            const month = dataTime.getMonth() + 1;
            const date = dataTime.getDate();
            const hours = dataTime.getHours();
            const min = String(dataTime.getMinutes()).padStart(2, '0');
            const temp = Math.round(forecast.main.temp);
            const description = forecast.weather[0].description;
            const iconPath = `images/${forecast.weather[0].icon}.svg`

            // 現在の天気とそれ以外で出力を変える
            if(index === 0) {
                const currentWeather =`
                <div class="icon"><img src="${iconPath}"></div>
                <div class="info">
                    <p>
                        <span class="description">現在の天気：${description}<span>
                        <span class="temp">${temp}</span>℃
                    </p>
                </div>`;
                $('#weather').html(currentWeather);
            } else {
                const tableRow = `
                <tr>
                    <td class="info">
                        ${month}/${date} ${hours}:${min}
                    </td>
                    <td class="icon"><img src="${iconPath}"></td>
                    <td><span class="description">${description}</span></td>
                    <td><span class="temp">${temp}℃</span></td>
                </tr>`;
                $('#forecast').append(tableRow);
            }
        });
    })
    .fail(function() {
        console.lon('$.ajax failed;');
    })
  }