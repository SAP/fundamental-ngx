import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconTabBarFilterTypeComponent } from './icon-tab-bar-filter-type.component';

describe('IconTabBarFilterTypeComponent', () => {
  let component: IconTabBarFilterTypeComponent;
  let fixture: ComponentFixture<IconTabBarFilterTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconTabBarFilterTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconTabBarFilterTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
