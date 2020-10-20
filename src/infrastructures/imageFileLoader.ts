export type ImageFile = {
  name: string;
  type: string
  dataUrl: string;
};

export class ImageFileLoader {
  public load(file: File): Promise<ImageFile> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve({
        name: file.name,
        type: file.type,
        dataUrl: reader.result as string,
      });
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file.slice());
    });
  }
}
