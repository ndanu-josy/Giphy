import { Component, OnInit } from '@angular/core';
import { Giphy } from '../giphy';
import { GifsServiceService } from '../gifs-service.service';

@Component({
  selector: 'app-giphy',
  templateUrl: './giphy.component.html',
  styleUrls: ['./giphy.component.css'],
})
export class GiphyComponent implements OnInit {
  // giphy!: Giphy;
  giphies:any=[]
gifs! :any;

  performSearch(searchTerm: HTMLInputElement): void {
    console.log(`User entered: ${searchTerm.value}`);
  }

  constructor(private gifService: GifsServiceService) {}
  ngOnInit() {
    this.gifService.giphyRequest();
    this.gifService.giphy = this.gifs;
    this.giphies=this.gifService.giphies ;
   

    
    console.log(this.giphies);

  }
}

// this.giphy=this.gifService.giphy

// console.log(this.gifService.giphy)
