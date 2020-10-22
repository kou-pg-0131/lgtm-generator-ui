import axios from 'axios';
import * as path from 'path';
import { Lgtm } from '../domain';

export class ApiClient {
  private endpoints = {
    v1: {
      lgtms: path.join(process.env.REACT_APP_API_ORIGIN, 'v1/lgtms'),
    },
  };

  public async getLgtms(evaluatedId?: string): Promise<{ lgtms: Lgtm[]; evaluated_id: string; }> {
    // TODO: refactor
    const response = await axios.get(`${this.endpoints.v1.lgtms}?evaluated_id=${evaluatedId}`, { headers: { 'Content-Type': 'application/json' } });
    return response.data;
  }

  public async createLgtm(params: { base64: string; }): Promise<Lgtm> {
    const response = await axios.post(this.endpoints.v1.lgtms, JSON.stringify(params), { headers: { 'Content-Type': 'application/json' } });
    return response.data;
  }
}
