import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBoxBodyComponent } from './message-box-body.component';

describe('MessageBoxBodyComponent', () => {
  let component: MessageBoxBodyComponent;
  let fixture: ComponentFixture<MessageBoxBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageBoxBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageBoxBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
