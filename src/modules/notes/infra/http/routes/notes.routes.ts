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

notesRouter.get(
  '/:user_id',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().required(),
    },
  }),
  notesController.get,
);

export default notesRouter;
