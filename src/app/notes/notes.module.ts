import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { NoteCreateComponent } from './components/note-create/note-create.component';
import { NoteEditComponent } from './components/note-edit/note-edit.component';
import { NoteComponent } from './components/note/note.component';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { FormsModule } from '@angular/forms';
import { ArchiveComponent } from './components/archive/archive.component';
import { NotesComponent } from './notes.component';
import { MaterialComponentsModule } from '../shared/material-components.module';
import { SearchPipe } from '../pipes/search.pipe';
import { DashboardComponent } from './components/dashboaard/dashboard.component';
import { NotesRoutingModule } from './notes-routing.module';



@NgModule({
  declarations: [
    NoteComponent,
    NoteCreateComponent,
    NoteEditComponent,
    NotesListComponent,
    ArchiveComponent,
    NotesComponent,
    SearchPipe,
    DashboardComponent,
  ],
  exports: [
    NoteComponent,
    NotesComponent,
    NoteCreateComponent,
    NoteEditComponent,
    NotesListComponent,
    ArchiveComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MaterialComponentsModule,
    NotesRoutingModule
  ]
})
export class NotesModule { }
