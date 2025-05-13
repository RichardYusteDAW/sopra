import { Component } from '@angular/core';
import { CatBreed, CatFact, CatService } from '../../services/cat/cat.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreedCardComponent } from './components/breed-card/breed-card.component';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrl: './cat.component.scss',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, BreedCardComponent],
})
export class CatComponent {
  factsLength = 100;
  factsLimit = 10;
  breedsLimit = 10;

  facts: CatFact[] = [];
  breeds: CatBreed[] = [];

  constructor(private catService: CatService) { }

  getFacts() {
    this.catService
      .getFacts({
        limit: this.factsLimit,
        maxLength: this.factsLength,
      })
      .subscribe(facts => this.facts = facts);
  }

  getBreeds() {
    this.catService
      .getBreeds(this.breedsLimit)
      .subscribe((breeds) => this.breeds = breeds);
  }
}