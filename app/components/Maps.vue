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
            <Label class="action-bar-title" text="Map"></Label>
        </ActionBar>

        <GridLayout class="page-content">
            <ImageZoom ref="ImageElem" src="imageSrc.jpg" maxZoom="5" minZoom="2"></ImageZoom>
        </GridLayout>
    </Page>
</template>

<script>
    import * as utils from "~/shared/utils";
    import SelectedPageService from "../shared/selected-page-service";

    export default {
        data() {
            return {
            }
        },
        mounted() {
            SelectedPageService.getInstance().updateSelectedPage("Map");
            switch (this.$root.locId) {
                case 1:
                    this.$refs.ImageElem.nativeView.src = "~/shared/data/img/2019-hn-sontheim-lageplan.jpg";
                    break;
                case 2:
                    this.$refs.ImageElem.nativeView.src = "~/shared/data/img/2019-hn-sontheim-lageplan.jpg";
                    break;
                case 3:
                    this.$refs.ImageElem.nativeView.src = "~/shared/data/img/2019-hn-sontheim-lageplan.jpg";
                    break;
                default:
                    break;
            }
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
        },
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables

    // Custom styles
</style>
