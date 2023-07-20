import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from 'src/app/models/note.model';
import { Tag } from 'src/app/models/tag.model';
import { NotesService } from 'src/app/services/notes.service';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit{

  noteDetails: Note = {
    id: '',
    title: '',
    description: '',
    date: new Date(0, 0, 0, 0, 0),
    notesTags: []
  }

  tags: Tag[] = [];
  typePage: boolean = false;

  constructor(private noteService: NotesService,
              private tagService: TagsService ,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe({
      next: (params) =>{
        const id = params.get('id');

        if(id){
          this.noteService.getNote(id)
          .subscribe({
            next:(response) =>{
              this.noteDetails = response;

            }
          });
          this.typePage = true;
        }
      }
    })


    this.getAllTags();
  }


  getAllTags(): void
  {
    this.tagService.getAllTags()
    .subscribe({
      next: (tags) =>{
        console.log(tags);
        this.tags = tags;
      },
      error: (response)=>{
        console.log(response);
      }
    });

  }

<<<<<<< HEAD

  getNoteTags() : void
  {

    
  }


  onSubmit(form: NgForm) {
    if(this.type)
=======
  onSubmit() {
    if(this.typePage)
>>>>>>> 3393af17cf037c8b17086d756e7ac2d971a60ca3
      this.updateNote();
    else
      this.addNote();
  }

  Cancel() {
    this.router.navigateByUrl('/');
  }

  updateNote(){
    this.noteService.updateNote(this.noteDetails.id, this.noteDetails)
    .subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigateByUrl('/');
      }
    })
  }

  addNote(){
    console.log(this.noteDetails);
    this.noteService.addNote(this.noteDetails)
    .subscribe({
      next: (note)=>{
        console.log(note);
        this.router.navigateByUrl('/');
      }
    });
  }
}