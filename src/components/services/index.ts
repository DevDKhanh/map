import axios from "axios";

const axiosClient = axios.create({
  headers: {
    "content-type": "application/json",
  },
  timeout: 65000,
  timeoutErrorMessage: "Timeout error request",
});

axiosClient.interceptors.request.use(async (config) => {
  return config;
});

axiosClient.interceptors.response.use(
  (response: any) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error: any) => {
    if (error.response && error.response.data) {
      throw error.response.data;
    }

    if (!axios.isCancel(error)) throw error;
  }
);

export default axiosClient;
