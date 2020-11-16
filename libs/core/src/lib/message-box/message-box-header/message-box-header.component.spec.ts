import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBoxHeaderComponent } from './message-box-header.component';

describe('MessageBoxHeaderComponent', () => {
  let component: MessageBoxHeaderComponent;
  let fixture: ComponentFixture<MessageBoxHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageBoxHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageBoxHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
