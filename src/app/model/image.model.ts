export class Image {
  id: string;
  url: string;
  likes: number;
  isLiked: boolean;
   constructor(obj?: any) {
     this.id      = obj && obj.id     || '';
     this.url     = obj && obj.url    || '';
     this.likes   = obj && obj.likes  || 0;
     this.isLiked = obj && obj.isLiked || false;
   }
 }
