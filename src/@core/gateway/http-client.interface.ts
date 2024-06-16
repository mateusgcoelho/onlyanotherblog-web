export interface IHttpClient {
  post(
    url: string,
    options?: {
      data?: any;
      queryParams?: Map<string, any>;
    }
  ): Promise<any>;

  get(
    url: string,
    options?: {
      queryParams?: Map<string, any>;
    }
  ): Promise<any>;
}
