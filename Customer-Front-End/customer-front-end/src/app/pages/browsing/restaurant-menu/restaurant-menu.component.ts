import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItemCardComponent } from 'src/app/components/cards/menu-item-card/menu-item-card.component';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.css']
})
export class RestaurantMenuComponent implements OnInit {

    restaurantID!:  string|null;
    menu: MenuItem[] = [];
    menuLoaded: boolean = false;

    constructor(private restaurantService: RestaurantService, private route: ActivatedRoute) { 
    }

    ngOnInit(): void {

        this.route.paramMap.subscribe(params => {
            this.restaurantID = params.get("restaurantId");
            this.menuLoaded = false;
            if (this.restaurantID) {
                this.restaurantService.getRestaurantMenu(this.restaurantID).subscribe((data: MenuItem[]) => {
                    if(data) {
                        this.menuLoaded = true;
                        this.menu = [...data];
                    }
                });
            }
        });
    }

}
