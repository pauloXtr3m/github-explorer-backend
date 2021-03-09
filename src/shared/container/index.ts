import { container } from 'tsyringe';

import INotesRepository from '@modules/notes/repositories/INotesRepository';
import NotesRepository from '@modules/notes/infra/typeorm/repositories/NotesRepository';

container.registerSingleton<INotesRepository>(
  'NotesRepository',
  NotesRepository,
);
