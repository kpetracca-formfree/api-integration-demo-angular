// core imports
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

// services
import { CreateOrderService } from '../../services/create-order.service';

// interfaces
import { CreateNewOrder } from '../../interfaces/CreateNewOrder';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
})
export class CreateOrderComponent implements OnInit {
  user: string = '';
  password: string = '';
  userForm = new FormControl('');
  passwordForm = new FormControl('');

  createdOrderId: string = '';

  order: CreateNewOrder = {
    email: 'test@example.com',
    firstName: 'API',
    lastName: 'Demo',
    last4SSN: '1234',
    referenceNumber: '123456789',
  };

  constructor(private createOrderService: CreateOrderService) {}

  ngOnInit(): void {}

  submitAuthorization(): void {
    this.user = this.userForm.value;
    this.password = this.passwordForm.value;
    console.log('Authorization set!');
  }

  postCreateOrder(): void {
    this.createOrderService
      .createOrder(this.user, this.password, this.order)
      .subscribe({
        next: (data) => (this.createdOrderId = data.id),
        error: (error) => console.error('ERROR!:', error),
      });
    console.log(this.createdOrderId);
  }
}
