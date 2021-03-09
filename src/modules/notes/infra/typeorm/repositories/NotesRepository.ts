import INotesRepository from '@modules/notes/repositories/INotesRepository';
import ICreateNoteDTO from '@modules/notes/dtos/ICreateNoteDTO';
import { getMongoRepository, MongoRepository } from 'typeorm';

import Note from '@modules/notes/infra/typeorm/schemas/Note';

class NotesRepository implements INotesRepository {
  private ormRepository: MongoRepository<Note>;

  constructor() {
    this.ormRepository = getMongoRepository(Note);
  }

  public async create({ content, user_id }: ICreateNoteDTO): Promise<Note> {
    const note = this.ormRepository.create({ content, user_id });

    await this.ormRepository.save(note);

    return note;
  }

  public async getAllFromUser(userId: string): Promise<Note[]> {
    return this.ormRepository.find({ where: { user_id: userId } });
  }
}

export default NotesRepository;
