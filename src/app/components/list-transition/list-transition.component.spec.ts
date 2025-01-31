import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTransitionComponent } from './list-transition.component';

describe('ListTransitionComponent', () => {
  let component: ListTransitionComponent;
  let fixture: ComponentFixture<ListTransitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTransitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTransitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
