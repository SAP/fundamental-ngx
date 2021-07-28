import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IconTabBarModule } from '../../icon-tab-bar.module';
import { IconBarDndContainerDirective } from './icon-bar-dnd-container.directive';

@Component({
  template: ` <div #directiveElement fdIconBarDndContainer>DndContainerGroupDirective Test</div> `
})
class TestComponent {
  @ViewChild(IconBarDndContainerDirective)
  directive: IconBarDndContainerDirective;
}

describe('fdIconBarDndContainer', () => {
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
