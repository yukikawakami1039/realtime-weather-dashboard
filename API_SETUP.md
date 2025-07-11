# OpenWeatherMap API 設定ガイド

このファイルには、OpenWeatherMap API キーの取得と設定方法が記載されています。

## API キー取得手順

1. **OpenWeatherMap アカウント作成**

   - https://openweathermap.org/ にアクセス
   - 「Sign Up」をクリックして無料アカウントを作成

2. **API キー生成**

   - ログイン後、「API keys」タブに移動
   - デフォルトの API キーが表示されます
   - 必要に応じて新しいキーを生成できます

3. **API キー設定**
   - `script.js`ファイルを開く
   - 1 行目の`YOUR_API_KEY_HERE`を実際の API キーに置き換える

```javascript
// 例
const API_KEY = "abcd1234567890abcd1234567890abcd";
```

## 注意事項

- API キーは秘密情報です。公開リポジトリにコミットしないでください
- 無料プランでは 1 分間に 60 回、1 ヶ月に 100 万回の API 呼び出し制限があります
- API キーが有効になるまで数時間かかる場合があります

## 使用する API エンドポイント

1. **現在の天気**: `/weather`
2. **5 日間予報**: `/forecast` (3 日分を抽出)

詳細な API ドキュメント: https://openweathermap.org/api
