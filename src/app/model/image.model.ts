export class Image {
  id: string;
  name: string;
  url: string;
  likes: number;
  isLiked: boolean;
  albumName: string;
  constructor(obj?: any) {
    this.id = (obj && obj.id) || "";
    this.url = (obj && obj.url) || "";
    this.likes = (obj && obj.likes) || 0;
    this.name = (obj && obj.name) || "";
    this.albumName = (obj && obj.albumName) || "";
    this.isLiked = (obj && obj.isLiked) || false;
  }
}
