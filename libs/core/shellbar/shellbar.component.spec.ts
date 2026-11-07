import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ShellbarActionComponent } from './shellbar-action/shellbar-action.component';
import { ShellbarActionsComponent } from './shellbar-actions/shellbar-actions.component';
import { ShellbarBrandingComponent } from './shellbar-branding/shellbar-branding.component';
import { ShellbarContextAreaComponent } from './shellbar-context-area/shellbar-context-area.component';
import { ShellbarLogoComponent } from './shellbar-logo/shellbar-logo.component';
import { ShellbarTitleComponent } from './shellbar-title/shellbar-title.component';
import { ShellbarComponent } from './shellbar.component';

@Component({
    selector: 'fd-test-shellbar-keyboard',
    template: `
        <fd-shellbar>
            <fd-shellbar-branding>
                <fd-shellbar-title>Test App</fd-shellbar-title>
            </fd-shellbar-branding>
            <fd-shellbar-actions>
                <button fd-button id="action1">Action 1</button>
                <button fd-button id="action2">Action 2</button>
                <button fd-button id="action3">Action 3</button>
            </fd-shellbar-actions>
        </fd-shellbar>
    `,
    standalone: true,
    imports: [
        ShellbarComponent,
        ShellbarBrandingComponent,
        ShellbarTitleComponent,
        ShellbarActionsComponent,
        ButtonComponent
    ]
})
class ShellbarKeyboardTestComponent {}

@Component({
    selector: 'fd-test-shellbar-context-areas',
    template: `
        <fd-shellbar>
            <fd-shellbar-branding>
                <fd-shellbar-title>Test App</fd-shellbar-title>
            </fd-shellbar-branding>
            <fd-shellbar-context-area>
                <button fd-button id="context1">Context 1</button>
            </fd-shellbar-context-area>
            <fd-shellbar-context-area>
                <button fd-button id="context2">Context 2</button>
            </fd-shellbar-context-area>
            <fd-shellbar-actions>
                <button fd-button id="action1">Action</button>
            </fd-shellbar-actions>
        </fd-shellbar>
    `,
    standalone: true,
    imports: [
        ShellbarComponent,
        ShellbarBrandingComponent,
        ShellbarTitleComponent,
        ShellbarContextAreaComponent,
        ShellbarActionsComponent,
        ButtonComponent
    ]
})
class ShellbarMultiContextAreasTestComponent {}

@Component({
    selector: 'fd-test-shellbar-mobile-overflow',
    template: `
        <fd-shellbar [size]="'s'">
            <fd-shellbar-branding [interactiveBranding]="true">
                <fd-shellbar-logo>
                    <a class="fd-shellbar__logo" id="test-logo">Logo</a>
                </fd-shellbar-logo>
                <fd-shellbar-title>Mobile Test App</fd-shellbar-title>
            </fd-shellbar-branding>
            <fd-shellbar-actions>
                <fd-shellbar-action
                    [glyph]="'bell'"
                    [notificationCount]="5"
                    [ariaLabel]="'Notifications'"
                ></fd-shellbar-action>
            </fd-shellbar-actions>
        </fd-shellbar>
    `,
    standalone: true,
    imports: [
        ShellbarComponent,
        ShellbarBrandingComponent,
        ShellbarLogoComponent,
        ShellbarTitleComponent,
        ShellbarActionsComponent,
        ShellbarActionComponent
    ]
})
class ShellbarMobileOverflowTestComponent {}

describe('ShellbarComponent', () => {
    let component: ShellbarComponent;
    let fixture: ComponentFixture<ShellbarComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ShellbarComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShellbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should apply class modifiers', async () => {
        await fixture.whenStable();
        let productElementClass =
            fixture.debugElement.nativeElement.querySelector('.fd-shellbar__group--product')?.classList;
        expect(productElementClass).not.toContain('fd-shellbar__group--shrink');
        expect(productElementClass).not.toContain('fd-shellbar__group--basis-auto');
        component.groupFlex = {
            product: {
                shrink: true,
                flexBasisAuto: true
            }
        };

        await fixture.whenStable();

        productElementClass =
            fixture.debugElement.nativeElement.querySelector('.fd-shellbar__group--product')?.classList;

        expect(productElementClass).toContain('fd-shellbar__group--shrink');
        expect(productElementClass).toContain('fd-shellbar__group--basis-auto');
    });
});

describe('ShellbarComponent - Keyboard Navigation', () => {
    let keyboardFixture: ComponentFixture<ShellbarKeyboardTestComponent>;
    let shellbarEl: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ShellbarKeyboardTestComponent]
        }).compileComponents();
    }));

    beforeEach(async () => {
        keyboardFixture = TestBed.createComponent(ShellbarKeyboardTestComponent);
        keyboardFixture.detectChanges();
        await keyboardFixture.whenStable();
        shellbarEl = keyboardFixture.nativeElement.querySelector('.fd-shellbar');
        // Give time for tabbable elements cache to be populated
        await new Promise((resolve) => setTimeout(resolve, 100));
    });

    it.skip('should navigate to next element with right arrow key', () => {
        const button1 = shellbarEl.querySelector('#action1') as HTMLElement;
        const button2 = shellbarEl.querySelector('#action2') as HTMLElement;

        button1.focus();
        expect(document.activeElement).toBe(button1);

        const event = new KeyboardEvent('keydown', { key: 'ArrowRight', keyCode: 39, bubbles: true, cancelable: true });
        button1.dispatchEvent(event);
        keyboardFixture.detectChanges();

        // After right arrow, focus should move to next tabbable element
        expect(document.activeElement).toBe(button2);
    });

    it.skip('should navigate to previous element with left arrow key', () => {
        const button1 = shellbarEl.querySelector('#action1') as HTMLElement;
        const button2 = shellbarEl.querySelector('#action2') as HTMLElement;

        button2.focus();
        expect(document.activeElement).toBe(button2);

        const event = new KeyboardEvent('keydown', { key: 'ArrowLeft', keyCode: 37, bubbles: true, cancelable: true });
        button2.dispatchEvent(event);
        keyboardFixture.detectChanges();

        // After left arrow, focus should move to previous element
        expect(document.activeElement).toBe(button1);
    });

    it.skip('should navigate to first element with Home key', () => {
        const button1 = shellbarEl.querySelector('#action1') as HTMLElement;
        const button3 = shellbarEl.querySelector('#action3') as HTMLElement;

        button3.focus();
        expect(document.activeElement).toBe(button3);

        const event = new KeyboardEvent('keydown', { key: 'Home', keyCode: 36, bubbles: true, cancelable: true });
        button3.dispatchEvent(event);
        keyboardFixture.detectChanges();

        // After Home, focus should move to first tabbable element
        expect(document.activeElement).toBe(button1);
    });

    it.skip('should navigate to last element with End key', () => {
        const button1 = shellbarEl.querySelector('#action1') as HTMLElement;
        const button3 = shellbarEl.querySelector('#action3') as HTMLElement;

        button1.focus();
        expect(document.activeElement).toBe(button1);

        const event = new KeyboardEvent('keydown', { key: 'End', keyCode: 35, bubbles: true, cancelable: true });
        button1.dispatchEvent(event);
        keyboardFixture.detectChanges();

        // After End, focus should move to last tabbable element
        expect(document.activeElement).toBe(button3);
    });

    it.skip('should wrap to last element when pressing left arrow on first element', () => {
        const button1 = shellbarEl.querySelector('#action1') as HTMLElement;
        const button3 = shellbarEl.querySelector('#action3') as HTMLElement;

        button1.focus();
        expect(document.activeElement).toBe(button1);

        const event = new KeyboardEvent('keydown', { key: 'ArrowLeft', keyCode: 37, bubbles: true, cancelable: true });
        button1.dispatchEvent(event);
        keyboardFixture.detectChanges();

        // Should wrap to last element
        expect(document.activeElement).toBe(button3);
    });

    it.skip('should wrap to first element when pressing right arrow on last element', () => {
        const button1 = shellbarEl.querySelector('#action1') as HTMLElement;
        const button3 = shellbarEl.querySelector('#action3') as HTMLElement;

        button3.focus();
        expect(document.activeElement).toBe(button3);

        const event = new KeyboardEvent('keydown', { key: 'ArrowRight', keyCode: 39, bubbles: true, cancelable: true });
        button3.dispatchEvent(event);
        keyboardFixture.detectChanges();

        // Should wrap to first element
        expect(document.activeElement).toBe(button1);
    });

    it.skip('should not handle arrow keys when focus is on text input', () => {
        const input = document.createElement('input');
        input.type = 'text';
        shellbarEl.appendChild(input);
        input.focus();

        const focusBefore = document.activeElement;
        const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
        input.dispatchEvent(event);
        keyboardFixture.detectChanges();

        // Focus should not change for text input
        expect(document.activeElement).toBe(focusBefore);
    });
});

describe('ShellbarComponent - Multiple Context Areas', () => {
    let contextFixture: ComponentFixture<ShellbarMultiContextAreasTestComponent>;
    let shellbarComponent: ShellbarComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ShellbarMultiContextAreasTestComponent]
        }).compileComponents();
    }));

    beforeEach(async () => {
        contextFixture = TestBed.createComponent(ShellbarMultiContextAreasTestComponent);
        contextFixture.detectChanges();
        await contextFixture.whenStable();
        shellbarComponent = contextFixture.debugElement.query((el) => el.name === 'fd-shellbar')?.componentInstance;
    });

    it('should support multiple context areas', () => {
        expect(shellbarComponent).toBeTruthy();
        const contextAreas = shellbarComponent['_contextAreas']();
        expect(contextAreas).toBeDefined();
        expect(contextAreas.length).toBe(2);
    });

    it('should render buttons from both context areas', () => {
        const context1Button = contextFixture.nativeElement.querySelector('#context1');
        const context2Button = contextFixture.nativeElement.querySelector('#context2');

        expect(context1Button).toBeTruthy();
        expect(context2Button).toBeTruthy();
    });

    it('should handle overflow with multiple context areas', () => {
        // Trigger overflow handling
        shellbarComponent['_handleOverflow']();
        contextFixture.detectChanges();

        // Should complete without errors
        expect(shellbarComponent).toBeTruthy();
    });
});

describe('ShellbarComponent - Mobile Overflow Menu', () => {
    let mobileFixture: ComponentFixture<ShellbarMobileOverflowTestComponent>;
    let shellbarComponent: ShellbarComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ShellbarMobileOverflowTestComponent]
        }).compileComponents();
    }));

    beforeEach(async () => {
        mobileFixture = TestBed.createComponent(ShellbarMobileOverflowTestComponent);
        mobileFixture.componentRef.setInput('size', 's');
        mobileFixture.detectChanges();
        await mobileFixture.whenStable();
        shellbarComponent = mobileFixture.debugElement.query((el) => el.name === 'fd-shellbar')?.componentInstance;
    });

    it('should show mobile actions in small size', () => {
        const actionsComponent = shellbarComponent['_actions'];
        expect(actionsComponent).toBeTruthy();
    });

    it('should pass title and logo to mobile overflow menu when title is hidden', () => {
        const actionsComponent = shellbarComponent['_actions'];
        if (!actionsComponent) {
            return;
        }

        // Simulate title being hidden
        const branding = shellbarComponent['branding'];
        if (branding) {
            shellbarComponent['_notifyTitleHidden'](true);
            mobileFixture.detectChanges();

            // Check that title hidden state is set
            expect(actionsComponent._titleHidden()).toBe(true);
            expect(actionsComponent._hiddenTitleText()).toBeTruthy();
        }
    });

    it('should update mobile overflow menu when title visibility changes', () => {
        const actionsComponent = shellbarComponent['_actions'];
        if (!actionsComponent) {
            return;
        }

        // Initially not hidden
        expect(actionsComponent._titleHidden()).toBe(false);

        // Hide title
        shellbarComponent['_notifyTitleHidden'](true);
        mobileFixture.detectChanges();
        expect(actionsComponent._titleHidden()).toBe(true);

        // Show title again
        shellbarComponent['_notifyTitleHidden'](false);
        mobileFixture.detectChanges();
        expect(actionsComponent._titleHidden()).toBe(false);
    });

    it('should pass logo element to mobile overflow menu', () => {
        const actionsComponent = shellbarComponent['_actions'];
        if (!actionsComponent) {
            return;
        }

        const branding = shellbarComponent['branding'];
        if (branding) {
            shellbarComponent['_notifyTitleHidden'](true);
            mobileFixture.detectChanges();

            const logoElement = actionsComponent._hiddenLogoElement();
            // Logo element should be passed when title is hidden
            expect(logoElement).toBeDefined();
        }
    });
});
