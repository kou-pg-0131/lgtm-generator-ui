import { loadImage, createCanvas } from 'canvas';
import { FileTooLargeError } from '../domain/errors';
import { DataUrl } from './dataUrl';

export type ImageFile = {
  name: string;
  type: string
  base64: string;
};

export class ImageFileLoader {
  public async load(file: File): Promise<ImageFile> {
    const dataUrl: DataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(new DataUrl(reader.result as string));
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file.slice());
    });

    if (file.type === 'image/gif') {
      if (file.size * 1.4 > 6300000) {
        throw new FileTooLargeError();
      }

      return {
        name: file.name,
        type: file.type,
        base64: dataUrl.toString('base64'),
      };
    }

    const image = await loadImage(dataUrl.toString());

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
      base64: new DataUrl(canvas.toDataURL('image/png')).toString('base64'),
    };
  }
}
