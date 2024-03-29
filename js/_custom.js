document.addEventListener("DOMContentLoaded", function() {
  var $allInnput = document.querySelectorAll("input");
  var $href = document.querySelector("#href");
  var $result = document.querySelector("#result");
  var $resultWrapper = document.querySelector(".resultWrapper");
  var $vkccResult = document.querySelector(".vkcc_result");
  var $btnCopy = document.querySelector(".copy");
  var $btn = document.querySelectorAll(".btn");
  var $menu_item = document.querySelectorAll(".menu_item");
  var $theme = document.querySelector("#change_theme");
  var $body = document.querySelector("body");

  var $utm_source = document.querySelector("#utm_source");
  var $utm_medium = document.querySelector("#utm_medium");
  var $utm_campaign = document.querySelector("#utm_campaign");
  var $utm_content = document.querySelector("#utm_content");
  var $utm_term = document.querySelector("#utm_term");

  var utm_source = $utm_source.value;
  var utm_medium = $utm_medium.value;
  var utm_campaign = $utm_campaign.value;
  var utm_content = $utm_content.value;
  var utm_term = $utm_term.value;

  var objUtm = {
    yandexSearch: {
      utm_source: "yandex.search",
      utm_medium: "cpc",
      utm_campaign: "{campaign_id}",
      utm_content: "{ad_id}",
      utm_term: "{keyword}"
    },
    yandexContext: {
      utm_source: "yandex.context",
      utm_medium: "cpc",
      utm_campaign: "{campaign_id}",
      utm_content: "{ad_id}",
      utm_term: "{keyword}"
    },
    yandexSmartBanner: {
      utm_source: "yandex.smart-banner",
      utm_medium: "cpc",
      utm_campaign: "{campaign_id}",
      utm_content: "{ad_id}",
      utm_term: "{keyword}"
    },
    yandexSearchBanner: {
      utm_source: "yandex.search-banner",
      utm_medium: "cpc",
      utm_campaign: "{campaign_id}",
      utm_content: "{ad_id}",
      utm_term: "{keyword}"
    },
    yandexMedia: {
      utm_source: "yandex.media",
      utm_medium: "cpc",
      utm_campaign: "{campaign_id}",
      utm_content: "{ad_id}",
      utm_term: "{keyword}"
    },
    yandexGraphics: {
      utm_source: "yandex.graphics",
      utm_medium: "cpc",
      utm_campaign: "{campaign_id}",
      utm_content: "{ad_id}",
      utm_term: "{keyword}"
    },
    yandexMainPageBanner: {
      utm_source: "yandex.main-page-banner",
      utm_medium: "cpc",
      utm_campaign: "{campaign_id}",
      utm_content: "{ad_id}",
      utm_term: "{keyword}"
    },
    googleSearch: {
      utm_source: "google.search",
      utm_medium: "cpc",
      utm_campaign: "{campaignid}",
      utm_content: "{creative}",
      utm_term: "{keyword}"
    },
    googleKMS: {
      utm_source: "google.kms",
      utm_medium: "cpc",
      utm_campaign: "{campaignid}",
      utm_content: "{creative}",
      utm_term: "{keyword}"
    },
    googleVideo: {
      utm_source: "google.video",
      utm_medium: "cpc",
      utm_campaign: "{campaignid}",
      utm_content: "{creative}",
      utm_term: "{keyword}"
    },
    vk: {
      utm_source: "vk",
      utm_medium: "social",
      utm_campaign: "название поста"
    },
    ok: {
      utm_source: "ok",
      utm_medium: "social",
      utm_campaign: "название поста"
    },
    inst: {
      utm_source: "inst",
      utm_medium: "social",
      utm_campaign: "название поста"
    },
    fb: {
      utm_source: "fb",
      utm_medium: "social",
      utm_campaign: "название поста"
    }
  };

  console.log(objUtm);
  handlerActive($btn, "btn-active");

  $result.addEventListener("click", function(event) {
    copyClipboard($result);
    event.preventDefault();
  });

  $vkccResult.addEventListener("click", function(event) {
    copyClipboard($vkccResult);
    event.preventDefault();
  });

  if (localStorage.getItem("theme") == "Dark") {
    $body.classList.add("black_theme");
    document.querySelector("#change_theme img").src = "img/@2x/dark.png";
  } else {
    $body.classList.remove("black_theme");
    document.querySelector("#change_theme img").src = "img/@2x/light.png";
  }

  $theme.addEventListener("click", function(event) {
    $body.classList.toggle("black_theme");
    $body.style.transition = "all 0.5s ease-in-out";
    event.preventDefault();
    var bodyclass = $body.classList.contains("black_theme");
    if (bodyclass == true) {
      localStorage.setItem("theme", "Dark");
      document.querySelector("#change_theme img").src = "img/@2x/dark.png";
    } else {
      localStorage.setItem("theme", "light");
      document.querySelector("#change_theme img").src = "img/@2x/light.png";
    }
  });

  //Вывод результат
  for (i = 0; i < $allInnput.length; i++) {
    transliterate(this.value, { replace: { " ": "-" } });
    $allInnput[i].addEventListener("input", function() {
      result();
    });
  }
  $href.value = localStorage.getItem("href");

  // Табы
  var jsTriggers = document.querySelectorAll(".menu_item");
  jsTriggers.forEach(function(trigger) {
    trigger.addEventListener("click", function(event) {
      localStorage.setItem("idMenu", this.getAttribute("data-tab"));
      var idLocal = localStorage.getItem("idMenu");
      var content = document.querySelector(
        '.fillter[data-tab="' + idLocal + '"]'
      );
      var activeContent = document.querySelector(".tab-active");
      var activeTrigger = document.querySelector(".menu_item-active");
      activeTrigger.classList.remove("menu_item-active"); // 1
      trigger.classList.add("menu_item-active"); // 2
      activeContent.classList.remove("tab-active"); // 3
      content.classList.add("tab-active"); // 4
      event.preventDefault();
      //СММ

      if (
        document
          .querySelector('.fillter[data-tab="smm"]')
          .classList.contains("tab-active") == true
      ) {
        document.querySelector(".no-smm").style.display = "none";
        document.querySelector(".no-smm1").style.display = "none";
      } else {
        document.querySelector(".no-smm").style.display = "flex";
        document.querySelector(".no-smm1").style.display = "flex";
      }
    });
  });

  try {
    var activeContent = document.querySelector(".tab-active");
    activeContent.classList.remove("tab-active"); // 3
    var idLocal = localStorage.getItem("idMenu");
    var content = document.querySelector(
      '.fillter[data-tab="' + idLocal + '"]'
    );
    var activeTrigger = document.querySelector(".menu_item-active");
    activeTrigger.classList.remove("menu_item-active"); // 1
    document
      .querySelector('.menu_item[data-tab="' + idLocal + '"]')
      .classList.add("menu_item-active");
    content.classList.add("tab-active");
    if (idLocal === "smm") {
      document.querySelector(".no-smm").style.display = "none";
      document.querySelector(".no-smm1").style.display = "none";
    } else {
      document.querySelector(".no-smm").style.display = "flex";
      document.querySelector(".no-smm1").style.display = "flex";
    }
  } catch {
    document.querySelector(".default").classList.add("menu_item-active");
    document
      .querySelector('.fillter[data-tab="yandex"]')
      .classList.add("tab-active");
  }

  //Что нового
  document.querySelector(".news").addEventListener("click", function(event) {
    event.preventDefault();
    document.querySelector(".ol").classList.toggle("ol_visable");
    if (this.innerHTML === "Что нового?") {
      this.innerHTML = "Скрыть";
    } else {
      this.innerHTML = "Что нового?";
    }
  });

  //Добавление активного класса
  function handlerActive($el, activeClass) {
    for (var i = 0; i < $el.length; i++) {
      $el[i].addEventListener("click", function(event) {
        for (var i = 0; i < $el.length; i++) {
          $el[i].classList.remove(activeClass);
        }
        this.classList.toggle(activeClass);
        localStorage.setItem("ativeBtn", this.id);
        event.preventDefault();
      });
    }
  }

  $btn.forEach(function(click) {
    click.addEventListener("click", function(even) {
      createObjUtm();
      event.preventDefault();
      vkcc.style.display = "inline-block";
      $vkccResult.style.display = "none";
    });
  });

  createObjUtm();

  function createObjUtm() {
    var utmLocal = localStorage.getItem("ativeBtn");
    try {
      document.querySelector("#" + utmLocal).classList.add("btn-active");
      var utmObj = objUtm[utmLocal];
      var utmObjSourse = objUtm[utmLocal].utm_source;
      var utmObjMedium = objUtm[utmLocal].utm_medium;
      var utmObjCampaing = objUtm[utmLocal].utm_campaign;
      var utmObjContent = objUtm[utmLocal].utm_content;
      var utmObjTrem = objUtm[utmLocal].utm_term;

      creatUtm(
        utmObjSourse,
        utmObjMedium,
        utmObjCampaing,
        utmObjContent,
        utmObjTrem
      );
    } catch {}
  }

  function creatUtm(
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    utm_term
  ) {
    utm_source = $utm_source.value = utm_source;
    utm_medium = $utm_medium.value = utm_medium;
    utm_campaign = $utm_campaign.value = utm_campaign;
    utm_content = $utm_content.value = utm_content;
    utm_term = $utm_term.value = utm_term;
    result();
  }

  function result() {
    var hrefValue = $href.value;
    localStorage.setItem("href", $href.value);
    utm_source = transliterate($utm_source.value, { replace: { " ": "-" } });
    utm_medium = transliterate($utm_medium.value, { replace: { " ": "-" } });
    utm_campaign = transliterate($utm_campaign.value, {
      replace: { " ": "-" }
    });
    utm_content = transliterate($utm_content.value, { replace: { " ": "-" } });
    utm_term = transliterate($utm_term.value, { replace: { " ": "-" } });

    if (
      document
        .querySelector('.fillter[data-tab="smm"]')
        .classList.contains("tab-active") == true
    ) {
      var utm =
        "?utm_source=" +
        utm_source +
        "&utm_medium=" +
        utm_medium +
        "&utm_campaign=" +
        utm_campaign;
    } else {
      var utm =
        "?utm_source=" +
        utm_source +
        "&utm_medium=" +
        utm_medium +
        "&utm_campaign=" +
        utm_campaign +
        "&utm_content=" +
        utm_content +
        "&utm_term=" +
        utm_term;
    }

    if (hrefValue.indexOf("?") > -1) {
      //yandexADS.replace("?", "&");
      $result.innerHTML = hrefValue + utm.replace("?", "&");
    } else {
      $result.innerHTML = hrefValue + utm;
    }
  }

  function copyClipboard(elem) {
    var range = document.createRange();
    range.selectNode(elem);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();

    document.querySelector(".copyDone").style.opacity = "1";
    setTimeout(hide, 1000);
    function hide() {
      document.querySelector(".copyDone").style.opacity = "0";
    }
  }

  //vk cc
  const token =
    "38b49d7d38b49d7d38b49d7df538d95801338b438b49d7d650a3d3ce42566e7e243febe";
  const v = "5.103";
  const metod = "utils.getShortLink";

  const vkcc = document.querySelector("#vkcc");
  vkcc.addEventListener("click", href_cut);

  function href_cut() {
    event.preventDefault();
    const $result_utm = $result.textContent;
    //const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = `https://api.vk.com/method/${metod}?url=${$result_utm}&access_token=${token}&v=${v}`;
    console.log($result_utm);

    const vkccResponce = VK.Api.call(
      metod,
      { url: $result_utm, v: "5.73" },
      function(response) {
        try {
          $vkccResult.innerHTML = response.response.short_url;
          console.log(response.response.short_url);
          vkcc.style.display = "none";
          $vkccResult.style.display = "block";
        } catch {
          vkcc.innerHTML =
            "Что-то пошло не так, возможно не выполнен логин в ВК в бразуере";
          vkcc.style.color = "#FF403C";
        }
      }
    );
  }

  $href.addEventListener("input", function() {
    vkcc.style.display = "inline-block";
    $vkccResult.style.display = "none";
  });
});
