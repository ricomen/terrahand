//jQuery begin
$(document).ready(function() {
  var cart = {};//корзина 

  // выбор размера товара (выпадающее меню)
  // $('.product__size').hover(
  //   function() {$(this).closest(".product").find(".product__size-list").slideDown();},
  //   function() {$(this).closest(".product").find(".product__size-list").slideUp();}
  // );

  $("li.product__size-item").on("click", function() {  
    $(this).closest(".product").find('.product__size > input').val($(this).data("size"));
    
  });

  $(".user-block__btn").on("click", function(e) {
    e.preventDefault();
  });



  //фиксированная плашка меню при прокрутке  
  var pageTopHeight = $(".page-header__top").outerHeight();
  var pageBodyHeight = $(".page-header__body").outerHeight();  
  var checker = 0;

  $(window).on("resize", function() {
    if( $(this).width() > 1199) {
      $(this).on("scroll", function() {    
        if($(this).scrollTop() > (pageBodyHeight + pageTopHeight) && checker != 1) {      
          $(".page-header__body").clone().prependTo(".page-header").addClass('page-header__body--fixed');
            checker = 1;
        } else if ($(this).scrollTop() <= pageTopHeight && checker != 0) {
            checker = 0;
            $(".page-header__body").removeClass('page-header__body--fixed');
            $(".page-header > .page-header__body:first").remove();      
        };
      });      
    }
  });

  // количество товара
  $(".product__quantity button[type='button']").on("click", function() {
    var count = parseInt($(this).closest(".product").find("input[name='product-quantity']").val());
    ($(this).data("action") == "plus") ? count++ : count--;
    ( count < 1 ) ? count = 1 : count;
    $(this).closest(".product").find("input[name='product-quantity']" ).val( count + " шт" );    
  });

  //добавляем в корзину
  $(".product__buy").on("click", function(e) {
    e.preventDefault();
    addToCart($(this));
  });
  
  //добавляем товар в корзину
  function addToCart(product) {
    var articul = product.closest(".product").find(".product__article").attr("data-article");
    var size = product.closest(".product").find(".product__size input").val();
    var quantity = parseInt(product.closest(".product").find(".product__quantity input").val());
    cart[articul] = {quantity, size};    
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  //Прокрутка страницы вверх
  $(".btn--to-top").on("click", function(e) {
    e.preventDefault();
    $("html, body").animate({
      scrollTop: 0
    } , 300);
  });

  //Удаление из корзины
  $(".user-block__cart-btn").on("click", function() {
    $(this).closest('.user-block__cart-item').remove();
  });
 

  //Фильтр каталога мобильная версия
  $("#catalog-filter").on("click", function(e){
    e.preventDefault();
    $(".catalog__filter-wrap").toggle();
  });
  //Выбор валюты мобильная версия
  $("#catalog-currency").on("click", function(e){
    e.preventDefault();
    $(this).next().toggle();
  });
  //Меню Навигации мобильная версия
  $("#catalog-nav").on("click", function(e){
    e.preventDefault();
    $(this).next().toggle();
  });

  //slider
  $(".slider__wrap").slick({
    dots: true,
    arrows: true,    
    prevArrow: ".slider__control-prev",
    nextArrow: ".slider__control-next"
  });

  //меню фильтра
  $(".catalog__filter-spoiler").on("click", function() {
    $(this).closest(".catalog__filter-item").toggleClass("catalog__filter-item--active");
  });
  $(".catalog__filter-type").on("click", function() {
    $(this).toggleClass("catalog__filter-type--active");
  });

  //слайдер диапазон цены begin
   $( ".catalog__filter-slider" ).slider({
      range: true,
      min: parseInt($("input#minCost").attr("data-range")),
      max: parseInt($("input#maxCost").attr("data-range")),
      values: [0, 25000],
      stop: function(event, ui) {
        $(".ui-slider-handle span:eq(0)").html($("#slider-range").slider("values",0));
        $(".ui-slider-handle span:eq(1)").html($("#slider-range").slider("values",1));

      },
      slide: function(event, ui){
        $(".ui-slider-handle span:eq(0)").html($("#slider-range").slider("values",0));
        $(".ui-slider-handle span:eq(1)").html($("#slider-range").slider("values",1));        
      }      
    });
   
     $("<span>").appendTo(".ui-slider-handle");
     $(".ui-slider-handle span:eq(0)").html($("#slider-range").slider("values",0));
     $(".ui-slider-handle span:eq(1)").html($("#slider-range").slider("values",1));
      
     $("input#minCost").on("change", function() {
       $("#slider-range").slider("values", 0, parseInt($(this).val()));
       $("#slider-range").slider({min: parseInt($(this).val())});  
       $(".ui-slider-handle span:eq(0)").html(parseInt($(this).val()));
     });
   
     $("input#maxCost").on("change", function() {
       $("#slider-range").slider("values", 1, $(this).val());
       $("#slider-range").slider({max: parseInt($(this).val())}); 
       $(".ui-slider-handle span:eq(1)").html(parseInt($(this).val()));
     });
     //слайдер диапазона цены end

});//document ready


$(window).load(function() {
  /* Act on the event */
});
//jQuery end