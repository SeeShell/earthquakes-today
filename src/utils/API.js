import axios from "axios";

const BASEURL = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=";

export default {
  search: function (query) {
    return axios.get(BASEURL + query);
  },
};
