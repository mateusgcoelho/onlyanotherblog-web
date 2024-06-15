import axios from "axios";
import { IHttpClient } from "./http-client.interface";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000",
});

export class HttpAxiosClient implements IHttpClient {
  post(
    url: string,
    options: {
      data?: any;
      queryParams?: Map<string, any>;
    }
  ): Promise<any> {
    return axiosClient.post(url, options.data, {
      params: options.queryParams,
    });
  }
}
