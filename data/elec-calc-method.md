---
title: "電気設備計算アシスタント計算手法"
date: "2022-12-25"
---

ここでは計算の方法を紹介します。


# ケーブル設計計算

ケーブルの選定、電圧降下、電力損失を計算します。

有効電力を`P`, 線電流を`I`, 線間電圧(単相 3 線式の場合は中性線と電圧線間)を`V`, 力率を`consφ`とすると、

```javascript
// 単相2線
I = P / (V * cosφ)

// 単相3線
I = P / (2 * V * cosφ)

// 三相3線
I = P / (√3 * V * cosφ)
```

ケーブルサイズは流れる電流が許容電流より小さくなるサイズの最小値を選定します。
電圧降下と電力損失は選定されたケーブルの単位長あたりのインピーダンスとケーブル長さから抵抗値`R`を求めます。

このとき、ケーブルの電圧降下を`ΔV`, ケーブルの単位長インピーダンスを`r+jx`, ケーブルの長さを l とすると、

```javascript
// 単相2線
ΔV = 2 * I * l * (r * cosφ + x * sinφ)

// 単相3線
ΔV = I * l * (r * cosφ + x * sinφ)

// 三相3線
ΔV = √3 * I * l * (r * cosφ + x * sinφ)
```

また、ケーブルの電力損失`Pl`をとすると、

```javascript
// 単相2線 & 単相3線
Pl = (2 * I) ^ (2 * r * l);

// 三相3線
Pl = (3 * I) ^ (2 * r * l);
```

なお、単相 3 線負荷と三相 3 線負荷は平衡であることが条件です。

# 電線管設計

ケーブルのサイズに応じたケーブル断面積の和と各電線管の断面積を比較し、電線管の設計を行います。

電線管の設計は内線規定に基づき、占有率`32%`と`48%`の場合を計算します。
ただし、`FEP管`については規定がなく、`参考値`扱いとしているので、使用されるメーカーの仕様書に基づき、各自で計算してください。
なお、補正係数は使用しておりません。

各ケーブルの直径(外径)を`R`、断面積の総和を`Sa`、設計される電線管の断面積を`Sb`、円周率を`pi`とすると、

```javascript
// ケーブル断面積の和
Sa = Σ((R / 2) ^ (2 * pi));

// 占有率32%の場合の比較をしたときの断面積の関係式
Sa < Sb * 0.32;

// 占有率48%の場合の比較をしたときの断面積の関係式
Sa < Sb * 0.48;
```

`600V CVT`ケーブルを使用した場合は、それぞれ線心の外径から線心の断面積を算出し、**3 倍**するように計算しています。

`600V CVT`ケーブルの直径(外径)を`Rcvt`、断面積を`Scvt`、円周率を`pi`とすると、

```javascript
// 600V CVTの場合の断面積の計算式
Scvt = ((Rcvt / 2) ^ (2 * pi)) * 3;
```


# 電力計算

線間電圧、電流、力率から各電力を求めます。

線電流を`I`, 線間電圧(単相 3 線式の場合は中性線と電圧線間)を`V`, 力率を`consφ`, 皮相電力を`S`, 有効電力を`P`, 無効電力を`Q`とすると、

```javascript
// sinφ
sinφ = √(1 - (cosφ)^2)

// 単相2線
S = V * I
P = V * I * cosφ
Q = V * I * sinφ

// 単相3線
S = 2 * V * I
P = 2 * V * I * cosφ
Q = 2 * V * I * sinφ

// 三相3線
S = √3 * V * I
P = √3 * V * I * cosφ
Q = √3 * V * I * sinφ
```

なお、単相 3 線負荷と三相 3 線負荷は平衡であることが条件です。


# 需要率計算

需要率は全設備の合計の電気容量に対する実際に使用する設備の容量のことです。

```javascript
(需要率) = (最大需要電力) / (設備容量の合計)
```

また、負荷率はある期間中の需要電力の平均値と需要電力の最大の比です。

```javascript
(負荷率) = (平均需要電力) / (最大需要電力)
```

[参考サイト - 公益社団法人日本電気技術者協会](https://jeea.or.jp/course/contents/12144/)

# ケーブルのデータ

各ケーブルデータの条件について、以下にまとめます。

| 条件| 内容|
| :-- | :-- |
| ケーブル種類| `600V CV-2C`, `600V CV-3C`, `600V CVT`, `IV`, `CVV-2C`から`CVV-30C`, `CVVS-2C`から`CVVS-30C`, `6600V CV-3C`, `6600V CVT` |
| 周囲温度(`CV`, `CVT`)| `40℃` |
| 周囲温度(`IV`) | `30℃` |
| 周囲温度(`CVV`, `CVVS`)| `20℃` |
| 敷設条件(`CV`, `CVT`)| 気中暗渠敷設|
| 敷設条件(`IV`) | 同一管内に 3 本以下|
| 電流補正係数| なし|
| 電源周波数| `50Hz`|
| ケーブルインピーダンス温度 | `90℃` |

※CVV ケーブル、CVVS ケーブルのインピーダンスデータは無いため、導体抵抗のみを使用し、リアクタンスは 0 で計算しています。

ケーブルのデータは[参考サイト](#参考)から引用しています。

# 参考

- [JCMA, 技術資料](https://www.jcma2.jp/gijutsu/shiryou/index.html)
- [JCMA, JCS 規格](https://www.jcma2.jp/jcs/kikaku/index.html)
- [株式会社フジクラ・ダイヤケーブル, 技術資料](https://www.fujikura-dia.co.jp/tech/)
- [公益社団法人 日本電気技術者協会](https://jeea.or.jp/course/)
- [古河電気工業株式会社](https://www.furukawa.co.jp/)
- [パナソニック株式会社法人向け](https://www2.panasonic.biz/jp/)
- [住電 HST ケーブル株式会社, 製品情報](https://www.hst-cable.co.jp/products/)
