import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTransactionComponent } from './register-transaction.component';

describe('RegisterTransitionComponent', () => {
  let component: RegisterTransactionComponent;
  let fixture: ComponentFixture<RegisterTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
