import { Component, Input } from '@angular/core';
import { Description } from 'src/app/models/description';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent {
  @Input() description: Description | null = null;
}
