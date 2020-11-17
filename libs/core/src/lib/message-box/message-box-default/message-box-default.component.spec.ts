import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBoxDefaultComponent } from './message-box-default.component';

describe('MessageBoxDefaultComponent', () => {
  let component: MessageBoxDefaultComponent;
  let fixture: ComponentFixture<MessageBoxDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageBoxDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageBoxDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
