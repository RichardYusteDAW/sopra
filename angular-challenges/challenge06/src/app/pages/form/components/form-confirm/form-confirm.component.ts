import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-confirm',
  templateUrl: './form-confirm.component.html',
  styleUrls: ['./form-confirm.component.scss'],
})
export class FormConfirmComponent {
  constructor(private router: Router) {}

  navigateToProducts() {
    this.router.navigate(['/products']);
  }
}
