import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconTabBarComponent } from './icon-tab-bar.component';

describe('IconTabBarComponent', () => {
  let component: IconTabBarComponent;
  let fixture: ComponentFixture<IconTabBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconTabBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconTabBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
