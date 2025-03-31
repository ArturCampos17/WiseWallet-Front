import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCategoryComponent } from './chart-category.component';

describe('ChartCategoryComponent', () => {
  let component: ChartCategoryComponent;
  let fixture: ComponentFixture<ChartCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
