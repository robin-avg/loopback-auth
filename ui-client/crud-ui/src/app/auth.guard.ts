import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private crud: CrudService, private route: Router) { }
  canActivate(): boolean {
    if (this.crud.loggedIn()) {
      return true;
    } else {
      this.route.navigate(['/login']);
      return false;
    }
  }

}
