import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { B, DOWN_ARROW, END, ENTER, ESCAPE, HOME, SPACE, TAB, X } from '@angular/cdk/keycodes';
import { ModifierKeys } from '@angular/cdk/testing'

import { SelectComponent } from './select.component';
import { PopoverComponent } from '../popover/popover.component';
import { SelectModule } from './select.module';
import { SelectKeyManagerService } from './select-key-manager.service';


@Component({
    template: `
        <fd-select [(value)]="value" formControlName="selectControl" (isOpenChange)="onOpen($event)">
            <fd-option id="option-1" [value]="'value-1'">Test1</fd-option>
            <fd-option id="option-2" [value]="'value-2'">Test2</fd-option>
            <fd-option id="option-3" [value]="'value-3'">Test3</fd-option>
            <fd-option id="option-4" [disabled]="disabled" [value]="'value-4'">Test4</fd-option>
        </fd-select>
    `
})
class TestWrapperComponent {
    @ViewChild(SelectComponent, { static: true })
    selectComponent: SelectComponent;

    @ViewChild(SelectComponent, { read: ElementRef, static: true })
    selectElement: ElementRef;

    value: string;

    disabled = false;

    overlayOpened: boolean;

    onOpen(isOpen: boolean): void {
        this.overlayOpened = isOpen;
    }
}

@Component({
    template: `
        <fd-select [(value)]="value" formControlName="selectControl">
            <fd-option id="option-1" [value]="'aaa'">aaaa</fd-option>
            <fd-option id="option-2" [value]="'bbb'">bbbb</fd-option>
            <fd-option id="option-2a" [value]="'bxbb'">bxbb</fd-option>
            <fd-option id="option-3" [value]="'ccc'">cccc</fd-option>
            <fd-option id="option-4" [value]="'ddd'">dddd</fd-option>
        </fd-select>
    `
})
class TestFilteringWrapperComponent {
    @ViewChild(SelectComponent, { static: true })
    selectComponent: SelectComponent;

    @ViewChild(SelectComponent, { read: ElementRef, static: true })
    selectElement: ElementRef;

    value: string;

    overlayOpened: boolean;

    onOpen(isOpen: boolean): void {
        this.overlayOpened = isOpen;
    }
}

describe('SelectComponent', () => {
    let element: ElementRef;
    let component: SelectComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;
    let triggerControl: HTMLElement;
    let _keyService: SelectKeyManagerService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestWrapperComponent, TestFilteringWrapperComponent],
            imports: [SelectModule]
        })
            .overrideComponent(SelectComponent, {
                set: { changeDetection: ChangeDetectionStrategy.Default }
            })
            .overrideComponent(PopoverComponent, {
                set: { changeDetection: ChangeDetectionStrategy.Default }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.componentInstance.selectComponent;
        element = fixture.componentInstance.selectElement;
        _keyService = component._getKeyService();
        fixture.detectChanges();
        triggerControl = element.nativeElement.querySelector('.fd-button');
    });

    async function wait(componentFixture: ComponentFixture<any>): Promise<void> {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    describe('basic behavior', () => {
        it('should create so that componennt instance is non null', () => {
            expect(component).toBeTruthy();
        });

        it('should have default state closed when component is initialized', () => {
            expect(fixture.nativeElement.querySelector('#option-1')).toBeFalsy();
        });

        it('should open options panel when we click on the trigger control.', async () => {
            triggerControl.click();
            await wait(fixture);

            expect(fixture.componentInstance.overlayOpened).toBeTruthy();
            expect(component._isOpen).toBeTruthy();
        });

        it('should close options panel when we click on the trigger control while select is open', async () => {
            triggerControl.click();
            await wait(fixture);

            expect(fixture.componentInstance.overlayOpened).toBeTruthy();
            expect(component._isOpen).toBeTruthy();
            triggerControl.click();
            expect(fixture.componentInstance.overlayOpened).toBeFalsy();
            expect(component._isOpen).toBeFalsy();
        });

        it('should close options panel when we select first optionItem', async () => {
            triggerControl.click();
            await wait(fixture);

            const option1: HTMLElement = document.querySelector('.cdk-overlay-container #option-1');
            option1.click();
            await wait(fixture);

            expect(fixture.componentInstance.overlayOpened).toBeFalsy();
            expect(component._isOpen).toBeFalsy();
        });

        it('should close options panel when we click outside of the overlay and trigger', async () => {
            component.open();

            await wait(fixture);
            expect(fixture.componentInstance.overlayOpened).toBeTruthy();
            expect(component._isOpen).toBeTruthy();

            (document.querySelector('.fd-button') as HTMLElement).click();
            await wait(fixture);

            expect(fixture.componentInstance.overlayOpened).toBeFalsy();
            expect(component._isOpen).toBeFalsy();
        });
    });

    describe('option items selection process', () => {
        it('should select 2nd option when item is clicked so that select value is "value-2" ', async () => {
            component.open();
            await wait(fixture);

            const options: NodeListOf<HTMLElement> = document.querySelectorAll(
                '.cdk-overlay-container .fd-list .fd-list__item '
            );
            options[1].click();

            await wait(fixture);

            expect(component.selected.value).toBe('value-2');
            expect(_keyService._keyManager.activeItem.value).toBe('value-2');
        });

        it('should initialize select with option value-3 active when [value] binding is set ', async () => {
            component.value = 'value-3';
            await wait(fixture);

            expect(component.selected.value).toBe('value-3');
            expect(_keyService._keyManager.activeItem.value).toBe('value-3');
        });

        it('should reset to NULL when initialized with non-existing value that is not part of original list', async () => {
            component.value = 'value-3aaa';
            await wait(fixture);

            expect(component.selected).toBeUndefined();
            expect(_keyService._keyManager.activeItemIndex).toBe(-1);
        });

        it('should be able to change initially selected value after selected is initialized', async () => {
            const testValue = 'value-1';
            fixture.componentInstance.value = testValue;
            await wait(fixture);

            expect(component.selected).toBeTruthy();
            expect(component.selected.value).toBe(testValue);
            expect(_keyService._keyManager.activeItem.value).toBe(testValue);

            fixture.componentInstance.value = 'value-2';
            await wait(fixture);

            expect(component.selected).toBeTruthy();
            expect(component.selected.value).toBe('value-2');
            expect(_keyService._keyManager.activeItem.value).toBe('value-2');
        });

        it('should not be clickable if option item is disabled', async () => {
            const testValue = 'value-1';
            fixture.componentInstance.value = testValue;
            fixture.componentInstance.disabled = true;
            await wait(fixture);
            expect(component.selected).toBeTruthy();
            expect(component.selected.value).toBe(testValue);
            expect(_keyService._keyManager.activeItem.value).toBe(testValue);

            const optionComponent = component._options.toArray()[2];
            optionComponent._getHtmlElement().click();

            await wait(fixture);

            expect(component.selected).toBeTruthy();
            expect(component.selected.value).toBe('value-3');
            expect(_keyService._keyManager.activeItem.value).toBe('value-3');
        });
    });

    describe('keyboard navigation', () => {
        it('should focus select when we TABin to it', async () => {
            document.body.focus();

            spyOn(component, 'focus').and.callThrough();
            triggerControl.dispatchEvent(keyboardEventWithModifier('keydown', TAB));
            await wait(fixture);
            expect(component.focus).toHaveBeenCalled();
        });

        it('should navigate to second item, when pressing ArrowDown and FirstItem is focused', async () => {
            component.value = 'value-1';
            await wait(fixture);

            triggerControl.click();
            await wait(fixture);

            expect(fixture.componentInstance.overlayOpened).toBeTruthy();
            expect(_keyService._keyManager.activeItemIndex).toBe(0);

            triggerControl.dispatchEvent(keyboardEventWithModifier('keydown', DOWN_ARROW));
            await wait(fixture);

            expect(_keyService._keyManager.activeItemIndex).toBe(1);
            expect(_keyService._keyManager.activeItem.active).toBeTruthy();
        });

        it('should navigate to the end of the list when pressing END', async () => {
            component.value = 'value-1';
            await wait(fixture);

            triggerControl.click();
            await wait(fixture);

            expect(fixture.componentInstance.overlayOpened).toBeTruthy();
            expect(_keyService._keyManager.activeItemIndex).toBe(0);

            triggerControl.dispatchEvent(keyboardEventWithModifier('keydown', END));
            await wait(fixture);

            expect(_keyService._keyManager.activeItemIndex).toBe(3);
        });

        it('should navigate to the top of the list when pressing HOME', async () => {
            component.value = 'value-3';
            await wait(fixture);

            triggerControl.click();
            await wait(fixture);

            expect(fixture.componentInstance.overlayOpened).toBeTruthy();
            expect(_keyService._keyManager.activeItemIndex).toBe(2);

            triggerControl.dispatchEvent(keyboardEventWithModifier('keydown', HOME));
            await wait(fixture);

            expect(_keyService._keyManager.activeItemIndex).toBe(0);
        });

        it('should select the item and close option panel when pressing ENTER', async () => {
            component.value = 'value-1';
            await wait(fixture);

            triggerControl.click();
            await wait(fixture);

            triggerControl.dispatchEvent(keyboardEventWithModifier('keydown', DOWN_ARROW));
            await wait(fixture);

            triggerControl.dispatchEvent(keyboardEventWithModifier('keydown', ENTER));
            await wait(fixture);

            expect(component.value).toBe('value-2');
        });

        it('should select the item and close option panel when pressing SPACE', async () => {
            component.value = 'value-1';
            await wait(fixture);

            triggerControl.click();
            await wait(fixture);

            triggerControl.dispatchEvent(keyboardEventWithModifier('keydown', DOWN_ARROW));
            await wait(fixture);

            triggerControl.dispatchEvent(keyboardEventWithModifier('keydown', SPACE));

            expect(component.value).toBe('value-2');
        });

        it('should open option panel when pressing ENTER and having focus on the select trigger', async () => {
            triggerControl.dispatchEvent(keyboardEventWithModifier('keydown', ENTER));
            await wait(fixture);

            expect(component._isOpen).toBeTruthy();
        });

        it('should close opened option panel when pressing ESC', async () => {
            triggerControl.click();
            await wait(fixture);

            triggerControl.dispatchEvent(keyboardEventWithModifier('keydown', ESCAPE));
            await wait(fixture);

            expect(component._isOpen).toBeTruthy();
        });

        it('should not be selectabe if option is disabled so that when we' +
            ' navigate the item is skipped and value-4 is selected', async () => {
                component.value = 'value-2';
                fixture.componentInstance.disabled = true;

                await wait(fixture);
                triggerControl.click();
                await wait(fixture);

                triggerControl.dispatchEvent(keyboardEventWithModifier('keydown', DOWN_ARROW));
                await wait(fixture);

                triggerControl.dispatchEvent(keyboardEventWithModifier('keydown', ENTER));
                await wait(fixture);

                expect(component.value).toBe('value-3');
            });
    });

    describe('filtering ', () => {
        let fixtureFilter: ComponentFixture<TestFilteringWrapperComponent>;
        beforeEach(() => {
            fixtureFilter = TestBed.createComponent(TestFilteringWrapperComponent);
            component = fixtureFilter.componentInstance.selectComponent;
            element = fixtureFilter.componentInstance.selectElement;
            fixtureFilter.detectChanges();

            triggerControl = fixtureFilter.nativeElement.querySelector('div.fd-select');
        });

        it('should make active second option "bbb" when start typing "b"', fakeAsync(() => {
            fixtureFilter.detectChanges();
            tick();

            triggerControl.dispatchEvent(keyboardEventWithModifier('keydown', 66, 'b'));
            tick(component.typeaheadDebounceInterval + 10);

            expect(_keyService._keyManager.activeItemIndex).toBeDefined();
        }));

        it('should make active 3th option "bxbb" when start typing "bx"', fakeAsync(() => {
            fixtureFilter.detectChanges();
            tick();
            triggerControl.dispatchEvent(keyboardEventWithModifier('keydown', B, 'b'));
            triggerControl.dispatchEvent(keyboardEventWithModifier('keydown', X, 'x'));
            tick(component.typeaheadDebounceInterval + 10);

            expect(_keyService._keyManager.activeItemIndex).toBeDefined();
        }));
    });
});

export function keyboardEventWithModifier(
    type: string,
    keyCode = 0,
    key = '',
    target?: Element,
    modifiers: ModifierKeys = {}
): Event {
    const event = document.createEvent('KeyboardEvent') as any;
    const originalPreventDefault = event.preventDefault;

    // Firefox does not support `initKeyboardEvent`, but supports `initKeyEvent`.
    if (event.initKeyEvent) {
        event.initKeyEvent(
            type,
            true,
            true,
            window,
            modifiers.control,
            modifiers.alt,
            modifiers.shift,
            modifiers.meta,
            keyCode
        );
    } else {
        // `initKeyboardEvent` expects to receive modifiers as a whitespace-delimited string
        // See https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/initKeyboardEvent
        let modifiersList = '';

        if (modifiers.control) {
            modifiersList += 'Control ';
        }

        if (modifiers.alt) {
            modifiersList += 'Alt ';
        }

        if (modifiers.shift) {
            modifiersList += 'Shift ';
        }

        if (modifiers.meta) {
            modifiersList += 'Meta ';
        }

        event.initKeyboardEvent(
            type,
            true /* canBubble */,
            true /* cancelable */,
            window /* view */,
            0 /* char */,
            key /* key */,
            0 /* location */,
            modifiersList.trim() /* modifiersList */,
            false /* repeat */
        );
    }

    // Webkit Browsers don't set the keyCode when calling the init function.
    // See related bug https://bugs.webkit.org/show_bug.cgi?id=16735
    Object.defineProperties(event, {
        keyCode: { get: () => keyCode },
        key: { get: () => key },
        target: { get: () => target },
        ctrlKey: { get: () => !!modifiers.control },
        altKey: { get: () => !!modifiers.alt },
        shiftKey: { get: () => !!modifiers.shift },
        metaKey: { get: () => !!modifiers.meta }
    });

    // IE won't set `defaultPrevented` on synthetic events so we need to do it manually.
    event.preventDefault = function (): void {
        Object.defineProperty(event, 'defaultPrevented', { get: () => true });
        return originalPreventDefault.apply(this, arguments);
    };

    return event;
}
