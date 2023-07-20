import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './pages/notes/notes.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { NoteDetailsComponent } from './pages/note-details/note-details.component';
import { TagsComponent } from './pages/tags/tags.component';
import { RemindersComponent } from './pages/reminders/reminders.component';
import { TagDetailsComponent } from './pages/tag-details/tag-details.component';

//Нужно создать пути для существующих тегов и напоминаний
const routes: Routes = [
  { path: '', component: MainLayoutComponent, children: [
    { path: '', component: NotesComponent },
    { path: ':notes/new', component: NoteDetailsComponent },
    { path: ':notes/id/:id', component: NoteDetailsComponent },
    { path: ':notes/tags', component: TagsComponent },
    { path: ':notes/tags/new', component: TagDetailsComponent },
    { path: ':notes/reminders', component: RemindersComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
