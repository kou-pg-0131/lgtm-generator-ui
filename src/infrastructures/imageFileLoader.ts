export type ImageFile = {
  name: string;
  type: string
  base64: string;
};

export class ImageFileLoader {
  public load(file: File): Promise<ImageFile> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const dataUrl = reader.result as string;
        resolve({
          name: file.name,
          type: file.type,
          base64: dataUrl.slice(dataUrl.indexOf(',') + 1),
        });
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file.slice());
    });
  }
}
