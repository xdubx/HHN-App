<template lang="html">
<GridLayout rows="auto, *" class="sidedrawer sidedrawer-left">
            <StackLayout row="0" class="sidedrawer-header">
                <Label class="sidedrawer-header-brand" :text="locationName"></Label>
                <Label class="sidedrawer-header-brand" :text="courseName"></Label>
            </StackLayout>
        
            <ScrollView row="1" class="sidedrawer-content">
                <StackLayout>
                    <GridLayout columns="auto, *" :class="'sidedrawer-list-item' + (selectedPage === 'Home' ? ' selected': '')" @tap="onNavigationItemTap(Home)">
                        <Label col="0" text.decode="&#xf015;" class="fa"></Label>
                        <Label col="1" text="Home" class="p-r-10"></Label>
                    </GridLayout>

                    <GridLayout columns="auto, *" :class="'sidedrawer-list-item' + (selectedPage === 'Calender' ? ' selected': '')" @tap="onNavigationItemTap(Calender)">
                        <Label col="0" text.decode="&#xf1ea;" class="fa"></Label>
                        <Label col="1" text="Calendar" class="p-r-10"></Label>
                    </GridLayout>

                    <GridLayout columns="auto, *" :class="'sidedrawer-list-item' + (selectedPage === 'Maps' ? ' selected': '')" @tap="onNavigationItemTap(Maps)">
                        <Label col="0" text.decode="&#xf59f;" class="fa"></Label>
                        <Label col="1" text="Map" class="p-r-10"></Label>
                    </GridLayout>

                    <GridLayout columns="auto, *" :class="'sidedrawer-list-item' + (selectedPage === 'Mensa' ? ' selected': '')" @tap="openBrowser()">
                        <Label col="0" text.decode="&#xf2e7;" class="fa"></Label>
                        <Label col="1" text="Mensa" class="p-r-10"></Label>
                    </GridLayout>

                    <GridLayout columns="auto, *" :class="'sidedrawer-list-item' + (selectedPage === 'Tips' ? ' selected': '')" @tap="onNavigationItemTap(Tips)">
                        <Label col="0" text.decode="&#xf05a;" class="fa"></Label>
                        <Label col="1" text="Tips" class="p-r-10"></Label>
                    </GridLayout>

                    <GridLayout columns="auto, *" :class="'sidedrawer-list-item' + (selectedPage === 'Links' ? ' selected': '')" @tap="onNavigationItemTap(Links)">
                        <Label col="0" text.decode="&#xf0c1;" class="fa"></Label>
                        <Label col="1" text="Links" class="p-r-10"></Label>
                    </GridLayout>
        
                    <StackLayout class="hr-light"></StackLayout>

                    <GridLayout columns="auto, *" :class="'sidedrawer-list-item' + (selectedPage === 'Settings' ? ' selected': '')" @tap="onNavigationItemTap(Settings)">
                        <Label col="0" text.decode="&#xf013;" class="fa"></Label>
                        <Label col="1" text="Settings" class="p-r-10"></Label>
                    </GridLayout>
                    <GridLayout columns="auto, *" :class="'sidedrawer-list-item' + (selectedPage === 'About' ? ' selected': '')" @tap="onNavigationItemTap(About)">
                        <Label col="0" text.decode="&#xf2bb;" class="fa"></Label>
                        <Label col="1" text="About" class="p-r-10"></Label>
                    </GridLayout>
                </StackLayout>
            </ScrollView>
        </GridLayout>
</template>

<script>
/**
 * TODO Update Font awesome icons
 */
    import Home from "./Home";
    import Calender from "./Calender";
    import Tips from "./Tips";
    import Maps from "./Maps";
    import Links from "./Links";
    import Settings from "./Settings";
    import About from "./About";
    import * as utils from "~/shared/utils";
    import SelectedPageService from "~/shared/selected-page-service";    
    import * as utilityModule from "tns-core-modules/utils/utils";

    
    export default {
        mounted() {
            SelectedPageService.getInstance().selectedPage$
                .subscribe((selectedPage) => this.selectedPage = selectedPage);
        },
        data () {
            return {
                Home: Home,
                Calender: Calender,
                Tips: Tips,
                Maps: Maps,
                Links: Links,
                Settings: Settings,
                About: About,
                selectedPage: ""
            };
        },
        computed: {
            courseName(){
                return this.$root.cou + " " + this.$root.sem;
            },
            locationName(){
                return this.$root.loc;
            }
        },
        components: {
            Home,
            Calender,
            Tips,
            Maps,
            Links,
            Settings,
            About
        },
        methods: {
            onNavigationItemTap(component) {
                this.$navigateTo(component, {
                    clearHistory: true
                });
                utils.closeDrawer();
            },      
            openBrowser(){
                utilityModule.openUrl("https://www.studentenwerk.uni-heidelberg.de/node/136");
            }
             
        }
    };
</script>

<style scoped lang="scss">
    // Custom common variables
    @import '../app-variables';

    // Drawer navigation custom styles
    $sidedrawer-header-image-size: 60;
    $sidedrawer-header-image-offset-top: 20;
    $sidedrawer-header-image-offset-bottom: 5;
    $sidedrawer-list-item-offset-left: 15;
    $sidedrawer-list-icon-offset: 10;
    $sidedrawer-list-icon-size: 20;
    .sidedrawer {
        &.sidedrawer-left {
            background-color: $ab-background;

            .sidedrawer-header-image {
                color: $background-dark;
                height: $sidedrawer-header-image-size;
                width: $sidedrawer-header-image-size;
                font-size: $sidedrawer-header-image-size;
                padding: 0;
                margin-bottom: $sidedrawer-header-image-offset-bottom;
                margin-top: $sidedrawer-header-image-offset-top;
            }

            .footnote {
                color: rgba($ab-color, 0.5);
            }
        }

        .sidedrawer-header {
            background-color: $ab-background;

            .sidedrawer-header-brand {
                color: $ab-color;
            }
        }

        .sidedrawer-content {
            background-color: $side-drawer-background;
        }

        .sidedrawer-list-item {
            padding-left: $sidedrawer-list-item-offset-left;

            Label {
                vertical-align: center;
                color: $blue-dark;
            }

            .fa {
                width: $sidedrawer-list-icon-size;
                margin-right: $sidedrawer-list-icon-offset;
            }

            &.selected {
                background-color: $item-active-background;

                Label {
                    color: $item-active-color;
                }
            }
        }
    }
</style>