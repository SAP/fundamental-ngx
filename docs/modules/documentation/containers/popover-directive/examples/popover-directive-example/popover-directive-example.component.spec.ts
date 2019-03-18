import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverDirectiveExampleComponent } from './popover-directive-example.component';

describe('PopoverDirectiveExampleComponent', () => {
  let component: PopoverDirectiveExampleComponent;
  let fixture: ComponentFixture<PopoverDirectiveExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverDirectiveExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverDirectiveExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
