import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Note } from '../shared/models/note.model';
import { NoteService } from '../shared/services/note.service';



@Injectable()
export class NotesResolver implements Resolve<Array<Note>> {
  private notes: Note[] = [];

  constructor(private noteService: NoteService) {}

  async resolve() {
    this.noteService.getNotes().subscribe(notes => {
      this.notes = notes as Note[]
  })
  console.log(this.notes)

    return this.notes.filter(note => !note.isArchived);
  }

}
