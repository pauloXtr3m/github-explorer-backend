import INotesRepository from '@modules/notes/repositories/INotesRepository';
import ICreateNoteDTO from '@modules/notes/dtos/ICreateNoteDTO';
import { ObjectID } from 'mongodb';
import Note from '@modules/notes/infra/typeorm/schemas/Note';

class FakeNotesRepository implements INotesRepository {
  private notes: Note[] = [];

  public async create({ content, user_id }: ICreateNoteDTO): Promise<Note> {
    const note = new Note();

    Object.assign(note, {
      id: new ObjectID(),
      content,
      user_id,
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now()),
    });

    this.notes.push(note);

    return note;
  }

  getAllFromUser(userId: string): Promise<Note[]> {
    return Promise.resolve(this.notes.filter(note => note.user_id === userId));
  }
}

export default FakeNotesRepository;
