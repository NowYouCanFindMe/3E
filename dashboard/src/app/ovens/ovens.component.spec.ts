import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvensComponent } from './ovens.component';

describe('OvensComponent', () => {
  let component: OvensComponent;
  let fixture: ComponentFixture<OvensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
