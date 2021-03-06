export function play(XgPlayer:any) {
  if (XgPlayer.Second < 1) {
    XgPlayer.Second = 1;
  }
  let xiguaPlayer,Player,AlipayWallet,player,playerhtml,isxg,browser,installflag = 1,myBuffer:any=$('buffer');
  function $XghdInstall() {
    $("xg_box").style.display = "none";
    if (installflag == 1) {
      document.writeln('<iframe border="0" src="' + XgPlayer.Installpage + '" marginWidth="0" frameSpacing="0" marginHeight="0" frameBorder="0" noResize scrolling="no" width="' + XgPlayer.Width + '" height="' + XgPlayer.Height + '" vspale="0" ></iframe>');
      installflag = 0;
    }
  }
  let onAdsEnd:any=()=>{
    XgPlayer.Second = 0;
    myBuffer.style.display = 'none';
    xiguaPlayer.style.display = 'block';
    setInterval("adshow()", 1000);
  };
  var AdsBeta6 = {
    'Start': function () {
      myBuffer.style.display = 'block';
      if (xiguaPlayer.IsBuffing()) {
        myBuffer.height = XgPlayer.Height - 80+'px';
      } else {
        myBuffer.height = XgPlayer.Height - 60+'px';
      }
    },
    'End': function () {
      if (!XgPlayer.Second) {
        myBuffer.style.display = 'none';
        $('xiguaPlayer').style.display = 'block';
        xiguaPlayer.height = XgPlayer.Height;
      }
    },
    'Status': function () {
      if (xiguaPlayer.IsPlaying()) {
        this.End();
      } else {
        this.Start();
      }
    }
  }

  function $(id) {
    return document.getElementById(id);
  }

  function $Showhtml() {
    browser = navigator.appName;
    if (browser == "Netscape" || browser == "Opera") {
      if (/iPad|iPhone/i.test(navigator.userAgent)) {
        setTimeout($PlayerIOS, 1000);
      }
      if (/Android/i.test(navigator.userAgent)) {
        $PlayerAndroid();
      }
      if (isIE()) {
        return $PlayerIe();
      } else {
        return $PlayerNt();
      }
    } else if (browser == "Microsoft Internet Explorer") {
      return $PlayerIe();
    }
    else {
      alert('请使用IE内核浏览器观看本站影片!');
    }
  }

  function isIE() {
    if (!!(window as any).ActiveXObject || "ActiveXObject" in window) {
      browser = "Microsoft Internet Explorer";
      return true;
    }
    return false;
  }

  function installapp() {
    return function () {
      var clickedAt = +new Date;
      setTimeout(function () {
        try {
          if (isxg()) {
            return;
          }
        } catch (e) {
          ;
        }
        if (+new Date - clickedAt < 1500) {
          alert("即将为你转到苹果商店下载\"南瓜播放器\"，安装成功后，重新刷新本页面进行播放");
          setTimeout(function () {
            var surl = "https://itunes.apple.com/cn/app/id1130681156";
            top.location.href = surl;
          }, 3000);
        }
      }, 500);
    };
  }

  function $PlayerIOS() {
    var newurl = "#";
    if (typeof(XgPlayer) != 'undefined') {
      newurl = XgPlayer['Url'].replace("ftp://", "xg://");
    }
    else if (typeof(Player) != 'undefined') {
      newurl = Player['Url'].replace("ftp://", "xg://");
    }
    var xuanjipage = top.location.href;
    if (typeof(XgPlayer['XuanJiPage']) != 'undefined') xuanjipage = XgPlayer['XuanJiPage'];
    if (typeof(XgPlayer['MobiAd']) != 'undefined') top.location.href = newurl + "|" + XgPlayer['MobiAd'] + "|" + xuanjipage;
    else top.location.href = newurl;
    installapp()();
  }


  function $PlayerAndroid() {
    var finalurl;
    var newurl = "#";
    var isChrome = window.navigator.userAgent.indexOf("Chrome") !== -1;
    if (typeof(XgPlayer) != 'undefined') {
      newurl = XgPlayer['Url'];
    } else if (typeof(Player) != 'undefined') {
      newurl = Player['Url'];
    }

    var xuanjipage = top.location.href;
    if (typeof(XgPlayer['XuanJiPage']) != 'undefined') {
      xuanjipage = XgPlayer['XuanJiPage'];
    }

    if (typeof(XgPlayer['MobiAd']) != 'undefined') {
      finalurl = newurl + "|" + XgPlayer['MobiAd'] + "|" + xuanjipage;
    } else {
      finalurl = newurl;
    }

    var array = finalurl.split("//");
    finalurl = array[1];

    if (typeof AlipayWallet !== 'object') {
      AlipayWallet = {};
    }

    (function () {
      var ua = navigator.userAgent.toLowerCase(),
        locked = false,
        domLoaded = document.readyState === 'complete',
        delayToRun;

      function customClickEvent() {
        var clickEvt;
        if ((window as any).CustomEvent) {
          clickEvt = new (window as any).CustomEvent('click', {
            canBubble: true,
            cancelable: true
          });
        } else {
          clickEvt = document.createEvent('Event');
          clickEvt.initEvent('click', true, true);
        }

        return clickEvt;
      }

      var noIntentTest = /aliapp|360 aphone|weibo|windvane|ucbrowser|baidubrowser/.test(ua);
      var hasIntentTest = /chrome|samsung/.test(ua);
      var isAndroid = /android|adr/.test(ua) && !(/windows phone/.test(ua));
      var canIntent = !noIntentTest && hasIntentTest && isAndroid;

      AlipayWallet.open = function (params, jumpUrl) {
        if (!domLoaded && (ua.indexOf('360 aphone') > -1 || canIntent)) {
          var arg = arguments;
          delayToRun = function () {
            AlipayWallet.open.apply(null, arg);
            delayToRun = null;
          };
          return;
        }

        // 唤起锁定，避免重复唤起
        if (locked) {
          return;
        }
        locked = true;

        var o;
        // 参数容错
        if (typeof params === 'object') {
          o = params;
        } else {
          o = {
            params: params,
            jumpUrl: jumpUrl
          };
        }

        // 是否为RC环境
        var isRc = '';

        // 是否唤起re包
        var isRe = '';
        if (typeof o.isRe === 'undefined') {
          o.isRe = !!isRe;
        }

        // 唤醒app的scheme
        var schemePrefix = 'xg';

        //视频地址,替换成处理后的实际地址
        var address = finalurl;

        if (!canIntent) {
          var alipaysUrl = schemePrefix + '://' + address;

          //百度浏览器不支持xg,支持ftp协议
          var isBaidu = window.navigator.userAgent.indexOf("baidubrowser") !== -1;
          if (isBaidu) {
            alipaysUrl = "ftp://" + address;
          }

          var ifr = document.createElement('iframe');
          ifr.src = alipaysUrl;
          ifr.style.display = 'none';
          document.body.appendChild(ifr);
        } else {
          // android 下 chrome 浏览器通过 intent 协议唤起钱包
          var intentUrl = 'intent://' + address + '#Intent;scheme=' + schemePrefix + ';package=tv.danmaku.ijk.media.demo' + ';end';

          //以下几步不能兼容所有版本的谷歌浏览器,个别版本的谷歌浏览器和Safari不支持非input标签的click事件,dispatchEvent捕捉不到,可以使用<intput type="button">的格式捕捉click事件
          var openIntentLink = document.createElement('a');
          openIntentLink.id = 'openIntentLink';
          openIntentLink.style.display = 'none';
          document.body.appendChild(openIntentLink);

          openIntentLink.href = intentUrl;
          // 执行click
          openIntentLink.dispatchEvent(customClickEvent());
        }

        // 延迟移除用来唤起钱包的IFRAME并跳转到下载页
        setTimeout(function () {
          //重定向地址,可以去掉，替换成弹出下载的悬浮框,支付宝网页并没有判断app是否存在,最后都跳转到下载页面
          top.location.href = "http://s2.xiguaplayer.com/xigua-20160512.apk";
        }, 1000)

        // 唤起加锁，避免短时间内被重复唤起
        setTimeout(function () {
          locked = false;
        }, 2500)
      }

      if (!domLoaded) {
        document.addEventListener('DOMContentLoaded', function () {
          domLoaded = true;
          if (typeof delayToRun === 'function') {
            delayToRun();
          }
        }, false);
      }
    })();

    (function () {
      var schemeParam = '';

      if (!location.hash) {
        AlipayWallet.open({
          params: schemeParam,
          jumpUrl: '',
          openAppStore: false
        });
      }
    })();
  }

  function $PlayerNt() {
    if (navigator.plugins) {
      var install = true;
      for (var i = 0; i < navigator.plugins.length; i++) {
        if (navigator.plugins[i].name == 'XiGua Yingshi Plugin') {
          install = false;
          break;
        }
      }
      if (!install) {
        player = '<div style="width:' + XgPlayer.Width + 'px;height:' + XgPlayer.Height + 'px;overflow:hidden;position:relative"><iframe src="' + XgPlayer.Buffer + '" scrolling="no" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0" name="buffer" id="buffer" style="position:absolute;z-index:2;top:0px;left:0px"></iframe><object  width="' + XgPlayer.Width + '" height="' + XgPlayer.Height + '" type="application/xgyingshi-activex" progid="xgax.player.1" param_URL="' + XgPlayer.Url + '" param_NextCacheUrl="' + XgPlayer.NextcacheUrl + '" param_LastWebPage="' + XgPlayer.LastWebPage + '" param_NextWebPage="' + XgPlayer.NextWebPage + '" param_OnPause="onPause" param_OnFirstBufferingStart="onFirstBufferingStart" param_OnFirstBufferingEnd="onFirstBufferingEnd" param_OnPlayBufferingStart="onPlayBufferingStart" param_OnPlayBufferingEnd="onPlayBufferingEnd" param_OnComplete="onComplete" param_Autoplay="1" id="xiguaPlayer" name="xiguaPlayer"></object></div>';
        if (XgPlayer.Second) {
          setTimeout("onAdsEnd()", XgPlayer.Second * 1000);
        }
        return player;
      }
    }
    return '<iframe border="0" src="' + XgPlayer.Installpage + '" marginWidth="0" frameSpacing="0" marginHeight="0" frameBorder="0" noResize scrolling="no" width="' + XgPlayer.Width + '" height="' + XgPlayer.Height + '" vspale="0" ></iframe>';
  }

  function $PlayerIe() {
    playerhtml = '<iframe src="' + XgPlayer.Buffer + '" id="buffer" width="' + XgPlayer.Width + '" height="' + (XgPlayer.Height - 80) + '" scrolling="no" frameborder="0" style="position:absolute;z-index:9;"></iframe><object classid="clsid:BEF1C903-057D-435E-8223-8EC337C7D3D0"  style="display:none" width="' + XgPlayer.Width + '" height="' + XgPlayer.Height + '" id="xiguaPlayer" name="xiguaPlayer" onerror="$XghdInstall();"><param name="URL" value="' + XgPlayer.Url + '"/><param name="NextCacheUrl" value="' + XgPlayer.NextcacheUrl + '"><param name="LastWebPage" value="' + XgPlayer.LastWebPage + '"><param name="NextWebPage" value="' + XgPlayer.NextWebPage + '"><param name="OnPlay" value="onPlay"/><param name="OnPause" value="onPause"/><param name="OnFirstBufferingStart" value="onFirstBufferingStart"/><param name="OnFirstBufferingEnd" value="onFirstBufferingEnd"/><param name="OnPlayBufferingStart" value="onPlayBufferingStart"/><param name="OnPlayBufferingEnd" value="onPlayBufferingEnd"/><param name="OnComplete" value="onComplete"/><param name="Autoplay" value="1"/></object>';
    return playerhtml;
  }

  function $PlayerIeBack() {
    if (browser == "Microsoft Internet Explorer") {
      if (xiguaPlayer.URL != undefined) {
        if (XgPlayer.Second) {
          setTimeout("onAdsEnd()", XgPlayer.Second * 1000);
        }
      }
      xiguaPlayer.ConfigurePlayer('url', XgPlayer.Url);
    }
  }

//beta7版播放器回调函数
  var onPlay = function () {
    myBuffer.style.display = 'none';
    //强制缓冲广告倒计时
    if (XgPlayer.Second && xiguaPlayer.IsPlaying()) {
      xiguaPlayer.Play();
    }
  }
  var onPause = function () {
    myBuffer.height = XgPlayer.Height - 63;
    myBuffer.style.display = 'block';
  }
  var onFirstBufferingStart = function () {
    myBuffer.height = Player.Height - 80;
    myBuffer.style.display = 'block';
  }
  var onFirstBufferingEnd = function () {
    if (XgPlayer.Second) {
      xiguaPlayer.Play();
    } else {
      myBuffer.style.display = 'none';
    }
  }
  var onPlayBufferingStart = function () {
    myBuffer.height = XgPlayer.Height - 80;
    myBuffer.style.display = 'block';
  }
  var onPlayBufferingEnd = function () {
    myBuffer.style.display = 'none';
  }
  var onComplete = function () {
    onPause();
  }


  function adshow() {
    if (xiguaPlayer.IsPlaying()) {
      myBuffer.style.display = 'none';
    } else if (xiguaPlayer.IsBuffing()) {
      myBuffer.height = XgPlayer.Height - 63;
      myBuffer.style.display = 'block';
    } else if (xiguaPlayer.IsPause()) {
      myBuffer.height = XgPlayer.Height - 63;
      myBuffer.style.display = 'block';
    } else {
      myBuffer.height = XgPlayer.Height - 63;
      myBuffer.style.display = 'block';
    }
  }

  var install = true;
  playerhtml = $Showhtml();
  $("xg_box").innerHTML = playerhtml;
  $PlayerIeBack();
}
