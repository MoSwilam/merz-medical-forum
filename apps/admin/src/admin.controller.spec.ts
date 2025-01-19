import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { SERVICES } from '@lib';

describe('AdminControlle', () => {
  let adminController: AdminController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        AdminService,
        {
          provide: SERVICES.SEARCH_SERVICE,
          useValue: {
            getHealth: () => 'OK',
            // getHealth2: jest.fn().mockResolvedValue('OK'),
          },
        },
      ],
    }).compile();

    adminController = app.get<AdminController>(AdminController);
  });

  describe('Health Check', () => {
    it('Test the health check endooint"', () => {
      expect(adminController.getHealth()).toBe('OK');
    });
  });
});
