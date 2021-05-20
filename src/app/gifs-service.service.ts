import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Giphy } from '../app/giphy';
//

@Injectable({
  providedIn: 'root',
})
export class GifsServiceService {
  [x: string]: any;
  giphy!: Giphy;
  giphies: any = []
  searchGiphies: any = []

  // constructor(private http: HttpClient) {
  // }

  // gifTrendingRequest(): Observable<any> {
  //   interface ApiResponse {
  //     title: string;
  //     userName: string;
  //     imageUrl: string;
  //   }
  //   let trendingURL = environment.trendingEndpoint+ 'api_key='+ environment.api_key;
  //   return this.http.get<ApiResponse>(trendingURL);

  // }

  // getSe: any

  constructor(private http: HttpClient) {
    this.giphy = new Giphy('', '', '');
  }

  giphyRequest() {
    interface GifResponse {
      username: string;
      title: string;
      imageUrl: string;
    }
    let trendingURL =
      environment.trendingEndpoint + 'api_key=' + environment.api_key;
    // console.log(trendingURL);
    let promise = new Promise<void>((resolve, reject) => {
      this.http
        .get<GifResponse>(trendingURL)
        .toPromise()
        .then(
          (response: { [x: string]: any }) => {
            // console.log(response);

            this.giphy = response['data'];
            // console.log(this.giphy);


            for (let i = 0; i < response['data'].length; i++) {


              let title = response['data'][i]['title'];
              let username = response['data'][i]['username'];
              let imageUrl = response['data'][i]['images']['original']['url'];

              let gif = new Giphy(username, title, imageUrl);
              this.giphies.push(gif)

            }

            // console.log(this.giphies)

            resolve();
          },
          (error) => {
            this.giphy.title = 'Never, never, never give up';
            this.giphy.username = 'Winston Churchill';
            this.giphy.imageUrl = 'Not found';

            reject(error);
          }
        );
    });
    return promise;
  }
  searchGiphy(searchTerm: any) {
    interface GifResponse {
      username: string;
      title: string;
      imageUrl: string;
    }
    let searchUrl = environment.searchGiphy + 'api_key=' + environment.api_key + '&q=' + searchTerm.value
    console.log(searchUrl);

    let promise = new Promise<void>((resolve, reject) => {
      this.http
        .get<GifResponse>(searchUrl)
        .toPromise()
        .then(
          (response: { [x: string]: any }) => {

            this.giphy = response['data'];
          
            this.searchGiphies = []
            this.giphies = []

        
              // this.searchGiphies = [];
              for (let i = 0; i < response['data'].length; i++) { 
                let title = response['data'][i]['title'];
                let username = response['data'][i]['username'];
                let imageUrl = response['data'][i]['images']['original']['url'];
  
                let searchGif = new Giphy(username, title, imageUrl);
                this.searchGiphies.push(searchGif)
  
              }
            


           
           
            // console.log(response)

            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    });
    return promise;
  }
}
