import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellbarProductSwitcherComponent } from './shellbar-product-switcher.component';

describe('ShellbarProductSwitcherComponent', () => {
  let component: ShellbarProductSwitcherComponent;
  let fixture: ComponentFixture<ShellbarProductSwitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShellbarProductSwitcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellbarProductSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
