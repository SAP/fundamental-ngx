import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellbarUserMenuComponent } from './shellbar-user-menu.component';

describe('UserMenuComponent', () => {
  let component: ShellbarUserMenuComponent;
  let fixture: ComponentFixture<ShellbarUserMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShellbarUserMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellbarUserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
