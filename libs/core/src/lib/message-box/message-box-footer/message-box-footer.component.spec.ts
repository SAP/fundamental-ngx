import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBoxFooterComponent } from './message-box-footer.component';

describe('MessageBoxFooterComponent', () => {
  let component: MessageBoxFooterComponent;
  let fixture: ComponentFixture<MessageBoxFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageBoxFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageBoxFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
