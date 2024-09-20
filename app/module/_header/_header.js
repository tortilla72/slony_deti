// Скрытие меню при прокрутке вниз и отображение при прокрутке наверх
let header = $('.header'),
  menuHeight=header.height(),
  scrollPrev = 0;

  $(window).on('scroll', function () {
    let scrolled = $(this).scrollTop();

    if (scrolled > menuHeight && scrolled > scrollPrev) {
      header.addClass('header--out');
    } else {
      header.removeClass('header--out');
    }
    scrollPrev = scrolled;
  });


