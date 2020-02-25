import { InMemoryDbService } from 'angular-in-memory-web-api';

import { ScrumboardFakeDb } from './scrumboard';
import { ProjectsFakeDb } from './projects';

export class FuseFakeDbService implements InMemoryDbService {
  createDb() {
    return {
      // Scrumboard
      'scrumboard-boards': ScrumboardFakeDb.boards,

      'project-projects': ProjectsFakeDb.projects,
      'project-messages': ProjectsFakeDb.messages
    };
  }
}
