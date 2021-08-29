import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/crud.service';
//import { resourceLimits } from 'worker_threads';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private crud: CrudService, private router: Router) { }

  loginUser = new FormGroup({
    Email: new FormControl(''),
    password: new FormControl('')
  })

  ngOnInit(): void {
  }
  collectfromUI() {
    this.crud.loginUser(this.loginUser.value).subscribe((res: any) => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['/list-customer']);
    }, err => {
      console.log(err);
    })
  }
}
