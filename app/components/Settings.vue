<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <!-- 
            Use the NavigationButton as a side-drawer button in Android
            because ActionItems are shown on the right side of the ActionBar
            -->
            <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap"></NavigationButton>
            <!-- 
            Use the ActionItem for IOS with position set to left. Using the
            NavigationButton as a side-drawer button in iOS is not possible,
            because its function is to always navigate back in the application.
            -->
            <ActionItem icon="res://navigation/menu" 
                android:visibility="collapsed" 
                @tap="onDrawerButtonTap"
                ios.position="left">
            </ActionItem>

            <Label class="action-bar-title" text="Settings"></Label>
        </ActionBar>

        <StackLayout class="page-content">
            <Label text="Theme" />
             <ListPicker ref="colorPic" :items="colorList" selectedIndex="0"  class="c-picker"></ListPicker> 
             <Button text="Reset Data" @tap="resetSettings"/>
        </StackLayout>
    </Page>
</template>

<script>
/**
 * Call Start screen
 * Call couse selector
 * option to add extern courses
 */
    import * as utils from "~/shared/utils";
    import SelectedPageService from "../shared/selected-page-service";
    import Start from "./Start";
    import helperService from '../shared/service/helperService';

    export default {

        data() {
            return {
                colorArray: ["Default"],
            }
        },

        mounted() {
            SelectedPageService.getInstance().updateSelectedPage("Settings");
        },
        computed: {
            message() {
                return "<!-- Page content goes here -->";
            },
            colorList(){
                return this.colorArray;
            }
        },
        methods: {
            onDrawerButtonTap() {
                utils.showDrawer();
            },
            resetSettings(){
                helperService.clearAppSettings();
                helperService.clearCalender();
                this.$root.locId = 0;
                this.$root.sem = 0;
                this.$root.cou = "";
                this.$root.loc = 0;
                this.$navigateTo(Start, {
                    clearHistory: false
                });
            }
        }
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables

    // Custom styles
</style>