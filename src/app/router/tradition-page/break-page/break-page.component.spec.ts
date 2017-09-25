import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakPageComponent } from './break-page.component';

describe('BreakPageComponent', () => {
  let component: BreakPageComponent;
  let fixture: ComponentFixture<BreakPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreakPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
