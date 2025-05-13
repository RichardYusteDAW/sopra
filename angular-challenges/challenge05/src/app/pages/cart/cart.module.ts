import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { CartComponent } from './cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [CartComponent, ConfirmDialogComponent],
  imports: [CommonModule, CartRoutingModule, MatButtonModule, MatDialogModule],
})
export class CartModule {}
