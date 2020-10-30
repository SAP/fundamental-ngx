import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformApprovalFlowHeaderComponent } from './platform-approval-flow-header.component';

describe('ApprovalFlowHeaderComponent', () => {
  let component: PlatformApprovalFlowHeaderComponent;
  let fixture: ComponentFixture<PlatformApprovalFlowHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatformApprovalFlowHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformApprovalFlowHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
