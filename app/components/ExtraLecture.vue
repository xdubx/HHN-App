<template>
    <Page class="page">>
        <ActionBar class="action-bar">
            <GridLayout width="100%" columns="auto, *">
                <Label class="title" text="Select yout Lectures"  col="1"/>
            </GridLayout>
            <ActionItem position="right">
                <Label text="Finish" class="fa action-item icon-gray" verticalAlignment="center" @tap="onFinishTap"/>
           </ActionItem>
        </ActionBar>
        <StackLayout class="page-content" > 
            <Label text="Course"/> 
            <ListPicker ref="coursePic" :items="couseList" selectedIndex="0"  @selectedIndexChange="selectedIndexChanged" class="c-picker"></ListPicker> 
            <Label text="Semester"/> 
            <ListPicker ref="semPic"  :items="semList" selectedIndex="0"  class="c-picker"></ListPicker>        
            <Button text="Get Lectures" @tap="loadLectures"/>
            <StackLayout class="hr-light"></StackLayout>
            <RadListView v-if="!isLoading" for="item in lecList"  class="list-group">
                <ListViewLinearLayout v-tkListViewLayout scrollDirection="Vertical"/>
                    <v-template>
                        <check-box :ref="$index" :text="item" checked="true" />
                    </v-template>
            </RadListView>  
            <ActivityIndicator v-else :busy="isLoading"/>             
        </StackLayout>
    </Page>
</template>

<script>

import { ListPicker } from "tns-core-modules/ui/list-picker";
import helperService from "../shared/service/helperService";
import icalPaser from '../shared/service/icalPasService';
import { CheckBox } from '@nstudio/nativescript-checkbox';
import Home from "./Home";

export default {

    data() {
      return {
        lectures: [],
        entrys: [],
        semester: ["Select Course fist"],
        courses: [],
        semesterInt: "",
        cousesName: ""
      }
    },
    methods:{
        onFinishTap(){
            //TODO
            let saveList = [];
            var x = 0;
            this.lecList.forEach(element => {
                if(this.$refs[x].nativeView.checked){
                    saveList.push(element);
                }     
                x++;
            });

            if(saveList.length == 0){
                //TODO throw error as toast
                return;
            }

            //get save lectures
            let saveSelection = helperService.getLectures();
            saveSelection[this.cousesName + "/" + this.semesterInt] = saveList;
            let lect = JSON.stringify(saveSelection);
            helperService.saveLectures(lect);
            //after save push home view
            this.lectures = [];

            let calenderSyncList = icalPaser.removeNotSelectedLectures(this.entrys, saveList);
            
            
           // this.$root.renderEntities = calenderSyncList; 
            //TODO exeption by no selected couses

            helperService.saveDataInCalender(calenderSyncList, "Lectures", 0);

            // reload 

            helperService.getDataFromCalender("Lectures").then(function(result){
                console.log(result);
                this.$root.renderEntities = result; 
            }).catch(error => {
                console.log(error);
            });

            this.$navigateTo(Home, {
                clearHistory: true
            });
        },
        selectedIndexChanged(event){
            if(event.value === 0){
                return;
            }
            this.semester = helperService.getSemesterByCourse(this.courses[event.value]);
        },
        loadLectures(){
            let semValue = parseInt(this.$refs.semPic.nativeView.selectedValue);
            let courseValue = this.$refs.coursePic.nativeView.selectedIndex;

            // check if selectec values are valid

            if(isNaN(semValue) || courseValue === 0 ) return;
            var self = this;
            icalPaser.getIcalString(helperService.getLinkForDownload(this.$refs.coursePic.nativeView.selectedValue, semValue)).then(result =>{
                let course = icalPaser.paseToCourseArray(result);
                self.lectures = icalPaser.getLecturesFromArray(course);
                let sortedByDate = icalPaser.sortByDate(course);
                self.entrys = icalPaser.sortToOneArray(sortedByDate);
            }).catch(e =>{
                //TODO error toast by not internet connection
                console.log("error in ical result:" + e);
            });
        }
    },
    computed: {
        lecList(){
            return this.lectures;
        },
        isLoading(){
            return !this.lecList.length;
        },
        couseList(){
            return this.courses;
        },
        semList(){
            return this.semester;
        }
    },
    beforeMount() {
        this.courses = helperService.getCouseList();
    },
    mounted() {
        helperService.requestCalenderPermission();
    },
}
</script>
<style lang="scss">
    .c-picker {
        background-color: rgb(231, 229, 229);
        border-width: 1;
        height: 100;
        margin: 5 5 5;
        vertical-align: middle;
    }
</style>