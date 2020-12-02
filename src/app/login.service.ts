import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Details } from './list.modal';

interface AuthData {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  token:string;
  authToken:string;
 Url:string = 'https://tap-log.com/api/';
  constructor(private http: HttpClient) { }
  saveUser(username:string, password:string){
    const data:AuthData =  {username: username, password: password };    
    //console.log(data);
    return this.http.post<{ token: string;  id: number }>(this.Url+'login-action?' +`username=${username}`+'&password=secret',data);
  }
  getlist(id:string){
   // https://tap-log.com/api/filler-site-list?id=96
   this.authToken = sessionStorage.getItem('token');
   let reqHeader = new HttpHeaders();
   reqHeader = reqHeader.append('Content-Type', 'application/json');
   reqHeader = reqHeader.append('Authorization', `Bearer ${this.authToken}`);
    return this.http.get<{details:Details[]}>(this.Url+`filler-site-list?id=96`,{ headers: reqHeader })
  }
}
