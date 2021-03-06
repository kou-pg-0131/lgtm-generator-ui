import { Report, ReportProps } from '../domain/report';
import { Image } from '../domain/image';
import { Lgtm } from '../domain/lgtm';
import { HttpClient, IHttpClient } from './httpClient';
import { UrlBuilder, IUrlBuilder, QueryStringParameters } from '././urlBuilder';

export interface IApiClient {
  // GET /v1/lgtms
  getLgtms(evaluatedId?: string): Promise<{ lgtms: Lgtm[]; evaluated_id?: string; }>;
}

export class ApiClient implements IApiClient {
  constructor(
    private apiOrigin: string = process.env.NEXT_PUBLIC_API_ORIGIN,
    private httpClient: IHttpClient = new HttpClient(),
    private urlBuilder: IUrlBuilder = new UrlBuilder(),
  ) {}

  public async getLgtms(evaluatedId?: string): Promise<{ lgtms: Lgtm[]; evaluated_id?: string; }> {
    const endpoint = this.buildEndpoint('/v1/lgtms', { evaluated_id: evaluatedId });
    return await this.httpClient.get<{ lgtms: Lgtm[]; evaluated_id?: string }>(endpoint);
  }

  public async createLgtm(params: { base64?: string; url?: string; }): Promise<Lgtm> {
    const endpoint = this.buildEndpoint('/v1/lgtms');
    const body = JSON.stringify(params);
    return await this.httpClient.post<Lgtm>(endpoint, body, { 'Content-Type': 'application/json' });
  }

  public async createReport(props: ReportProps): Promise<Report> {
    const endpoint = this.buildEndpoint('/v1/reports');
    const body = JSON.stringify(props);
    return await this.httpClient.post(endpoint, body, { 'Content-Type': 'application/json' });
  }

  public async searchImages(q: string): Promise<Image[]> {
    const endpoint = this.buildEndpoint('/v1/images', { q });
    return await this.httpClient.get(endpoint);
  }

  private buildEndpoint(path: string, params?: QueryStringParameters): string {
    return this.urlBuilder.build(this.urlBuilder.join(this.apiOrigin, path), params);
  }
}
