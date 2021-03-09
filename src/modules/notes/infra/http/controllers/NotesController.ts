import { Response, Request } from 'express';
import CreateNotesService from '@modules/notes/services/CreateNotesService';
import { container } from 'tsyringe';
import GetNotesFromUserService from '@modules/notes/services/GetNotesFromUserService';

export default class NotesController {
  public async create(request: Request, response: Response) {
    const { user_id, content } = request.body;

    const createNotes = container.resolve(CreateNotesService);

    const note = await createNotes.execute({
      user_id,
      content,
    });
    return response.json(note);
  }

  public async get(request: Request, response: Response) {
    const { user_id } = request.params;

    const getNotesFromUser = container.resolve(GetNotesFromUserService);

    const note = await getNotesFromUser.execute({
      user_id,
    });
    return response.json(note);
  }
}
