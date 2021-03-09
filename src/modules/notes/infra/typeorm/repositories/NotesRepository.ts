import INotesRepository from '@modules/notes/repositories/INotesRepository';
import ICreateNoteDTO from '@modules/notes/dtos/ICreateNoteDTO';
import { getMongoRepository, MongoRepository } from 'typeorm';

import Notes from 'modules/notes/infra/typeorm/schemas/Notes';

class NotesRepository implements INotesRepository {
  private ormRepository: MongoRepository<Notes>;

  constructor() {
    this.ormRepository = getMongoRepository(Notes, 'mongo');
  }

  public async create({ content, user_id }: ICreateNoteDTO): Promise<Notes> {
    const note = this.ormRepository.create({ content, user_id });

    await this.ormRepository.save(note);

    return note;
  }

  public async getAllFromUser(userId: string): Promise<Notes[]> {
    return this.ormRepository.find({ where: { user_id: userId } });
  }
}

export default NotesRepository;
