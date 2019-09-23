import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosterHeaderComponent } from './poster-header.component';

describe('PosterHeaderComponent', () => {
  let component: PosterHeaderComponent;
  let fixture: ComponentFixture<PosterHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosterHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosterHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
