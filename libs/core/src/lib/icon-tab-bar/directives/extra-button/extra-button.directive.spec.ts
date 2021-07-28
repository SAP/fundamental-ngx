import { ExtraButtonDirective } from './extra-button.directive';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IconTabBarModule } from '../../icon-tab-bar.module';


@Component({
  template: ` <div #directiveElement fdExtraButton>ExtraButtonDirective Test</div> `
})
class TestComponent {
  @ViewChild(ExtraButtonDirective)
  directive: ExtraButtonDirective;
}

describe('fdExtraButton', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [IconTabBarModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component.directive).toBeTruthy();
  });
});
