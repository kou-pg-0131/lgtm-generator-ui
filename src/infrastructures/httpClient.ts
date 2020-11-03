import axios from 'axios';

export interface IHttpClient {
  get<T>(url: string, headers?: IHttpHeaders): Promise<T>;
  post<T>(url: string, body: string, headers?: IHttpHeaders): Promise<T>;
}

export interface IHttpHeaders {
  'Content-Type'?: string;
}

export class HttpClient implements IHttpClient {
  public async get<T>(url: string, headers?: IHttpHeaders): Promise<T> {
    return (await axios.get(url, { headers })).data;
  }

  public async post<T>(url: string, body: string, headers?: IHttpHeaders): Promise<T> {
    return (await axios.post(url, body, { headers })).data;
  }
}
