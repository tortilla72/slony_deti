const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return isMobile.Android() ||
    isMobile.BlackBerry() ||
    isMobile.iOS() ||
    isMobile.Opera() ||
    isMobile.Windows();
  },
};

if (isMobile.any()){
  document.body.classList.add('_touch');
}else {
   document.body.classList.add('_pc');
}
//= ../../node_modules/jquery/dist/jquery.js
//= ../../node_modules/locomotive-scroll/dist/locomotive-scroll.js
$(function () {
  // Плавный скролл
  let scroll = new LocomotiveScroll();
  //= ../module/_header/_header.js

  //= ../module/_footer/_footer.js
});