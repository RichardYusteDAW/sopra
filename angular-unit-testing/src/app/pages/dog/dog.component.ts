import { Component, OnInit } from '@angular/core';
import { DogService } from '../../services/dog/dog.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dog',
  imports: [CommonModule],
  templateUrl: './dog.component.html',
  styleUrl: './dog.component.scss',
  standalone: true,
})
export class DogComponent implements OnInit {
  breeds: string[] = [];
  images: string[] = [];

  constructor(private dogService: DogService) {}

  ngOnInit() {
    this.dogService.getBreeds().subscribe((breeds) => {
      this.breeds = breeds;
    });
  }

  onChange(event: Event) {
    const breed = (event.target as any)?.value;
    this.dogService.getBreedImages(breed, 10).subscribe((images) => {
      this.images = images;
    });
  }
}
