import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalFlowTeamListComponent } from './approval-flow-team-list.component';

describe('ApprovalFlowTeamListComponent', () => {
  let component: ApprovalFlowTeamListComponent;
  let fixture: ComponentFixture<ApprovalFlowTeamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalFlowTeamListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalFlowTeamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
