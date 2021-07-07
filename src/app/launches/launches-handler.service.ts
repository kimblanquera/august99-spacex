import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Launch } from '../models/launch';

@Injectable({
  providedIn: 'root'
})
export class LaunchesHandlerService {

  constructor(private http: HttpClient) { }

  getLaunches(limit: number, offset: number) {
    const url: string = `${environment.api}/launches`;
    return this.http.get<Launch[]>(url, {
      params: {
        "limit": `${limit}`,
        "offset": `${offset}`
      }
    })
  }
}
