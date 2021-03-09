import FakeNotesRepository from '@modules/notes/repositories/fakes/FakeNotesRepository';
import CreateNotesService from '@modules/notes/services/CreateNotesService';
import GetNotesFromUserService from '@modules/notes/services/GetNotesFromUserService';

let fakeNotesRepository: FakeNotesRepository;
let createNotesService: CreateNotesService;
let getNotesFromUser: GetNotesFromUserService;

describe('GetNotesFromUserService', () => {
  beforeEach(() => {
    fakeNotesRepository = new FakeNotesRepository();
    createNotesService = new CreateNotesService(fakeNotesRepository);
    getNotesFromUser = new GetNotesFromUserService(fakeNotesRepository);
  });
  it('should be able to get all notes from user', async () => {
    await createNotesService.execute({
      user_id: 'user-id-1',
      content: 'Mensagem de teste 1',
    });

    await createNotesService.execute({
      user_id: 'user-id-2',
      content: 'Mensagem de teste 2',
    });

    await createNotesService.execute({
      user_id: 'user-id-1',
      content: 'Mensagem de teste 3',
    });

    const notesUser1 = await getNotesFromUser.execute({ user_id: 'user-id-1' });

    expect(notesUser1).toHaveLength(2);

    const notesUser2 = await getNotesFromUser.execute({ user_id: 'user-id-2' });

    expect(notesUser2).toHaveLength(1);
  });

  it('should not return notes if user does not have notes', async () => {
    await createNotesService.execute({
      user_id: 'user-id-1',
      content: 'Mensagem de teste 1',
    });

    await createNotesService.execute({
      user_id: 'user-id-2',
      content: 'Mensagem de teste 2',
    });

    await createNotesService.execute({
      user_id: 'user-id-1',
      content: 'Mensagem de teste 3',
    });

    const notes = await getNotesFromUser.execute({ user_id: 'user-id-3' });

    expect(notes).toHaveLength(0);
  });
});
