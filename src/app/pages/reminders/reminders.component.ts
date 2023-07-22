import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotesService } from 'src/app/services/notes.service';
import { Note } from 'src/app/models/note.model';
import { trigger, transition, style, animate, query, stagger} from '@angular/animations';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss'],
  animations: [
    trigger('itemAnim', [
      transition('void => *', [
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          'margin-bottom': 0,

          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0
        }), 
        animate('50ms', style({
          height: '*',
          'margin-bottom': '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingRight: '*',
          paddingLeft: '*'
        })),
        animate(200)
      ]),

      transition('* => void', [
        animate(50, style({
          transform: 'scale(1.05)'
        })),
        animate(50, style({
          transform: 'scale(1)',
          opacity: 0.75
        })),
        animate('120ms ease-out', style({
          transform: 'scale(0.68)',
          opacity: 0
        })),
        animate('150ms ease-out', style({
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0, 
          paddingLeft: 0,
          'margin-bottom': '0'
        }))
      ])
    ]), 

    trigger('listAnim', [
      transition('* => *', [
        query(':enter', [
          style({
            opacity: 0,
            height: 0
          }),
          stagger(100, [
            animate('0.2s ease')
          ])
        ], {
          optional: true
        })
      ])
    ])
  ]
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
