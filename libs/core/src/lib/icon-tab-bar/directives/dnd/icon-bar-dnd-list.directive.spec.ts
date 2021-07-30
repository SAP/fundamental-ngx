import { IconBarDndListDirective } from './icon-bar-dnd-list.directive';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IconBarDndContainerDirective } from './icon-bar-dnd-container.directive';

@Component({
    template: `
        <div fdIconBarDndContainer>
            <div fdIconBarDndList>IconBarDndListDirective Test</div>
        </div>
    `
})
class TestComponent {
    @ViewChild(IconBarDndListDirective)
    directive: IconBarDndListDirective;
}

describe('IconBarDndListDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent,
                IconBarDndListDirective,
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
