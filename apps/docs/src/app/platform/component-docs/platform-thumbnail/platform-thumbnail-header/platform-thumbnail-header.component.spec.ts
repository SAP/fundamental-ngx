import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformThumbnailHeaderComponent } from './platform-thumbnail-header.component';

describe('PlatformThumbnailHeaderComponent', () => {
  let component: PlatformThumbnailHeaderComponent;
  let fixture: ComponentFixture<PlatformThumbnailHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformThumbnailHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformThumbnailHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
