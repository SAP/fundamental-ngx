import { Component, input, viewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CSS_CLASS_NAME } from './constants';
import { LayoutGridComponent } from './layout-grid.component';

@Component({
    template: `<fd-layout-grid
        [noGap]="noGap()"
        [noHorizontalGap]="noHorizontalGap()"
        [noVerticalGap]="noVerticalGap()"
    ></fd-layout-grid>`,
    standalone: true,
    imports: [LayoutGridComponent]
})
class TestNestedContainerComponent {
    readonly noGap = input(false);
    readonly noHorizontalGap = input(false);
    readonly noVerticalGap = input(false);
    readonly componentElement = viewChild.required(LayoutGridComponent);
}

describe('LayoutGridComponent', () => {
    let component: TestNestedContainerComponent;
    let componentElement: LayoutGridComponent;
    let fixture: ComponentFixture<TestNestedContainerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestNestedContainerComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestNestedContainerComponent);
        component = fixture.componentInstance;
        componentElement = component.componentElement();
        fixture.detectChanges();
    });

    function getHostElement(): HTMLElement {
        // The host element is the first child of the test component's native element
        return fixture.nativeElement.querySelector('fd-layout-grid');
    }

    it('should apply base css class', () => {
        const host = getHostElement();
        expect(host.classList.contains(CSS_CLASS_NAME.layoutGrid)).toBeTruthy();
    });

    it('should apply noVerticalGap class when input is true', () => {
        fixture.componentRef.setInput('noVerticalGap', true);
        fixture.detectChanges();
        const host = getHostElement();
        expect(host.classList.contains(CSS_CLASS_NAME.layoutGridNoVerticalGap)).toBeTruthy();
    });

    it('should apply noHorizontalGap class when input is true', () => {
        fixture.componentRef.setInput('noHorizontalGap', true);
        fixture.detectChanges();
        const host = getHostElement();
        expect(host.classList.contains(CSS_CLASS_NAME.layoutGridNoHorizontalGap)).toBeTruthy();
    });

    it('should apply noGap class when input is true', () => {
        fixture.componentRef.setInput('noGap', true);
        fixture.detectChanges();
        const host = getHostElement();
        expect(host.classList.contains(CSS_CLASS_NAME.layoutGridNoGap)).toBeTruthy();
    });

    it('should not apply noGap class when input is false', () => {
        fixture.componentRef.setInput('noGap', false);
        fixture.detectChanges();
        const host = getHostElement();
        expect(host.classList.contains(CSS_CLASS_NAME.layoutGridNoGap)).toBeFalsy();
    });

    it('should update classes when inputs change', () => {
        fixture.componentRef.setInput('noGap', false);
        fixture.componentRef.setInput('noVerticalGap', true);
        fixture.componentRef.setInput('noHorizontalGap', true);
        fixture.detectChanges();
        const host = getHostElement();
        expect(host.classList.contains(CSS_CLASS_NAME.layoutGrid)).toBeTruthy();
        expect(host.classList.contains(CSS_CLASS_NAME.layoutGridNoGap)).toBeFalsy();
        expect(host.classList.contains(CSS_CLASS_NAME.layoutGridNoVerticalGap)).toBeTruthy();
        expect(host.classList.contains(CSS_CLASS_NAME.layoutGridNoHorizontalGap)).toBeTruthy();
    });
});
