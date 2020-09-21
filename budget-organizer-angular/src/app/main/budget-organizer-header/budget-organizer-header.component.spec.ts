import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetOrganizerHeaderComponent } from './budget-organizer-header.component';

describe('BudgetOrganizerHeaderComponent', () => {
  let component: BudgetOrganizerHeaderComponent;
  let fixture: ComponentFixture<BudgetOrganizerHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetOrganizerHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetOrganizerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
