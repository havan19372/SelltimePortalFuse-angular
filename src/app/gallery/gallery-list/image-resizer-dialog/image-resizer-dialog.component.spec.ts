import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageResizerDialogComponent } from './image-resizer-dialog.component';

describe('ImageResizerDialogComponent', () => {
  let component: ImageResizerDialogComponent;
  let fixture: ComponentFixture<ImageResizerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageResizerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageResizerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
