import { PropertyModule } from './property.module';

describe('PropertyModule', () => {
  let propertyModule: PropertyModule;

  beforeEach(() => {
    propertyModule = new PropertyModule();
  });

  it('should create an instance', () => {
    expect(propertyModule).toBeTruthy();
  });
});
