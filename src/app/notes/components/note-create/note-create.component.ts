import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Note } from 'src/app/shared/models/note.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NoteService } from 'src/app/shared/services/note.service';


@Component({
  selector: 'note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.scss']
})
export class NoteCreateComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<NoteCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Note,
    private route: ActivatedRoute,
    private noteService: NoteService,

  ) { }

  onSubmit() {
    if (this.data.id) {
      this.save()
    } else {
      const newNote = {
        id: this.newGuid(),
        title: this.data.title,
        description: this.data.description,
        isDone: this.data.isDone || false,
        isArchived: this.data.isArchived || false,
      };
      this.addedNote(newNote);
    }
  }

  ngOnInit(): void {
  }


  addedNote(newNote: Note): void {
    this.noteService.addNote(newNote);
    this.dialogRef.close();
  }

  delete(): void {
    this.noteService.deleteNote(this.data.id.toString());
    this.dialogRef.close();
  }

  save(): void {
    this.noteService.updateNote(this.data.id.toString(), this.data)
    this.dialogRef.close();
  }


  newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
