import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Productdata } from 'src/app/models/productdata';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  @Input() productsData!: Productdata[];
  @Output() selectedProductEvent = new EventEmitter<Productdata>();

  filteredProducts: Productdata[] = [];
  maximumPrice!: number;
  minimumRating!: number;
  filteredPrice!: boolean;
  filteredRating!: boolean;

  /********** LIFE CYCLE**********/
  ngOnInit() {
    this.filteredProducts = [...this.productsData];
    this.maximumPrice = 2000;
    this.minimumRating = 4;
    this.filteredPrice = false;
    this.filteredRating = false;
  }

  ngOnChanges() {
    this.applyFilters();
  }

  /********** PUBLIC **********/
  public onFilterPriceLowerThan(maximumPrice: number) {
    this.filteredProducts = [...this.productsData];
    if (!this.filteredPrice) this.filterPriceLowerThan(maximumPrice);
    this.filteredRating = false;
    this.filteredPrice = !this.filteredPrice;
    this.selectedProductEvent.emit(this.filteredProducts[0]);
  }

  public onFilterRatingGreaterThan(minimumRating: number) {
    this.filteredProducts = [...this.productsData];
    if (!this.filteredRating) this.filterRatingGreaterThan(minimumRating);
    this.filteredPrice = false;
    this.filteredRating = !this.filteredRating;
    this.selectedProductEvent.emit(this.filteredProducts[0]);
  }

  public onRemoveFilter() {
    if (this.filteredPrice || this.filteredRating) {
      this.filteredPrice = false;
      this.filteredRating = false;
      this.filteredProducts = [...this.productsData];
      this.selectedProductEvent.emit(this.filteredProducts[0]);
    }
  }

  public onSelectProduct(productData: Productdata) {
    this.selectedProductEvent.emit(productData);
  }

  /********** PRIVATE **********/
  private filterPriceLowerThan(maximumPrice: number) {
    this.filteredProducts = this.filteredProducts.filter(
      (prod) => prod.price < maximumPrice
    );
  }

  private filterRatingGreaterThan(minimumRating: number) {
    this.filteredProducts = this.filteredProducts.filter(
      (prod) => prod.rating > minimumRating
    );
  }

  private applyFilters() {
    this.filteredProducts = [...this.productsData];

    if (this.filteredPrice) this.filterPriceLowerThan(this.maximumPrice);
    else if (this.filteredRating)
      this.filterRatingGreaterThan(this.minimumRating);
  }
}
