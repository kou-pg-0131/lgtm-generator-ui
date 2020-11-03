import { Report, ReportType, Image, Lgtm } from '../domain';
import { IHttpClient, HttpClient, IUrlBuilder, UrlBuilder, QueryStringParameters } from '.';

export class ApiClient {
  private httpClient: IHttpClient = new HttpClient();
  private urlBuilder: IUrlBuilder = new UrlBuilder();

  // GET /v1/lgtms
  public async getLgtms(evaluatedId?: string): Promise<{ lgtms: Lgtm[]; evaluated_id?: string; }> {
    const endpoint = this.buildEndpoint('/v1/lgtms', { evaluated_id: evaluatedId });
    return await this.httpClient.get<{ lgtms: Lgtm[]; evaluated_id?: string }>(endpoint);
  }

  // POST /v1/lgtms
  public async createLgtm(params: { base64?: string; url?: string; }): Promise<Lgtm> {
    const endpoint = this.buildEndpoint('/v1/lgtms');
    const body = JSON.stringify(params);
    return await this.httpClient.post<Lgtm>(endpoint, body, { 'Content-Type': 'application/json' });
  }

  // POST /v1/reports
  public async createReport(params: { type: ReportType; text: string; lgtm: Lgtm; }): Promise<Report> {
    const endpoint = this.buildEndpoint('/v1/reports');
    const body = JSON.stringify({ type: params.type, text: params.text, lgtm_id: params.lgtm.id });
    return await this.httpClient.post(endpoint, body, { 'Content-Type': 'application/json' });
  }

  // GET /v1/images
  public async searchImages(params: { q: string; }): Promise<Image[]> {
    const endpoint = this.buildEndpoint('/v1/images', { q: params.q });
    return await this.httpClient.get(endpoint);
  }

  private buildEndpoint(path: string, params?: QueryStringParameters): string {
    return this.urlBuilder.build(this.urlBuilder.join(process.env.REACT_APP_API_ORIGIN, path), params);
  }
}
