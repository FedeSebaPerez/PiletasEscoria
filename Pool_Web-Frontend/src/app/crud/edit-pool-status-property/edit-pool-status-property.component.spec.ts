import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPoolStatusPropertyComponent } from './edit-pool-status-property.component';

describe('InfoModalComponent', () => {
  let component: EditPoolStatusPropertyComponent;
  let fixture: ComponentFixture<EditPoolStatusPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPoolStatusPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPoolStatusPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
