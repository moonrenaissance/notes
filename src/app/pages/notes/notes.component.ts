import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from 'src/app/models/note.model';
import { Tag } from 'src/app/models/tag.model';
import { NotesService } from 'src/app/services/notes.service';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})

export class NotesComponent implements OnInit{

  notes: Note[] = [];
  tags: Tag[] = [];
  filteredNotes: Note[] = new Array<Note>();

  constructor(private notesService: NotesService, private tagsService: TagsService, private router: Router) {}

  ngOnInit() {
    this.notesService.getAllNotes()
    .subscribe({
      next: (notes) =>{
        console.log(notes);
        this.notes = notes;
        this.filteredNotes = notes;
      },
      error: (response)=>{
        console.log(response);
      }
    });

    this.tagsService.getAllTags()
    .subscribe({
      next: (tag) =>{
        console.log(tag);
        this.tags = tag;
      },
      error: (response)=>{
        console.log(response);
      }
    });
  }

  Add() {
      this.router.navigateByUrl('notes/list/new');
  }

  filter(query: string){
    const chbxTitle = document.getElementById("findTitle") as HTMLInputElement;
    const chbxDesc = document.getElementById("findDesc") as HTMLInputElement;
    const chbxTags = document.getElementById("findTags") as HTMLInputElement;

    if(query == ""){
      this.filteredNotes = this.notes;
      return;
    }

    let allResults: Note[] = new Array<Note>();
    query = query.toLowerCase().trim();

    let terms: string[] = query.split(' ');
    terms = this.removeDuplications(terms);
    terms.forEach(term => {
      let results: Note[] = this.relevantNotes(term, chbxTitle.checked, chbxDesc.checked, chbxTags.checked);
      allResults = [...allResults, ...results]
    });

    this.filteredNotes = this.removeDuplications(allResults);
  }

  removeDuplications(arr: Array<any>): Array<any>{
    let uniqueResults: Set<any> = new Set<any>();
    arr.forEach(e => uniqueResults.add(e));

    return Array.from(uniqueResults);
  }

  relevantNotes(query: string, findTitle: boolean, findDesc:boolean, findTags: boolean): Array<Note>{
    if(!findTitle && !findDesc && !findTags){
      findTitle = true;
      findDesc = true;
      findTags = true;
    }
    query = query.toLowerCase().trim();

    let relevantNotes = this.notes.filter(note =>{
      if((findDesc && note.description && note.description.toLowerCase().includes(query)) || (findTitle && note.title.toLowerCase().includes(query))){
        return true;
      }

      let isTagFind: boolean = false;
      if(findTags){
        note.notesTags.forEach(noteTag => {
          if(this.tags.find(tag => tag.id === noteTag.tagId)?.title.toLowerCase().includes(query)){
            isTagFind = true;
            return;
          }
        });
      }

      return isTagFind;
    });

    return relevantNotes;
  }
  deleteNote(index: number){
    this.notes.splice(index,1);
    this.filteredNotes = this.notes;
  }
}
