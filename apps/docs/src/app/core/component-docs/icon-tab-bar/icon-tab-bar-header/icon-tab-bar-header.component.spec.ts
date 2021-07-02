import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconTabBarHeaderComponent } from './icon-tab-bar-header.component';

describe('IconTabBarHeaderComponent', () => {
  let component: IconTabBarHeaderComponent;
  let fixture: ComponentFixture<IconTabBarHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconTabBarHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconTabBarHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
