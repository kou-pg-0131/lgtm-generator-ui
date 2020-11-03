import { IApiClient, ApiClient, HttpClient, UrlBuilder } from '.';

export class ApiClientFactory {
  public create(): IApiClient {
    return new ApiClient({
      apiOrigin: process.env.REACT_APP_API_ORIGIN,
      httpClient: new HttpClient(),
      urlBuilder: new UrlBuilder(),
    });
  }
}
