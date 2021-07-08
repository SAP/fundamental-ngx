import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconTabBarProcessTypeComponent } from './icon-tab-bar-process-type.component';

describe('IconTabBarProcessTypeComponent', () => {
  let component: IconTabBarProcessTypeComponent;
  let fixture: ComponentFixture<IconTabBarProcessTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconTabBarProcessTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconTabBarProcessTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
