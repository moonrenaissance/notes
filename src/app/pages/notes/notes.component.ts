import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { NotesService } from 'src/app/services/notes.service';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})

export class NotesComponent implements OnInit{

  notes: Note[] = [];
  filteredNotes: Note[] = new Array<Note>();

  constructor(private notesService: NotesService, private tagsService: TagsService) {}

  ngOnInit() {
    this.notesService.getAllNotes()
    .subscribe({
      next: (notes) =>{
        console.log(notes);
        this.notes = notes;
        this.filteredNotes = notes;
      },
      error: (response)=>{
        console.log(response);
      }
    });
  }

  filter(query: string){
    let allResults: Note[] = new Array<Note>();
    query = query.toLowerCase().trim();

    let terms: string[] = query.split(' ');
    terms = this.removeDuplications(terms);
    terms.forEach(term => {
      let results: Note[] = this.relevantNotes(term);
      allResults = [...allResults, ...results]
    });

    this.filteredNotes = this.removeDuplications(allResults);
  }

  removeDuplications(arr: Array<any>): Array<any>{
    let uniqueResults: Set<any> = new Set<any>();
    arr.forEach(e => uniqueResults.add(e));

    return Array.from(uniqueResults);
  }

  relevantNotes(query: string): Array<Note>{
    query = query.toLowerCase().trim();
    let relevantNotes = this.notes.filter(note =>{
      if((note.description && note.description.toLowerCase().includes(query)) || note.title.toLowerCase().includes(query)){
        return true;
      }

      //need fix => Когда вызывается метод this.tagsService.getTag(noteTag.tagId).subscribe()
      //он запускает асинхронную операцию получения тега с сервера.
      //Вместо того, чтобы блокировать выполнение кода и ожидать завершения операции, код продолжает выполняться дальше. 
      //Поэтому сначала выводится 2, а затем, после завершения асинхронной операции, выводится 1, если найден соответствующий тег.
      // note.notesTags.forEach(noteTag => {
      //   this.tagsService.getTag(noteTag.tagId)
      //   .subscribe({
      //     next: (tag) =>{
      //       if(tag.title.toLowerCase().includes(query)){
      //         console.log('1');
      //       }
      //     },
      //     error: (response)=>{
      //       console.log(response);
      //     }
      //   });
      // });
      // console.log('2');

      return false;
    })

    return relevantNotes;
  }
}
