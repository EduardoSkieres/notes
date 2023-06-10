import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../shared/models/note.model';
@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(notes: Note[], searchTerm?: string): Note[] {
    if (!searchTerm) return notes;
    const search = searchTerm.toLowerCase();
    return notes.filter(note => (
      note.title.toLowerCase().includes(search) ||
      note.description.toLowerCase().includes(search)
    ));
  }

}
