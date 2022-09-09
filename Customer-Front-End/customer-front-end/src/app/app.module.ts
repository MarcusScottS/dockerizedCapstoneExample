import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './pages/register/register.component';
import { RestaurantsComponent } from './pages/browsing/restaurants/restaurants.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { RestaurantCardComponent } from './components/cards/restaurant-card/restaurant-card.component';
import { RestaurantMenuComponent } from './pages/browsing/restaurant-menu/restaurant-menu.component';
import { MenuItemCardComponent } from './components/cards/menu-item-card/menu-item-card.component';
import { MenuItemModalComponent } from './components/modals/menu-item-modal/menu-item-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartItemCardComponent } from './components/cards/cart-item-card/cart-item-card.component';
import { CartModalComponent } from './components/modals/cart-modal/cart-modal.component';
import { OrderSummaryComponent } from './pages/checkout/order-summary/order-summary.component';
import { PaymentMethodComponent } from './pages/checkout/payment-method/payment-method.component';
import { OrderConfirmationComponent } from './pages/checkout/order-confirmation/order-confirmation.component';
import { OrderItemCardComponent } from './components/cards/order-item-card/order-item-card.component';
import { DatePipe } from '@angular/common';
import { UserOrdersCardComponent } from './components/cards/user-orders-card/user-orders-card.component';
import { OrderCardComponent } from './components/cards/order-card/order-card.component';
import { UserOrderComponent } from './pages/user-order/user-order.component';
import { FormsModule } from '@angular/forms';
import { CancelConfirmationComponent } from './pages/cancel-confirmation/cancel-confirmation.component';
import { UpdateConfirmationComponent } from './pages/update-confirmation/update-confirmation.component';
import { UserHistoryComponent } from './pages/user-history/user-history.component';

@NgModule({
declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    RestaurantsComponent,
    UserHomeComponent,
    RestaurantCardComponent,
    RestaurantMenuComponent,
    MenuItemCardComponent,
    MenuItemModalComponent,
    CartItemCardComponent,
    CartModalComponent,
    OrderSummaryComponent,
    PaymentMethodComponent,
    OrderConfirmationComponent,
    OrderItemCardComponent,
    UserOrdersCardComponent,
    OrderCardComponent,
    UserOrderComponent,
    CancelConfirmationComponent,
    UpdateConfirmationComponent,
    UserHistoryComponent
],
imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule
],
providers: [
    DatePipe
],
bootstrap: [AppComponent]
})
export class AppModule { }
