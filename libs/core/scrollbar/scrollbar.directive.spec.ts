import { Component, ElementRef, ViewChild, input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ScrollbarDirective } from './scrollbar.directive';

@Component({
    template: `
        <div
            #componentElement
            fd-scrollbar
            [noHorizontalScroll]="noHorizontalScroll()"
            [noVerticalScroll]="noVerticalScroll()"
            [alwaysVisible]="alwaysVisible()"
        ></div>
    `,
    standalone: true,
    imports: [ScrollbarDirective]
})
class TestComponent {
    @ViewChild('componentElement', { read: ElementRef, static: true })
    ref: ElementRef;

    readonly noHorizontalScroll = input(false);
    readonly noVerticalScroll = input(false);
    readonly alwaysVisible = input(false);
}

describe('ScrollbarDirective Host Component', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
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
        expect(component.ref.nativeElement.classList.contains('fd-scrollbar')).toBe(true);
    });

    it('should hide horizontal overflow content', () => {
        fixture.componentRef.setInput('noHorizontalScroll', true);
        fixture.detectChanges();

        expect(component.ref.nativeElement.style.overflowX).toEqual('hidden');
    });

    it('should hide vertical overflow content', () => {
        fixture.componentRef.setInput('noVerticalScroll', true);
        fixture.detectChanges();

        expect(component.ref.nativeElement.style.overflowY).toEqual('hidden');
    });

    it('should make scrollbars always visible', () => {
        fixture.componentRef.setInput('alwaysVisible', true);
        fixture.detectChanges();

        expect(component.ref.nativeElement.style.overflowX).toEqual('scroll');
        expect(component.ref.nativeElement.style.overflowY).toEqual('scroll');
    });
});
