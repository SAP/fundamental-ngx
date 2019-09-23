import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionBarActionsComponent } from './action-bar-actions.component';

describe('ActionBarContextualMenuActionsComponent', () => {
  let component: ActionBarActionsComponent;
  let fixture: ComponentFixture<ActionBarActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionBarActionsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionBarActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
