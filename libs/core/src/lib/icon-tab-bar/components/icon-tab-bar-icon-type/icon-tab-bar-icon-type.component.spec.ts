import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconTabBarIconTypeComponent } from './icon-tab-bar-icon-type.component';

describe('IconTabBarIconTypeComponent', () => {
  let component: IconTabBarIconTypeComponent;
  let fixture: ComponentFixture<IconTabBarIconTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconTabBarIconTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconTabBarIconTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
