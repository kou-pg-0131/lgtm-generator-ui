import { loadImage, createCanvas } from 'canvas';

export type ImageFile = {
  name: string;
  type: string
  base64: string;
};

export class ImageFileLoader {
  public async load(file: File): Promise<ImageFile> {
    const dataUrl: string = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(`data:${file.type};base64,${this.dataUrlToBase64(reader.result as string)}`);
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file.slice());
    });
    const image = await loadImage(dataUrl);

    const sideLength = 500;
    const [distWidth, distHeight] = ((): [number, number] => {
      if (image.width > image.height) {
        return [sideLength, sideLength / image.width * image.height];
      } else {
        return [sideLength / image.height * image.width, sideLength];
      }
    })();
    const canvas = createCanvas(distWidth, distHeight);
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, image.width, image.height, 0, 0, distWidth, distHeight);

    return {
      name: file.name,
      type: 'image/png',
      base64: this.dataUrlToBase64(canvas.toDataURL('image/png')),
    };
  }

  private dataUrlToBase64(dataUrl: string): string {
    return dataUrl.slice(dataUrl.indexOf(',') + 1);
  }

  private base64ToDataUrl(base64: string, imageType: string): string {
    return `data:${imageType};base64,${base64}`;
  }
}
