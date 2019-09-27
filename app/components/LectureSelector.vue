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
        <GridLayout class="page-content" >        
            <!-- <StackLayout class="hr-light"></StackLayout> -->
            <RadListView v-if="!isLoading" for="item in lecList"  class="list-group">
                <ListViewLinearLayout v-tkListViewLayout scrollDirection="Vertical"/>
                    <v-template>
                        <check-box :ref="$index" :text="item" checked="true" />
                    </v-template>
            </RadListView>  
            <ActivityIndicator v-else :busy="isLoading"/>             
        </GridLayout>
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
            let saveSelection = {};
            saveSelection[this.$root.cou + "/" + this.$root.sem] = saveList;
            let lect = JSON.stringify(saveSelection);
            this.$root.lec = lect;
            helperService.saveLectures(lect);
            //after save push home view
            this.lectures = [];

            let calenderSyncList = icalPaser.removeNotSelectedLectures(this.entrys, saveList);
            //console.log(calenderSyncList);

            this.$root.renderEntities = calenderSyncList; 
            //TODO exeption by no selected couses

            //TODO Optimize the screen after selection for a wait screen to much couses block the execute stack and the app freeze the sceen 
            helperService.saveDataInCalender(calenderSyncList, "Lectures", 0);
            //helperService.getDataFromCalender("Lectures");

            this.$navigateTo(Home, {
                clearHistory: true
            });
        }
    },
    computed: {
        lecList(){
            return this.lectures;
        },
        isLoading(){
            return !this.lecList.length;
        }
    },
    beforeMount() {
            icalPaser.getIcalString(helperService.getLinkForDownload(this.$root.cou, this.$root.sem)).then(result =>{
                let course = icalPaser.paseToCourseArray(result);
                this.lectures = icalPaser.getLecturesFromArray(course);
                let sortedByDate = icalPaser.sortByDate(course);
                // ready to set it into the calender
                this.entrys = icalPaser.sortToOneArray(sortedByDate);
                //let clearedSort = icalPaser.default.removeOldData(x);
                

            //TODO save data into calender
            //TODO error toast by not internet connection
            }).catch(e =>{
                console.log("error in ical result:" + e);
            });
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