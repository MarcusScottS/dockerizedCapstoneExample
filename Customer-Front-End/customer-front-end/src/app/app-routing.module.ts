import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantMenuComponent } from './pages/browsing/restaurant-menu/restaurant-menu.component';
import { RestaurantsComponent } from './pages/browsing/restaurants/restaurants.component';
import { OrderConfirmationComponent } from './pages/checkout/order-confirmation/order-confirmation.component';
import { OrderSummaryComponent } from './pages/checkout/order-summary/order-summary.component';
import { PaymentMethodComponent } from './pages/checkout/payment-method/payment-method.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { UserHistoryComponent } from './pages/user-history/user-history.component';
import { UserOrderComponent } from './pages/user-order/user-order.component';
import { CancelConfirmationComponent } from './pages/cancel-confirmation/cancel-confirmation.component';
import { UpdateConfirmationComponent } from './pages/update-confirmation/update-confirmation.component';

const routes: Routes = [
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "login",
        children: [
            {
                path: "",
                pathMatch: "full",
                component: LoginComponent
            }
        ]
    },
    {
        path: "register",
        component: RegisterComponent
    },
    {
        path: "restaurants",
        children: [
            {
                path: "",
                pathMatch: "full",
                component: RestaurantsComponent
            },
            {
                path: ":restaurantId",
                component: RestaurantMenuComponent
            }
        ]
        
    },
    {
        path: "checkout",
        children: [
            {
                path: "",
                pathMatch: "full",
                component: OrderSummaryComponent
            },
            {
                path: "payment-method",
                component: PaymentMethodComponent
            },
            {
                path: "order-confirmation",
                component: OrderConfirmationComponent
            }
        ]
    },
    {
        path: "user/:userId",
        children: [
            {
                path: "",
                pathMatch: "full",
                component: UserHomeComponent
            },
            {
                path: "user-history",
                children: [
                    {
                        path: "",
                        pathMatch: "full",
                        component: UserHistoryComponent
                    },
                    {
                        path: ":orderId",
                        component: UserOrderComponent
                    }

                ]
            }
        ]
        
    },
    {
        path:"update-confirmation",
        component: UpdateConfirmationComponent
    },
    {
        path:"cancel-confirmation",
        component: CancelConfirmationComponent
    },
    {
        path: "",
        redirectTo: "/home",
        pathMatch: "full"
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
