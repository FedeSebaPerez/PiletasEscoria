import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivatePoolComponent } from './deactivate-pool.component';

describe('DeactivatePoolComponent', () => {
  let component: DeactivatePoolComponent;
  let fixture: ComponentFixture<DeactivatePoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeactivatePoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivatePoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
