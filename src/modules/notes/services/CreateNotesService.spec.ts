import FakeNotesRepository from '@modules/notes/repositories/fakes/FakeNotesRepository';
import CreateNotesService from '@modules/notes/services/CreateNotesService';

let fakeNotesRepository: FakeNotesRepository;
let createNotesService: CreateNotesService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeNotesRepository = new FakeNotesRepository();
    createNotesService = new CreateNotesService(fakeNotesRepository);
  });
  it('should be able to create a new note', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const note = await createNotesService.execute({
      user_id: 'user-id',
      content: 'Mensagem de teste',
    });

    expect(note).toHaveProperty('id');
    expect(note.user_id).toBe('user-id');
    expect(note.content).toBe('Mensagem de teste');
    expect(note.created_at).toStrictEqual(new Date(2020, 4, 10, 12));
  });
});
