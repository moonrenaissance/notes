import { Component, OnInit } from '@angular/core';
import { TagsService } from 'src/app/services/tags.service';
import { Tag } from 'src/app/models/tag.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})

export class TagsComponent implements OnInit{

  constructor(private tagsSeervice: TagsService,
              private router: Router) {}

  tags: Tag[]

  ngOnInit() {
    this.tagsSeervice.getAllTags()
    .subscribe({
      next: (tags) =>{
        this.tags = tags;
      },
      error: (response)=>{
        console.log(response);
      }
    });
  }
  
  Add() {
    this.router.navigateByUrl('notes/tags/new');
  }

  deleteTag(index: number){
    this.tags.splice(index,1);
  }
}
