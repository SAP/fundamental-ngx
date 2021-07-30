import { ExtraButtonDirective } from './extra-button.directive';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';


@Component({
    template: `
        <div id="test-container" style="position: relative; display: flex;">
            <div>Some item</div>
            <div>Some item</div>
            <div>Some item</div>
            <div>Some item</div>
            <button style="position: absolute;" #directive fdExtraButton [anchorIndexInsideParent]="anchorIndexInsideParent">ExtraButtonDirective Test</button>
        </div> `
})
class TestComponent {
    @ViewChild('directive')
    directiveEl: ElementRef;

    @ViewChild(ExtraButtonDirective)
    directive: ExtraButtonDirective;

    anchorIndexInsideParent = 0;
}

describe('fdExtraButton', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent,
                ExtraButtonDirective
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

    it('should stick extra item button to anchor', () => {
        const initialLeftPosition = component.directiveEl.nativeElement.offsetLeft;

        component.anchorIndexInsideParent = 2;
        fixture.detectChanges();
        component.directive.calculatePosition();
        fixture.detectChanges();

        const newLeftPosition = component.directiveEl.nativeElement.offsetLeft;
        expect(initialLeftPosition).not.toBe(newLeftPosition);
    });
});
