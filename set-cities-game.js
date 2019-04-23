"use strict";
//requiers cities.js

;(function() {

    document.forms.cityInput.onsubmit = onCityInput;

    document.forms.cityInput.elements.playButton.addEventListener('click', handlePlay, false);
    document.forms.cityInput.elements.stopButton.addEventListener('click', handleStop, false);

    function onCityInput (event) {
        GameCities.play();
        event.preventDefault();
    }

    function handlePlay() {
        GameCities.play()
    }

    function handleStop() {
        GameCities.stop()
    }

}());