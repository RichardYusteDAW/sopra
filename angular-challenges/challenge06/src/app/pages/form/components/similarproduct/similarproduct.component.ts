import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-similarproduct',
  templateUrl: './similarproduct.component.html',
  styleUrls: ['./similarproduct.component.scss'],
})
export class SimilarproductComponent {
  @Input() product: Product | null = null;
}
