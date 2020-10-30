import axios from 'axios';
import * as path from 'path';
import { Report, ReportType, Image, Lgtm } from '../domain';

export class ApiClient {
  private endpoints = {
    v1: {
      lgtms: path.join(process.env.REACT_APP_API_ORIGIN, 'v1/lgtms'),
      images: path.join(process.env.REACT_APP_API_ORIGIN, 'v1/images'),
      reports: path.join(process.env.REACT_APP_API_ORIGIN, 'v1/reports'),
    },
  };

  public async getLgtms(evaluatedId?: string): Promise<{ lgtms: Lgtm[]; evaluated_id?: string; }> {
    // TODO: refactor
    const response = await axios.get(`${this.endpoints.v1.lgtms}?evaluated_id=${evaluatedId}`, { headers: { 'Content-Type': 'application/json' } });
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
