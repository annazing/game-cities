"use strict";

;(function() {

    class Cities {
        constructor(){
            this.CITIES = JSON.parse(CITIESLIST);
        }

        getCities() {
            return Promise.resolve(this.CITIES);
        }
    }
    

    window.CitiesService = new Cities ();
}());