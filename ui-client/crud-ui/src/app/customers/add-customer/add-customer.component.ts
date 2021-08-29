import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/crud.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  constructor(private crud: CrudService) { }

  add_Customer = new FormGroup({
    customer_name: new FormControl(''),
    customer_address: new FormControl(''),
  })

  ngOnInit(): void {
  }
  addCustomer() {
    console.log(this.add_Customer.value);
    this.crud.addCustomer(this.add_Customer.value).subscribe((result: any) => {
      console.log('success', result);
    }, (err: any) => {
      console.log(err);
    })
  }

}
