import { injectable, inject } from 'tsyringe';
import INotesRepository from '@modules/notes/repositories/INotesRepository';
import Note from '@modules/notes/infra/typeorm/schemas/Note';

interface IRequest {
  user_id: string;
  content: string;
}

@injectable()
class CreateNotesService {
  constructor(
    @inject('NotesRepository')
    private notesRepository: INotesRepository,
  ) {}

  public async execute({ user_id, content }: IRequest): Promise<Note> {
    const note = this.notesRepository.create({
      user_id,
      content,
    });

    return note;
  }
}

export default CreateNotesService;
