import ICreateNoteDTO from '@modules/notes/dtos/ICreateNoteDTO';
import Notes from '@modules/notes/infra/typeorm/schemas/Notes';

export default interface INotesRepository {
  create(data: ICreateNoteDTO): Promise<Notes>;
  getAllFromUser(userId: string): Promise<Notes[]>;
}
