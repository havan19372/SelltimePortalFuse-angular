import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentSingleComponent } from './comment-single.component';

describe('CommentSingleComponent', () => {
  let component: CommentSingleComponent;
  let fixture: ComponentFixture<CommentSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
