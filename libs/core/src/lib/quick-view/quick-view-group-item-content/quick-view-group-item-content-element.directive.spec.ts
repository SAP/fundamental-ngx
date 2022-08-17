import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { QuickViewGroupItemContentElementDirective } from './quick-view-group-item-content-element.directive';

@Component({
    template: ` <div #directiveElement fd-quick-view-group-item-content-element>Element</div> `
})
class TestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;
}

describe('QuickViewGroupItemContentElementDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, QuickViewGroupItemContentElementDirective]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign class', () => {
        expect(component.ref.nativeElement.classList).toContain('fd-quick-view__group-item__content-element');
    });
});
