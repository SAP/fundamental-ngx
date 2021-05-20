import { Component, DebugElement, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ScrollSpyDirective } from './scroll-spy.directive';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'fd-scroll-spy-test-component',
    template: ` <div fdScrollSpy [trackedTags]="['div']" (spyChange)="selectedSpy = $event.id">
        <div id="div1"></div>
        <span id="span1"></span>
        <div id="div2"></div>
    </div>`
})
export class ScrollSpyTestComponent {
    selectedSpy: any;
}

export class MockElementRef extends ElementRef {
    constructor() {
        super(null);
    }
}

describe('ScrollSpyDirective', () => {
    let fixture: ComponentFixture<ScrollSpyTestComponent>,
        component: ScrollSpyTestComponent,
        debugElement: DebugElement,
        element: HTMLElement;

    let directive, directiveInstance;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ScrollSpyDirective, ScrollSpyTestComponent],
            providers: [{ provide: ElementRef, useClass: MockElementRef }]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScrollSpyTestComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        element = debugElement.nativeElement;
        fixture.detectChanges();
        directive = debugElement.query(By.directive(ScrollSpyDirective));
        directiveInstance = directive.injector.get(ScrollSpyDirective);
    });

    it('should create', () => {
        expect(directive).toBeTruthy();
    });
});
