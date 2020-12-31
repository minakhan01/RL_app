import HttpClient from "./base.api";

class MainApiProtected extends HttpClient {
  constructor() {
    // super(`${SERVER_URI}`);

    // this._initializeRequestInterceptor();
  }

  // _initializeRequestInterceptor = () => {
  //   this.instance.interceptors.request.use(
  //     this._handleRequest,
  //     this._handleError
  //   );
  // };

  // _handleRequest = (config) => {
  //   let token = getUserToken(localStorage.getItem("@user"));
  //   config.headers.Authorization = token;
  //   config.headers["x-key"] = API_KEY;

  //   return config;
  // };
}

export default MainApiProtected;
