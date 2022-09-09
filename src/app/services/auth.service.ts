import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenModel, User } from '../models/AuthModels';

const TOKEN_KEY = 'AuthToken'

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor( private http:HttpClient) { }

  login(user:User):Observable<TokenModel>{
    return this.http.post<TokenModel>(environment.loginApiUrl,user)
  }
  setToken(token:string):void{
    window.localStorage.removeItem(TOKEN_KEY)
    window.localStorage.setItem(TOKEN_KEY,token)
  }

  getToken():string | null{
    return localStorage.getItem(TOKEN_KEY)
  }
  isLogged():boolean {
    if(this.getToken()){
      return true
    }
    return false
  }
  logOut():void{
    window.localStorage.clear()
    window.location.reload()
  }

}
