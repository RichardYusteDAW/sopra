import { Component } from '@angular/core';
import { DESCRIPTIONS } from 'db/descriptions';
import { Description } from 'src/app/models/description';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  descriptions: Description[] = [];

  ngOnInit() {
    this.descriptions = DESCRIPTIONS;
  }
}
