import axios from 'axios';
import { Report, ReportType, Image, Lgtm } from '../domain';

// TODO: refactor
export class ApiClient {
  private endpoints = {
    // TODO: use url-join
    v1: {
      lgtms: process.env.REACT_APP_API_ORIGIN + '/v1/lgtms',
      images: process.env.REACT_APP_API_ORIGIN + '/v1/images',
      reports: process.env.REACT_APP_API_ORIGIN + '/v1/reports',
    },
  };

  public async getLgtms(evaluatedId?: string): Promise<{ lgtms: Lgtm[]; evaluated_id?: string; }> {
    const endpoint = evaluatedId ? `${this.endpoints.v1.lgtms}?evaluated_id=${evaluatedId}` : this.endpoints.v1.lgtms;
    const response = await axios.get(endpoint, { headers: { 'Content-Type': 'application/json' } });
    return response.data;
  }

  public async createLgtm(params: { base64?: string; url?: string; }): Promise<Lgtm> {
    const response = await axios.post(this.endpoints.v1.lgtms, JSON.stringify(params), { headers: { 'Content-Type': 'application/json' } });
    return response.data;
  }

  public async createReport(params: { type: ReportType; text: string; lgtm: Lgtm; }): Promise<Report> {
    const body = JSON.stringify({ type: params.type, text: params.text, lgtm_id: params.lgtm.id });
    const response = await axios.post(this.endpoints.v1.reports, body, { headers: { 'Content-Type': 'application/json' } });
    return response.data;
  }

  public async searchImages(params: { q: string; }): Promise<Image[]> {
    const response = await axios.get(`${this.endpoints.v1.images}?q=${params.q}`, { headers: { 'Content-Type': 'application/json' } });
    return response.data;
  }
}
