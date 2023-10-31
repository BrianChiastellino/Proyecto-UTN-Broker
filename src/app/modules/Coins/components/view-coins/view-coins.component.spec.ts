import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCoinsComponent } from './view-coins.component';

describe('ViewCoinsComponent', () => {
  let component: ViewCoinsComponent;
  let fixture: ComponentFixture<ViewCoinsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCoinsComponent]
    });
    fixture = TestBed.createComponent(ViewCoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
