# リアルタイム天気ダッシュボード

![Weather Dashboard](https://img.shields.io/badge/Status-完成-br## ブラウザサポート

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🚀 デプロイ

このアプリケーションはGitHub Pagesでホストされています。自分のバージョンをデプロイするには：

1. このリポジトリをフォーク
2. `script.js`でAPIキーを設定
3. GitHub Pages設定でmainブランチを有効化

## 📸 スクリーンショット

### デスクトップ版
![Desktop View](https://via.placeholder.com/800x600/667eea/ffffff?text=Desktop+View)

### モバイル版
![Mobile View](https://via.placeholder.com/400x800/764ba2/ffffff?text=Mobile+View)

## 🛠️ 技術スタック

- **フロントエンド**: Vanilla JavaScript, HTML5, CSS3
- **API**: OpenWeatherMap API
- **デザイン**: CSS Grid, Flexbox, CSS Animations
- **フォント**: Inter (Google Fonts)
- **アイコン**: Font Awesome 6
- **ホスティング**: GitHub Pages

## 🔧 開発

### ローカル開発環境のセットアップ

```bash
# リポジトリをクローン
git clone https://github.com/yukikawakami1039/realtime-weather-dashboard.git

# ディレクトリに移動
cd realtime-weather-dashboard

# ローカルサーバーを起動（推奨）
python -m http.server 8000
# または
npx serve .
```

### APIキーの設定

1. [OpenWeatherMap](https://openweathermap.org/api)でAPIキーを取得
2. `script.js`の1行目を編集：

```javascript
const API_KEY = 'your-actual-api-key-here';
```

## 📝 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 👨‍💻 作成者

**Yuki Kawakami**
- GitHub: [@yukikawakami1039](https://github.com/yukikawakami1039)

## 🤝 コントリビューション

プルリクエストやイシューを歓迎します！改善提案がありましたらお気軽にご連絡ください。

---

⭐ このプロジェクトが気に入ったら、ぜひスターをお願いします！ ![JavaScript](https://img.shields.io/badge/Language-JavaScript-yellow) ![CSS3](https://img.shields.io/badge/Language-CSS3-blue) ![HTML5](https://img.shields.io/badge/Language-HTML5-orange)

OpenWeatherMap API を使用した美しく機能的な天気予報 Web アプリケーションです。

## 🌟 ライブデモ

**GitHub Pages**: [https://yukikawakami1039.github.io/realtime-weather-dashboard/](https://yukikawakami1039.github.io/realtime-weather-dashboard/)

> **注意**: デモを使用するには、自分のOpenWeatherMap APIキーを設定する必要があります。

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
