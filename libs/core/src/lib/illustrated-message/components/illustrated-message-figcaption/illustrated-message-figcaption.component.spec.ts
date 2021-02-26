import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllustratedMessageFigcaptionComponent } from './illustrated-message-figcaption.component';

describe('IllustratedMessageFigcaptionComponent', () => {
  let component: IllustratedMessageFigcaptionComponent;
  let fixture: ComponentFixture<IllustratedMessageFigcaptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IllustratedMessageFigcaptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IllustratedMessageFigcaptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
