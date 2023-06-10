import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { Note } from '../models/note.model';

@Injectable({ providedIn: 'root' })
export class NoteService {

  private notesCollection: AngularFirestoreCollection<Note>;
  notes: Observable<Note[]>;

  constructor(
    private db: AngularFirestore
  ) {
    this.notesCollection = db.collection<Note>('notes');
    this.notes = this.notesCollection.valueChanges();
   }

   addNote(note: Note) {
    this.notesCollection.add(note);
   }

   updateNote(noteId: string, newData: Partial<Note>) {
    this.notesCollection.doc(noteId).update(newData);
  }

  deleteNote(noteId: string) {
    this.notesCollection.doc(noteId).delete();
  }

   getNotes(): Observable<Note[]> {
    return this.notes;
  }

  getNote(id: number): Observable<Note[]> {
    const queryFn: QueryFn = (ref) => ref.where('id', '==', id);
    return this.db.collection<Note>('notes', queryFn).valueChanges();
  }

  searchNotes(title: string): Observable<Note[]> {
    const queryFn: QueryFn = (ref) => ref.where('title', '==', title);
    return this.db.collection<Note>('notes', queryFn).valueChanges();
  }







  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
