import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QueryFn } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { Note } from '../models/note.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class NoteService {

  private notesCollection: AngularFirestoreCollection<Note>;
  public notes: Note[] = [];
  notes$: Observable<Note[]>;
  public userId: string;

  constructor(
    private db: AngularFirestore,
  ) {
    this.userId = JSON.parse(localStorage.getItem('user')!).uid;
    this.notesCollection = db.collection('data').doc(this.userId).collection<Note>('notes');
    this.notes$ = this.notesCollection.valueChanges();
  }

  addNote(note: Note) {
    const notaRef: AngularFirestoreDocument<any> = this.db.doc(
      `data/${this.userId}/notes/${note.id}`
    );

    return notaRef.set(note, {
      merge: true,
    });
  }

  updateNote(noteId: string, newData: Partial<Note>) {
    const notaRef: AngularFirestoreDocument<any> = this.db.doc(
      `data/${this.userId}/notes/${noteId}`
    );

    return notaRef.set(newData, {
      merge: true,
    });
  }

  deleteNote(noteId: string) {
    const notaRef: AngularFirestoreDocument<any> = this.db.doc(
      `data/${this.userId}/notes/${noteId}`
    );

    notaRef.delete();
  }

  getNotes(): Observable<Note[]> {
    return this.notes$;
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
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
