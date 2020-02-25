import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollBusinessTableComponent } from './scroll-business-table.component';

describe('ScrollBusinessTableComponent', () => {
  let component: ScrollBusinessTableComponent;
  let fixture: ComponentFixture<ScrollBusinessTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollBusinessTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollBusinessTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
