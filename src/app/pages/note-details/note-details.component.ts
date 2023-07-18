import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Note } from 'src/app/models/note.model';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit{
  
  note: Note;
  params: Params;
  
  constructor(private router: Router, private route: ActivatedRoute) {}

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
