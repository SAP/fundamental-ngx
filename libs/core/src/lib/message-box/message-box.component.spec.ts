import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBoxComponent } from './message-box.component';

describe('MessageBoxComponent', () => {
  let component: MessageBoxComponent;
  let fixture: ComponentFixture<MessageBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
