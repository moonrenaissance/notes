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
<<<<<<< HEAD
}
=======
  
  deleteNote(id: string){
    this.notesService.deleteNote(id)
    .subscribe({
      next: (response)=>{

      }
    })
  }

}
>>>>>>> f9e772239715df62830d13be1552d6dc3320a2f0
