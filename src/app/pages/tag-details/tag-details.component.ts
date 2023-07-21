import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tag-details',
  templateUrl: './tag-details.component.html',
  styleUrls: ['./tag-details.component.scss']
})
export class TagDetailsComponent implements OnInit{

  constructor(private router: Router) {}

  Cancel() {
    this.router.navigateByUrl('notes/tags');
  }

  ngOnInit() {
    
  }

  onSubmit() {

  }
}
