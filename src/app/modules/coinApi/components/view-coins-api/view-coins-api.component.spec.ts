import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCoinsApiComponent } from './view-coins-api.component';

describe('ViewCoinsApiComponent', () => {
  let component: ViewCoinsApiComponent;
  let fixture: ComponentFixture<ViewCoinsApiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCoinsApiComponent]
    });
    fixture = TestBed.createComponent(ViewCoinsApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
