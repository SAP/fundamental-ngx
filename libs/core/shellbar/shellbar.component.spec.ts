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
    template: `
        <fd-shellbar>
            <fd-shellbar-context-area>
                <button id="before-select">Before</button>
                <select id="native-select">
                    <option>First</option>
                    <option selected>Middle</option>
                    <option>Last</option>
                </select>
                <input id="native-input" />
                <textarea id="native-textarea"></textarea>
                <div id="native-editor" contenteditable="true" tabindex="0">Editable</div>
                <button id="after-select">After</button>
            </fd-shellbar-context-area>
        </fd-shellbar>
    `,
    imports: [ShellbarComponent, ShellbarContextAreaComponent]
})
class ShellbarNativeSelectTestComponent {}

@Component({
    selector: 'fd-test-shellbar-landmarks',
    template: `
        <section id="default-shellbar">
            <fd-shellbar></fd-shellbar>
        </section>
        <header id="product-header" role="banner">
            <fd-shellbar role="group"></fd-shellbar>
        </header>
    `,
    imports: [ShellbarComponent]
})
class ShellbarLandmarksTestComponent {}

describe('native key ownership through the capture listener', () => {
    let nativeFixture: ComponentFixture<ShellbarNativeSelectTestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({ imports: [ShellbarNativeSelectTestComponent] }).compileComponents();
        nativeFixture = TestBed.createComponent(ShellbarNativeSelectTestComponent);
        nativeFixture.detectChanges();
        await nativeFixture.whenStable();
        nativeFixture.nativeElement
            .querySelectorAll('button, select, input, textarea, [contenteditable]')
            .forEach((element: HTMLElement) => {
                // jsdom has no layout; retain real tabbable discovery with visible geometry.
                Object.defineProperty(element, 'getClientRects', { value: () => [{ width: 80, height: 32 }] });
                if (element.hasAttribute('contenteditable')) {
                    Object.defineProperty(element, 'isContentEditable', { value: true });
                }
            });
    });

    it.each([
        ['Home', 36],
        ['End', 35],
        ['ArrowLeft', 37],
        ['ArrowRight', 39]
    ])('leaves SELECT %s uncancelled and focused', (key, keyCode) => {
        const select = nativeFixture.nativeElement.querySelector('#native-select') as HTMLSelectElement;
        select.focus();
        const event = new KeyboardEvent('keydown', { key, keyCode, bubbles: true, cancelable: true });
        select.dispatchEvent(event);
        expect({ cancelled: event.defaultPrevented, focused: document.activeElement === select }).toEqual({
            cancelled: false,
            focused: true
        });
    });

    it.each(['native-input', 'native-textarea', 'native-editor'])('preserves editable ownership for %s', (id) => {
        const element = nativeFixture.nativeElement.querySelector('#' + id) as HTMLElement;
        for (const [key, keyCode] of [
            ['Home', 36],
            ['End', 35],
            ['ArrowLeft', 37],
            ['ArrowRight', 39]
        ] as const) {
            element.focus();
            const event = new KeyboardEvent('keydown', { key, keyCode, bubbles: true, cancelable: true });
            element.dispatchEvent(event);
            expect(event.defaultPrevented).toBe(false);
            expect(document.activeElement).toBe(element);
        }
    });
});

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

describe('ShellbarComponent landmark semantics', () => {
    let landmarkFixture: ComponentFixture<ShellbarLandmarksTestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({ imports: [ShellbarLandmarksTestComponent] }).compileComponents();
        landmarkFixture = TestBed.createComponent(ShellbarLandmarksTestComponent);
        landmarkFixture.detectChanges();
        await landmarkFixture.whenStable();
    });

    it('names its host banner once without leaving a labelled inner visual wrapper', () => {
        const container = landmarkFixture.nativeElement.querySelector('#default-shellbar') as HTMLElement;
        const shellbar = container.querySelector('fd-shellbar') as HTMLElement;
        const visualShellbar = shellbar.querySelector('.fd-shellbar') as HTMLElement;

        expect(container.querySelectorAll('[role="banner"]')).toHaveLength(1);
        expect(shellbar.getAttribute('role')).toBe('banner');
        expect(shellbar.getAttribute('aria-label')).toBe('Shellbar');
        expect(visualShellbar.hasAttribute('role')).toBe(false);
        expect(visualShellbar.hasAttribute('aria-label')).toBe(false);
    });

    it('retains a consumer group override inside a product header without a nested banner', () => {
        const productHeader = landmarkFixture.nativeElement.querySelector('#product-header') as HTMLElement;
        const shellbar = productHeader.querySelector('fd-shellbar') as HTMLElement;

        expect(productHeader.tagName).toBe('HEADER');
        expect(productHeader.getAttribute('role')).toBe('banner');
        expect(productHeader.querySelectorAll('[role="banner"]')).toHaveLength(0);
        expect(shellbar.getAttribute('role')).toBe('group');
        expect(shellbar.getAttribute('aria-label')).toBe('Shellbar');
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
        shellbarEl.querySelectorAll<HTMLElement>('button').forEach((button) => {
            Object.defineProperty(button, 'getClientRects', { value: () => [{ width: 80, height: 32 }] });
        });
        // Give time for tabbable elements cache to be populated
        await new Promise((resolve) => setTimeout(resolve, 100));
    });

    it('should navigate to next element with right arrow key', () => {
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

    it('should navigate to previous element with left arrow key', () => {
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

    it('should navigate to first element with Home key', () => {
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

    it('should navigate to last element with End key', () => {
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
        const contextAreas = shellbarComponent['contextAreas']();
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
            shellbarComponent['notifyTitleHidden'](true);
            mobileFixture.detectChanges();

            // Check that title hidden state is set
            expect(actionsComponent.titleHidden()).toBe(true);
            expect(actionsComponent.hiddenTitleText()).toBeTruthy();
        }
    });

    it('should update mobile overflow menu when title visibility changes', () => {
        const actionsComponent = shellbarComponent['_actions'];
        if (!actionsComponent) {
            return;
        }

        // Initially not hidden
        expect(actionsComponent.titleHidden()).toBe(false);

        // Hide title
        shellbarComponent['notifyTitleHidden'](true);
        mobileFixture.detectChanges();
        expect(actionsComponent.titleHidden()).toBe(true);

        // Show title again
        shellbarComponent['notifyTitleHidden'](false);
        mobileFixture.detectChanges();
        expect(actionsComponent.titleHidden()).toBe(false);
    });

    it('should pass logo element to mobile overflow menu', () => {
        const actionsComponent = shellbarComponent['_actions'];
        if (!actionsComponent) {
            return;
        }

        const branding = shellbarComponent['branding'];
        if (branding) {
            shellbarComponent['notifyTitleHidden'](true);
            mobileFixture.detectChanges();

            const logoElement = actionsComponent.hiddenLogoElement();
            // Logo element should be passed when title is hidden
            expect(logoElement).toBeDefined();
        }
    });
});
