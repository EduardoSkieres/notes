import { Component, Input } from '@angular/core';
import { Note } from 'src/app/shared/models/note.model';

@Component({
  selector: 'notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent {
  @Input() notes: Note[] = [];
  @Input() noteChange: Function = () => { };
  @Input() deleteNote: Function = () => { };

  public searchTerm: string = '';

  constructor() {

   }
}
