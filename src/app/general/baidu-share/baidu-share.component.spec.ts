import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaiduShareComponent } from './baidu-share.component';

describe('BaiduShareComponent', () => {
  let component: BaiduShareComponent;
  let fixture: ComponentFixture<BaiduShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaiduShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaiduShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
