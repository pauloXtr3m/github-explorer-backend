import { Response, Request } from 'express';
import CreateNotesService from '@modules/notes/services/CreateNotesService';
import { container } from 'tsyringe';

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
}
