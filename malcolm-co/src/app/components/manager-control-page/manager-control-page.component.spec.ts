import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerControlPageComponent } from './manager-control-page.component';

describe('ManagerControlPageComponent', () => {
  let component: ManagerControlPageComponent;
  let fixture: ComponentFixture<ManagerControlPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerControlPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerControlPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
