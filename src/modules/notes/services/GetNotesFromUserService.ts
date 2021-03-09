import { injectable, inject } from 'tsyringe';
import INotesRepository from '@modules/notes/repositories/INotesRepository';
import Note from '@modules/notes/infra/typeorm/schemas/Note';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';

interface IRequest {
  user_id: string;
}

@injectable()
class GetNotesFromUserService {
  constructor(
    @inject('NotesRepository')
    private notesRepository: INotesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Note[]> {
    const cacheKey = `notes:${user_id}`;

    let notes = await this.cacheProvider.recover<Note[]>(cacheKey);

    if (!notes) {
      notes = await this.notesRepository.getAllFromUser(user_id);

      await this.cacheProvider.save(cacheKey, classToClass(notes));
    }

    return notes;
  }
}

export default GetNotesFromUserService;
