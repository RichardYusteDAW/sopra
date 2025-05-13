import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FiltersComponent } from './components/filters/filters.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';
import { ProductsComponent } from './products.component';
import { ReviewCardComponent } from './components/review-card/review-card.component';
import { StarsComponent } from './components/stars/stars.component';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [
    ProductsComponent,
    FiltersComponent,
    ProductComponent,
    ProductCardComponent,
    ReviewCardComponent,
    StarsComponent,
    ProductDialogComponent,
  ],
  imports: [CommonModule, ProductsRoutingModule],
  exports: [],
  providers: [],
})
export class ProductsModule {}
