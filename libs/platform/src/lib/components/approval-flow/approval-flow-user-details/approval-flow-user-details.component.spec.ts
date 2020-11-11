import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalFlowUserDetailsComponent } from './approval-flow-user-details.component';

describe('ApprovalFlowUserDetailsComponent', () => {
  let component: ApprovalFlowUserDetailsComponent;
  let fixture: ComponentFixture<ApprovalFlowUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalFlowUserDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalFlowUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
