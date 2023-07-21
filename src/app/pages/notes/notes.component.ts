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
        this.notes = notes.filter(n=> n.date.toString() == '1899-12-30T19:57:27');
        console.log(new Date(0,0,0,0,0));
      },
      error: (response)=>{
        console.log(response);
      }
    });
  }
}
