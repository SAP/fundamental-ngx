import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalFlowUserListComponent } from './approval-flow-user-list.component';

describe('ApprovalFlowUserListComponent', () => {
  let component: ApprovalFlowUserListComponent;
  let fixture: ComponentFixture<ApprovalFlowUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalFlowUserListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalFlowUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
