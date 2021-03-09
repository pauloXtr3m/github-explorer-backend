import { Router } from 'express';
import notesRouter from '@modules/notes/infra/http/routes/notes.routes';

const routes = Router();

routes.use('/notes', notesRouter);

export default routes;
