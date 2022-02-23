/**
 * Allow to get informations from the configuration file of the game
 */
 class Wrapper{
     /**
      * Constructor of wrapper of a configuration file
      * @param {String} filename the name of the configuration file, 
      * by default use the file listing the available games
      */
    constructor(filename = "gameList.json"){
        this.data = require("../public/games/" + filename);
    }

    /**
     * Get the list of available games
     * @returns the list of games
     */
    getGameList(){
        return this.data;
    }

    /**
     * Get information relating to the introduction of the game
     * @returns the introduction of the game
     */
    getIntro(){
        return this.data.intro;
    }

    /**
     * Get the number of places to visit during the game
     * @returns the number of places
     */
    getNbPlaces(){
        return Object.keys(this.data.parcours).length;
    }

    /**
     * Get the first place of the course
     * @returns the first place
     */
    getFirstPlace(){
        for(let [place, infos] of Object.entries(this.data.parcours)) {
            if(infos.depart){
                return place;
            }
        }
    }

    /**
     * Get the next place of the course
     * @param {String} currentPlace the current place 
     * @returns an array of strings which represent the next place(s)
     */
    getNextPlace(currentPlace){
        return this.data.parcours[currentPlace].suivants;
    }

    /**
     * Get the name of a place
     * @param {String} place the identifier of the place for which we want the name
     * @returns the name of the place
     */
     getPlaceName(place){
        return this.data.parcours[place].nom;
    }

    /**
     * Get the geographical position of a place
     * @param {String} place the place for which we want the geographical position
     * @returns the geographical position of the place
     */
     getPlacePosition(place){
        return this.data.parcours[place].position;
    }

    /**
     * Get the informations related to a place
     * @param {String} place the place for which we want the informations
     * @returns the informations related to the place
     */
    getPlaceInfo(place){
        return this.data.parcours[place].infos;
    }

    /**
     * Get the puzzle associated to the place
     * @param {String} place the place for which we want the puzzle 
     * @returns the puzzle associated to the place
     */
    getPuzzleForPlace(place){
        return this.data.enigme[this.data.parcours[place].enigme];
    }
} export default Wrapper;