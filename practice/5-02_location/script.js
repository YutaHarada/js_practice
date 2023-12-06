'use strict';

// querySelector(): ()内に書かれた「セレクタ」にマッチする要素を取得する。
// querySelectorメソッドでは()内の条件にマッチする要素が複数存在した場合、最初の要素のみを取得する。
// 以下の場合はタイプ(タグ)セレクタを用いている。(htmlタグ)
const lang = document.querySelector('html').lang;

if(lang === 'ja') {
    // 以下の場合はタイプセレクタと属性セレクタを用いている。(optionタグのvalue属性が"index.html"のもの)
    // seletted = true とすることで<option value=~ selected>と同等の意味となる。
    document.querySelector('option[value="index.html"]').selected = true;
} else if(lang === 'en') {
    document.querySelector('option[value="index-en.html"]').selected = true;
} else if(lang === 'zh') {
    document.querySelector('option[value="index-zh.html"]').selected = true;
}

// switch文を用いてif文を以下のように書き換えられる。
/*
switch(lang) {
    case 'ja':
        document.querySelector('option[value="index.html"]').selected = true;
        break;
    case 'en':
        document.querySelector('option[value="index-en.html"]').selected = true;
        break;
    case 'zh':
        document.querySelector('option[value="index-zh.html"]').selected = true;
        break;
}
*/


// onchange: フォームに入力された内容が変わった時に発生するイベント
//  form要素内のname属性がselectの要素
document.getElementById('form').select.onchange = function() {
    // locationオブジェクトのhrefプロパティ：表示しているページのURLを表す。
    location.href = document.getElementById('form').select.value;
}

/*
↓ イベントが発生したタイミングで処理を実行させたい時のテンプレート
""""
取得した要素.イベント(onsubmit, onchange, etc...) = function() {
    処理内容
}
""""
*/