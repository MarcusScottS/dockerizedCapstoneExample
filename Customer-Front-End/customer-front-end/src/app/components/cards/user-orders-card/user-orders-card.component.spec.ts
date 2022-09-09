import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrdersCardComponent } from './user-orders-card.component';

describe('UserOrdersCardComponent', () => {
  let component: UserOrdersCardComponent;
  let fixture: ComponentFixture<UserOrdersCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserOrdersCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOrdersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
