import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaMenuSublinkComponent } from './mega-menu-sublink.component';

describe('MegaMenuSublinkComponent', () => {
  let component: MegaMenuSublinkComponent;
  let fixture: ComponentFixture<MegaMenuSublinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MegaMenuSublinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MegaMenuSublinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
