import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from './file.service';
import { getPhoto } from '../testing/file/get-photo-mock';

describe('FileService', () => {
  let fileService: FileService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileService],
    }).compile();
    fileService = module.get<FileService>(FileService);
  });

  test('Validar a definição', () => {
    expect(fileService).toBeDefined();
  });

  describe('Teste FileService', () => {
    test('upload method', async () => {
      const photo = await getPhoto();
      const fileName = 'photo-teste.png';

      await fileService.upload(photo, fileName);
    });
  });
});
