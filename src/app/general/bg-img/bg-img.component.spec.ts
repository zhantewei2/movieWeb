import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BgImgComponent } from './bg-img.component';

describe('BgImgComponent', () => {
  let component: BgImgComponent;
  let fixture: ComponentFixture<BgImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BgImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BgImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
