import FakeNotesRepository from '@modules/notes/repositories/fakes/FakeNotesRepository';
import CreateNotesService from '@modules/notes/services/CreateNotesService';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeNotesRepository: FakeNotesRepository;
let createNotesService: CreateNotesService;
let cacheProvider: ICacheProvider;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeNotesRepository = new FakeNotesRepository();
    cacheProvider = new FakeCacheProvider();
    createNotesService = new CreateNotesService(
      fakeNotesRepository,
      cacheProvider,
    );
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

  it('should invalidate old cache if a new note was created', async () => {
    const invalidateOldCache = jest.spyOn(cacheProvider, 'invalidate');

    await createNotesService.execute({
      user_id: 'user-id',
      content: 'Mensagem de teste',
    });

    expect(invalidateOldCache).toHaveBeenCalled();
  });
});
