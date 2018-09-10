# Line Hack

## Line saying 一個更方便的演講/會議/教學平台

 你是否在聽演講時，想要給聽眾資料，卻無奈得事先印一堆紙本，無法及時發送
 
 你是否在開會議時，有想記錄的資訊，卻得事後跟大家要PTT，無法現場紀錄
 
 你是否在聽課程時，有想發表的問題，卻因旁人眼光，不敢發表
 
 Line saying將提供你一個更方便直覺的方式，讓你可以輕易地傳達資訊，也可輕易的紀錄資訊
 
簡報連結：[點此](https://www.slideshare.net/superj80820/line-hack-line-saying)


## 使用系統

### 加入Line saying

[https://line.me/R/ti/p/8KFqEyouiF](https://line.me/R/ti/p/8KFqEyouiF)

![alt tag](https://i.imgur.com/lSUSmnQ.png)

![alt tag](https://i.imgur.com/83N9KH4.jpg?4)

### 網路分享平台

平台網頁 [https://messfar.com/line_saying](https://messfar.com/line_saying)

![alt tag](https://i.imgur.com/fXWw90y.png?1)

---

## 功能與流程(演講方)

**創建演講/會議/教學**

![alt tag](https://i.imgur.com/aqvwXsP.jpg)
1. 在line bot上點選"開啟會議"，即可對網路平台開啟會議
2. 獲得meeting代碼後，即可在網路平台輸入，並且填寫會議名稱、細節、演講PTT SlideShare網頁(也可透過上傳達成)
3. 驗證成功後，我們可以獲得白板連結，即可將手機當作繪圖板，下方會有更詳細說明

**平台功能介紹**

![alt tag](https://i.imgur.com/u4yIyB6.jpg)
* 平台上方可以發送訊息/圖片到聽眾端，讓每個使用者可及時獲得資訊
* 平台右下方可以講解上傳的PTT，並且可透過左下方的白板來進行繪畫講解
* 為了改善電腦上不方便繪圖的問題，Line saying將手機與網路平台的白板結合，可將手機變成繪圖板，將手機即時繪圖傳到網路平台 

### 功能與流程(聽眾方)

**透過演講代碼\Beacon即可加入此演講/會議/教學**

![alt tag](https://i.imgur.com/VX7YBc7.jpg)

![alt tag](https://i.imgur.com/HxQc995.jpg)
* 聽眾可對line saying輸入顯示在網路平台上方的邀請碼加入平台，或者透過Beacon加入
* 可以選擇是否要公開姓名，以確保聽眾隱私
* 聽眾加入成功後即可獲得演講/會議/教學的所有資料，以方便與演講者溝通，並且也可自行記錄筆記

**可透過Line saying即時留訊息/圖片**

![alt tag](https://i.imgur.com/9USM3Yi.jpg)
1. 聽眾只需在訊息前加入"?"，即可將留言傳送到平台
2. 如果這則留要要附加圖片，聽眾只要直接將圖片傳入line saying即可，聽眾也可使用line原生繪圖功能，將圖片的重點標註
3. 網路平台可利用留言清單顯示聽眾留言，演講方就可以即時展示聽眾的問題
4. 上方的白板與圖片會因為點選不同留言而改變，讓演講者可以直接對訊息/圖片講解

**快速的投票與展示**

![alt tag](https://i.imgur.com/Axk3Xvd.jpg)
![alt tag](https://i.imgur.com/WKRrtSh.jpg)
1. 演講方可在網路平台上開啟投票
2. 聽眾方接收到投票訊息後點選，網路平台即可收到票
3. 透過網路平台，我們可以更快展示投票的結果，並且也可以讓所有投票的聽眾保有自己的隱私，匿名的投票

## API

```php=
驗證演講/會議/教學代碼

curl --request POST \
  --url https://messfar.com/line_saying_api/create_meet \
  --header 'Content-Type: application/json' \
  --data '{"meet_name":"{會議名稱}",
	"web_id":"{會議ID}",
	"slide_link":"{slideshare_link}",
	"detail":"{會議細節}"
}'
```

```php=
演講方向聽眾方傳送訊息/圖片

curl --request POST \
  --url https://messfar.com/line_saying_api/say \
  --header 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
  --form meet_id={會議ID} \
  --form say={傳送訊息} \
  --form image={傳送圖片}
```

```php=
演講方向聽眾方傳送投票

curl --request POST \
  --url https://messfar.com/line_saying_api/vote \
  --header 'Content-Type: application/json' \
  --data '{"meet_id":"{會議ID}",
	"vote_data":{
  "type": "template",
  "altText": "this is a buttons template",
  "template": {
    "type": "buttons",
    "actions": [
      {
        "type": "postback",
        "label": "{項目1}",
        "data": "{'\''type'\'':'\''vote'\'','\''index'\'':'\''1'\'','\''label'\'':'\''動作1'\''}"
      },
      {
        "type": "postback",
        "label": "{項目2}",
        "data": "{'\''type'\'':'\''vote'\'','\''index'\'':'\''2'\'','\''label'\'':'\''動作2'\''}"
      },
      {
        "type": "postback",
        "label": "{項目3}",
        "data": "{'\''type'\'':'\''vote'\'','\''index'\'':'\''3'\'','\''label'\'':'\''動作3'\''}"
      }
    ],
    "thumbnailImageUrl": "https://us.123rf.com/450wm/jovanas/jovanas1610/jovanas161000347/63582975-presentation-vector-icon-with-long-shadow.jpg?ver=6",
    "title": "{投票名稱}",
    "text": "{投票細節}"
  }
}
}'
```

```php=
取得演講/會議/教學資料

curl --request GET \
  --url 'https://messfar.com/line_saying_api/meet_info?meet_id={會議ID}'
```

```php=
取得演講/會議/教學的留言

curl --request GET \
  --url 'https://messfar.com/line_saying_api/user_say?meet_id={會議ID}'
```

```php=
取得演講/會議/教學的投票

curl --request GET \
  --url 'https://messfar.com/line_saying_api/vote?meet_id={會議ID}'
```

## Reference