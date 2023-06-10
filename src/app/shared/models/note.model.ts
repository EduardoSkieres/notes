import { INote } from './note.interface';

export class Note implements INote {
  id!: string;
  title!: string;
  description!: string;
  isDone!: boolean;
  isArchived!: boolean;
}
