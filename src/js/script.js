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
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');
});   

