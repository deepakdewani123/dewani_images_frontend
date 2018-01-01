import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ImageService {
  baseURL: string;

  constructor(private http: Http) {
    this.baseURL = "https://71cb7988.ngrok.io";
  }

  getAllAlbums() {
    const url = this.baseURL + "/albums/all";
    return this.http
      .get(url)
      .map(response => {
        // console.log(response.json());
        return response.json();
      })
      .catch((error: any) => {
        console.log("error");
        if (error.status === 302 || error.status === "302") {
          // do some thing
        } else {
          return Observable.throw(new Error(error.message));
        }
      });
  }

  getImagesForAlbum(album: string) {
    const url = this.baseURL + "/images/album_number/" + album;
    return this.http
      .get(url)
      .map(response => {
        console.log(response.json());
        return response.json();
      })
      .catch((error: any) => {
        console.log("error");
        if (error.status === 302 || error.status === "302") {
          // do some thing
        } else {
          return Observable.throw(new Error(error.message));
        }
      });
  }

  likeImageForId(id: string) {
    const url = this.baseURL + "/images/update/like";
    const body = {
      imageId: id
    };

    return this.http
      .put(url, this.setBody(body))
      .map(response => {
        console.log(response.json());
        return response.json();
      })
      .catch((error: any) => {
        console.log("error");
        if (error.status === 302 || error.status === "302") {
          // do some thing
        } else {
          return Observable.throw(new Error(error.message));
        }
      });
  }

  unlikeImageForId(id: string) {
    const url = this.baseURL + "/images/update/unlike";
    const body = {
      imageId: id
    };
    return this.http
      .put(url, this.setBody(body))
      .map(response => {
        console.log(response.json());
        return response.json();
      })
      .catch((error: any) => {
        console.log("error");
        if (error.status === 302 || error.status === "302") {
          // do some thing
        } else {
          return Observable.throw(new Error(error.message));
        }
      });
  }

  setBody(body: object) {
    return JSON.stringify(body);
  }
}
