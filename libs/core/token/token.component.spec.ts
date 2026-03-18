import { ENTER, SPACE, TAB } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TokenComponent } from './token.component';

function createKeyboardEvent(type: string, keyCode: number, key: string): KeyboardEvent {
    return new KeyboardEvent(type, {
        bubbles: true,
        cancelable: true,
        key,
        keyCode
    });
}

@Component({
    selector: 'fd-test-host',
    template: `<fd-token [disabled]="disabled" [selected]="selected" [readOnly]="readOnly">Test Token</fd-token>`,
    imports: [TokenComponent]
})
class TestHostComponent {
    disabled = false;
    selected = false;
    readOnly = false;
}

describe('TokenComponent', () => {
    let component: TokenComponent;
    let fixture: ComponentFixture<TokenComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.overrideComponent(TokenComponent, {
            set: {
                changeDetection: ChangeDetectionStrategy.Default
            }
        })
            .configureTestingModule({
                imports: [TokenComponent]
            })
            .compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(TokenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Input properties', () => {
        it('should have disabled false by default', () => {
            expect(component.disabled()).toBe(false);
        });

        it('should have selected false by default', () => {
            expect(component.selected()).toBe(false);
        });

        it('should have readOnly false by default', () => {
            expect(component.readOnly()).toBe(false);
        });

        it('should update disabled property via setInput', async () => {
            fixture.componentRef.setInput('disabled', true);
            fixture.detectChanges();
            await fixture.whenStable();
            expect(component.disabled()).toBe(true);
        });

        it('should update selected property via setInput', async () => {
            fixture.componentRef.setInput('selected', true);
            fixture.detectChanges();
            await fixture.whenStable();
            expect(component.selected()).toBe(true);
        });

        it('should update readOnly property via setInput', async () => {
            fixture.componentRef.setInput('readOnly', true);
            fixture.detectChanges();
            await fixture.whenStable();
            expect(component.readOnly()).toBe(true);
        });

        it('should update selected property programmatically', () => {
            component.selected.set(true);
            expect(component.selected()).toBe(true);
        });
    });

    describe('CSS classes', () => {
        it('should apply fd-token class', () => {
            const tokenElement = fixture.nativeElement.querySelector('.fd-token');
            expect(tokenElement).toBeTruthy();
        });

        it('should apply fd-token__disabled class when disabled', async () => {
            fixture.componentRef.setInput('disabled', true);
            fixture.detectChanges();
            await fixture.whenStable();
            const tokenElement = fixture.nativeElement.querySelector('.fd-token');
            expect(tokenElement.classList.contains('fd-token__disabled')).toBe(true);
        });

        it('should apply fd-token--selected class when selected via input', async () => {
            fixture.componentRef.setInput('selected', true);
            fixture.detectChanges();
            await fixture.whenStable();
            const tokenElement = fixture.nativeElement.querySelector('.fd-token');
            expect(tokenElement.classList.contains('fd-token--selected')).toBe(true);
        });

        it('should apply fd-token--selected class when selected programmatically', async () => {
            component.selected.set(true);
            fixture.detectChanges();
            await fixture.whenStable();
            const tokenElement = fixture.nativeElement.querySelector('.fd-token');
            expect(tokenElement.classList.contains('fd-token--selected')).toBe(true);
        });

        it('should apply fd-token--readonly class when readOnly', async () => {
            fixture.componentRef.setInput('readOnly', true);
            fixture.detectChanges();
            await fixture.whenStable();
            const tokenElement = fixture.nativeElement.querySelector('.fd-token');
            expect(tokenElement.classList.contains('fd-token--readonly')).toBe(true);
        });

        it('should not apply fd-token__disabled class when not disabled', () => {
            const tokenElement = fixture.nativeElement.querySelector('.fd-token');
            expect(tokenElement.classList.contains('fd-token__disabled')).toBe(false);
        });

        it('should not apply fd-token--selected class when not selected', () => {
            const tokenElement = fixture.nativeElement.querySelector('.fd-token');
            expect(tokenElement.classList.contains('fd-token--selected')).toBe(false);
        });

        it('should not apply fd-token--readonly class when not readOnly', () => {
            const tokenElement = fixture.nativeElement.querySelector('.fd-token');
            expect(tokenElement.classList.contains('fd-token--readonly')).toBe(false);
        });
    });

    describe('Close button', () => {
        it('should not fire onCloseClick when clicking text', () => {
            jest.spyOn(component.onCloseClick, 'emit');
            const content = fixture.nativeElement.querySelector('.fd-token__text');
            content.click();

            fixture.detectChanges();
            expect(component.onCloseClick.emit).not.toHaveBeenCalled();
        });

        it('should not render close icon when in read-only mode', async () => {
            fixture.componentRef.setInput('readOnly', false);
            fixture.detectChanges();
            await fixture.whenStable();
            expect(fixture.nativeElement.querySelector('.fd-token__close')).toBeTruthy();
            fixture.componentRef.setInput('readOnly', true);
            fixture.detectChanges();
            await fixture.whenStable();
            expect(fixture.nativeElement.querySelector('.fd-token__close')).toBeFalsy();
        });

        it('should fire onCloseClick when clicking x', () => {
            jest.spyOn(component.onCloseClick, 'emit');
            const content = fixture.nativeElement.querySelector('.fd-token__close');
            content.click();

            fixture.detectChanges();
            expect(component.onCloseClick.emit).toHaveBeenCalled();
        });

        it('should not emit onCloseClick when disabled', async () => {
            jest.spyOn(component.onCloseClick, 'emit');
            fixture.componentRef.setInput('disabled', true);
            fixture.detectChanges();
            await fixture.whenStable();

            const closeButton = fixture.nativeElement.querySelector('.fd-token__close');
            closeButton.click();

            expect(component.onCloseClick.emit).not.toHaveBeenCalled();
        });

        it('should stop event propagation when close is clicked', () => {
            const closeButton = fixture.nativeElement.querySelector('.fd-token__close');
            const event = new MouseEvent('click', { bubbles: true });
            jest.spyOn(event, 'stopPropagation');

            closeButton.dispatchEvent(event);

            expect(event.stopPropagation).toHaveBeenCalled();
        });
    });

    describe('Token click event', () => {
        it('should emit onTokenClick when token is clicked', () => {
            jest.spyOn(component.onTokenClick, 'emit');
            const tokenElement = fixture.nativeElement.querySelector('.fd-token');
            tokenElement.click();

            expect(component.onTokenClick.emit).toHaveBeenCalled();
        });

        it('should emit onTokenClick with the mouse event', () => {
            jest.spyOn(component.onTokenClick, 'emit');
            const tokenElement = fixture.nativeElement.querySelector('.fd-token');
            const clickEvent = new MouseEvent('click');
            tokenElement.dispatchEvent(clickEvent);

            expect(component.onTokenClick.emit).toHaveBeenCalled();
            const emittedEvent = (component.onTokenClick.emit as jest.Mock).mock.calls[0][0];
            expect(emittedEvent instanceof MouseEvent).toBe(true);
        });
    });

    describe('Keyboard interactions', () => {
        it('should emit onTokenKeydown on keydown event', () => {
            jest.spyOn(component.onTokenKeydown, 'emit');
            const tokenElement = fixture.nativeElement.querySelector('.fd-token');
            const event = createKeyboardEvent('keydown', TAB, 'Tab');

            tokenElement.dispatchEvent(event);

            expect(component.onTokenKeydown.emit).toHaveBeenCalled();
            const emittedEvent = (component.onTokenKeydown.emit as jest.Mock).mock.calls[0][0];
            expect(emittedEvent instanceof KeyboardEvent).toBe(true);
        });

        it('should emit onTokenClick when Enter key is pressed', () => {
            jest.spyOn(component.onTokenClick, 'emit');
            const tokenElement = fixture.nativeElement.querySelector('.fd-token');
            const event = createKeyboardEvent('keydown', ENTER, 'Enter');

            tokenElement.dispatchEvent(event);

            expect(component.onTokenClick.emit).toHaveBeenCalled();
        });

        it('should emit both onTokenKeydown and onTokenClick when Space key is pressed', () => {
            jest.spyOn(component.onTokenKeydown, 'emit');
            jest.spyOn(component.onTokenClick, 'emit');
            const tokenElement = fixture.nativeElement.querySelector('.fd-token');
            const event = createKeyboardEvent('keydown', SPACE, ' ');

            tokenElement.dispatchEvent(event);

            expect(component.onTokenKeydown.emit).toHaveBeenCalled();
            expect(component.onTokenClick.emit).toHaveBeenCalled();
        });

        it('should emit both onTokenKeydown and onTokenClick on Enter key', () => {
            jest.spyOn(component.onTokenKeydown, 'emit');
            jest.spyOn(component.onTokenClick, 'emit');
            const tokenElement = fixture.nativeElement.querySelector('.fd-token');
            const event = createKeyboardEvent('keydown', ENTER, 'Enter');

            tokenElement.dispatchEvent(event);

            expect(component.onTokenKeydown.emit).toHaveBeenCalled();
            expect(component.onTokenClick.emit).toHaveBeenCalled();
        });
    });

    describe('Focus events', () => {
        it('should emit elementFocused with true on focus', async () => {
            jest.spyOn(component.elementFocused, 'emit');
            const tokenElement = fixture.nativeElement.querySelector('.fd-token');

            tokenElement.dispatchEvent(new FocusEvent('focus'));
            await fixture.whenStable();

            expect(component.elementFocused.emit).toHaveBeenCalledWith(true);
        });

        it('should emit elementFocused with false on blur', async () => {
            jest.spyOn(component.elementFocused, 'emit');
            const tokenElement = fixture.nativeElement.querySelector('.fd-token');

            tokenElement.dispatchEvent(new FocusEvent('blur'));
            await fixture.whenStable();

            expect(component.elementFocused.emit).toHaveBeenCalledWith(false);
        });
    });

    describe('Accessibility', () => {
        it('should have role="option"', () => {
            const tokenElement = fixture.nativeElement.querySelector('.fd-token');
            expect(tokenElement.getAttribute('role')).toBe('option');
        });

        it('should have tabindex="0"', () => {
            const tokenElement = fixture.nativeElement.querySelector('.fd-token');
            expect(tokenElement.getAttribute('tabindex')).toBe('0');
        });

        it('should set aria-selected based on selected state', async () => {
            const tokenElement = fixture.nativeElement.querySelector('.fd-token');

            expect(tokenElement.getAttribute('aria-selected')).toBe('false');

            fixture.componentRef.setInput('selected', true);
            fixture.detectChanges();
            await fixture.whenStable();

            expect(tokenElement.getAttribute('aria-selected')).toBe('true');
        });

        it('should set aria-selected based on programmatic selected state', async () => {
            const tokenElement = fixture.nativeElement.querySelector('.fd-token');

            expect(tokenElement.getAttribute('aria-selected')).toBe('false');

            component.selected.set(true);
            fixture.detectChanges();
            await fixture.whenStable();

            expect(tokenElement.getAttribute('aria-selected')).toBe('true');
        });

        it('should have aria-roledescription attribute', () => {
            const tokenElement = fixture.nativeElement.querySelector('.fd-token');
            expect(tokenElement.hasAttribute('aria-roledescription')).toBe(true);
        });

        it('should have close button with role="button"', () => {
            const closeButton = fixture.nativeElement.querySelector('.fd-token__close');
            expect(closeButton.getAttribute('role')).toBe('button');
        });

        it('should have close button with aria-label', () => {
            const closeButton = fixture.nativeElement.querySelector('.fd-token__close');
            expect(closeButton.hasAttribute('aria-label')).toBe(true);
        });
    });

    describe('_setTotalCount method', () => {
        it('should set _totalCount and _itemPosition signals', () => {
            component._setTotalCount(10, 3);

            expect(component._totalCount()).toBe(10);
            expect(component._itemPosition()).toBe(3);
        });

        it('should update aria-setsize and aria-posinset attributes', async () => {
            component._setTotalCount(5, 2);
            fixture.detectChanges();
            await fixture.whenStable();

            const tokenElement = fixture.nativeElement.querySelector('.fd-token');
            expect(tokenElement.getAttribute('aria-setsize')).toBe('5');
            expect(tokenElement.getAttribute('aria-posinset')).toBe('2');
        });
    });

    describe('closeClickHandler', () => {
        it('should not emit when called without event', () => {
            jest.spyOn(component.onCloseClick, 'emit');

            component.closeClickHandler(undefined);

            expect(component.onCloseClick.emit).not.toHaveBeenCalled();
        });
    });

    describe('Host element', () => {
        it('should have max-width style set to 100%', () => {
            expect(fixture.nativeElement.style.maxWidth).toBe('100%');
        });
    });

    describe('Programmatic selected vs input selected', () => {
        it('should allow programmatic update after input binding', async () => {
            // Set input to false
            fixture.componentRef.setInput('selected', false);
            fixture.detectChanges();
            await fixture.whenStable();

            expect(component.selected()).toBe(false);

            // Set programmatically to true
            component.selected.set(true);
            fixture.detectChanges();
            await fixture.whenStable();

            // Programmatic value should update the model
            expect(component.selected()).toBe(true);
        });

        it('should reflect input value', async () => {
            fixture.componentRef.setInput('selected', true);
            fixture.detectChanges();
            await fixture.whenStable();

            expect(component.selected()).toBe(true);
        });
    });
});

describe('TokenComponent with host', () => {
    let hostComponent: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;
    let tokenElement: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.overrideComponent(TokenComponent, {
            set: {
                changeDetection: ChangeDetectionStrategy.Default
            }
        })
            .configureTestingModule({
                imports: [TestHostComponent]
            })
            .compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(TestHostComponent);
        hostComponent = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
        tokenElement = fixture.nativeElement.querySelector('.fd-token');
    });

    it('should create with host component', () => {
        expect(hostComponent).toBeTruthy();
    });

    it('should render projected content', () => {
        const textElement = fixture.nativeElement.querySelector('.fd-token__text');
        expect(textElement.textContent).toContain('Test Token');
    });

    it('should update disabled class when host changes disabled input', async () => {
        expect(tokenElement.classList.contains('fd-token__disabled')).toBe(false);

        hostComponent.disabled = true;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(tokenElement.classList.contains('fd-token__disabled')).toBe(true);
    });

    it('should update selected class when host changes selected input', async () => {
        expect(tokenElement.classList.contains('fd-token--selected')).toBe(false);

        hostComponent.selected = true;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(tokenElement.classList.contains('fd-token--selected')).toBe(true);
    });

    it('should update readonly class when host changes readOnly input', async () => {
        expect(tokenElement.classList.contains('fd-token--readonly')).toBe(false);

        hostComponent.readOnly = true;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(tokenElement.classList.contains('fd-token--readonly')).toBe(true);
    });

    it('should hide close button when readOnly is true', async () => {
        expect(fixture.nativeElement.querySelector('.fd-token__close')).toBeTruthy();

        hostComponent.readOnly = true;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(fixture.nativeElement.querySelector('.fd-token__close')).toBeFalsy();
    });
});
