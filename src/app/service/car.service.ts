import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { Car }           from '../model/car';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CarService {
  private carUrl = 'http://localhost:8080/api/car';  
  constructor (private http: Http) {
    let build = (<any> http)._backend._browserXHR.build;
    (<any> http)._backend._browserXHR.build = () => {
      let xhr = build();
      xhr.withCredentials = true;
      return xhr;
    };
  }
  
  getCars (): Observable<any> {
    return this.http.get(this.carUrl, this.getRequestOptionsArgs())
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  createCar(car: Car): Observable<any> {
    let json = JSON.stringify(car);
    let options = this.getRequestOptionsArgs();

    console.log(json);
    console.log()
    return this.http
      .post(this.carUrl, json, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateCar(car: Car): Observable<any> {
      return this.http.put(this.carUrl, JSON.stringify(car), this.getRequestOptionsArgs())
      .map(this.extractData)
                    .catch(this.handleError);
  }

  delete(id: number): Observable<any> {
      return this.http.delete(this.carUrl + "/" + id, this.getRequestOptionsArgs())
      .map(this.extractData)
                    .catch(this.handleError);
  }

  private getRequestOptionsArgs(): RequestOptionsArgs {
    let options:RequestOptionsArgs = {
      headers: this.getHeaders()
    };
    return options;
  }

  private getHeaders():Headers {
    let headers = new Headers({
        'Content-Type' : 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      });

    return headers;
  }

  private extractData(res: Response) {
    console.log(res);
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
