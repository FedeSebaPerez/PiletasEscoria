import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPoolStatusPropertyComponent } from './list-pool-status-property.component';

describe('ListPoolStatusPropertyComponent', () => {
  let component: ListPoolStatusPropertyComponent;
  let fixture: ComponentFixture<ListPoolStatusPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPoolStatusPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPoolStatusPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
