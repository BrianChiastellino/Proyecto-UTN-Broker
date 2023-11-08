import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyCoinsApiComponent } from './buy-coins-api.component';

describe('BuyCoinsApiComponent', () => {
  let component: BuyCoinsApiComponent;
  let fixture: ComponentFixture<BuyCoinsApiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyCoinsApiComponent]
    });
    fixture = TestBed.createComponent(BuyCoinsApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
