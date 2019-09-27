import * as data from "../data/courseIds";
import * as appSettings from "tns-core-modules/application-settings";
import * as Calendar from "nativescript-calendar";
import course from "../models/course";
/**
 * Helper Class to manage JSON Data & appSettings
 */
export default {
    //------------- Get Data ------------------
    getCouseList(){
        let holder = Object.keys(data.courses.course);
        console.log(holder);
        return holder;
    },
    getSemesterByCourse(key){
        let holder = Object.keys(data.courses.course[key]);
        console.log(holder);
        return holder;
    },
    getLocatons(){
        console.log(data.locations);
        return data.locations.slice(0);
    },
    getLinkForDownload(cou, sem){
        let x = data.courses.course[cou][sem];
        console.log(x);
        return x;
    },
    async getDataFromCalender(calenderName){
        var options = {
            startDate: new Date(new Date().getTime() - (24*60*60*1000)),
            endDate: new Date(new Date().getTime() + (14*24*60*60*1000))
          };
          //TODO return at right position
        let list =  await Calendar.findEvents(options).then(
            function(events) {
              //console.log(JSON.stringify(events));
              
                let eventList = events.filter(function(event){
                    return event.calendar.name == calenderName;
                });
                return eventList;
            },
            function(error) {
              console.log("Error finding Events: " + error);
              return [];
            }
        );
        
        let courses = [];
        list.forEach(element => {
            courses.push(new course(element.title, "",element.location,element.startDate,element.endDate,element.nodes));
        });

        return new Promise(function(resolve, reject) {       
            resolve(couses);
        }); 
    },
    getDataForToDay(list){
        var holder = [];
        var today = new Date();
        if(list.length){
            list.forEach(element => {
                if(element.start.getDay() == today.getDay() && element.start.getMonth() == today.getMonth()){
                    holder.push(element);
                }
            });
        }
        if(holder.length == 0){
            holder.push({name: "Nohing special today"})
        }
        return holder;
    },
    //------------- Get Appsettings ------------------
    //TODO Add has function
    getSavedLocation(){
        console.log("loc");
        if(appSettings.hasKey("Location")){
            return appSettings.getNumber("Location");
        }else{
            //todo error
        }
    },
    getSavedCourse(){
        console.log("cou");
        return appSettings.getString("Course");
    },
    getSavedSemester(){
        console.log("numb");
        return appSettings.getNumber("Semester");
    },
    getFirstStartUp(){
        console.log("fist");
        return appSettings.getBoolean("Setup");
    },
    getSelectedLectures(){
        console.log("lec");

        // let lec = appSettings.getString("Lectures");
        // let x = JSON.parse(lec);
        return [];
    },
    //------------- Save ------------------
    saveLocation(location){
        appSettings.setNumber("Location", location);
    },
    saveCourse(course){
        appSettings.setString("Course", course);
    },
    saveSemester(semester){
        appSettings.setNumber("Semester", semester);
    },
    saveLectures(lectures){
        appSettings.setString("Lectures", lectures);
    },
    savePushLectures(lectures){
        appSettings.setBoolean("PushLectures", lectures);
    },
    savePushEvent(event){
        appSettings.setBoolean("PushEvents", event);
    },
    setFirstStartUp(){
        appSettings.setBoolean("Setup", true);
    },
    /**
     * Save List of alle lectures tah are selected 
     * @param {Array} lec 
     */
    saveSelectedLectures(lec){
        appSettings.setString("Lectures", lec);
    },
    saveCalenderEventIds(list){
        appSettings.setString("CalenderIDs", list);
    },
    /**
     * 
     * @param {Array} list 
     * @param {String} clanderName 
     */
     async saveDataInCalender(list, calenderName, count){
        
        if(count > list.length) return;

            var options = {
                title: list[count].name,
                startDate: list[count].start,
                endDate: list[count].end,
                location : list[count].location,
                notes : list[count].desc,
                url : "",
                reminders : { first: 15 }, // second:
                calendar : { name: calenderName, color: "", accountName: "HNN+"}
              };
              var self = this;
            Calendar.createEvent(options).then(
                function(createdId) {
                  console.log("Created Event with ID: " + createdId);
                  count++
                  self.saveDataInCalender(list, calenderName, count)
                //   calenderIdList.push(createdId);
                //   if(counter > list.length){
                //     // save it
                //     this.saveCalenderEventIds(JSON.stringify(calenderIdList));
                //   }
                },
                function(error) {
                  console.log("Error creating an Event: " + error);
                }
            ); 
    },
    //-------------------------------------------
    clearAppSettings(){
        appSettings.clear();
    },
    clearCalender(){
        Calendar.deleteCalendar({
            name: "Lectures"
          }).then(id => {
            // id is null if nothing was deleted
            console.log(`Deleted Calendar with id ${id}`);
          });
    },
    requestCalenderPermission(){
        Calendar.hasPermission().then(
            function(granted) {
              dialogs.alert({
                title: "Permission granted?",
                message: granted ? "YES" : "NO",
                okButtonText: "OK"
              });
            }
        );
    }
}