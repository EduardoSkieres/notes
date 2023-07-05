import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Note } from 'src/app/shared/models/note.model';
import { NoteCreateComponent } from '../note-create/note-create.component';
import { NoteService } from 'src/app/shared/services/note.service';

@Component({
  selector: 'note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() note: Note = new Note();
  @Input() noteChange: Function = () => { };
  @Input() deleteNote: Function = () => { };

  constructor(private router: Router,
    private noteService: NoteService,
    public dialog: MatDialog,) { }

  ngOnInit() {
  }

  onDelete(): void {
    this.deleteNote(this.note);
  }

  onArchive(): void {
    const newNote = {
      ...this.note,
      isArchived: !this.note.isArchived,
    }
    this.noteChange(newNote);
  }

  onDoneToggle(): void {
    const newNote = {
      ...this.note,
      isDone: !this.note.isDone,
    };
    this.noteChange(newNote);
  }

  toEditPage(): void {
    const dialogRef = this.dialog.open(NoteCreateComponent, {
      data: this.note
    })
  }
  getNotes() {
    this.noteService.getNotes().subscribe(notes => {
      this.noteService.notes = notes as Note[]
      if (this.router.url === '') this.noteService.notes.filter(note => !note.isArchived)
      if (this.router.url === '/archive') this.noteService.notes.filter(note => note.isArchived)
    })
  }
}
