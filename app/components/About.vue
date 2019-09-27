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
            <Label class="action-bar-title" text="About"></Label>
        </ActionBar>

        <StackLayout class="page-content">
            <Label class="page-icon fa" text.decode="&#xf005;"></Label>
            <Label class="page-placeholder" :text="message"></Label>
            <Label class="" text="Data Protection & Privacy"></Label>
            <!-- TOOD add text -->
            <Label class="" text="Do you want to extend the app or have suggestions what is missing? Then contact me:"></Label>
            <Label class="" text="Souce Code: LINK TO GITHUB"></Label>
        </StackLayout>
    </Page>
</template>

<script>
/**
 * TODO load from file json with array informations render it as card informations
 * 
 * 
 * All data collected in this app is stored locally on your device. No data will be sent to the internet, only downloaded. This only includes the lecture information. 
 * 
 * 
 * 
 */
    import * as utils from "~/shared/utils";
    import SelectedPageService from "../shared/selected-page-service";

    export default {
        mounted() {
            SelectedPageService.getInstance().updateSelectedPage("About");
        },
        computed: {
            message() {
                return "<!-- Page content goes here -->";
            }
        },
        methods: {
            onDrawerButtonTap() {
                utils.showDrawer();
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
