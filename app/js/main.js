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
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

if (isMobile.any()) {
  document.body.classList.add('_touch');
} else {
  document.body.classList.add('_pc');
}

//= ../../node_modules/jquery/dist/jquery.js
//= ../../node_modules/locomotive-scroll/dist/locomotive-scroll.js
//= ../../node_modules/swiper/swiper-bundle.js
//= ../../node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js
//= ../module/_header/_header.js
$(function () {
  // Плавный скролл
  let scroll = new LocomotiveScroll();

  // Слайдер отзывов
  const swiperReviews = new Swiper('.reviews__slider', {
    slidesPerView: 1,
    spaceBetween: 40,
    breakpoints: {
      1025: {
        slidesPerView: 2,
      },
    },
    navigation: {
      nextEl: '.slider__btn-next',
      prevEl: '.slider__btn-prev',
    },
  });

  // Всплывающее окно
  $('.btn-popup-open').fancybox({
    type: 'inline',
    closeExisting: true,
    btnTpl: {
      smallBtn:
        '<button class="popup-close-btn" data-fancybox-close><span class="visually-hidden">Закрыть.</span></button>',
    },
    afterLoad: function () {
      $('.popup').addClass('animate__animated fadeInDown');
    },
    beforeClose: function () {
      $('.popup').addClass('animate__animated fadeOutDown');
    },
    backFocus: false,
    autoFocus: false,
  });

  // Проверка удачной отправки формы отзыва
  $('.reviews-popup__form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      url: this.action,
      type: this.method,
      data: $(this).serialize(),
      success: function () {
        setTimeout(() => {
          $.fancybox.getInstance('close');
          $.fancybox.open({
            src: '#reviews-thanks',
            type: 'inline',
            backFocus: false,
            autoFocus: false,
            btnTpl: {
              smallBtn:
                '<button class="popup-close-btn" data-fancybox-close><span class="visually-hidden">Закрыть.</span></button>',
            },
            afterLoad: function () {
              $('.review-popup').addClass('animate__animated fadeInDown');
            },
            beforeClose: function () {
              $('.reviews-popup').addClass('animate__animated fadeOutDown');
            },
          });
        }, 100);
      },
    });
  });

  // Слайдер видео на странице about
  const swiperAboutVideo = new Swiper('.about-video__slider', {
    slidesPerView: 1,
    spaceBetween: 40,
    breakpoints: {
      1025: {
        slidesPerView: 2,
      },
    },
    navigation: {
      nextEl: '.slider__btn-next',
      prevEl: '.slider__btn-prev',
    },
  });

  // Кнопка выбора в вишлист
  $('.product-card__favorite').on('click', function () {
    $(this).toggleClass('product-card__favorite--selected');
  });

  /**** Кнопка сброса фильтров тэгов на странице магазина ****/
  // Проверяем наличие применённых тэгов на странице
  let countFilterChecked = 0;
  $('.filter-tags__input').each(function () {
    if ($(this).prop('checked')) {
      $('.filter-tags__reset').prop('disabled', false);
      countFilterChecked += 1;
    } else {
      $('.filter-tags__reset').prop('disabled', true);
    }
  });

  // Обработка события нажатия на фильтр
  $('.filter-tags__input').on('change', function () {
    if ($(this).prop('checked')) {
      $('.filter-tags__reset').prop('disabled', false);
      countFilterChecked += 1;
    } else {
      countFilterChecked -= 1;
      if (countFilterChecked == 0) {
        $('.filter-tags__reset').prop('disabled', true);
      }
      console.log(countFilterChecked);
    }
    console.log(countFilterChecked);
  });

  // Обработка события нажатия на кнопку сброса
  $('.filter-tags__reset').on('click', function () {
    $('.filter-tags__input').each(function () {
      $(this).prop('checked', false);
    });
    $(this).prop('disabled', true);
  });

  /**** /Кнопка сброса фильтров тэгов на странице магазина ****/

  /****  Слайдер отзывов на странице отзывов ****/
  // Слайдер отзывов
  const swiperReviewsSurvey = new Swiper('.reviews-survey__slider', {
    slidesPerView: 1,
    spaceBetween: 40,
    breakpoints: {
      1025: {
        slidesPerView: 3,
      },
      701: {
        slidesPerView: 2,
      },
    },
    navigation: {
      nextEl: '.slider__btn-next',
      prevEl: '.slider__btn-prev',
    },
  });

  /* Обрезка текста отзывов*/
  $('.reviews-survey__blockquote').each(function () {
    let countParagraf = $(this).children('p').length; // Количество параграфов в тексте
    let sizeReview = $(this).data('trim'); // Длина текста в символах
    let countSize = sizeReview;
    $(this)
      .children('p')
      .each(function () {
        // Идём по всем параграфам
        let contentText = $(this).text();
        let text = contentText.trim(); // Обрезаем пробелы в начале и в конце
        if (text.length > countSize) {
          if (countSize > 0) {
            text = text.slice(0, countSize);
            let lastSpace = text.lastIndexOf(' ');
            if (lastSpace > 0) {
              // Урезаем до границы целого слова
              text = text.substring(0, lastSpace);
              $(this).text(text + '...');
            }
            countSize = 0;
          } else {
            $(this).text('');
          }
        } else {
          countSize = countSize - text.length;
        }
      });
  });

  //= ../module/_footer/_footer.js
});
