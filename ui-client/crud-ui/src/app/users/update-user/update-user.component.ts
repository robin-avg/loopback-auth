import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/crud.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  // userData: any = {};

  editUser = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    Email: new FormControl(''),
    Contact: new FormControl(''),
    custID: new FormControl(''),
    roleId: new FormControl('')
  })
  constructor(private route: ActivatedRoute, private crud: CrudService) {

  }



  ngOnInit(): void {
    console.log(this.route.snapshot.params.id);
    this.crud.getCurrentUser(this.route.snapshot.params.id).subscribe((result: any) => {
      console.log(result);
      // this.userData = result;
      this.editUser = new FormGroup({
        firstname: new FormControl(result.firstname),
        lastname: new FormControl(result.lastname),
        Email: new FormControl(result.Email),
        Contact: new FormControl(result.Contact),
        custID: new FormControl(result.custID),
        roleId: new FormControl(result.roleId)
      })
    }, (err: Error) => {
      console.log(err);
    })
  }

  updateUser() {
    this.crud.updateUser(this.route.snapshot.params.id, this.editUser.value).subscribe((result: any) => {
      console.log(result);
    }, (err: Error) => {
      console.log(err);
    })
  }

}
