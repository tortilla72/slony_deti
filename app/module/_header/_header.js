/* Отключение outline при работе мышью */
$('body').on('mousedown', '*', function (e) {
  if (
    ($(this).is(':focus') || $(this).is(e.target)) &&
    $(this).css('outline-style') == 'none'
  ) {
    $(this)
      .css('outline', 'none')
      .on('blur', function () {
        $(this).off('blur').css('outline', '');
      });
  }
});

// Скрытие меню при прокрутке вниз и отображение при прокрутке наверх
let header = $('.header'),
  menuHeight = header.height(),
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

// Появление/скрытие формы поиска при клике на кнопку
$('.user-menu__form-btn').on('click', function () {
  $('.user-menu__form').toggleClass('user-menu__form--active');
  $('.user-menu__form-input').trigger('focus');
});

// Замена кнопки подменю на span
/*if ($('.burger-btn').css('display')!='none') {
  $('.menu__btn').replaceWith(
    '<span class="' +
      $('.menu__btn').attr('class') +
      '">' +
      $('.menu__btn').text() +
      '</span>'
  );
}*/
// Ожидание конца события (например для окнчательного выбора размера экрана)
let waitForFinalEvent = (function () {
  let timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = 'Не вызывайте это дважды без уникального идентификатора';
    }
    if (timers[uniqueId]) {
      clearTimeout(timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();

// Заменяем кнопку для выпадающего меню в случае бургер-меню на span и изменение в форме поиска header типа кнопки и скрытой надписи на ней при изменении размеров экрана

$(window).on('resize', function () {
  waitForFinalEvent(
    function () {
      if (window.innerWidth <= 568) {
        $('.user-menu__form-btn').prop('type', 'submit');
        $('.user-menu__form span').text('Кнопка поиска.');
      } else {
        $('.user-menu__form-btn').prop('type', 'button');
        $('.user-menu__form span').text('Открыть форму для поиска.');
      }
    },
    500,
    'user-menu__form-btn'
  );
});

// Открытие - закрытие бургер-меню при нажатии на ссылку
$('.burger-btn').on('click', function () {
  $('.burger-btn').toggleClass('burger-btn--close');
  $('.menu').toggleClass('menu--active');
  $('.menu--active .menu__btn').prop('disabled', true);
});

// Замена button подменю на span

// Скрываем кнопку корзины если она пустая
let btnNum = $('.user-menu__btn--cart');
let numContainer = btnNum.find('span.user-menu__btn-num');
let cartNum = parseInt(numContainer.html());
if (cartNum > 0) {
  btnNum.show();
} else {
  btnNum.hide();
}
