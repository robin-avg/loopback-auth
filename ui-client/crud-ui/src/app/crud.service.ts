import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private url: string = "http://localhost:3000";
  // private headers = new HttpHeaders().set('Content-type', 'application-json');

  constructor(private http: HttpClient) { }
  /*
  getList() {
    return this.http.get(this.url + '/users?filter[include][0][relation]=userList&filter[include][1][relation]=role');
  }*/

  //AUTH SERVICES
  loginUser(jsonData: any) {
    return this.http.post(`${this.url}/users/login`, jsonData);
  }
  registerUser(jsonData: any) {
    return this.http.post(`${this.url}/users/signup`, jsonData);
  }
  loggedIn() {
    return !!localStorage.getItem('token');
  }

  //USER SERVICES
  getUserList(id: any) {
    return this.http.get(`${this.url}/customers/${id}/users`);
  }
  addUser(jsonData: any) {
    return this.http.post(this.url + '/users', jsonData);
  }
  deleteUser(id: any) {
    return this.http.delete(`${this.url}/users/${id}`);
  }
  getCurrentUser(id: any) {
    return this.http.get(`${this.url}/users/${id}`);
  }
  updateUser(id: any, jsonData: any) {
    return this.http.put(`${this.url}/users/${id}`, jsonData);
  }



  //CUSTOMER SERVICES
  getCustomerList() {
    return this.http.get(this.url + '/customers');
  }
  getCurrentCustomer(id: any) {
    return this.http.get(`${this.url}/customers/${id}`)
  }
  addCustomer(jsonData: any) {
    return this.http.post(this.url + '/customers', jsonData);
  }
  updateCustomer(id: any, jsonData: any) {
    return this.http.put(`${this.url}/customers/${id}`, jsonData);
  }
  deleteCustomer(id: any) {
    return this.http.delete(`${this.url}/customers/${id}/users`);
  }
}
