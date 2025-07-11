// 天気アプリのJavaScript
// APIキー（無料で取得）
const API_KEY = "dcb79bb4ccaa63805c631f90eaa1defb";
const API_URL = "https://api.openweathermap.org/data/2.5";

// DOM要素を取得
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const weatherContainer = document.getElementById("weatherContainer");

// 天気表示用の要素たち
const currentCity = document.getElementById("currentCity");
const currentDate = document.getElementById("currentDate");
const currentTemp = document.getElementById("currentTemp");
const currentIcon = document.getElementById("currentIcon");
const currentDescription = document.getElementById("currentDescription");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const pressure = document.getElementById("pressure");

// 予報表示用のコンテナ
const forecastContainer = document.getElementById("forecastContainer");

// イベントリスナー（クリックとEnterキー対応）
searchBtn.addEventListener("click", searchWeather);
cityInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    searchWeather(); // Enterでも検索できるように
  }
});

// 検索実行関数（メイン処理）
function searchWeather() {
  const city = cityInput.value.trim(); // 前後の空白を削除

  // 入力チェック
  if (!city) {
    showError("都市名を入力してください！");
    return;
  }

  // APIキーのチェック（念のため）
  if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
    showError("APIキーが設定されていません");
    return;
  }

  // 天気データを取得しに行く
  getWeatherData(city);
}

// 天気データ取得の関数（async/await使用、非同期処理）
async function getWeatherData(city) {
  try {
    showLoading(); // くるくる表示
    hideError(); // 前のエラーを消す

    // APIから現在の天気と予報を取得（同時実行で高速化）
    const currentWeather = await getCurrentWeather(city);
    const forecast = await getForecast(city);

    // 画面に表示
    showCurrentWeather(currentWeather);
    showForecast(forecast);
    showWeatherContainer();
  } catch (error) {
    console.log("エラー発生:", error); // コンソールで確認用
    showError("天気情報の取得に失敗しました😢");
  } finally {
    hideLoading(); // ローディング終了
  }
}

// 現在の天気を取得（fetch API使用）
async function getCurrentWeather(city) {
  const url = `${API_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ja`;

  const response = await fetch(url);

  // エラーハンドリング
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("その都市は見つかりませんでした");
    } else {
      throw new Error("天気データの取得に失敗しました");
    }
  }

  return await response.json();
}

// 予報データを取得
async function getForecast(city) {
  const url = `${API_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=ja`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("予報データの取得に失敗しました");
  }

  return await response.json();
}

// 現在の天気を表示する関数
function showCurrentWeather(data) {
  // 都市名と国を表示
  currentCity.textContent = data.name + ", " + data.sys.country;
  currentDate.textContent = getToday(); // 今日の日付を取得
  currentTemp.textContent = Math.round(data.main.temp); // 小数点以下切り捨て

  // 天気アイコンの設定
  currentIcon.src =
    "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
  currentIcon.alt = data.weather[0].description;

  currentDescription.textContent = data.weather[0].description;

  // 詳細情報を設定
  feelsLike.textContent = Math.round(data.main.feels_like) + "°C";
  humidity.textContent = data.main.humidity + "%";
  windSpeed.textContent = Math.round(data.wind.speed * 3.6) + " km/h"; // m/sからkm/hに計算
  pressure.textContent = data.main.pressure + " hPa";
}

// 3日間予報を表示（ちょっと複雑だったけど頑張りました）
function showForecast(data) {
  forecastContainer.innerHTML = ""; // 前の検索結果をクリア

  // 予報データから3日分を抽出
  const forecasts = [];
  const today = new Date().getDate();

  // まずは12時の予報を探す（正午のデータが一番正確らしい）
  for (let i = 0; i < data.list.length && forecasts.length < 3; i++) {
    const item = data.list[i];
    const date = new Date(item.dt * 1000);

    if (date.getDate() !== today && date.getHours() === 12) {
      forecasts.push(item);
    }
  }

  // 12時のデータがない場合は各日の最初のデータを使用
  if (forecasts.length < 3) {
    forecasts.length = 0; // リセット
    const usedDates = new Set([today]);

    for (let i = 0; i < data.list.length && forecasts.length < 3; i++) {
      const item = data.list[i];
      const date = new Date(item.dt * 1000).getDate();

      if (!usedDates.has(date)) {
        forecasts.push(item);
        usedDates.add(date);
      }
    }
  }

  // 予報カードを作成
  forecasts.forEach(function (forecast) {
    const card = makeForecastCard(forecast);
    forecastContainer.appendChild(card);
  });
}

// 予報カードを作る関数
function makeForecastCard(forecast) {
  const date = new Date(forecast.dt * 1000);
  const card = document.createElement("div");
  card.className = "forecast-item";

  // HTMLを組み立て（innerHTML）
  card.innerHTML = `
    <div class="forecast-date">${getForecastDate(date)}</div>
    <div class="forecast-weather">
      <img src="https://openweathermap.org/img/wn/${
        forecast.weather[0].icon
      }.png" alt="${forecast.weather[0].description}">
      <div class="forecast-temp">${Math.round(forecast.main.temp)}°C</div>
      <div class="forecast-desc">${forecast.weather[0].description}</div>
    </div>
    <div class="forecast-details">
      <span>湿度: ${forecast.main.humidity}%</span>
      <span>風速: ${Math.round(forecast.wind.speed * 3.6)} km/h</span>
    </div>
  `;

  return card;
}

// 今日の日付を取得（日本語表示）
function getToday() {
  const today = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };
  return today.toLocaleDateString("ja-JP", options);
}

// 予報の日付をフォーマット
function getForecastDate(date) {
  const options = {
    month: "short",
    day: "numeric",
    weekday: "short",
  };
  return date.toLocaleDateString("ja-JP", options);
}

// ローディング画面を表示
function showLoading() {
  loading.classList.remove("hidden");
  weatherContainer.classList.add("hidden");
}

// ローディング画面を隠す
function hideLoading() {
  loading.classList.add("hidden");
}

// エラーメッセージを表示
function showError(message) {
  error.textContent = message;
  error.classList.remove("hidden");
  weatherContainer.classList.add("hidden");
}

// エラーメッセージを隠す
function hideError() {
  error.classList.add("hidden");
}

// 天気コンテナを表示
function showWeatherContainer() {
  weatherContainer.classList.remove("hidden");
}

// ページが読み込まれた時の初期処理
document.addEventListener("DOMContentLoaded", function () {
  console.log("🌤️ お天気チェッカー起動しました！");
  console.log("作成者: Yuki | 大学課題作品");

  // デバッグ用（最初は東京の天気を表示してたけどコメントアウト）
  // cityInput.value = "Tokyo";
  // searchWeather();
});
