# リアルタイム天気ダッシュボード

OpenWeatherMap API を使用した美しく機能的な天気予報 Web アプリケーションです。

## 機能

- 都市名での天気検索
- 現在の天気情報表示（気温、湿度、風速、気圧など）
- 3 日間の天気予報
- レスポンシブデザイン
- スタイリッシュな UI/UX

## セットアップ

### 1. OpenWeatherMap API キーの取得

1. [OpenWeatherMap](https://openweathermap.org/api)にアクセス
2. 無料アカウントを作成
3. API キーを取得

### 2. API キーの設定

`script.js`ファイルの 1 行目で API キーを設定してください：

```javascript
const API_KEY = "YOUR_API_KEY_HERE"; // ここに取得したAPIキーを入力
```

### 3. アプリケーションの起動

1. `index.html`を Web ブラウザで開く
2. 都市名を入力して検索

## ファイル構成

```
class_assignment/
├── index.html      # メインHTMLファイル
├── styles.css      # スタイルシート
├── script.js       # JavaScript機能
├── README.md       # このファイル
└── 仕様書.ini      # プロジェクト仕様書
```

## 技術仕様

- **言語**: HTML5, CSS3, JavaScript (ES6+)
- **API**: OpenWeatherMap API
- **デザイン**: レスポンシブ Web デザイン
- **フォント**: Inter (Google Fonts)
- **アイコン**: Font Awesome

## 主要機能

### 現在の天気

- 気温（体感温度を含む）
- 天気アイコンと説明
- 湿度
- 風速
- 気圧

### 3 日間予報

- 日付別の天気予報
- 気温と天気アイコン
- 湿度と風速

### UI/UX 特徴

- グラデーション背景
- ガラスモーフィズムデザイン
- スムーズなアニメーション
- モバイルフレンドリー

## ブラウザサポート

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。
