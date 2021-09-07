var height = document.getElementById('height');
var weight = document.getElementById('weight');
var btn = document.querySelector('.btn');
var list = document.querySelector('.list');
var delAllBtn = document.querySelector('.delAllBtn');
var repeat = document.querySelector('.fas.fa-sync-alt');
var data = JSON.parse(localStorage.getItem('listData')) || [];

var ChangeNum = 0;








// 執行BMI數值計算
btn.addEventListener('click',BMINum);
// 執行刪除所有紀錄
delAllBtn.addEventListener('click',delAll);

// 刪除List 按鈕
list.addEventListener('click',delList);

// 重新開始的按鈕
repeat.addEventListener('click',btnChange);


updataList();



// BMI數值計算
function BMINum(e) {
    e.preventDefault();
    var heightBMI = Math.pow(height.value,2) / 10000;
    var weightBMI = weight.value;
    var BMI = (weightBMI / heightBMI).toFixed(2);

    if (height.value == ''||weight.value == ''||height.value == 0||weight.value == 0) {
        alert('請輸入正確數值，數值不可為 0 。');
        return;
    }

    // 執行獲取時間
    NowTime();

    // 獲得的資料 動態改變文字 用變數帶function 讓程式碼簡潔一點
    function addHTML(add) {
        document.querySelector('.open-btn-border').className = 'open-btn-border '+add+'-btn';
        document.querySelector('.open-btn').className = 'open-btn '+add+'-bg';
        document.querySelector('.state').className = 'state '+add+'-text';
        document.querySelector('.BMI').className = 'BMI '+add+'-text';
        document.querySelector('.BMI-text').className = 'BMI-text '+add+'-text';
        document.querySelector('.state').innerHTML = state;
        document.querySelector('.BMI').innerHTML = BMI;
    }


    // 判斷來取得 state 資料
    if (BMI < 15) {
        var state = "嚴重消瘦"
        addHTML('blue');
    }else if (BMI >= 15 && BMI < 16) {
        var state = "中度消瘦"
        addHTML('blue');
    }else if (BMI >= 16 && BMI < 18.5) {
        var state = "輕度消瘦"
        addHTML('blue');
    }else if (BMI >= 18.5 && BMI < 25) {
        var state = "體重正常"
        addHTML('green');
    }else if (BMI >= 25 && BMI < 30) {
        var state = "輕度肥胖"
        addHTML('orange');
    }else if (BMI >= 30 && BMI < 35) {
        var state = "中度肥胖"
        addHTML('orange2');
    }else if (BMI >= 35 && BMI < 40) {
        var state = "高度肥胖"
        addHTML('orange2');
    }else if (BMI >= 40) {
        var state = "嚴重肥胖"
        addHTML('red');
    }

    // 總和資料
    var total = {
        "state" : state,
        "BMI" : BMI,
        "height" : height.value,
        "weight" : weight.value,
        "date" : NowTime(),
    }
    
    // 獲取的資料列表 新增到data後 使用JSON.stringify 轉入localStorage
    data.push(total);

    updataList();

    localStorage.setItem('listData',JSON.stringify(data));


    // 顯示出運算後的按鈕
    btnChange();


}

// 更新LI內的資訊
function updataList(e) {
    var str = '';
    var len = data.length;
    for (var i = 0; i < len; i++) {
        if (data[i].BMI < 18.5) {
            str += '<li class="blue-border"><p class="state">' + data[i].state + '</p><p><span class="font-s">BMI</span>' + data[i].BMI + '</p><p><span class="font-s">weight</span>' + data[i].weight + '</p><p><span class="font-s">height</span>' + data[i].height + '</p><p class="date"><span class="font-s">' + data[i].date + '</span></p><a data-num="' + i +'" href="#" class="fas fa-times"></a></li>';
        }else if (data[i].BMI >= 18.5 && data[i].BMI < 25 ) {
            str += '<li class="green-border"><p class="state">' + data[i].state + '</p><p><span class="font-s">BMI</span>' + data[i].BMI + '</p><p><span class="font-s">weight</span>' + data[i].weight + '</p><p><span class="font-s">height</span>' + data[i].height + '</p><p class="date"><span class="font-s">' + data[i].date + '</span></p><a data-num="' + i +'" href="#" class="fas fa-times"></a></li>';
        }else if (data[i].BMI >= 25 && data[i].BMI < 30 ) {
            str += '<li class="orange-border"><p class="state">' + data[i].state + '</p><p><span class="font-s">BMI</span>' + data[i].BMI + '</p><p><span class="font-s">weight</span>' + data[i].weight + '</p><p><span class="font-s">height</span>' + data[i].height + '</p><p class="date"><span class="font-s">' + data[i].date + '</span></p><a data-num="' + i +'" href="#" class="fas fa-times"></a></li>';
        }else if (data[i].BMI >= 30 && data[i].BMI < 40 ) {
            str += '<li class="orange2-border"><p class="state">' + data[i].state + '</p><p><span class="font-s">BMI</span>' + data[i].BMI + '</p><p><span class="font-s">weight</span>' + data[i].weight + '</p><p><span class="font-s">height</span>' + data[i].height + '</p><p class="date"><span class="font-s">' + data[i].date + '</span></p><a data-num="' + i +'" href="#" class="fas fa-times"></a></li>';
        }else if (data[i].BMI > 40) {
            str += '<li class="red-border"><p class="state">' + data[i].state + '</p><p><span class="font-s">BMI</span>' + data[i].BMI + '</p><p><span class="font-s">weight</span>' + data[i].weight + '</p><p><span class="font-s">height</span>' + data[i].height + '</p><p class="date"><span class="font-s">' + data[i].date + '</span></p><a data-num="' + i +'" href="#" class="fas fa-times"></a></li>';
        }
    }
    list.innerHTML = str;
}


// 獲得時間函式
function NowTime() {
    //先創建一個Date實體
    var time = new Date();
    //獲取當前時間(取得的值為一個毫秒数值)
    var theTime = time.getTime(); //1558492972644
    //獲得格式
    var timeDetails = {
        year: time.getFullYear(),
        month: time.getMonth() + 1,
        date: time.getDate(),
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds(),
    };
    var datetotal = time.toLocaleDateString();

    return datetotal;
}

// 刪除所有 localStorage 紀錄
function delAll(e) {
    e.preventDefault();
    data = [];
    updataList();
    localStorage.setItem('listData',JSON.stringify(data));
}

// 刪除單個List內的資料
function delList(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'A') {
        return;
    };
    data.splice(e.target.dataset.num,1);
    updataList(data);
    localStorage.setItem('listData',JSON.stringify(data));
}


// 交替顯示按鈕
function btnChange() {
    if (ChangeNum == 0) {
        document.querySelector('.btn').style.display = 'none';
        document.querySelector('.open-btn-border').style.display = 'block';
        document.querySelector('.state').style.opacity = '1';
        ChangeNum = 1;
        height.value = '';
        weight.value = '';
    }else if (ChangeNum == 1) {
        document.querySelector('.state').style.opacity = '0';
        document.querySelector('.open-btn-border').style.display = 'none';
        document.querySelector('.btn').style.display = 'block';
        
        ChangeNum = 0;
    }

}