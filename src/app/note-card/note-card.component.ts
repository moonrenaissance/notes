import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  @Input('title') title: string;
  @Input('body') body: string;
  @Input('noteId') noteId: string;

  @ViewChild('truncator') truncator: ElementRef<HTMLElement>;
  @ViewChild('bodyText') bodyText: ElementRef<HTMLElement>;
  @ViewChild('noteP') noteP: ElementRef<HTMLElement>;

  tagsTitles: string[] = [];

  constructor(private renderer: Renderer2,
              private notesService: NotesService,
              private tagsServise: TagsService) {}

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
                this.tagsTitles.push(tag.title);
                console.log(tag);

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
}