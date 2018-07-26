import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Headers, Http, Response } from '@angular/http';
import { FormGroup } from '@angular/forms';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
@Injectable()
export class PaymentPageService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient) {

    }
    processPay(data): Promise<any> {
        return this.http
            .post('https://staging.flexmoney.in/app/dummy-card-details/submit', data, httpOptions)
            .toPromise();
    }
}
