import { Component, NgModule, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { NavigationStart, Router, RouterEvent, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FocusTrapService } from '@fundamental-ngx/cdk/utils';
import { FD_DIALOG_FOCUS_TRAP_ERROR } from '@fundamental-ngx/core/dialog';
import { Subject } from 'rxjs';
import { MessageBoxComponent } from './message-box.component';
import { MessageBoxModule } from './message-box.module';
import { MessageBoxConfig } from './utils/message-box-config.class';
import { MessageBoxRef } from './utils/message-box-ref.class';

@Component({
    template: `
        <fd-message-box>
            <fd-message-box-header></fd-message-box-header>
            <fd-message-box-body></fd-message-box-body>
            <fd-message-box-footer>
                <button></button>
            </fd-message-box-footer>
        </fd-message-box>
    `,
    standalone: true,
    imports: [MessageBoxModule]
})
class TemplateTestComponent {
    @ViewChild(MessageBoxComponent) messageBox: MessageBoxComponent;
}

@NgModule({
    imports: [TemplateTestComponent]
})
class TestModule {}

describe('MessageBoxComponent', () => {
    let component: TemplateTestComponent;
    let messageBoxComponent: MessageBoxComponent;
    let fixture: ComponentFixture<TemplateTestComponent>;

    const messageBoxRef = new MessageBoxRef();
    const messageBoxConfig = new MessageBoxConfig();
    const routerEventsSubject = new Subject<RouterEvent>();
    const mockRouter = { events: routerEventsSubject.asObservable() };
    let router: Router;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestModule, RouterModule, RouterTestingModule],
            providers: [
                { provide: MessageBoxRef, useValue: messageBoxRef },
                { provide: MessageBoxConfig, useValue: messageBoxConfig },
                { provide: Router, useValue: mockRouter },
                { provide: FD_DIALOG_FOCUS_TRAP_ERROR, useValue: true }
            ]
        });
    }));

    async function setup(providers: { token: any; provider: { useValue: any } }[] = []): Promise<void> {
        providers.forEach((provider) => TestBed.overrideProvider(provider.token, provider.provider));
        await TestBed.compileComponents();

        fixture = TestBed.createComponent(TemplateTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        messageBoxComponent = fixture.componentInstance.messageBox;
        router = TestBed.inject(Router);
    }

    it('should create', async () => {
        await setup();
        expect(component).toBeTruthy();
        expect(messageBoxComponent).toBeTruthy();
    });

    it('should create w/o Router', async () => {
        await setup([{ token: Router, provider: { useValue: null } }]);
        expect(router).toBeNull();
        expect(component).toBeTruthy();
        expect(messageBoxComponent).toBeTruthy();
    });

    it('should close after esc pressed', async () => {
        await setup();

        const dismissSpy = jest.spyOn(messageBoxRef, 'dismiss');

        messageBoxComponent.elementRef.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        fixture.detectChanges();

        expect(dismissSpy).toHaveBeenCalled();
    });

    it('should close after backdrop clicked', async () => {
        const customDialogConfig = { ...new MessageBoxConfig(), backdropClickCloseable: true };

        await setup([{ token: MessageBoxConfig, provider: { useValue: customDialogConfig } }]);

        const dismissSpy = jest.spyOn(messageBoxRef, 'dismiss');
        fixture.detectChanges();

        fixture.nativeElement.querySelector('.fd-message-box').dispatchEvent(new MouseEvent('mousedown'));
        fixture.detectChanges();

        expect(dismissSpy).toHaveBeenCalled();
    });

    it('should set custom position', async () => {
        const customMessageBoxConfig = { ...new MessageBoxConfig(), position: { bottom: '100px', right: '50px' } };
        await setup([{ token: MessageBoxConfig, provider: { useValue: customMessageBoxConfig } }]);

        expect(messageBoxComponent.dialogWindow.nativeElement.style.right).toEqual('50px');
        expect(messageBoxComponent.dialogWindow.nativeElement.style.bottom).toEqual('100px');
    });

    it('should set custom size', async () => {
        const customSize = {
            width: '500px',
            height: '600px',
            minWidth: '450px',
            minHeight: '550px',
            maxWidth: '1000px',
            maxHeight: '900px'
        };
        const customMessageBoxConfig = { ...new MessageBoxConfig(), ...customSize };

        await setup([{ token: MessageBoxConfig, provider: { useValue: customMessageBoxConfig } }]);

        expect(messageBoxComponent.dialogWindow.nativeElement.style.width).toEqual(customSize.width);
        expect(messageBoxComponent.dialogWindow.nativeElement.style.height).toEqual(customSize.height);
        expect(messageBoxComponent.dialogWindow.nativeElement.style.minWidth).toEqual(customSize.minWidth);
        expect(messageBoxComponent.dialogWindow.nativeElement.style.minHeight).toEqual(customSize.minHeight);
        expect(messageBoxComponent.dialogWindow.nativeElement.style.maxWidth).toEqual(customSize.maxWidth);
        expect(messageBoxComponent.dialogWindow.nativeElement.style.maxHeight).toEqual(customSize.maxHeight);
    });

    it('should have custom classes', async () => {
        const customMessageBoxConfig = {
            ...new MessageBoxConfig(),
            backdropClass: 'customBackdropClass',
            dialogPanelClass: 'customPanelClass'
        };
        await setup([{ token: MessageBoxConfig, provider: { useValue: customMessageBoxConfig } }]);

        expect(fixture.nativeElement.querySelector('.fd-message-box').classList).toContain('customBackdropClass');
        expect(fixture.nativeElement.querySelector('.fd-message-box__content').classList).toContain('customPanelClass');
    });

    it('should display in mobile mode', async () => {
        const customMessageBoxConfig = { ...new MessageBoxConfig(), mobile: true };
        await setup([{ token: MessageBoxConfig, provider: { useValue: customMessageBoxConfig } }]);

        expect(fixture.nativeElement.querySelector('.fd-message-box__content').classList).toContain(
            'fd-message-box__content--mobile'
        );
    });

    it('should display in mobile mode with no stretch', async () => {
        const customMessageBoxConfig = { ...new MessageBoxConfig(), mobileOuterSpacing: true };
        await setup([{ token: MessageBoxConfig, provider: { useValue: customMessageBoxConfig } }]);

        expect(fixture.nativeElement.querySelector('.fd-message-box__content').classList).toContain(
            'fd-message-box__content--no-mobile-stretch'
        );
    });

    it('should use custom attributes', async () => {
        const customMessageBoxConfig = {
            ...new MessageBoxConfig(),
            id: 'customId',
            ariaLabel: 'customAriaLabel',
            ariaLabelledBy: 'customAriLabelledBy',
            ariaDescribedBy: 'customAriaDescribedBy'
        };
        await setup([{ token: MessageBoxConfig, provider: { useValue: customMessageBoxConfig } }]);

        const messageBoxWindowEl = fixture.nativeElement.querySelector('.fd-message-box__content');

        expect(messageBoxWindowEl.getAttribute('id')).toEqual(customMessageBoxConfig.id);
        expect(messageBoxWindowEl.getAttribute('aria-label')).toEqual(customMessageBoxConfig.ariaLabel);
        expect(messageBoxWindowEl.getAttribute('aria-labelledby')).toEqual(customMessageBoxConfig.ariaLabelledBy);
        expect(messageBoxWindowEl.getAttribute('aria-describedby')).toEqual(customMessageBoxConfig.ariaDescribedBy);
    });

    it('should close the message box on router navigation start', async () => {
        await setup();
        const event = new NavigationStart(42, '/');
        const spy = jest.spyOn(messageBoxRef, 'dismiss');
        routerEventsSubject.next(event);

        expect(spy).toHaveBeenCalled();
    });
});

describe('MessageBoxComponent — setupFocusTrap call count', () => {
    describe('when focusTrapped is true', () => {
        let fixture: ComponentFixture<TemplateTestComponent>;
        let focusTrapService: { createFocusTrap: jest.Mock; deactivateFocusTrap: jest.Mock };

        beforeEach(async () => {
            focusTrapService = {
                createFocusTrap: jest.fn().mockReturnValue('trap-id'),
                deactivateFocusTrap: jest.fn()
            };

            const cfg = new MessageBoxConfig();
            cfg.focusTrapped = true;

            await TestBed.configureTestingModule({
                imports: [TestModule, RouterModule, RouterTestingModule],
                providers: [
                    { provide: MessageBoxConfig, useValue: cfg },
                    { provide: MessageBoxRef, useValue: new MessageBoxRef() },
                    { provide: FocusTrapService, useValue: focusTrapService },
                    { provide: FD_DIALOG_FOCUS_TRAP_ERROR, useValue: true }
                ]
            }).compileComponents();

            fixture = TestBed.createComponent(TemplateTestComponent);
            fixture.detectChanges();
        });

        it('should call createFocusTrap exactly once', fakeAsync(() => {
            tick(0);
            fixture.detectChanges();
            expect(focusTrapService.createFocusTrap).toHaveBeenCalledTimes(1);
        }));
    });

    describe('when focusTrapped is false', () => {
        let fixture: ComponentFixture<TemplateTestComponent>;
        let focusTrapService: { createFocusTrap: jest.Mock; deactivateFocusTrap: jest.Mock };

        beforeEach(async () => {
            focusTrapService = {
                createFocusTrap: jest.fn().mockReturnValue('trap-id'),
                deactivateFocusTrap: jest.fn()
            };

            const cfg = new MessageBoxConfig();
            cfg.focusTrapped = false;

            await TestBed.configureTestingModule({
                imports: [TestModule, RouterModule, RouterTestingModule],
                providers: [
                    { provide: MessageBoxConfig, useValue: cfg },
                    { provide: MessageBoxRef, useValue: new MessageBoxRef() },
                    { provide: FocusTrapService, useValue: focusTrapService },
                    { provide: FD_DIALOG_FOCUS_TRAP_ERROR, useValue: true }
                ]
            }).compileComponents();

            fixture = TestBed.createComponent(TemplateTestComponent);
            fixture.detectChanges();
        });

        it('should not call createFocusTrap', fakeAsync(() => {
            tick(0);
            fixture.detectChanges();
            expect(focusTrapService.createFocusTrap).not.toHaveBeenCalled();
        }));
    });
});
