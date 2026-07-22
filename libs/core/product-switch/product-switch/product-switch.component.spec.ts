import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ProductSwitchButtonDirective } from '../product-switch-button.directive';
import { ProductSwitchComponent } from './product-switch.component';

@Component({
    template: `
        <fd-product-switch>
            <ng-template fdProductSwitchButton>
                <button class="custom-test-button">Custom</button>
            </ng-template>
        </fd-product-switch>
    `,
    imports: [ProductSwitchComponent, ProductSwitchButtonDirective]
})
class ProductSwitchWithCustomButtonTestComponent {}

describe('ProductSwitchComponent', () => {
    let component: ProductSwitchComponent;
    let fixture: ComponentFixture<ProductSwitchComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ProductSwitchComponent, ProductSwitchWithCustomButtonTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductSwitchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have default placement of bottom-end', () => {
        expect(component.placement()).toBe('bottom-end');
    });

    it('should accept input values', () => {
        fixture.componentRef.setInput('placement', 'top-start');
        fixture.componentRef.setInput('disabled', true);
        fixture.componentRef.setInput('closeOnEscapeKey', false);
        fixture.detectChanges();

        expect(component.placement()).toBe('top-start');
        expect(component.disabled()).toBe(true);
        expect(component.closeOnEscapeKey()).toBe(false);
    });

    it('should support isOpen model signal', () => {
        expect(component.isOpen()).toBe(false);

        component.isOpen.set(true);
        fixture.detectChanges();

        expect(component.isOpen()).toBe(true);
    });

    it('should have noArrow set to true by default', () => {
        expect(component.noArrow()).toBe(true);
    });

    it('should accept triggers input', () => {
        fixture.componentRef.setInput('triggers', ['mouseenter', 'mouseleave']);
        fixture.detectChanges();

        expect(component.triggers()).toEqual(['mouseenter', 'mouseleave']);
    });

    it('should apply disabled class binding when disabled', () => {
        fixture.componentRef.setInput('disabled', true);
        fixture.detectChanges();

        expect(fixture.nativeElement.classList.contains('fd-popover-custom--disabled')).toBe(true);
    });

    it('should not emit isOpenChange on initial render', () => {
        const emittedValues: boolean[] = [];
        component.isOpenChange.subscribe((value) => emittedValues.push(value));

        fixture.detectChanges();

        expect(emittedValues).toEqual([]);
    });

    it('should not emit isOpenChange on initial render', () => {
        const emittedValues: boolean[] = [];
        component.isOpenChange.subscribe((value) => emittedValues.push(value));

        fixture.detectChanges();

        expect(emittedValues).toEqual([]);
    });

    it('should emit isOpenChange when open state changes', () => {
        const emittedValues: boolean[] = [];
        component.isOpenChange.subscribe((value) => emittedValues.push(value));

        component.isOpen.set(true);
        fixture.detectChanges();

        component.isOpen.set(false);
        fixture.detectChanges();

        expect(emittedValues).toEqual([true, false]);
    });

    describe('default input values', () => {
        it('should have disabled set to false by default', () => {
            expect(component.disabled()).toBe(false);
        });

        it('should have closeOnEscapeKey set to true by default', () => {
            expect(component.closeOnEscapeKey()).toBe(true);
        });

        it('should have closeOnOutsideClick set to true by default', () => {
            expect(component.closeOnOutsideClick()).toBe(true);
        });

        it('should have disableScrollbar set to false by default', () => {
            expect(component.disableScrollbar()).toBe(false);
        });

        it('should have triggers set to [click] by default', () => {
            expect(component.triggers()).toEqual(['click']);
        });

        it('should have focusTrapped set to false by default', () => {
            expect(component.focusTrapped()).toBe(false);
        });

        it('should have focusAutoCapture set to false by default', () => {
            expect(component.focusAutoCapture()).toBe(false);
        });

        it('should have isOpen set to false by default', () => {
            expect(component.isOpen()).toBe(false);
        });
    });

    describe('disabled class host binding', () => {
        it('should not apply disabled class when not disabled', () => {
            expect(fixture.nativeElement.classList.contains('fd-popover-custom--disabled')).toBe(false);
        });

        it('should remove disabled class when disabled input changes back to false', () => {
            fixture.componentRef.setInput('disabled', true);
            fixture.detectChanges();
            expect(fixture.nativeElement.classList.contains('fd-popover-custom--disabled')).toBe(true);

            fixture.componentRef.setInput('disabled', false);
            fixture.detectChanges();
            expect(fixture.nativeElement.classList.contains('fd-popover-custom--disabled')).toBe(false);
        });
    });

    describe('template structure', () => {
        it('should render fd-product-switch wrapper div', () => {
            const wrapper = fixture.nativeElement.querySelector('.fd-product-switch');
            expect(wrapper).toBeTruthy();
        });

        it('should render fd-popover inside the wrapper', () => {
            const popover = fixture.debugElement.query(By.css('fd-popover'));
            expect(popover).toBeTruthy();
        });

        it('should render the default shellbar grid button when no custom button is projected', () => {
            const defaultButton = fixture.nativeElement.querySelector('button.fd-shellbar__button');
            expect(defaultButton).toBeTruthy();
        });
    });

    describe('booleanAttribute input transform', () => {
        it('should coerce string "true" to boolean true for disabled input', () => {
            fixture.componentRef.setInput('disabled', 'true');
            fixture.detectChanges();
            expect(component.disabled()).toBe(true);
        });

        it('should coerce string "false" to boolean false for disabled input', () => {
            fixture.componentRef.setInput('disabled', 'false');
            fixture.detectChanges();
            expect(component.disabled()).toBe(false);
        });
    });

    describe('custom product switch button projection', () => {
        let hostFixture: ComponentFixture<ProductSwitchWithCustomButtonTestComponent>;

        beforeEach(() => {
            hostFixture = TestBed.createComponent(ProductSwitchWithCustomButtonTestComponent);
            hostFixture.detectChanges();
        });

        it('should render the custom button when fdProductSwitchButton is projected', () => {
            const customButton = hostFixture.nativeElement.querySelector('.custom-test-button');
            expect(customButton).toBeTruthy();
        });

        it('should not render the default shellbar grid button when a custom button is projected', () => {
            const defaultButton = hostFixture.nativeElement.querySelector('button.fd-shellbar__button');
            expect(defaultButton).toBeFalsy();
        });
    });
});
