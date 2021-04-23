import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllustratedMessageActionsComponent } from './illustrated-message-actions.component';

describe('IllustratedMessageActionsComponent', () => {
  let component: IllustratedMessageActionsComponent;
  let fixture: ComponentFixture<IllustratedMessageActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IllustratedMessageActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IllustratedMessageActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
