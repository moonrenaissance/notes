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
<<<<<<< HEAD
=======
import { TagsComponent } from './pages/tags/tags.component';
import { RemindersComponent } from './pages/reminders/reminders.component';
import { TagCardComponent } from './tag-card/tag-card.component';
>>>>>>> f9e772239715df62830d13be1552d6dc3320a2f0

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    MainLayoutComponent,
    NoteCardComponent,
    NoteDetailsComponent,
<<<<<<< HEAD
=======
    TagsComponent,
    RemindersComponent,
    TagCardComponent
>>>>>>> f9e772239715df62830d13be1552d6dc3320a2f0
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
<<<<<<< HEAD
    HttpClientModule,
=======
    HttpClientModule
>>>>>>> f9e772239715df62830d13be1552d6dc3320a2f0
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
