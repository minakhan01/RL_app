import axios from "axios";

class HttpClient {
  constructor(baseURL) {
    this.instance = axios.create({
      baseURL,
    });

    this._initializeResponseInterceptor();
  }

  _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    );
  };

  _handleResponse = (data) => data;

  _handleError = (error) => Promise.reject(error);
}

export default HttpClient;
