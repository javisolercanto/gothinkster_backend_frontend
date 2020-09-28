class HomeSliderCtrl {
    constructor() {
        this.interval = 5000;
        this.noWrapSlides = false;

        this.slides = [
            {image: "https://amcnetworks.es/wp-content/uploads/2019/12/Narcos-XTRM-1024x604.jpg", text: "Narcos", id:0},
            {image: "https://i1.wp.com/www.moonmagazine.info/wp-content/uploads/2019/05/el-adios-para-una-epopeya-que-nos-obsequia-al-final-game-of-thrones-2.jpg?fit=1100%2C580&ssl=1", text: "Game of Thrones", id:1},
            {image: "https://occ-0-92-1723.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABUb8y4ccuEVy561Cyng-U7DYPnvBSEtASh7jutgnPDpIpjLmnSW3ke7syU6UCS9XFi9WbJ3PDfMRN3qwuzCP6iTlMTnB.jpg?r=72c", text: "Black Mirror", id:2}]
    }
}

let HomeSlider= {
    /* bindings: {
        slides: '='
    }, */
    controller: HomeSliderCtrl,
    templateUrl: "components/home-helpers/home-slider.html"
};

export default HomeSlider;