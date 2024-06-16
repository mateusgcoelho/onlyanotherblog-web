export interface IHttpClient {
  post(
    url: string,
    options?: {
      data?: any;
      queryParams?: any;
    }
  ): Promise<any>;

  get(
    url: string,
    options?: {
      queryParams?: any;
    }
  ): Promise<any>;
}
