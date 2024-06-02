import HttpServices from "../httpServices";
import { ENDPOINTS } from "../helpers/endpoints";
import Constants from "../helpers/constants";

class AppService extends HttpServices {
  //blogs
  static getBlogs() {
    return this.get(ENDPOINTS.getBlogs, Constants.header, {});
  }

  static getBlog({ blogId }) {
    return this.get(`${ENDPOINTS.getBlog}/${blogId}`, Constants.header, {});
  }
}

export default AppService;
