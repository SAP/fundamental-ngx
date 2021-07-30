import { IconBarDndItemDirective } from './icon-bar-dnd-item.directive';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IconBarDndListDirective } from './icon-bar-dnd-list.directive';
import { IconBarDndContainerDirective } from './icon-bar-dnd-container.directive';

@Component({
    template: `
      <div fdIconBarDndContainer>
        <div fdIconBarDndList>
          <div fdIconBarDndItem>IconBarDndItemDirective Test</div>
        </div>
      </div>
    `
})
class TestComponent {
    @ViewChild(IconBarDndItemDirective)
    directive: IconBarDndItemDirective;
}

describe('IconBarDndItemDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent,
                IconBarDndListDirective,
                IconBarDndItemDirective,
                IconBarDndContainerDirective
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component.directive).toBeTruthy();
    });
});
