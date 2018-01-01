export class Album {
  name: string;
  coverImageURL: string;
  coverTitle: string;
  loaded: boolean;
  constructor(obj?: any) {
    this.name = (obj && obj.name) || "";
    this.coverImageURL = (obj && obj.coverImageURL) || "";
    this.coverTitle = (obj && obj.coverTitle) || "";
    this.loaded = (obj && obj.loaded) || false;
  }
}
