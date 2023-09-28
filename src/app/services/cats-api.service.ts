import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CatsApiService {

  apiBaseUrl: string = 'https://api.thecatapi.com/v1'
  apiKey: string = 'bda53789-d59e-46cd-9bc4-2936630fde39'

  constructor() { }

  getCats(limit:number = 3): Promise<any> {
    return new Promise((resolve, reject)=>{
      axios.get(`${this.apiBaseUrl}/breeds?limit=${limit}`, {
      headers: {
        'x-api-key': this.apiKey
      }
      }).then((response)=>{
        resolve(response.data)
      }).catch((err)=>{
        reject(err.message)
      });
    })
  }

  async getCatImage(id: string): Promise<any> {
    return new Promise((resolve, reject)=>{
      axios.get(`${this.apiBaseUrl}/images/${id}`,{
        headers: {
          'x-api-key': this.apiKey
        }
      }).then((response)=>{
        resolve(response.data.url)
      }).catch((err)=>{
        reject(err.message)
      })
    })
  }
}
