import { Component } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent {

  //notes: Note[] = new Array<Note>();

  constructor() {}

  ngOnInit() {
    //this.notes = this.notesService.getAllNotes();
  }
}
