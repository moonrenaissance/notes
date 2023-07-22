import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Tag } from '../models/tag.model';
import { NotesService } from '../services/notes.service';
import { TagsService } from '../services/tags.service';

@Component({
  selector: 'app-reminder-card',
  templateUrl: './reminder-card.component.html',
  styleUrls: ['./reminder-card.component.scss']
})
export class ReminderCardComponent implements OnInit{
  @Input('title') title: string;
  @Input('body') body: string;
  @Input('reminderId') reminderId: string;
  @Input('date') date: string;


  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>();

  selectedTags: Tag[] = [];

  constructor(private notesService: NotesService,
              private tagsService: TagsService){}

  ngOnInit(): void {
    this.notesService.getNote(this.reminderId)
    .subscribe({
      next: (note) =>{
        note.notesTags.forEach(noteTag => {
          this.tagsService.getTag(noteTag.tagId)
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


  deleteReminder(id: string){
    this.notesService.deleteNote(id)
    .subscribe({
      next: (response) =>{
        this.deleteEvent.emit();
      }
    })
  }
}
