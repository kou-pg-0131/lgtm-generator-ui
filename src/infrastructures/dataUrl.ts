export class DataUrl {
  constructor(private dataUrl: string) {}

  public static fromBase64(params: { imageType: string; base64: string; }): DataUrl {
    return new DataUrl(`data:${params.imageType};base64,${params.base64}`);
  }

  public toString(format: 'dataurl' | 'base64' = 'dataurl'): string {
    switch (format) {
      case 'dataurl': return this.dataUrl;
      case 'base64': return this.dataUrl.slice(this.dataUrl.indexOf(',') + 1);
    }
  }
}
