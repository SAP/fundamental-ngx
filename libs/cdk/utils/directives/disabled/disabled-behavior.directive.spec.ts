import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DisabledBehaviorDirective } from './disabled-behavior.directive';

@Component({
    standalone: true,
    imports: [DisabledBehaviorDirective],
    template: `
        <button
            fdkDisabled
            [fdkDisabled]="disabled"
            [addDisabledClass]="addDisabledClass"
            [disabledClass]="disabledClass"
        >
            Test Button
        </button>
    `
})
class TestComponent {
    @ViewChild(DisabledBehaviorDirective, { static: true }) directive: DisabledBehaviorDirective;

    disabled = false;
    addDisabledClass = true;
    disabledClass = 'is-disabled';
}

describe('DisabledBehaviorDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let buttonElement: HTMLButtonElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent, DisabledBehaviorDirective]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        buttonElement = fixture.nativeElement.querySelector('button');
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create an instance', () => {
        expect(component.directive).toBeTruthy();
    });

    it('should not be disabled initially', () => {
        expect(component.directive.fdkDisabled).toBe(false);
        expect(buttonElement.hasAttribute('disabled')).toBe(false);
        expect(buttonElement.hasAttribute('aria-disabled')).toBe(false);
        expect(buttonElement.classList.contains('is-disabled')).toBe(false);
    });

    it('should disable the element when fdkDisabled is set to true', async () => {
        component.disabled = true;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.directive.fdkDisabled).toBe(true);
        expect(buttonElement.hasAttribute('disabled')).toBe(true);
        expect(buttonElement.getAttribute('aria-disabled')).toBe('true');
        expect(buttonElement.classList.contains('is-disabled')).toBe(true);
    });

    it('should enable the element when fdkDisabled is set to false', async () => {
        component.disabled = true;
        fixture.detectChanges();
        await fixture.whenStable();

        component.disabled = false;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.directive.fdkDisabled).toBe(false);
        expect(buttonElement.hasAttribute('disabled')).toBe(false);
        expect(buttonElement.hasAttribute('aria-disabled')).toBe(false);
        expect(buttonElement.classList.contains('is-disabled')).toBe(false);
    });

    it('should coerce string "true" to boolean true', async () => {
        component.disabled = 'true' as any;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.directive.fdkDisabled).toBe(true);
        expect(buttonElement.hasAttribute('disabled')).toBe(true);
    });

    it('should coerce empty string to boolean true', async () => {
        component.disabled = '' as any;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.directive.fdkDisabled).toBe(true);
        expect(buttonElement.hasAttribute('disabled')).toBe(true);
    });

    it('should coerce "false" string to boolean false', async () => {
        component.disabled = 'false' as any;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.directive.fdkDisabled).toBe(false);
        expect(buttonElement.hasAttribute('disabled')).toBe(false);
    });

    describe('with addDisabledClass set to false', () => {
        beforeEach(async () => {
            // Set addDisabledClass first and detect changes
            component.addDisabledClass = false;
            fixture.detectChanges();
            await fixture.whenStable();

            // Then enable disabled state
            component.disabled = true;
            fixture.detectChanges();
            await fixture.whenStable();
        });

        it('should not add disabled class when addDisabledClass is false', () => {
            expect(component.directive.fdkDisabled).toBe(true);
            expect(buttonElement.hasAttribute('disabled')).toBe(true);
            expect(buttonElement.getAttribute('aria-disabled')).toBe('true');
            expect(buttonElement.classList.contains('is-disabled')).toBe(false);
        });
    });

    describe('with custom disabled class', () => {
        beforeEach(async () => {
            // Set custom class first and detect changes
            component.disabledClass = 'custom-disabled';
            fixture.detectChanges();
            await fixture.whenStable();

            // Then enable disabled state
            component.disabled = true;
            fixture.detectChanges();
            await fixture.whenStable();
        });

        it('should use custom disabled class', () => {
            expect(buttonElement.classList.contains('custom-disabled')).toBe(true);
            expect(buttonElement.classList.contains('is-disabled')).toBe(false);
        });
    });

    it('should remove custom disabled class when re-enabled', async () => {
        component.disabledClass = 'custom-disabled';
        component.disabled = true;
        fixture.detectChanges();
        await fixture.whenStable();

        component.disabled = false;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(buttonElement.classList.contains('custom-disabled')).toBe(false);
    });

    it('should emit disabled state through observable', (done) => {
        const emittedValues: boolean[] = [];
        component.directive.subscribe((value) => {
            emittedValues.push(value);
        });

        component.disabled = true;
        fixture.detectChanges();

        setTimeout(() => {
            expect(emittedValues).toContain(true);
            done();
        }, 100);
    });

    it('should emit multiple state changes through observable', (done) => {
        const emittedValues: boolean[] = [];
        component.directive.subscribe((value) => {
            emittedValues.push(value);
        });

        component.disabled = true;
        fixture.detectChanges();

        setTimeout(() => {
            component.disabled = false;
            fixture.detectChanges();

            setTimeout(() => {
                expect(emittedValues).toContain(true);
                expect(emittedValues).toContain(false);
                done();
            }, 100);
        }, 100);
    });

    it('should not emit duplicate values when disabled state does not change', (done) => {
        const emittedValues: boolean[] = [];
        component.directive.subscribe((value) => {
            emittedValues.push(value);
        });

        component.disabled = true;
        fixture.detectChanges();

        setTimeout(() => {
            component.disabled = true;
            fixture.detectChanges();

            setTimeout(() => {
                // Should only emit once for true
                const trueCount = emittedValues.filter((v) => v === true).length;
                expect(trueCount).toBe(1);
                done();
            }, 100);
        }, 100);
    });

    it('should call setPreventDefault on FdkClickedProvider when disabled', async () => {
        const clickedProvider = (component.directive as any)._clicked;
        const spy = jest.spyOn(clickedProvider, 'setPreventDefault');

        component.disabled = true;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(spy).toHaveBeenCalledWith(true);
    });

    it('should call setPreventDefault with false when enabled', async () => {
        component.disabled = true;
        fixture.detectChanges();
        await fixture.whenStable();

        const clickedProvider = (component.directive as any)._clicked;
        const spy = jest.spyOn(clickedProvider, 'setPreventDefault');

        component.disabled = false;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(spy).toHaveBeenCalledWith(false);
    });

    it('should complete the observable on destroy', () => {
        const completeSpy = jest.spyOn(component.directive, 'complete');

        fixture.destroy();

        expect(completeSpy).toHaveBeenCalled();
    });

    it('should expose setDisabledState method', () => {
        expect(component.directive.setDisabledState).toBeDefined();
        expect(typeof component.directive.setDisabledState).toBe('function');
    });

    it('should manually set disabled state via setDisabledState method', () => {
        component.directive.setDisabledState(true);

        expect(buttonElement.hasAttribute('disabled')).toBe(true);
        expect(buttonElement.getAttribute('aria-disabled')).toBe('true');
        expect(buttonElement.classList.contains('is-disabled')).toBe(true);
    });

    it('should handle rapid state changes', async () => {
        component.disabled = true;
        fixture.detectChanges();
        component.disabled = false;
        fixture.detectChanges();
        component.disabled = true;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.directive.fdkDisabled).toBe(true);
        expect(buttonElement.hasAttribute('disabled')).toBe(true);
    });
});
