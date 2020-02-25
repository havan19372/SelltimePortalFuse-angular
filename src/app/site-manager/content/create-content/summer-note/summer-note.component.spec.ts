import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummerNoteComponent } from './summer-note.component';

describe('SummerNoteComponent', () => {
  let component: SummerNoteComponent;
  let fixture: ComponentFixture<SummerNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummerNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummerNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
