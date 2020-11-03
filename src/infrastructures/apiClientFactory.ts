import { IApiClient, ApiClient } from '.';

export class ApiClientFactory {
  public create(): IApiClient {
    return new ApiClient();
  }
}
