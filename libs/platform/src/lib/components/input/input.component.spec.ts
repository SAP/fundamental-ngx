import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPlatformComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputPlatformComponent;
  let fixture: ComponentFixture<InputPlatformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputPlatformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
