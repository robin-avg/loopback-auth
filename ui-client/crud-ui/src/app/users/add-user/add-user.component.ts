import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CrudService } from 'src/app/crud.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private crud: CrudService) { }

  addUser = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    Email: new FormControl(''),
    Contact: new FormControl(''),
    customerId: new FormControl(''),
    roleId: new FormControl('')
  })

  ngOnInit(): void {
  }
  collectUser() {
    console.log(this.addUser.value);
    this.crud.addUser(this.addUser.value).subscribe((result: any) => {
      console.log('success', result);
    }, (err: any) => {
      console.log(err);
    })
  }
}
