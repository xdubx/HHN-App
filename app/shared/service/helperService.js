import * as data from "../data/courseIds";
import * as appSettings from "tns-core-modules/application-settings";

/**
 * Helper Class to manage JSON Data & appSettings
 */
export default {
    //------------- Get Data ------------------
    getCouseList(){
        var holder = Object.keys(data.courses.course);
        console.log(holder);
        return holder;
    },
    getSemesterByCourse(key){
        var holder = Object.keys(data.courses.course[key]);
        console.log(holder);
        return holder;
    },
    getLocatons(){
        return data.locations;
    },
    //------------- Get Appsettings ------------------
    getSavedLocation(){
        return appSettings.getNumber("Location");
    },
    getSavedCourse(){
        return appSettings.getString("Course");
    },
    getSavedSemester(){
        return appSettings.getNumber("Semester");
    },
    getFirstStartUp(){
      return appSettings.getBoolean("Setup");
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
        appSettings.setBoolean("Lectures", lectures);
    },
    saveEvent(event){
        appSettings.setBoolean("Events", event);
    },
    setFirstStartUp(){
        appSettings.setBoolean("Setup", true);
    }
}