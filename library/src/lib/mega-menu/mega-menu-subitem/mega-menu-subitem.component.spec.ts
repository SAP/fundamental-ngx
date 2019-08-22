import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaMenuSubitemComponent } from './mega-menu-subitem.component';

describe('MegaMenuSubitemComponent', () => {
  let component: MegaMenuSubitemComponent;
  let fixture: ComponentFixture<MegaMenuSubitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MegaMenuSubitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MegaMenuSubitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
