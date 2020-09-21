import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetOrganizerComponent } from './budget-organizer.component';

describe('BudgetOrganizerComponent', () => {
  let component: BudgetOrganizerComponent;
  let fixture: ComponentFixture<BudgetOrganizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetOrganizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetOrganizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
