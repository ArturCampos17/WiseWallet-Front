import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTransitionComponent } from './register-transition.component';

describe('RegisterTransitionComponent', () => {
  let component: RegisterTransitionComponent;
  let fixture: ComponentFixture<RegisterTransitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterTransitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterTransitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
