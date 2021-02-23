import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllustratedMessageIllustrationComponent } from './illustrated-message-illustration.component';

describe('IllustratedMessageIllustrationComponent', () => {
  let component: IllustratedMessageIllustrationComponent;
  let fixture: ComponentFixture<IllustratedMessageIllustrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IllustratedMessageIllustrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IllustratedMessageIllustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
