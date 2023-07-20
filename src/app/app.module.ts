import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesComponent } from './pages/notes/notes.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { NoteCardComponent } from './note-card/note-card.component';
import { NoteDetailsComponent } from './pages/note-details/note-details.component';
import { HttpClientModule } from '@angular/common/http';
import { TagCardComponent } from './tag-card/tag-card.component';
import { TagsComponent } from './pages/tags/tags.component';
import { TagDetailsComponent } from './pages/tag-details/tag-details.component';


@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    TagsComponent,
    TagCardComponent,
    MainLayoutComponent,
    NoteCardComponent,
    NoteDetailsComponent,
    TagDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
