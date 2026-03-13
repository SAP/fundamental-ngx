import { Overlay, OverlayContainer } from '@angular/cdk/overlay';
import { Component, inject, TemplateRef, viewChild } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MessageToastConfig } from './config/message-toast.config';
import { MESSAGE_TOAST_CONFIG } from './constants/message-toast.token';
import { MessageToastService } from './message-toast.service';
import { MessageToastRef } from './ref/message-toast.ref';

// Test component for custom toast content
@Component({
    template: `<div class="custom-toast-content">Custom Toast</div>`,
    standalone: true
})
export class CustomToastComponent {}

// Minimal Component Setup for Template Tests
@Component({
    template: ` <ng-template #template let-data> Template: {{ data }} </ng-template> `,
    standalone: true
})
export class TestComponent {
    readonly template = viewChild.required<TemplateRef<any>>('template');
    readonly toastService = inject(MessageToastService);
}

describe('MessageToastService', () => {
    let service: MessageToastService;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestComponent, CustomToastComponent],
            providers: [
                MessageToastService,
                Overlay,
                { provide: MESSAGE_TOAST_CONFIG, useValue: new MessageToastConfig() }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        service = TestBed.inject(MessageToastService);
        overlayContainerElement = TestBed.inject(OverlayContainer).getContainerElement();
    });

    afterEach(() => {
        // Clean up any open toasts after each test
        service.hideAll();
    });

    it('should create service', () => {
        expect(service).toBeTruthy();
    });

    describe('open()', () => {
        it('should open toast with string message', fakeAsync(() => {
            const toastRef = service.open('Test message');
            tick();

            expect(toastRef).toBeTruthy();
            expect(toastRef).toBeInstanceOf(MessageToastRef);

            const toastElement = overlayContainerElement.querySelector('.fd-message-toast');
            expect(toastElement).toBeTruthy();

            toastRef.dismiss();
            tick();
        }));

        it('should open toast with custom component', fakeAsync(() => {
            const toastRef = service.open(CustomToastComponent);
            tick();

            expect(toastRef).toBeTruthy();
            const customContent = overlayContainerElement.querySelector('.custom-toast-content');
            expect(customContent).toBeTruthy();
            expect(customContent?.textContent).toContain('Custom Toast');

            toastRef.dismiss();
            tick();
        }));

        it('should open toast with template', fakeAsync(() => {
            const fixture = TestBed.createComponent(TestComponent);
            fixture.detectChanges();

            const template = fixture.componentInstance.template();
            const toastRef = service.open(template, { data: 'test data' });
            tick();

            expect(toastRef).toBeTruthy();
            const toastElement = overlayContainerElement.querySelector('.fd-message-toast');
            expect(toastElement).toBeTruthy();
            expect(toastElement?.textContent).toContain('Template:');

            toastRef.dismiss();
            tick();
        }));

        it('should apply custom configuration', fakeAsync(() => {
            const config = new MessageToastConfig();
            config.duration = 5000;
            config.ariaLabel = 'Test Toast';

            const toastRef = service.open('Test', config);
            tick();

            const toastElement = overlayContainerElement.querySelector('.fd-message-toast') as HTMLElement;
            expect(toastElement?.getAttribute('aria-label')).toBe('Test Toast');

            toastRef.dismiss();
            tick();
        }));
    });

    describe('openFromString()', () => {
        it('should open toast with string message', fakeAsync(() => {
            const toastRef = service.openFromString('String message');
            tick();

            expect(toastRef).toBeTruthy();
            const toastElement = overlayContainerElement.querySelector('.fd-message-toast');
            expect(toastElement).toBeTruthy();

            toastRef.dismiss();
            tick();
        }));

        it('should pass data to toast config', fakeAsync(() => {
            const message = 'Test message data';
            const toastRef = service.openFromString(message);
            tick();

            expect(toastRef.data).toBe(message);

            toastRef.dismiss();
            tick();
        }));
    });

    describe('openFromComponent()', () => {
        it('should open toast with custom component', fakeAsync(() => {
            const config = new MessageToastConfig();
            const toastRef = service.openFromComponent(CustomToastComponent, config);
            tick();

            expect(toastRef).toBeTruthy();
            expect(toastRef.instance).toBeInstanceOf(CustomToastComponent);

            toastRef.dismiss();
            tick();
        }));
    });

    describe('openFromTemplate()', () => {
        it('should open toast with template', fakeAsync(() => {
            const fixture = TestBed.createComponent(TestComponent);
            fixture.detectChanges();

            const template = fixture.componentInstance.template();
            const config = new MessageToastConfig();
            config.data = 'template test';

            const toastRef = service.openFromTemplate(template, config);
            tick();

            expect(toastRef).toBeTruthy();

            toastRef.dismiss();
            tick();
        }));
    });

    describe('Toast Management', () => {
        it('should track open toasts with hasOpenMessageToasts()', fakeAsync(() => {
            expect(service.hasOpenMessageToasts()).toBe(false);

            const toastRef = service.open('Test');
            tick();

            expect(service.hasOpenMessageToasts()).toBe(true);

            toastRef.dismiss();
            tick(200); // Wait for exit animation

            expect(service.hasOpenMessageToasts()).toBe(false);
        }));

        it('should dismiss all toasts with hideAll()', fakeAsync(() => {
            service.open('Toast 1');
            service.open('Toast 2');
            service.open('Toast 3');
            tick();

            expect(service.hasOpenMessageToasts()).toBe(true);

            service.hideAll();
            tick(200);

            expect(service.hasOpenMessageToasts()).toBe(false);
        }));

        it('should open multiple toasts simultaneously', fakeAsync(() => {
            const ref1 = service.open('Toast 1');
            const ref2 = service.open('Toast 2');
            tick();

            const toasts = overlayContainerElement.querySelectorAll('.fd-message-toast');
            expect(toasts.length).toBe(2);

            ref1.dismiss();
            ref2.dismiss();
            tick();
        }));
    });

    describe('Toast Reference', () => {
        it('should provide afterOpened() observable', fakeAsync(() => {
            const toastRef = service.open('Test');
            let opened = false;

            toastRef.afterOpened().subscribe(() => {
                opened = true;
            });

            tick(200); // Wait for enter animation

            expect(opened).toBe(true);

            toastRef.dismiss();
            tick();
        }));

        it('should provide afterDismissed() observable', fakeAsync(() => {
            const toastRef = service.open('Test');
            let dismissed = false;

            toastRef.afterDismissed().subscribe(() => {
                dismissed = true;
            });

            tick();
            toastRef.dismiss();
            tick(200); // Wait for exit animation

            expect(dismissed).toBe(true);
        }));

        it('should dismiss toast manually', fakeAsync(() => {
            const toastRef = service.open('Test');
            tick();

            let dismissed = false;
            toastRef.afterDismissed().subscribe(() => {
                dismissed = true;
            });

            toastRef.dismiss();
            tick(200);

            expect(dismissed).toBe(true);
        }));

        it('should auto-dismiss after duration', fakeAsync(() => {
            const config = new MessageToastConfig();
            config.duration = 1000;

            const toastRef = service.open('Test', config);
            let dismissed = false;

            toastRef.afterDismissed().subscribe(() => {
                dismissed = true;
            });

            tick(200); // Wait for open animation
            expect(dismissed).toBe(false);

            tick(1000); // Wait for duration
            tick(200); // Wait for exit animation

            expect(dismissed).toBe(true);
        }));
    });
});
