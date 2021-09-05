'use strict';
$(document).ready(function(){
    
    $('.carousel__inner').slick({
        speed: 1000,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.png"></button>',
        dotsClass: 'slick-dots',
        dots: true,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    arrows: false
                }
            }
        ]  
      });

      // Tabs
    
    const tabHeaders = document.querySelectorAll('[data-tab]');
    const contentBoxes = document.querySelectorAll('[data-tab-content]');
    
    tabHeaders.forEach(function (item) {       
        item.addEventListener('click', function () {
            tabHeaders.forEach(function (item) {
            item.classList.remove('catalog__tab_active');
            });   
            const contentBox = document.querySelector('#' + this.dataset.tab);
            contentBoxes.forEach(function (item) {
                item.classList.remove('catalog__content_active');
            });
            item.classList.add('catalog__tab_active');
            contentBox.classList.add('catalog__content_active');
        });
    });
    
    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__block').eq(i).toggleClass('catalog-item__block_active');
            });
        });
    }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // Modal

    // const togglePopUp = () => {

    //     const modalConsultation = document.querySelector('#consultation');
    //     const modalOrder = document.querySelector('#order');
    //     const modals = document.querySelectorAll('.modal');
    //     const overlay = document.querySelector('.overlay');


    //     document.addEventListener('click', (event) => {
    //         event.preventDefault();
    //         let target = event.target;
    //         if (target.matches('[data-modal]')) {
    //             modalConsultation.style.display = 'block';
    //             overlay.style.display = 'block';
    //         }
    //         if (target.matches('.button_mini')) {
    //             const descr = document.querySelector('#order .modal__descr');
    //             descr.textContent = document.querySelector('.catalog-item__subtitle').textContent;
    //             modalOrder.style.display = 'block';
    //             overlay.style.display = 'block';
    //         }

    //     });

    //     document.addEventListener('click', (event) => {
    //         let target = event.target;
    //         if (target.classList.contains('modal__close') || target.closest('.overlay')) {
    //             modals.forEach(item => {
    //                 item.style.display = 'none';
    //             });
    //             overlay.style.display = 'none';
    //         }
    //     });
    // };
    // togglePopUp();

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    // Validate for forms

    function valideForms (form) {
        $(form).validate({
            messages: {
                name: "Пожалуйста, введите своё имя",
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неправильно введён адресс почты"
                }
              }
        });
    }

    valideForms('#consultation-form');
    valideForms('#consultation form');
    valideForms('#order form');

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });

    // Smooth scrolling

    const smoothScrolling = () => { 
        let arrowUp = document.querySelector('.up');
        const clientHeight = document.documentElement.clientHeight;
        arrowUp.style.display = 'none';
        
        arrowUp.addEventListener('click', () => {
          document.querySelector('body').scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        });
        
        window.addEventListener('scroll', () => {
          if (document.body.scrollTop > clientHeight || document.documentElement.scrollTop > clientHeight) {
            arrowUp.style.display = 'block';
          } else {
            arrowUp.style.display = 'none';
          } 
        });
      };

      smoothScrolling();
      new WOW().init();
});   

