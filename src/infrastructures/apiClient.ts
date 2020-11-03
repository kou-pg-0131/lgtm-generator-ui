import { Report, ReportType, Image, Lgtm } from '../domain';
import { IHttpClient, IUrlBuilder, QueryStringParameters } from '.';

export interface IApiClient {
  // GET /v1/lgtms
  getLgtms(evaluatedId?: string): Promise<{ lgtms: Lgtm[]; evaluated_id?: string; }>;
  // POST /v1/lgtms
  createLgtm(params: { base64?: string; url?: string; }): Promise<Lgtm>;
  // POST /v1/reports
  createReport(params: { type: ReportType; text: string; lgtm: Lgtm; }): Promise<Report>;
  // GET /v1/images
  searchImages(params: { q: string; }): Promise<Image[]>;
}

export class ApiClient implements IApiClient {
  constructor(
    private config: {
      apiOrigin: string,
      httpClient: IHttpClient,
      urlBuilder: IUrlBuilder,
    },
  ) {}

  public async getLgtms(evaluatedId?: string): Promise<{ lgtms: Lgtm[]; evaluated_id?: string; }> {
    const endpoint = this.buildEndpoint('/v1/lgtms', { evaluated_id: evaluatedId });
    return await this.config.httpClient.get<{ lgtms: Lgtm[]; evaluated_id?: string }>(endpoint);
  }

  public async createLgtm(params: { base64?: string; url?: string; }): Promise<Lgtm> {
    const endpoint = this.buildEndpoint('/v1/lgtms');
    const body = JSON.stringify(params);
    return await this.config.httpClient.post<Lgtm>(endpoint, body, { 'Content-Type': 'application/json' });
  }

  public async createReport(params: { type: ReportType; text: string; lgtm: Lgtm; }): Promise<Report> {
    const endpoint = this.buildEndpoint('/v1/reports');
    const body = JSON.stringify({ type: params.type, text: params.text, lgtm_id: params.lgtm.id });
    return await this.config.httpClient.post(endpoint, body, { 'Content-Type': 'application/json' });
  }

  public async searchImages(params: { q: string; }): Promise<Image[]> {
    const endpoint = this.buildEndpoint('/v1/images', { q: params.q });
    return await this.config.httpClient.get(endpoint);
  }

  private buildEndpoint(path: string, params?: QueryStringParameters): string {
    return this.config.urlBuilder.build(this.config.urlBuilder.join(this.config.apiOrigin, path), params);
  }
}
