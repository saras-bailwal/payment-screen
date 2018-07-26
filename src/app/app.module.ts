import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { PaymentPageService } from './services/payment-page.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    PaymentPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [PaymentPageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
