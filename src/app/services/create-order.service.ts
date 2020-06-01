// core imports
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

// interfaces
import { CreateNewOrder } from '../interfaces/CreateNewOrder';

@Injectable({
  providedIn: 'root',
})
export class CreateOrderService {
  constructor(private http: HttpClient) {}

  // initialize httpOptions
  baseUrl: string = 'https://verifierapi.accountchek.net/v1';
  createOrderUrl: string = `${this.baseUrl}/accountchekorders`;

  // initialize httpOptions
  httpOptions = {};

  // header/options example from VerifierWebApi project
  // const headers = new Headers({ "Content-Type": "application/x-www-form-urlencoded; charset=utf-8" });
  // const options = new RequestOptions({ withCredentials: true, headers: headers });

  // encode auth credentials to base64
  setAuth(user: string, password: string) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        // prettier-ignore
        'Authorization': `Basic ${btoa(unescape(encodeURIComponent(user + ':' + password)))}`
      }),
    };
  }

  createOrder(
    user: string,
    password: string,
    newOrder: CreateNewOrder
  ): Observable<any> {
    this.setAuth(user, password);
    console.log(newOrder);
    console.log(this.httpOptions);
    return this.http.post<any>(this.createOrderUrl, newOrder, this.httpOptions);
  }
}
