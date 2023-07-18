import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './pages/notes/notes.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { NoteDetailsComponent } from './pages/note-details/note-details.component';

const routes: Routes = [
  { path: '', component: MainLayoutComponent, children: [
    { path: '', component: NotesComponent },
    { path: ':notes/new', component: NoteDetailsComponent },
    { path: ':id', component: NoteDetailsComponent },
    { path: ':tags', component: NoteDetailsComponent },
    { path: ':reminders', component: NoteDetailsComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
