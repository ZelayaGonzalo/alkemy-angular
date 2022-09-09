import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DayMenu, MealPlan, MenuInfo, MenuSimple } from '../models/FoodModels';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  url = environment.foodApiURL
  apiKey=environment.foodApiKey
  user = environment.foodApiUser.username
  userHash = environment.foodApiUser.hash
  day = environment.foodApiUser.day
  dayStamp = environment.foodApiUser.dayStamp

  constructor(private http:HttpClient) { }

  getDayMenu():Observable<MealPlan>{
    return this.http.get<MealPlan>(`${this.url}mealplanner/${this.user}/day/${this.day}?${this.apiKey}&hash=${this.userHash}`)
  }

  getDetails(menuID:number):Observable<MenuInfo>{
    return this.http.get<MenuInfo>(`${this.url}recipes/${menuID}/information?includeNutrition=false&${this.apiKey}`)
  }

  searchMenu(searchValue:string,offset:number,diet:string,sort:string):Observable<any>{
    return this.http.get<any>(`${this.url}recipes/complexSearch/?query=${searchValue}&number=12&diet=${diet}&sort=${sort}&offset=${offset}&${this.apiKey}`)
  }
  addToMenu(menu:MenuInfo):Observable<any>{
    let newDayPlate:DayMenu = {
      id:0,
      date: this.dayStamp,
      slot:1,
      position:0,
      type: 'RECIPE',
      value: menu
    }
    return this.http.post(`${this.url}mealplanner/${this.user}/items?${this.apiKey}&hash=${this.userHash}`,newDayPlate)
  }
  deleteFood(id:number):Observable<any>{
    return this.http.delete(`${this.url}mealplanner/${this.user}/items/${id}?${this.apiKey}&hash=${this.userHash}`)
  }
}

 

