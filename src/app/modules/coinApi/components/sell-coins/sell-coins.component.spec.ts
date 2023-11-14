import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellCoinsComponent } from './sell-coins.component';

describe('SellCoinsComponent', () => {
  let component: SellCoinsComponent;
  let fixture: ComponentFixture<SellCoinsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellCoinsComponent]
    });
    fixture = TestBed.createComponent(SellCoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
