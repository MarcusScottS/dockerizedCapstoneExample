import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuItem } from '../interfaces/menu-item';
import { Restaurant } from '../interfaces/restaurant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private httpClient: HttpClient) { }

  getAllRestaurants() {
    return this.httpClient.get<Restaurant[]>(environment.basePath + "/restaurant-service/restaurants");
  }
  
  getRestaurantMenu(restaurantId: String) {
    return this.httpClient.get<MenuItem[]>(environment.basePath + "/restaurant-service/restaurant/" + restaurantId + "/menuItems");
  }
}
