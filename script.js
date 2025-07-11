// OpenWeatherMap API設定
const API_KEY = "dcb79bb4ccaa63805c631f90eaa1defb"; // OpenWeatherMap APIキーをここに入力してください
const API_BASE_URL = "https://api.openweathermap.org/data/2.5";

// DOM要素の取得
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const weatherContainer = document.getElementById("weatherContainer");

// 現在の天気要素
const currentCity = document.getElementById("currentCity");
const currentDate = document.getElementById("currentDate");
const currentTemp = document.getElementById("currentTemp");
const currentIcon = document.getElementById("currentIcon");
const currentDescription = document.getElementById("currentDescription");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const pressure = document.getElementById("pressure");

// 予報コンテナ
const forecastContainer = document.getElementById("forecastContainer");

// イベントリスナー
searchBtn.addEventListener("click", handleSearch);
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleSearch();
  }
});

// 検索処理
async function handleSearch() {
  const city = cityInput.value.trim();

  if (!city) {
    showError("都市名を入力してください");
    return;
  }

  if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
    showError(
      "APIキーが設定されていません。script.jsファイルでAPI_KEYを設定してください。"
    );
    return;
  }

  try {
    showLoading();
    hideError();

    const [currentWeather, forecast] = await Promise.all([
      getCurrentWeather(city),
      getForecast(city),
    ]);

    displayCurrentWeather(currentWeather);
    displayForecast(forecast);
    showWeatherContainer();
  } catch (err) {
    console.error("天気情報の取得に失敗しました:", err);
    showError(err.message || "天気情報の取得に失敗しました");
  } finally {
    hideLoading();
  }
}

// 現在の天気を取得
async function getCurrentWeather(city) {
  const response = await fetch(
    `${API_BASE_URL}/weather?q=${encodeURIComponent(
      city
    )}&appid=${API_KEY}&units=metric&lang=ja`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("指定された都市が見つかりませんでした");
    } else if (response.status === 401) {
      throw new Error("APIキーが無効です");
    } else {
      throw new Error("天気情報の取得に失敗しました");
    }
  }

  return await response.json();
}

// 予報を取得
async function getForecast(city) {
  const response = await fetch(
    `${API_BASE_URL}/forecast?q=${encodeURIComponent(
      city
    )}&appid=${API_KEY}&units=metric&lang=ja`
  );

  if (!response.ok) {
    throw new Error("予報情報の取得に失敗しました");
  }

  return await response.json();
}

// 現在の天気を表示
function displayCurrentWeather(data) {
  currentCity.textContent = `${data.name}, ${data.sys.country}`;
  currentDate.textContent = formatDate(new Date());
  currentTemp.textContent = Math.round(data.main.temp);
  currentIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  currentIcon.alt = data.weather[0].description;
  currentDescription.textContent = data.weather[0].description;
  feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
  humidity.textContent = `${data.main.humidity}%`;
  windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
  pressure.textContent = `${data.main.pressure} hPa`;
}

// 予報を表示
function displayForecast(data) {
  forecastContainer.innerHTML = "";

  // 3日分の予報を取得（24時間ごと）
  const dailyForecasts = [];
  const today = new Date().getDate();

  for (let i = 0; i < data.list.length && dailyForecasts.length < 3; i++) {
    const forecast = data.list[i];
    const forecastDate = new Date(forecast.dt * 1000);

    // 今日以降の12:00の予報を取得
    if (forecastDate.getDate() !== today && forecastDate.getHours() === 12) {
      dailyForecasts.push(forecast);
    }
  }

  // 12:00の予報がない場合は、各日の最初の予報を使用
  if (dailyForecasts.length < 3) {
    dailyForecasts.length = 0;
    const usedDates = new Set([today]);

    for (let i = 0; i < data.list.length && dailyForecasts.length < 3; i++) {
      const forecast = data.list[i];
      const forecastDate = new Date(forecast.dt * 1000).getDate();

      if (!usedDates.has(forecastDate)) {
        dailyForecasts.push(forecast);
        usedDates.add(forecastDate);
      }
    }
  }

  dailyForecasts.forEach((forecast) => {
    const forecastItem = createForecastItem(forecast);
    forecastContainer.appendChild(forecastItem);
  });
}

// 予報アイテムを作成
function createForecastItem(forecast) {
  const date = new Date(forecast.dt * 1000);
  const item = document.createElement("div");
  item.className = "forecast-item";

  item.innerHTML = `
        <div class="forecast-date">${formatForecastDate(date)}</div>
        <div class="forecast-weather">
            <img src="https://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }.png" 
                 alt="${forecast.weather[0].description}">
            <div class="forecast-temp">${Math.round(forecast.main.temp)}°C</div>
            <div class="forecast-desc">${forecast.weather[0].description}</div>
        </div>
        <div class="forecast-details">
            <span>湿度: ${forecast.main.humidity}%</span>
            <span>風速: ${Math.round(forecast.wind.speed * 3.6)} km/h</span>
        </div>
    `;

  return item;
}

// 日付をフォーマット
function formatDate(date) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };
  return date.toLocaleDateString("ja-JP", options);
}

// 予報日付をフォーマット
function formatForecastDate(date) {
  const options = {
    month: "short",
    day: "numeric",
    weekday: "short",
  };
  return date.toLocaleDateString("ja-JP", options);
}

// ローディング表示
function showLoading() {
  loading.classList.remove("hidden");
  weatherContainer.classList.add("hidden");
}

// ローディング非表示
function hideLoading() {
  loading.classList.add("hidden");
}

// エラー表示
function showError(message) {
  error.textContent = message;
  error.classList.remove("hidden");
  weatherContainer.classList.add("hidden");
}

// エラー非表示
function hideError() {
  error.classList.add("hidden");
}

// 天気コンテナ表示
function showWeatherContainer() {
  weatherContainer.classList.remove("hidden");
}

// 初期化
document.addEventListener("DOMContentLoaded", () => {
  console.log("天気ダッシュボードが初期化されました");
  console.log(
    "OpenWeatherMap APIキーを設定してください: https://openweathermap.org/api"
  );
});
