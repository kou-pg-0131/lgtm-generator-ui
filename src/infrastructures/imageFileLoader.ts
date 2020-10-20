export type ImageFile = {
  name: string;
  type: string
  base64: string;
};

export class ImageFileLoader {
  public load(file: File): Promise<ImageFile> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve({
        name: file.name,
        type: file.type,
        base64: (reader.result as string).replace(/data:.*\/.*;base64,/, ''),
      });
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file.slice());
    });
  }
}
