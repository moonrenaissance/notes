import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})

export class TagsComponent {

  constructor(private router: Router) {}

  Add() {
    this.router.navigateByUrl('notes/tags/new');
  }
}
