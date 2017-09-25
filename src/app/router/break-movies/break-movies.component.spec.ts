import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakMoviesComponent } from './break-movies.component';

describe('BreakMoviesComponent', () => {
  let component: BreakMoviesComponent;
  let fixture: ComponentFixture<BreakMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreakMoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
