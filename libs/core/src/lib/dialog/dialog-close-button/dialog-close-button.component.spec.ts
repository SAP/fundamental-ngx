import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCloseButtonComponent, DialogModule } from '@fundamental-ngx/core/dialog';

describe('DialogCloseButtonComponent', () => {
  let component: DialogCloseButtonComponent;
  let fixture: ComponentFixture<DialogCloseButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DialogModule ]
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
