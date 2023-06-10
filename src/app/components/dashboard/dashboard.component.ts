import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Note } from 'src/app/shared/models/note.model';
import { NoteService } from 'src/app/shared/services/note.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public notes: Note[] = [];
  constructor(
    private noteService: NoteService,
    private route: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit() {
    this.noteService.getNotes().subscribe(notes => {
      this.notes = notes as Note[]
      if(this.router.url === '/dashboard') this.notes.filter(note => !note.isArchived)
      if(this.router.url === '/archive') this.notes.filter(note => note.isArchived)

  })

    return ;
  }

  addedNote(newNote: Note): void {
    this.noteService.addNote(newNote)
      this.notes = this.notes?.concat(newNote);
  }

  deleteNote = (note: Note): void => {
    this.notes = this.notes.filter(n => n !== note);
    this.noteService.deleteNote(note.id.toString())
  }

  noteChange = (note: Note): void => {
    const currentNote = this.notes.find((currentNote) => currentNote.id === note.id);
    if (currentNote == undefined) return;
    const noteIndex = this.notes.indexOf(currentNote);
    const newNotes = [...this.notes];
    newNotes[noteIndex] = note;
    this.notes = newNotes;

    this.noteService.updateNote(note.id.toString(), note)
  };
}
