import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tag-card',
  templateUrl: './tag-card.component.html',
  styleUrls: ['./tag-card.component.scss']
})

export class TagCardComponent {
  @Input('title') title :string;
  @Input('color') color :string;  
  @Input('tagId') tagId: string;

  constructor(private router: Router){}

  editTag()
  {
    this.router.navigateByUrl('notes/tags/id/' + this.tagId);
    console.log('work');
  }
}
