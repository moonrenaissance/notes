<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { TagsService } from 'src/app/services/tags.service';
import { Tag } from 'src/app/models/tag.model';
=======
import { Component } from '@angular/core';
import { Router } from '@angular/router';
>>>>>>> 34febb989507b0df983b7846dc5d94c99e2f5eba

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})

export class TagsComponent implements OnInit{

<<<<<<< HEAD
  constructor(private tagsSeervice: TagsService) {}

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
=======
  constructor(private router: Router) {}

  Add() {
    this.router.navigateByUrl('notes/tags/new');
>>>>>>> 34febb989507b0df983b7846dc5d94c99e2f5eba
  }
}
