import { getString } from "tns-core-modules/http";
import course from "../models/course";
import event from "../models/event";

/**
 * Class to Pase ICAL files 
 */
export default {
    /**
     * Download ICal File from a webserver over the http protocol
     * @param {String} url to the ICal file
     */
    async getIcalString(url) {
        return getString(url).then((content) => {
            var lines = content.split("\n");
            return lines;
        }).catch((error) => {
            console.log("Cannot fetch ical file: " + error);
        });
    },
    /**
     * Pase the ical file based on the syntax of the splan
     * @param {String[]} lines from the downloaded file
     */
    paseToCourseArray(lines) {
        var list = [];
        var name = "";
        var uuid = "";
        var fullDesc = "";
        var loc = "";
        var prof = "";
        var start = null;
        var end = null;
        for (var x = 0; x < lines.length; x++) {
            if(lines[x].indexOf("BEGIN:VEVENT") === 0){
                name = "";
                fullDesc = "";
                prof = "";
                uuid = "";
                start = null;
                end = null;

                start = this.getDateTimeFromIcalString(lines[x+2]);
                end = this.getDateTimeFromIcalString(lines[x+3]);
                name = this.getTextFromIcalString(lines[x+4]);
                uuid = this.getTextFromIcalString(lines[x+5]);
                loc = this.getTextFromIcalString(lines[x+6]);
                var text = this.getTextFromIcalString(lines[x+7]);
                var string = text.split("\\n");
                fullDesc = string[0];
                prof = string[1];
                x = x + 7;
            }
            if (lines[x].indexOf("END:VEVENT") === 0 && name.length !== 0 && prof.length !== 0 && start !== null && end !== null) {
                list.push(new course(name, prof, loc, start, end, fullDesc));
                //TODO remove this and look if some missing or wrong data apears
                name = "";
                fullDesc = "";
                prof = "";
                uuid = "";
                start = null;
                end = null;
            }
        };
        console.log("end reached with " + list.length + " entities");
        return list;
    },
    /**
     * Get a list from all lectures of the course
     * @param {Array} list 
     */
    getLecturesFromArray(list){
        let lectures = [];
        list.forEach(element => {
            let found = lectures.find(function(elem){
                return element.name.toString() === elem.toString();
            });
            if(found == null){
                lectures.push(element.name);
            }
        });
        return lectures;
    },
    /**
     * TODO make it more space saving
     */
    removeNotSelectedLectures(list, include){
        let holder = [];
        list.forEach(element => {
            let found = include.find(function(elem){
                return element.name == elem;
            });
            if(found != null){
                holder.push(element);
            }
        });
        return holder;
    },
    //TODO update this shit
    /**
     * Pase the ical strings by the syntax of the asta website
     * @param {String[]} lines 
     */
    paseToEventArray(lines) {
        var list = [];
        var name = "";
        var desc = "";
        var url = "";
        var loc = "";
        var start = null;
        var end = null;
        var descBool = false;
        for (var x = 0; x < lines.length; x++) {

            if(lines[x].indexOf("BEGIN:VEVENT") === 0){
                
                name = "";
                fullDesc = "";
                prof = "";
                uuid = "";
                start = null;
                end = null;

                start = this.getDateTimeFromIcalString(lines[x+2]);
                end = this.getDateTimeFromIcalString(lines[x+3]);
                name = this.getTextFromIcalString(lines[x+7]);
                x=x+7;
            }       
            if (lines[x].indexOf("URL") === 0) {
                url = this.getTextFromIcalString(lines[x]);
                descBool = false;
                continue;
            }
            if (lines[x].indexOf("LOCATION") === 0) {
                loc = this.getTextFromIcalString(lines[x]);
                continue;
            }
            
            if (lines[x].indexOf("DESCRIPTION") === 0 || descBool == true) {
                if(descBool){
                    desc = desc + lines[x];
                }else{
                    desc = this.getTextFromIcalString(lines[x]);
                }
                descBool = true;
                continue;
            }

            if (lines[x].indexOf("END:VEVENT") === 0 && name.length !== 0 && desc.length !== 0 && start !== null && end !== null) {
                list.push(new event(name, desc, url, loc, start, end));
                // clear vars
                name = "";
                desc = "";
                url = "";
                loc = "";
                //
                start = null;
                end = null;
            }
        }
    },
    /**
     * Sort the array with the couses based on the keys with a bubble sort
     * @param {Array} list of the couses stacked by the date as key
     */
    sortByDate(list) {
        var JSONArray = [];

        for (let index = 0; index < list.length; index++) {
            const element = list[index];

            if (JSONArray.length === 0) { // no keys
                var x = [];
                x.push(element);
                JSONArray.push(x);
                continue;
            }

            var found = false;
            var keyStone = 1;
            for (let index = 0; index < JSONArray.length; index++) {
                if (JSONArray[index][0].start.getDate() === element.start.getDate() && JSONArray[index][0].start.getMonth() === element.start.getMonth()) {
                    found = true;
                    keyStone = index;
                    break;
                }
            }
            if (found) {
                // push item to they time key
                JSONArray[keyStone].push(element);
            } else {
                //Date is not as key there add the key to the array & add item
                var x = [];
                x.push(element);
                JSONArray.push(x);
            }

        }
                                    
        //Bubble Sort 
        var length = JSONArray.length;
        for (var i = 0; i < length; i++) { //Number of passes
          for (var j = 0; j < (length - i - 1); j++) { //Notice that j < (length - i)
            //Compare the adjacent positions
            if (JSONArray[j][0].start > JSONArray[j + 1][0].start) {
              //Swap the numbers
              var tmp = JSONArray[j]; //Temporary variable to hold the current number
              JSONArray[j] = JSONArray[j + 1]; //Replace current number with adjacent number
              JSONArray[j + 1] = tmp; //Replace adjacent number with current number
            }
          }
        }
        return JSONArray;
    },
    /**
     * Move all couses from a object into a array to render it in the view
     * @param {Array} list of all couses with key sort 
     */
    sortToOneArray(list) {
        //sort for right date
        var x = [];
        for (let index = 0; index < list.length; index++) {
            const element = list[index];
            element.forEach(el => {
                x.push(el);
            });
        }
        return x;
    },
    /**
     * Delete old couses from the array if is the start date smaller than the date+time yet
     * @param {Array} list 
     */
    removeOldData(list) {
        var x = [];
        
        for (let index = 0; index < list.length; index++) {
            const element = list[index];
            if ((element[0].start > new Date())) {
                x.push(element);
            }
        }
        return x;
    },
    /**
     * Create a Date Object with of the given String 
     * @param {String} str of the date
     */
    getDateTimeFromIcalString(str) {
        const dteNum = str.split(":")[1];
        // icalStr = '20110914T184000Z'  //         
        var strYear = dteNum.substr(0, 4);
        var strMonth = dteNum.substr(4, 2);
        var strDay = dteNum.substr(6, 2);
        var strHour = dteNum.substr(9, 2);
        var strMin = dteNum.substr(11, 2);
        return new Date(strYear, strMonth-1, strDay, strHour, strMin, 0);
    },
    /**
     * Split the string to be readable
     * @param {String} str 
     */
    getTextFromIcalString(str) {
        const idx = str.indexOf(":");
        return str.substr(idx + 1);
    }
}