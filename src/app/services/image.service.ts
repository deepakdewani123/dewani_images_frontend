import { Injectable } from "@angular/core";
import { Headers, Http, Jsonp, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ImageService {
  baseURL: string;

  constructor(private http: Http) {
    this.baseURL = "https://904536e3.ngrok.io";
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

  likeImageForId(id: string) {
    const url = this.baseURL + "/images/update/like";
    // console.log(id);
    // console.log(liked);
    const body = {
      imageId: id,
      username: "deepakdewani"
    };
    // console.log(this.setBody(body));

    return this.http
      .put(url, this.setBody(body), this.setHeaders())
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

  unlikeImageForId(id: string) {
    const url = this.baseURL + "/images/update/unlike";
    const body = {
      imageId: id,
      username: "deepakdewani"
    };
    return this.http
      .put(url, this.setBody(body), this.setHeaders())
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

  setHeaders() {
    const header = {
      "Content-Type": "application/json"
    };
    const headers = new Headers(header);
    return new RequestOptions({ headers: headers });
  }

  setBody(body: any) {
    // console.log(body);
    return JSON.stringify(body);
  }
}
