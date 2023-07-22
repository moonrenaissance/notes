import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotesService } from 'src/app/services/notes.service';
import { Note } from 'src/app/models/note.model';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent implements OnInit{

  reminders : Note[] = [];

  constructor(private router: Router,
              private noteService: NotesService) {}

  Add() {
    this.router.navigateByUrl('notes/reminders/new');
  }

  ngOnInit(): void {
    this.noteService.getAllNotes()
    .subscribe({
      next: (reminders) =>{
        this.reminders = reminders.
          filter(r=> r.date.toString() != '1899-12-30T19:57:27');
      },
      error: (response)=>{
        console.log(response);
      }
    });
  }

  deleteReminder(reminder: Note){
    let indexReminder = this.reminders.indexOf(reminder);
    if(indexReminder != -1){
      this.reminders.splice(indexReminder, 1);
    }
  }
}
