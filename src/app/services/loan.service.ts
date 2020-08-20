import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(public _http:Http) { }
  
  public getOtpDetails():Observable<{}>
  {
    const url = 'http://lab.thinkoverit.com/api/getOTP.php';
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(resp => resp as {})
    return this._http.post(url,{"panNumber": "panNumber,", "city": "city,", "fullname": "fullname,", "email": "email", "mobile":"mobile"  })
    .pipe(map(rep => rep.json()));

  }

  public verifyOtpDetails(data)
  {

  }
  saveData(request){
    console.log(request) ;
  }
  // getFormData(){
  //   return request;
  // }

  
}