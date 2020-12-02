import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCloseButtonComponent } from './dialog-close-button.component';

describe('DialogCloseButtonComponent', () => {
  let component: DialogCloseButtonComponent;
  let fixture: ComponentFixture<DialogCloseButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCloseButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCloseButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
