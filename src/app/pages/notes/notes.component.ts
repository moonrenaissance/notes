import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit{

  notes: Note[] = [];

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    this.notesService.getAllNotes()
    .subscribe({
      next: (notes) =>{
        console.log(notes);
        this.notes = notes;
      },
      error: (response)=>{
        console.log(response);
      }
    });
  }
}