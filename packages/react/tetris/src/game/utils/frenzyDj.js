let _djState = false;

const bgms = [
  "1883578679",
  "407759835",
  "1473214690",
  "1806679514",
  "1861359883",
  "1423614111",
  "1370877684",
  "1382460597",
  "441612739",
  "1469528509",
  "1465439543",
  "1852267527",
  //
  "1436490143",
  "1489366510",
  "1418852960",
  "1431880021",
  "1452418823",
  "1449990499",
  "1376994010",
  "1441897090",
  "1851646587",
  "1849656584",
];

function randomGetBgm() {
  return `http://music.163.com/song/media/outer/url?id=${
    bgms[Math.floor(Math.random() * bgms.length)]
  }.mp3`;
}
//http://music.163.com/song/media/outer/url?id=1391479812.mp3
//https://nd002723.github.io/carnival/audio/Martin%20Jensen%20-%20Fox%20(Loop%20Remix).mp3
// var bgmSrc = "http://music.163.com/song/media/outer/url?id=1883578679.mp3";
var cssHref = "https://nd002723.github.io/carnival/css/high.css";
function letDance() {
  function loadCss() {
    //将css文件引入页面
    var myCss = document.createElement("link");
    myCss.setAttribute("type", "text/css");
    myCss.setAttribute("rel", "stylesheet");
    myCss.setAttribute("href", cssHref); //css文件地址
    myCss.setAttribute("class", l);
    document.body.appendChild(myCss);
  }

  function h() {
    var e = document.getElementsByClassName(l);
    for (var t = 0; t < e.length; t++) {
      document.body.removeChild(e[t]);
    }
  }

  function p() {
    var e = document.createElement("div");
    e.setAttribute("class", a);
    document.body.appendChild(e);
    setTimeout(function () {
      document.body.removeChild(e);
    }, 100);
  }

  function getSize(e) {
    //获取目标的宽高
    return {
      height: e.offsetHeight,
      width: e.offsetWidth,
    };
  }

  function checkSize(i) {
    //判断目标大小是否符合要求
    var s = getSize(i); //获取目标的宽高
    return (
      s.height > minHeight &&
      s.height < maxHeight &&
      s.width > minWidth &&
      s.width < maxWidth
    ); //判断目标是否符合条件
  }

  function m(e) {
    var t = e;
    var n = 0;
    while (!!t) {
      n += t.offsetTop;
      t = t.offsetParent;
    }
    return n;
  }

  function g() {
    var e = document.documentElement;
    if (!!window.innerWidth) {
      return window.innerHeight;
    } else if (e && !isNaN(e.clientHeight)) {
      return e.clientHeight;
    }
    return 0;
  }

  function y() {
    if (window.pageYOffset) {
      return window.pageYOffset;
    }
    return Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
  }

  function E(e) {
    var t = m(e);
    return t >= w && t <= b + w;
  }

  function setBgm() {
    //设置音乐
    var e = document.createElement("audio");
    e.setAttribute("class", l);
    e.src = randomGetBgm(); //bgm地址
    e.loop = false;
    e.addEventListener(
      "canplay",
      function () {
        let _index=0;
        let _preStage = setInterval(() => {
          if(_index === preNodes.length){
            clearInterval(_preStage);
            return;
          }
          x(preNodes[_index]);
          _index++;
        },500);
        /* //第一行代码
        setTimeout(function () {
          x(k);
        }, 500); */
        setTimeout(function () {
          if(_preStage) clearInterval(_preStage);
          N();
          p();
          for (var e = 0; e < O.length; e++) {
            T(O[e]);
          }
        }, 15500);
      },
      true
    );
    e.addEventListener(
      "ended",
      function () {
        _djState = false;
        //结束
        N();
        h();
      },
      true
    );
    e.innerHTML =
      " <p>If you are reading this, it is because your browser does not support the audio element. We recommend that you get a new browser.</p> <p>";
    document.body.appendChild(e);
    e.play();
  }

  function x(e) {
    e.className += " " + s + " " + o;
  }

  function T(e) {
    e.className += " " + s + " " + u[Math.floor(Math.random() * u.length)];
  }

  function N() {
    var e = document.getElementsByClassName(s);
    var t = new RegExp("\\b" + s + "\\b");
    for (var n = 0; n < e.length; ) {
      e[n].className = e[n].className.replace(t, "");
    }
  }
  var minHeight = 3; //最小高度
  var minWidth = 3; //最小宽度
  var maxHeight = 800; //最大高度
  var maxWidth = 1400; //最大宽度
  var s = "mw-harlem_shake_me";
  var o = "im_first";
  var u = ["im_drunk", "im_baked", "im_trippin", "im_blown"];
  var a = "mw-strobe_light";
  var l = "mw_added_css"; //最终要移除的css
  var b = g();
  var w = y();
  // var C = document.getElementsByTagName("*");
  var C = document.querySelectorAll(".gameWindow *");
  const preNodes = document.querySelectorAll(".gameWindow .row");
  var k = null;
  for (var L = 0; L < C.length; L++) {
    var targetDiv = C[L];
    if (checkSize(targetDiv)) {
      if (E(targetDiv)) {
        // eslint-disable-next-line
        k = targetDiv;
        break;
      }
    }
  }
  if (targetDiv === null) {
    //如果没找到合适大小的
    console.warn("没能找到合适的大小. 换一个页面试试？.");
    return;
  }

  loadCss(); //将自定义css文件引入页面
  setBgm(); //添加背景音乐

  var O = [];
  for (let L = 0; L < C.length; L++) {
    let targetDiv = C[L];
    if (checkSize(targetDiv)) {
      O.push(targetDiv);
    }
  }

  // //网页整体倾斜效果（这块儿本来是JQuery实现的，为了避免引入JQuery，做了改动。）
  // var style = document.createElement("style");
  // style.type = "text/css";
  // try {
  //   style.appendChild(
  //     document.createTextNode(
  //       "body{overflow-x:hidden;transform: rotate(1deg);-webkit-transform: rotate(1deg);-moz-transform: rotate(1deg);-o-transform: rotate(1deg);-ms-transform: rotate(1deg)}"
  //     )
  //   );
  // } catch (ex) {
  //   style.styleSheet.cssText = "body{background-color:red}"; //针对IE
  // }
  // var head = document.getElementsByTagName("head")[0];
  // head.appendChild(style);
}
export function beginDJ() {
  setTimeout(letDance, 500);
  _djState = true;
}
export function getState() {
  return _djState;
}

// window._admin = {
//   beginDJ: beginDJ,
// };
