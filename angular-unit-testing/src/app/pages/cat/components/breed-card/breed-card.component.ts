import { Component, Input } from '@angular/core';
import { CatBreed } from '../../../../services/cat/cat.service';

@Component({
  selector: 'app-breed-card',
  imports: [],
  templateUrl: './breed-card.component.html',
  styleUrl: './breed-card.component.scss',
})
export class BreedCardComponent {
  @Input() breed?: CatBreed;
}