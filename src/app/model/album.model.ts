export class Album {
  name: string;
  coverImageURL: string;
  coverTitle: string;
  constructor(obj?: any) {
    this.name = (obj && obj.name) || "";
    this.coverImageURL = (obj && obj.coverImageURL) || "";
    this.coverTitle = (obj && obj.coverTitle) || "";
  }
}
