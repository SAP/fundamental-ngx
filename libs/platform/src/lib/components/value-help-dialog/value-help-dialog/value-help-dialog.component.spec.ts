import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueHelpDialogComponent } from './value-help-dialog.component';

describe('PlatformValueHelpDialogComponent', () => {
  let component: PlatformValueHelpDialogComponent;
  let fixture: ComponentFixture<PlatformValueHelpDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlatformValueHelpDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformValueHelpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
