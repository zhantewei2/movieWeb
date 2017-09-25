import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardLoadComponent } from './forward-load.component';

describe('ForwardLoadComponent', () => {
  let component: ForwardLoadComponent;
  let fixture: ComponentFixture<ForwardLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForwardLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForwardLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
