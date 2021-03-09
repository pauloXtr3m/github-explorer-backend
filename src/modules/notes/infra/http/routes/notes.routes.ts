import { Router } from 'express';
import NotesController from '@modules/notes/infra/http/controllers/NotesController';
import { celebrate, Joi, Segments } from 'celebrate';

const notesRouter = Router();
const notesController = new NotesController();

notesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().required(),
      content: Joi.string().required(),
    },
  }),
  notesController.create,
);

export default notesRouter;
