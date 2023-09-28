import { Component, OnInit } from '@angular/core';
import { CatsApiService } from '../services/cats-api.service';

interface Cat{
  breedName: string;
  origin: string;
  affectionLevel: Number;
  intelligence: Number;
  imageUrl: string;
}

@Component({
  selector: 'app-cats',
  templateUrl: './cats.page.html',
  styleUrls: ['./cats.page.scss'],
})
export class CatsPage implements OnInit {

  catsBreeds: Cat[] = [];

  constructor(private catsApiService: CatsApiService) {}

  ngOnInit(): void {
    this.getCatsBreeds()
  }

  async getCatsBreeds(){
    const responseCats = await this.catsApiService.getCats(4);
    this.catsBreeds = await Promise.all(responseCats.map(async (cat:any)=> {
      let imageUrl = await this.catsApiService.getCatImage(cat.reference_image_id) || 'https://ionicframework.com/docs/img/demos/card-media.png';
      return {
        breedName: cat.name,
        origin: cat.origin,
        affectionLevel: cat.affection_level,
        intelligence: cat.intelligence,
        imageUrl
      }
    }))
  }
}
