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
  giphies:any=[]

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
            console.log(response);

            this.giphy = response['data'];
            console.log(this.giphy);
           

            for (let i = 0; i < response['data'].length; i++) {
              this.giphy.title = response['data'][i]['title'];
              this.giphy.username = response['data'][i]['username'];
              this.giphy.imageUrl = response['data'][i]['images']['original']['url'];    
              
              let gif= new Giphy(this.giphy.username, this.giphy.title, this.giphy.imageUrl);
           this.giphies.push(gif)  
          
          }
            
console.log(this.giphies[0].title)

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
}
