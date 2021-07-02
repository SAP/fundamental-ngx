import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconTabBarPopoverComponent } from './icon-tab-bar-popover.component';

describe('IconTabBarPopoverComponent', () => {
  let component: IconTabBarPopoverComponent;
  let fixture: ComponentFixture<IconTabBarPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconTabBarPopoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconTabBarPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
