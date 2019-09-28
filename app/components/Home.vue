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
            <Label class="action-bar-title" text="Home"></Label>
        </ActionBar>

        <GridLayout class="page-content">
            <RadListView v-if="!isLoading" for="item in eventsList" @itemTap="onItemTap" class="list-group">
                <ListViewLinearLayout v-tkListViewLayout scrollDirection="Vertical"/>
                <v-template>
                    <GridLayout rows="*, *, *" columns="*" class="list-group-item-content">
                        <Label :text="item.name" class="text-primary list-group-item-text font-weight-bold"/>

                        <Label row="1" class="hr-light m-t-5 m-b-5" colSpan="2"/>

                        <!-- <Image row="2" :src="item.ImageUrl" stretch="aspectFill" height="120" class="m-r-20" loadMode="async"/> -->

                        <StackLayout row="2" col="0" verticalAlignment="center" class="list-group-item-text">
                            <Label class="p-b-10">
                                <FormattedString ios.fontFamily="system">
                                    <Span text.decode="&#xf144;" class="fa text-primary icon-gray"></Span>
                                    <Span :text="formatString(item.start)" class="text-left-margin"/> 
                                </FormattedString>
                            </Label>
                            <Label class="p-b-10">
                                <FormattedString ios.fontFamily="system">
                                    <Span text.decode="&#xf28d;" class="fa text-primary icon-gray"/>
                                    <Span :text="formatString(item.end)" class="text-left-margin"/> 
                                </FormattedString>
                            </Label>
                            <Label class="p-b-10">
                                <FormattedString ios.fontFamily="system">
                                    <Span text.decode="&#xf21d;" class="fa text-primary icon-gray"/>
                                    <Span :text="formatString(item.location)" class="text-left-margin"/>
                                </FormattedString>
                            </Label>
                        </StackLayout>
                    </GridLayout>
                </v-template>
            </RadListView>
            <ActivityIndicator v-else :busy="isLoading"/>
        </GridLayout>

    </Page>
</template>

<script>
/**
 * TODO Load only the courses for this day + events + mensa link 
 */

    import * as utils from "~/shared/utils";
    import SelectedPageService from "../shared/selected-page-service";
    import helperService from '../shared/service/helperService';
    export default {
        data() {
            return {
                eventListHolder : []
            }
        },
        mounted() {
            SelectedPageService.getInstance().updateSelectedPage("Home");
        },
        computed: {
            message() {
                return "<!-- Page content goes here -->";
            },
            isLoading() {
                return !this.eventsList.length;
            },
            eventsList(){
                return helperService.getDataForToDay(this.$root.renderEntities);
            }
        },
        methods: {
            onDrawerButtonTap() {
                utils.showDrawer();
            },
            onItemTap(){
               // this.$emit("select", e.item);
               // TODO open modal with details
            },
            formatString(text){
                return " "+ text;
            }
        },
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables

    // Custom styles
      .list-group {
        .list-group-item-content {
            padding: 8 15 4 15;
            background-color: $background-light;
        }

        .list-group-item-text {
            margin: 2 3;
        }
        .text-left-margin{
            margin: 5 0 0 0;
        }
        .icon-green{
            color: $success-dark;
        }
        .icon-gray{
            color: $item-color-android;
        }
    }
</style>