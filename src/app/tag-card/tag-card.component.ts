import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-tag-card',
  templateUrl: './tag-card.component.html',
  styleUrls: ['./tag-card.component.scss']
})

export class TagCardComponent {
  @Input('title') title :string;
  @Input('color') color :string;
}
