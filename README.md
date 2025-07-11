# お天気チェッカー

大学のプログラミングの授業で作った天気予報の Web サイト。
OpenWeatherMap の API を使って天気を調べることができる。

## 見てみる

https://yukikawakami1039.github.io/realtime-weather-dashboard/

※API キーを自分で設定しないと動きません

## できること

- 都市名を入力すると天気がわかる
- 今の気温や湿度などが見れる
- 3 日間の予報も表示される
- スマホでも見れる

## 使い方

1. OpenWeatherMap でアカウントを作って API キーをもらう
2. script.js の最初の部分に API キーを書く
3. index.html をブラウザで開く
4. 都市名を入れて検索ボタンを押す

## ファイルについて

- index.html → メインのページ
- styles.css → 見た目の設定
- script.js → 動作の部分（JavaScript）
- README.md → このファイル

## 使った技術

- HTML
- CSS
- JavaScript
- OpenWeatherMap API

## 頑張ったところ

- 検索中はくるくる回るローディングを表示
- エラーが出たときもちゃんとメッセージを出す

## 大変だったところ

- API の使い方を覚えるのが難しかった
- async/await の書き方難しかった
- 3 日分の予報を取り出すのに苦労した
- CSS でレイアウトを整えるのにかなり時間がかかった

## 参考にしたサイト

- MDN のドキュメント
- OpenWeatherMap の使い方説明
- 授業のサンプルコード
- YouTube の解説動画

## 今度やりたいこと

- もっと詳しい天気情報を表示したい
- 地図も表示したい
- よく調べる都市を保存できるようにしたい
- 1 時間ごとの天気も見れるようにしたい

## 動く環境

普通のブラウザ（Chrome、Firefox、Safari、Edge）
スマホのブラウザでも大丈夫

---
