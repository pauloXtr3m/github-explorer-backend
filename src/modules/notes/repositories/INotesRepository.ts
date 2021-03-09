import ICreateNoteDTO from '@modules/notes/dtos/ICreateNoteDTO';
import Note from '@modules/notes/infra/typeorm/schemas/Note';

export default interface INotesRepository {
  create(data: ICreateNoteDTO): Promise<Note>;
  getAllFromUser(userId: string): Promise<Note[]>;
}
