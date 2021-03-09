import { injectable, inject } from 'tsyringe';
import INotesRepository from '@modules/notes/repositories/INotesRepository';
import Note from '@modules/notes/infra/typeorm/schemas/Note';

interface IRequest {
  user_id: string;
}

@injectable()
class GetNotesFromUserService {
  constructor(
    @inject('NotesRepository')
    private notesRepository: INotesRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Note[]> {
    const notes = this.notesRepository.getAllFromUser(user_id);

    return notes;
  }
}

export default GetNotesFromUserService;
