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
  filteredTags: Tag[] = [];
  isLoading: boolean = false;

  ngOnInit() {
    this.isLoading = true;
    this.tagsSeervice.getAllTags()
    .subscribe({
      next: (tags) =>{
        this.tags = tags;
        this.filteredTags = tags;
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

  filter(query: string){
    if(query == "" || this.tags == null){
      this.filteredTags = this.tags;
      return;
    }

    this.isLoading = true;

    let allResults: Tag[] = new Array<Tag>();
    query = query.toLowerCase().trim();

    let terms: string[] = query.split(' ');
    terms = this.removeDuplications(terms);
    terms.forEach(term => {
      let results: Tag[] = this.relevantNotes(term);
      allResults = [...allResults, ...results]
    });

    this.isLoading = false;
    this.filteredTags = this.removeDuplications(allResults);
  }

  removeDuplications(arr: Array<any>): Array<any>{
    let uniqueResults: Set<any> = new Set<any>();
    arr.forEach(e => uniqueResults.add(e));

    return Array.from(uniqueResults);
  }

  relevantNotes(query: string): Array<Tag>{
    query = query.toLowerCase().trim();

    let relevantNotes = this.tags.filter(tag =>{
      if(tag.title.toLowerCase().includes(query)){
        return true;
      }

      return false;
    });

    return relevantNotes;
  }

  deleteTag(tag: Tag){
    let indexTag = this.tags.indexOf(tag);
    if(indexTag != -1){
      this.tags.splice(indexTag, 1);
    }

    let indexFilterTag = this.filteredTags.indexOf(tag);
    if(indexFilterTag != -1){
      this.filteredTags.splice(indexFilterTag, 1);
    }
  }
}
