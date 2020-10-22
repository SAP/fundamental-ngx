import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedInputHeaderComponent } from './feed-input-header.component';

describe('FeedInputHeaderComponent', () => {
  let component: FeedInputHeaderComponent;
  let fixture: ComponentFixture<FeedInputHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedInputHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedInputHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
