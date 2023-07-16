import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent {

  @Input('title') title: string;
  @Input('body') body: string;

  @ViewChild('truncator') truncator: ElementRef<HTMLElement>;
  @ViewChild('bodyText') bodyText: ElementRef<HTMLElement>;
  @ViewChild('noteP') noteP: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {

    let style = window.getComputedStyle(this.bodyText.nativeElement);
    //let viewableHeight = parseInt(style.getPropertyValue("height"), 10);

    if (this.noteP.nativeElement.scrollHeight > this.bodyText.nativeElement.clientHeight) {
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    }
    else {
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
    }

  }
}
