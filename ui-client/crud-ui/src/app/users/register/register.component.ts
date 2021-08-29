import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/crud.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUser = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    Email: new FormControl(''),
    password: new FormControl(''),
    Contact: new FormControl(''),
    customerId: new FormControl(''),
    roleId: new FormControl('')

  })
  constructor(private crud: CrudService) { }

  ngOnInit(): void {
  }

  collection() {
    return this.crud.registerUser(this.registerUser.value).subscribe((result: any) => {
      console.log('success', result);
    }, (err: Error) => {
      console.log(err);
    })
  }
}
