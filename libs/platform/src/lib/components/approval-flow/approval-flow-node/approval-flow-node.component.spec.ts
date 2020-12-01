import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalFlowNodeComponent } from './approval-flow-node.component';

fdescribe('ApprovalFlowNodeComponent', () => {
  let component: ApprovalFlowNodeComponent;
  let fixture: ComponentFixture<ApprovalFlowNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalFlowNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalFlowNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
