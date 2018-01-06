export class Image {
  id: string;
  name: string;
  url: string;
  likeCount: number;
  isLiked: boolean;
  albumName: string;
  loaded: number;
  state: string;
  visibility: string;

  constructor(obj?: any) {
    this.id = (obj && obj.id) || "";
    this.url = (obj && obj.url) || "";
    this.likeCount = (obj && obj.likeCount) || 0;
    this.name = (obj && obj.name) || "";
    this.albumName = (obj && obj.albumName) || "";
    this.isLiked = (obj && obj.isLiked) || false;
    this.loaded = (obj && obj.loaded) || 0;
    this.state = (obj && obj.state) || "unlike";
    this.visibility = (obj && obj.visibility) || "hidden";
  }
}
