import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MenuSeparatorComponent } from './menu-separator.component';

describe('MenuSeparatorComponent', () => {
  let component: MenuSeparatorComponent;
  let fixture: ComponentFixture<MenuSeparatorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuSeparatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSeparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
