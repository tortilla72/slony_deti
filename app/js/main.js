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

  // Всплывающее окно для отзыва
  $('.reviews__btn').fancybox({
    type: 'inline',
    closeExisting: true,
    btnTpl: {
      smallBtn:
        '<button class="popup-close-btn" data-fancybox-close><span class="visually-hidden">Закрыть.</span></button>',
    },
    afterLoad: function () {
      $('.reviews__popup').addClass('animate__animated fadeInDown');
    },
    beforeClose: function () {
      $('.reviews__popup').addClass('animate__animated fadeOutDown');
    },
  });

  // Проверка удачной отправки формы отзыва
  $('.reviews__form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      url: this.action,
      type: this.method,
      data: $(this).serialize(),
      success: function () {
        setTimeout(() => {
          $.fancybox.getInstance('close');
          $.fancybox.open({
            src: '#reviews__thanks',
            type: 'inline',
            btnTpl: {
              smallBtn:
                '<button class="popup-close-btn" data-fancybox-close><span class="visually-hidden">Закрыть.</span></button>',
            },
            afterLoad: function () {
              $('.reviews__popup').addClass('animate__animated fadeInDown');
            },
            beforeClose: function () {
              $('.reviews__popup').addClass('animate__animated fadeOutDown');
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

  //= ../module/_header/_header.js

  //= ../module/_footer/_footer.js
});
