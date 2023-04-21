import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GraficasService {
  constructor(private http: HttpClient) {}

  getUsarios() {
    return this.http.get('http://localhost:3000/grafica');
  }

  getDonutData() {
    return this.getUsarios().pipe(
      map((data) => {
        const labels = Object.keys(data);
        const values = Object.values(data);
        return { labels, values };
      })
    );
  }
}
