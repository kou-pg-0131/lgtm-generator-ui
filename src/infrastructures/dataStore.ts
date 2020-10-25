import { Lgtm } from '../domain';

export class DataStore {
  private keys = {
    favorites: 'FAVORITES',
  };

  public setFavorites(lgtms: Lgtm[]): void {
    localStorage.setItem(this.keys.favorites, JSON.stringify(lgtms));
  }

  public getFavorites(): Lgtm[] {
    const json = localStorage.getItem(this.keys.favorites);
    return json ? JSON.parse(json) : [];
  }
}
