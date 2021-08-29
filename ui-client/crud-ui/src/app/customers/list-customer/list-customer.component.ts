import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/crud.service';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {

  constructor(private crud: CrudService) { }
  collection: any = [];
  ngOnInit(): void {
    this.crud.getCustomerList().subscribe((result) => {
      console.log(result);
      this.collection = result;
    })
  }
  deleteCustomer(id: any) {
    this.crud.deleteCustomer(id).subscribe((res) => {
      console.log(res);
    })
  }

}
