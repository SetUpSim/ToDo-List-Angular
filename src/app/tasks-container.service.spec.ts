import { TestBed } from '@angular/core/testing';

import { TasksContainerService } from './tasks-container.service';

describe('TasksContainerService', () => {
  let service: TasksContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
