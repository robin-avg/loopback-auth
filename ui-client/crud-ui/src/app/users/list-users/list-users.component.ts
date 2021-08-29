import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/crud.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  constructor(private crud: CrudService, private route: ActivatedRoute) { }
  collection: any = [];
  ngOnInit(): void {
    this.crud.getUserList(this.route.snapshot.params.id).subscribe((res => {
      console.log(res);
      this.collection = res;
    }))
  }
  deleteUser(id: any) {
    this.crud.deleteUser(id).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err)
    })
  }
}
