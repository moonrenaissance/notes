import { Component, OnInit } from '@angular/core';
import { TagsService } from 'src/app/services/tags.service';
import { Tag } from 'src/app/models/tag.model';
import { Router } from '@angular/router';
import { trigger, transition, style, animate, query, stagger} from '@angular/animations';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  animations: [
    trigger('itemAnim', [
      transition('void => *', [
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          'margin-bottom': 0,

          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0
        }), 
        animate('50ms', style({
          height: '*',
          'margin-bottom': '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingRight: '*',
          paddingLeft: '*'
        })),
        animate(200)
      ]),

      transition('* => void', [
        animate(50, style({
          transform: 'scale(1.05)'
        })),
        animate(50, style({
          transform: 'scale(1)',
          opacity: 0.75
        })),
        animate('120ms ease-out', style({
          transform: 'scale(0.68)',
          opacity: 0
        })),
        animate('150ms ease-out', style({
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0, 
          paddingLeft: 0,
          'margin-bottom': '0'
        }))
      ])
    ]), 

    trigger('listAnim', [
      transition('* => *', [
        query(':enter', [
          style({
            opacity: 0,
            height: 0
          }),
          stagger(100, [
            animate('0.2s ease')
          ])
        ], {
          optional: true
        })
      ])
    ])
  ]
})

export class TagsComponent implements OnInit{

  constructor(private tagsSeervice: TagsService,
              private router: Router) {}

  tags: Tag[]
  isLoading: boolean = false;

  ngOnInit() {
    this.isLoading = true;
    this.tagsSeervice.getAllTags()
    .subscribe({
      next: (tags) =>{
        this.tags = tags;
        this.isLoading = false;
      },
      error: (response)=>{
        console.log(response);
      }
    });
  }

  Add() {
    this.router.navigateByUrl('notes/tags/new');
  }

  deleteTag(tag: Tag){
    let indexTag = this.tags.indexOf(tag);
    if(indexTag != -1){
      this.tags.splice(indexTag, 1);
    }
  }
}
