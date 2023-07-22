import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent {

  constructor(private router: Router) {}

  Add() {
    this.router.navigateByUrl('notes/reminders/new');
  }

}
