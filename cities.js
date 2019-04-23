"use strict";
//requiers cities-service.js

;(function() {

    class Game {
        constructor(){
            this.currentCity;
            this.CITIES;
            this.promiseCITIES = CitiesService.getCities();
        }

        //Get the city from the user and find the next city
        play() {
            this.promiseCITIES.then((valueCities)=>{
                this.CITIES = valueCities;
                let userCity = document.forms.cityInput.elements.city.value.trim();
            
                if(userCity && this.checkUserCity(userCity)){
                    this.currentCity = userCity;
                    //add user city to the list of used cities, i.e. flag it in CITIES;
                    this.markCityAsUsed(userCity);
                
                    //Find a next city for the user
                    let computerCity = this.findCity(userCity);
                
                    if (computerCity) {
                        //insert new city name in DOM element and clean the input
                        this.printTheCity (computerCity);
                    } else {
                        //give up, the user won
                        //offer to play again
                        alert(`Вы выиграли!
    Можете начать заново.`);
                        this.restart();
                    }
                    
                } 
    
                document.forms.cityInput.elements.city.value = "";
            });

        }

        stop() {
            this.restart();
            alert (`Вы проиграли.
Можете начать заново.`);
        }

        restart() {
            this.currentCity = "";
            this.CITIES = JSON.parse(CITIESLIST);
            this.promiseCITIES = CitiesService.getCities();
        }

        //Find a city by the last letter of input city
        findCity (userCity) {
            ///get starting letter for a new city
            let startingLetter = this.getLastLetter(userCity);
            let newCity;

            //find a not used city starting from this letter
            let citiesArray =  Object.keys(this.CITIES[startingLetter]);

            for (let i = 0; i < citiesArray.length; i++){
                if (this.CITIES[startingLetter][citiesArray[i]] == 0) {
                    newCity = citiesArray[i];

                    this.markCityAsUsed(newCity);
                    this.currentCity = newCity;
                    break;
                }
            }

            return newCity;

        }

        checkUserCity (city) {
            let firstLetter = city.charAt(0).toUpperCase();

            if (!this.CITIES[firstLetter]) {
                alert("Кажется, такой город не существует.");
                return false;
            }
            //The city from the user must be a real city
            //Get the first letter, find the city in the list

            if (!(city in this.CITIES[firstLetter])) {
                alert("Кажется, такой город не существует.");
                return false;
            }

            //The city should start from the correct letter
            if (this.currentCity) {
                let lastLetter = this.getLastLetter(this.currentCity);
                if (firstLetter != lastLetter) {
                    alert("Город должен начинаться на букву " + lastLetter);
                    return false;
                }
            } 

            if(this.isUsedCity(city)){
                alert("Этот город уже был!");
                return false;
            } else {
                //If the city is correct
                return true;
            }

        }

        isUsedCity (city) {
            
            if (this.CITIES[city.charAt(0)][city] == 1){
                return true;
            } else {
                return false;
            }   
        }

        markCityAsUsed (city) {
            this.CITIES[city.charAt(0)][city] = 1;
        }

        getLastLetter (city) {
            //logic to find apropriet last letter
            let lastLetter = city.slice(-1).toUpperCase();
            if (lastLetter == "Ь" || lastLetter == "Ё" || lastLetter == "Ы"){
                lastLetter = city.slice(-2, -1).toUpperCase();
            }
            return lastLetter;
        }

        printTheCity (city) {
            document.getElementsByClassName("computer-city")[0].innerText = city;
        }

    }
    
    window.GameCities = new Game ();

}());