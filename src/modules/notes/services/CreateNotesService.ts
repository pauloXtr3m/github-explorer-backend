import { injectable, inject } from 'tsyringe';
import INotesRepository from '@modules/notes/repositories/INotesRepository';
import Note from '@modules/notes/infra/typeorm/schemas/Note';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  user_id: string;
  content: string;
}

@injectable()
class CreateNotesService {
  constructor(
    @inject('NotesRepository')
    private notesRepository: INotesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id, content }: IRequest): Promise<Note> {
    const note = this.notesRepository.create({
      user_id,
      content,
    });

    await this.cacheProvider.invalidate(`notes:${user_id}`);

    return note;
  }
}

export default CreateNotesService;
