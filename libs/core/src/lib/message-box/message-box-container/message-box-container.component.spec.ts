import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBoxContainerComponent } from './message-box-container.component';

describe('MessageBoxContainerComponent', () => {
  let component: MessageBoxContainerComponent;
  let fixture: ComponentFixture<MessageBoxContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageBoxContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageBoxContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
