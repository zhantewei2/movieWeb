import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarArrComponent } from './bar-arr.component';

describe('BarArrComponent', () => {
  let component: BarArrComponent;
  let fixture: ComponentFixture<BarArrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarArrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarArrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
