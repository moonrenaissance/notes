import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Note } from 'src/app/models/note.model';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit{
  
  note: Note;
  
  constructor(private router: Router, private noteService: NotesService) {}

  addNoteRequest: Note = {
    id: '',
    title: '',
    description: '',
    date: new Date(0, 0, 0, 0, 0),
    notesTags: []
  }

  ngOnInit() {
    this.note = new Note();
  }

  onSubmit(form: NgForm) {
    this.router.navigateByUrl('/');
  }

  Cancel() {
    this.router.navigateByUrl('/');
  }

  addNote(){
    console.log(this.addNoteRequest);
    this.noteService.addNote(this.addNoteRequest)
    .subscribe({
      next: (note)=>{
        console.log(note);
      }
    });
  }
}