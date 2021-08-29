import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AddCustomerComponent } from './customers/add-customer/add-customer.component';
import { ListCustomerComponent } from './customers/list-customer/list-customer.component';
import { UpdateCustomerComponent } from './customers/update-customer/update-customer.component';
import { RegisterComponent } from './users/register/register.component';
import { LoginComponent } from './users/login/login.component';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    ListUsersComponent,
    UpdateUserComponent,
    AddCustomerComponent,
    ListCustomerComponent,
    UpdateCustomerComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
