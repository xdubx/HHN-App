<template>
    <Page class="page">>
        <ActionBar class="action-bar">
            <GridLayout width="100%" columns="auto, *">
                <Label class="title" text="Setup"  col="1"/>
            </GridLayout>
        </ActionBar>
        <StackLayout class="page-content" >
            <Label text="Course"/> 
            <ListPicker ref="cousePic" :items="couseList" selectedIndex="0"  @selectedIndexChange="selectedIndexChanged" class="c-picker"></ListPicker> 
            <Label text="Semester"/> 
            <ListPicker ref="semPic"  :items="semList" selectedIndex="0"  class="c-picker"></ListPicker> 
            <StackLayout class="hr-light"></StackLayout>
            <Label text="Location"/> 
            <ListPicker ref="locPic"  :items="locList" selectedIndex="0"  class="c-picker"></ListPicker> 
            <StackLayout class="hr-light"></StackLayout>
            <Label text="Push Notifications for:"/> 
            <check-box ref="checkLect" text="Lectures" checked="true" />
            <check-box ref="checkEvent" text="Events" checked="true" />
            <StackLayout class="hr-light"></StackLayout>
            <Label text="You can change the variables in the Settings tab"/> 
            <Button text="Save" class="" @tap="saveVarsInAppPrefs"/>
        </StackLayout>
    </Page>
</template>

<script>

import { ListPicker } from "tns-core-modules/ui/list-picker";
import * as helperService from "../shared/service/helperService";
import { CheckBox } from '@nstudio/nativescript-checkbox';
import Home from "./Home";

export default {

    data() {
      return {
        courses: [],
        semester: ["Select Course fist"],
        locations: ["Select Location"],
      }
    },
    methods:{
        selectedIndexChanged(event){
            if(event.value === 0){
                return;
            }
            this.semester = helperService.default.getSemesterByCourse(this.courses[event.value]);
        },
        saveVarsInAppPrefs(){
            //TODO 
            let semValue = parseInt(this.$refs.semPic.nativeView.selectedValue);
            let locValue = this.$refs.locPic.nativeView.selectedIndex;
            let courseVal = this.$refs.cousePic.nativeView.selectedIndex;
            if(isNaN(semValue) || locValue === 0 || courseVal === 0){
                console.log("Something is not selected");
                return;
            }
            helperService.default.saveLocation(locValue);
            this.$root.loc = locValue;
            helperService.default.saveCourse(this.$refs.cousePic.nativeView.selectedValue);
            this.$root.cou = this.$refs.cousePic.nativeView.selectedValue;
            helperService.default.saveSemester(semValue);
            this.$root.sem = semValue;
            helperService.default.saveLectures(this.$refs.checkLect.nativeView.checked);
            helperService.default.saveEvent(this.$refs.checkEvent.nativeView.checked);
            helperService.default.setFirstStartUp();

            //after save push home view
             this.$navigateTo(Home, {
                    clearHistory: true
                });
        }
    },
    computed: {
        couseList(){
            return this.courses;
        },
        locList(){
            return this.locations;
        },
        semList(){
            return this.semester;
        }
    },
    beforeMount() {
        this.courses = helperService.default.getCouseList();
        this.locations = helperService.default.getLocatons();    
        this.courses.unshift("Select Course");
        this.locations.unshift("Select Location");
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