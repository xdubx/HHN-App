import Vue from "nativescript-vue";
import App from "./components/App";
import Home from "./components/Home";
import Start from "./components/Start";
import DrawerContent from "./components/DrawerContent";
import RadSideDrawer from "nativescript-ui-sidedrawer/vue";
import RadListView from "nativescript-ui-listview/vue";
import helperService from "./shared/service/helperService";
Vue.use(RadSideDrawer);
Vue.use(RadListView);

//register
Vue.registerElement('CheckBox',() => require('@nstudio/nativescript-checkbox').CheckBox,
  { model: { prop: 'checked', event: 'checkedChange'} }
);
Vue.registerElement('ImageZoom', () => require('nativescript-image-zoom').ImageZoom)
Vue.config.silent = (TNS_ENV === 'production');


// check if it is the first start
if(!helperService.getFirstStartUp()){
  console.log("hit");
  new Vue({
    render (h) {
        return h(
          App,
          [
            h(DrawerContent, { slot: 'drawerContent' }),
            h(Start, { slot: 'mainContent' })
          ]
        )
      },
      data() {
        return {
          course: "",
          locId: 0,
          loc: "",
          sem: 0,
          renderEntities: []
        }
      },
  }).$start();
}else{
  //open normaly the application
  new Vue({
    render (h) {
        return h(
          App,
          [
            h(DrawerContent, { slot: 'drawerContent' }),
            h(Home, { slot: 'mainContent' })
          ]
        )
      },
      data() {
        return {
          cou: helperService.getSavedCourse(),
          locId: helperService.getSavedLocation(),
          loc: helperService.getLocatons()[helperService.getSavedLocation()],
          sem: helperService.getSavedSemester(),
          renderEntities: []
        }
      },
      mounted() {
        var self = this;
        helperService.getDataFromCalender("Lectures").then(function(result){
            console.log(result);
            self.renderEntities = result; 
       }).catch(error => {
           console.log(error);
       });     
      },
  }).$start();
}


