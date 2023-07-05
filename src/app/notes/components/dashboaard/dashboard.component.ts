import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Router, ActivatedRoute } from '@angular/router';
import { Note } from 'src/app/shared/models/note.model';
import { NoteService } from 'src/app/shared/services/note.service';
import { NoteCreateComponent } from '../note-create/note-create.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(
    private noteService: NoteService,
    public router: Router,
    public dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.getNotes();

    return;
  }

  getNotes() {
    this.noteService.getNotes().subscribe(notes => {
      this.noteService.notes = notes as Note[]
      if (this.router.url === '') this.noteService.notes.filter(note => !note.isArchived)
      if (this.router.url === '/archive') this.noteService.notes.filter(note => note.isArchived)
    })
  }

  // addedNote(newNote: Note): void {
  //   this.noteService.addNote(newNote)
  //   this.noteService.notes = this.noteService.notes?.concat(newNote);
  // }

  deleteNote = (note: Note): void => {
    this.noteService.notes = this.noteService.notes.filter(n => n !== note);
    this.noteService.deleteNote(note.id.toString())
  }

  noteChange = (note: Note): void => {
    const currentNote = this.noteService.notes.find((currentNote) => currentNote.id === note.id);
    if (currentNote == undefined) return;
    const noteIndex = this.noteService.notes.indexOf(currentNote);
    const newNotes = [...this.noteService.notes];
    newNotes[noteIndex] = note;
    this.noteService.notes = newNotes;

    this.noteService.updateNote(note.id.toString(), note)
  };

  addOrEdit(product?: Note) {
    if (!product) product = new Note()
    const dialogRef = this.dialog.open(NoteCreateComponent, {
      data: product
    })

    dialogRef.afterClosed().subscribe(_note => {
      this.getNotes();
    });
  }


  public get notes(): Note[] {
    return this.noteService.notes;
  }

}
