import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Note } from 'src/app/models/note.model';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit{
  
  note: Note;
  
  constructor(private router: Router) {}

  ngOnInit() {
    this.note = new Note();
  }

  onSubmit(form: NgForm) {
    this.router.navigateByUrl('/');
  }

  Cancel() {
    this.router.navigateByUrl('/');
  }
}
