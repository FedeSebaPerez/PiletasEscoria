import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePoolComponent } from './delete-pool.component';

describe('DeletePoolComponent', () => {
  let component: DeletePoolComponent;
  let fixture: ComponentFixture<DeletePoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletePoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
