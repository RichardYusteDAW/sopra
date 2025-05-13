import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FiltersComponent } from './components/filters/filters.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ReviewCardComponent } from './components/review-card/review-card.component';
import { StarsComponent } from './components/stars/stars.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FiltersComponent,
    ProductComponent,
    ProductDialogComponent,
    ProductCardComponent,
    ReviewCardComponent,
    FooterComponent,
    StarsComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
