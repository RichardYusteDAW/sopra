import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/models/product';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cart: Product[] = [];

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cartSubscription();
  }

  /********** PUBLIC **********/
  public removeFromCart(product: Product) {
    const component = ConfirmDialogComponent;
    const config = {
      width: '300px',
      data: {
        message: `¿Estás seguro de que quieres eliminar "${product.name}" del carrito?`,
      },
    };
    const dialogRef = this.dialog.open(component, config);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.productService.removeFromCart(product);
    });
  }

  /********** PRIVATE **********/
  private cartSubscription() {
    this.productService.cart$.subscribe({
      next: (res) => (this.cart = res),
      error: (res) => console.error('Error fetching cart data:', res.error),
    });
  }
}
