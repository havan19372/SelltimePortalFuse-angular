import { ProjectTaskModule } from './project-task.module';

describe('ProjectTaskModule', () => {
  let projectTaskModule: ProjectTaskModule;

  beforeEach(() => {
    projectTaskModule = new ProjectTaskModule();
  });

  it('should create an instance', () => {
    expect(projectTaskModule).toBeTruthy();
  });
});
