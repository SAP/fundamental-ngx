import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconTabBarTextTypeComponent } from './icon-tab-bar-text-type.component';

describe('IconTabBarTextTypeComponent', () => {
  let component: IconTabBarTextTypeComponent;
  let fixture: ComponentFixture<IconTabBarTextTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconTabBarTextTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconTabBarTextTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
