import axios from 'axios';
import * as path from 'path';
import { Lgtm } from '../domain';

export class ApiClient {
  private endpoints = {
    v1: {
      lgtms: path.join(process.env.REACT_APP_API_ORIGIN, 'v1/lgtms'),
    },
  };

  public async getLgtms(evaluatedId?: string): Promise<{ lgtms: Lgtm[]; evaluated_id?: string; }> {
    // TODO: refactor
    const response = await axios.get(`${this.endpoints.v1.lgtms}?evaluated_id=${evaluatedId}`, { headers: { 'Content-Type': 'application/json' } });
    return response.data;
  }

  public async createLgtm(params: { base64: string; }): Promise<Lgtm> {
    const response = await axios.post(this.endpoints.v1.lgtms, JSON.stringify(params), { headers: { 'Content-Type': 'application/json' } });
    return response.data;
  }

  public async searchImages(params: { q: string; }): Promise<string[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        const links = [
          'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/b/b1/VAN_CAT.png',
          'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg?resize=750px:*',
          'https://c.files.bbci.co.uk/12A9B/production/_111434467_gettyimages-1143489763.jpg',
          'https://icatcare.org/app/uploads/2018/06/Layer-1704-1920x840.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/0/0b/Cat_poster_1.jpg',
          'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png',
          'https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg',
          'https://icatcare.org/app/uploads/2018/08/CKD.png',
        ];
        resolve(links);
      }, 1000);
    });
  }
}
