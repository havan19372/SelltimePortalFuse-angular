import { ProjectGuard } from './project.guard';
import { ProjectExistGuard } from './project-exist.guard';

export const guards: any[] = [ProjectGuard, ProjectExistGuard];

export * from './project.guard';
export * from './project-exist.guard';
