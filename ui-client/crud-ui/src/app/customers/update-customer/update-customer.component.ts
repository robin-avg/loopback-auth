import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/crud.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {

  editCustomer = new FormGroup({
    customer_name: new FormControl(''),
    customer_address: new FormControl('')
  })

  constructor(private crud: CrudService, private route: ActivatedRoute) { }



  ngOnInit(): void {
    this.crud.getCurrentCustomer(this.route.snapshot.params.id).subscribe((response: any) => {
      this.editCustomer = new FormGroup({
        customer_name: new FormControl(response.customer_name),
        customer_address: new FormControl(response.customer_address)
      })
    }, (err: Error) => {
      console.log(err);
    })
  }

  updateCustomer() {
    this.crud.updateCustomer(this.route.snapshot.params.id, this.editCustomer.value).subscribe((result: any) => {
      console.log(result);
    }, (err: Error) => {
      console.log(err);
    })
  }


}
