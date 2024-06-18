import axios, { AxiosInstance, RawAxiosRequestHeaders } from "axios";
import Cookies from "universal-cookie";
import { IHttpClient } from "./http-client.interface";

export class HttpAxiosClient implements IHttpClient {
  private readonly axiosClient!: AxiosInstance;
  private readonly cookies!: Cookies;

  constructor() {
    this.axiosClient = axios.create({
      baseURL: "https://onlyanotherblog-api-production.up.railway.app",
    });
    this.cookies = new Cookies(null, { path: "/" });
  }

  post(
    url: string,
    options: {
      data?: any;
      queryParams?: Map<string, any>;
    }
  ): Promise<any> {
    const token = this.cookies.get("@onlyanotherblog:token");
    let headers: RawAxiosRequestHeaders = {};

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return this.axiosClient.post(url, options.data, {
      params: options?.queryParams ?? {},
      headers: headers,
    });
  }

  get(
    url: string,
    options: {
      queryParams?: any;
    }
  ): Promise<any> {
    const token = this.cookies.get("@onlyanotherblog:token");
    let headers: RawAxiosRequestHeaders = {};

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return this.axiosClient.get(url, {
      params: options?.queryParams ?? {},
      headers: headers,
    });
  }
}
