//SLIDER, UNA IMAGEN PRINCIPAL Y DOS DE FONDO
document.addEventListener('DOMContentLoaded',() => {
    const elementosCarousel = document.querySelectorAll('.carousel');
    M.Carousel.init(elementosCarousel,{
        duration:150,  //controla el tiempo, mayor numero va mas lento
        dist: -80,  //distancia de perspectiva, cuando se selecciona la imagen que tan grande se ve
        shift:5,   //la distancia de las imagenes a cada uno de los costados
        padding:5,
        numVisible:3,  //cuantas imagenes se visualizan al principio
        indicators:true,
        noWrap:true,

    });
});






//SLIDER CON FLECHAS
var swiper = new Swiper('.swiper-container', {
	navigation: {
	  nextEl: '.swiper-button-next',
	  prevEl: '.swiper-button-prev'
	},
	slidesPerView: 1,
	spaceBetween: 10,
	// init: false,
	pagination: {
	  el: '.swiper-pagination',
	  clickable: true,
	},

  
	breakpoints: {
	  620: {
		slidesPerView: 1,
		spaceBetween: 20,
	  },
	  680: {
		slidesPerView: 2,
		spaceBetween: 40,
	  },
	  920: {
		slidesPerView: 3,
		spaceBetween: 40,
	  },
	  1240: {
		slidesPerView: 4,
		spaceBetween: 50,
	  },
	} 
    });