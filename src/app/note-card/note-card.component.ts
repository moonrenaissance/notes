import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';
import { TagsService } from 'src/app/services/tags.service';
import { Router } from '@angular/router';
import { Tag } from '../models/tag.model';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit{

  @Input('title') title: string;
  @Input('body') body: string;
  @Input('noteId') noteId: string;

  @ViewChild('truncator') truncator: ElementRef<HTMLElement>;
  @ViewChild('bodyText') bodyText: ElementRef<HTMLElement>;
  @ViewChild('noteP') noteP: ElementRef<HTMLElement>;

  selectedTags: Tag[] = [];

  constructor(private renderer: Renderer2,
              private notesService: NotesService,
              private tagsServise: TagsService,
              private router: Router) {}

  ngAfterViewInit() {

    let style = window.getComputedStyle(this.bodyText.nativeElement);

    if (this.noteP.nativeElement.scrollHeight > this.bodyText.nativeElement.clientHeight) {
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    }
    else {
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
    }
  }


  ngOnInit() {
    this.notesService.getNote(this.noteId)
    .subscribe({
      next: (note) =>{

        note.notesTags.forEach(noteTag => {

          this.tagsServise.getTag(noteTag.tagId)
          .subscribe({
            next: (tag) =>{
              this.selectedTags.push(tag);
            },

            error: (response)=>{
              console.log(response);
            }
          });
        });

      },
      error: (response)=>{
        console.log(response);
      }
    });
  }

  deleteNote(id: string){
    this.notesService.deleteNote(id)
    .subscribe({
      next: (response) =>{
        window.location.reload();
      }
    })
  }
}