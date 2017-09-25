import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCard1Component } from './movie-card1.component';

describe('MovieCard1Component', () => {
  let component: MovieCard1Component;
  let fixture: ComponentFixture<MovieCard1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieCard1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCard1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
