class HomeSliderCtrl {

    constructor(){
  
      this.myInterval = 5000;
      this.noWrapSlides = false;

      this.slides = [ {image:'/images/food1.jpg',text:"Arros a la cubana",id:0},
                    {image:'/images/food2.jpg',text:"Arros a banda",id:1}];

    }
  }
  

  let HomeSlider = {
    controller: HomeSliderCtrl,
    templateUrl: 'home/home-slider.html'
  };

  export default HomeSlider;
  