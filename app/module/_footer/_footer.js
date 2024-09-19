$('.footer__go-top-btn').hide();
$(window).on('scroll', function () {
  if ($(window).scrollTop() > $(window).height()) {
    $('.footer__go-top-btn').show();
  } else {
    $('.footer__go-top-btn').hide();
  }
});
$('.footer__go-top-btn').on('click', function () {
  $('html, body').animate({ scrollTop: 0 }, 600);
  $('.footer__go-top-btn').trigger('blur');
  return false;
});
