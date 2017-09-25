import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpLoadBarComponent } from './http-load-bar.component';

describe('HttpLoadBarComponent', () => {
  let component: HttpLoadBarComponent;
  let fixture: ComponentFixture<HttpLoadBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HttpLoadBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpLoadBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
