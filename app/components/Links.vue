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
            <Label class="action-bar-title" text="Quick Links"></Label>
        </ActionBar>

        <StackLayout class="page-content">
           
        </StackLayout>
        <RadListView for="item in linkList"  class="list-group">
            <ListViewLinearLayout v-tkListViewLayout scrollDirection="Vertical"/>
                <v-template>
                    <Button :text="item.name" @tap="openSite(item.url)"/>
                </v-template>
        </RadListView> 
    </Page>
</template>

<script>

// TODO render buttons as win 10 tile
import * as utils from "~/shared/utils";
import SelectedPageService from "../shared/selected-page-service";
import * as utilityModule from "tns-core-modules/utils/utils";
import helperService from '../shared/service/helperService';
    export default {
        data() {
            return {
            }
        },
        mounted() {
            SelectedPageService.getInstance().updateSelectedPage("Links");
        },
        computed: {
            message() {
                return "<!-- Page content goes here -->";
            },
            linkList(){
                return helperService.getLinks();
            }
        },
        methods: {
            onDrawerButtonTap() {
                utils.showDrawer();
            },
            openSite(url){
                  utilityModule.openUrl(url);
            }
        },
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables

    // Custom styles
</style>
