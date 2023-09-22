import { Component, NgModule, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationStart, Router, RouterEvent, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { DialogFooterComponent } from './dialog-footer/dialog-footer.component';
import { DialogHeaderComponent } from './dialog-header/dialog-header.component';
import { DialogComponent } from './dialog.component';
import { provideDialogService } from './provide-dialog-service';
import { DialogConfig } from './utils/dialog-config.class';
import { DialogRef } from './utils/dialog-ref.class';

@Component({
    template: `
        <fd-dialog>
            <fd-dialog-header></fd-dialog-header>
            <fd-dialog-body></fd-dialog-body>
            <fd-dialog-footer>
                <button></button>
            </fd-dialog-footer>
        </fd-dialog>
    `,
    standalone: true,
    providers: [provideDialogService()],
    imports: [DialogComponent, DialogBodyComponent, DialogHeaderComponent, DialogFooterComponent]
})
class TemplateTestComponent {
    @ViewChild(DialogComponent) dialog: DialogComponent;
}

@NgModule({
    imports: [TemplateTestComponent, NoopAnimationsModule]
})
class TestModule {}

describe('DialogComponent', () => {
    let component: TemplateTestComponent;
    let dialogComponent: DialogComponent;
    let fixture: ComponentFixture<TemplateTestComponent>;

    const dialogRef = new DialogRef();
    const dialogConfig = new DialogConfig();
    const routerEventsSubject = new Subject<RouterEvent>();
    const mockRouter = { events: routerEventsSubject.asObservable() };
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule, RouterModule, RouterTestingModule],
            providers: [
                { provide: DialogRef, useValue: dialogRef },
                { provide: DialogConfig, useValue: dialogConfig },
                { provide: Router, useValue: mockRouter }
            ]
        });
    });

    async function setup(providers: { token: any; provider: { useValue: any } }[] = []): Promise<void> {
        providers.forEach((provider) => TestBed.overrideProvider(provider.token, provider.provider));
        await TestBed.compileComponents();

        fixture = TestBed.createComponent(TemplateTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        dialogComponent = fixture.componentInstance.dialog;
        router = TestBed.inject(Router);
    }

    it('should create', async () => {
        await setup();
        expect(component).toBeTruthy();
        expect(dialogComponent).toBeTruthy();
    });

    it('should create w/o Router', async () => {
        await setup([{ token: Router, provider: { useValue: null } }]);
        expect(router).toBeNull();
        expect(component).toBeTruthy();
        expect(dialogComponent).toBeTruthy();
    });

    it('should hide dialog', async () => {
        await setup();

        dialogRef.hide(true);
        fixture.detectChanges();

        const dialogEl: HTMLElement = fixture.nativeElement.querySelector('.fd-dialog');
        expect(dialogEl.classList).not.toContain('.fd-dialog--active');
    });

    it('should close after esc pressed', async () => {
        await setup();

        const dismissSpy = jest.spyOn(dialogRef, 'dismiss');

        dialogComponent.elementRef.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        fixture.detectChanges();

        expect(dismissSpy).toHaveBeenCalled();
    });

    it('should close after backdrop clicked', async () => {
        const customDialogConfig = { ...new DialogConfig(), backdropClickCloseable: true };

        await setup([{ token: DialogConfig, provider: { useValue: customDialogConfig } }]);

        const dismissSpy = jest.spyOn(dialogRef, 'dismiss');
        fixture.detectChanges();

        fixture.nativeElement.querySelector('.fd-dialog').dispatchEvent(new MouseEvent('mousedown'));
        fixture.detectChanges();

        expect(dismissSpy).toHaveBeenCalled();
    });

    it('should set custom position', async () => {
        const customDialogConfig = { ...new DialogConfig(), position: { bottom: '100px', right: '50px' } };
        await setup([{ token: DialogConfig, provider: { useValue: customDialogConfig } }]);

        expect(dialogComponent.dialogWindow.nativeElement.style.right).toEqual('50px');
        expect(dialogComponent.dialogWindow.nativeElement.style.bottom).toEqual('100px');
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
        const customDialogConfig = { ...new DialogConfig(), ...customSize };

        await setup([{ token: DialogConfig, provider: { useValue: customDialogConfig } }]);

        expect(dialogComponent.dialogWindow.nativeElement.style.width).toEqual(customSize.width);
        expect(dialogComponent.dialogWindow.nativeElement.style.height).toEqual(customSize.height);
        expect(dialogComponent.dialogWindow.nativeElement.style.minWidth).toEqual(customSize.minWidth);
        expect(dialogComponent.dialogWindow.nativeElement.style.minHeight).toEqual(customSize.minHeight);
        expect(dialogComponent.dialogWindow.nativeElement.style.maxWidth).toEqual(customSize.maxWidth);
        expect(dialogComponent.dialogWindow.nativeElement.style.maxHeight).toEqual(customSize.maxHeight);
    });

    it('should have custom classes', async () => {
        const customDialogConfig = {
            ...new DialogConfig(),
            backdropClass: 'customBackdropClass',
            dialogPanelClass: 'customPanelClass'
        };
        await setup([{ token: DialogConfig, provider: { useValue: customDialogConfig } }]);

        expect(fixture.nativeElement.querySelector('.fd-dialog').classList).toContain('customBackdropClass');
        expect(fixture.nativeElement.querySelector('.fd-dialog__content').classList).toContain('customPanelClass');
    });

    it('should display in mobile mode', async () => {
        const customDialogConfig = { ...new DialogConfig(), mobile: true };
        await setup([{ token: DialogConfig, provider: { useValue: customDialogConfig } }]);

        expect(fixture.nativeElement.querySelector('.fd-dialog__content').classList).toContain(
            'fd-dialog__content--mobile'
        );
    });

    it('should display in mobile mode with no stretch', async () => {
        const customDialogConfig = { ...new DialogConfig(), mobileOuterSpacing: true };
        await setup([{ token: DialogConfig, provider: { useValue: customDialogConfig } }]);

        expect(fixture.nativeElement.querySelector('.fd-dialog__content').classList).toContain(
            'fd-dialog__content--no-mobile-stretch'
        );
    });

    it('should be draggable', async () => {
        const customDialogConfig = { ...new DialogConfig(), draggable: true };
        await setup([{ token: DialogConfig, provider: { useValue: customDialogConfig } }]);

        expect(fixture.nativeElement.querySelector('.fd-dialog__content').classList).toContain(
            'fd-dialog__content--draggable-grab'
        );

        fixture.nativeElement.querySelector('fd-dialog-header').dispatchEvent(new MouseEvent('mousedown'));
    });

    it('should be resizable', async () => {
        const customDialogConfig = { ...new DialogConfig(), resizable: true };
        await setup([{ token: DialogConfig, provider: { useValue: customDialogConfig } }]);

        expect(fixture.nativeElement.querySelector('.fd-dialog__resize-handle')).toBeTruthy();

        fixture.nativeElement.querySelector('fd-dialog-header').dispatchEvent(new MouseEvent('mousedown'));
    });

    it('should use custom attributes', async () => {
        const customDialogConfig = {
            ...new DialogConfig(),
            id: 'customId',
            ariaLabel: 'customAriaLabel',
            ariaLabelledBy: 'customAriLabelledBy',
            ariaDescribedBy: 'customAriaDescribedBy'
        };
        await setup([{ token: DialogConfig, provider: { useValue: customDialogConfig } }]);

        const dialogWindowEl = fixture.nativeElement.querySelector('.fd-dialog__content');

        expect(dialogWindowEl.getAttribute('id')).toEqual(customDialogConfig.id);
        expect(dialogWindowEl.getAttribute('aria-label')).toEqual(customDialogConfig.ariaLabel);
        expect(dialogWindowEl.getAttribute('aria-labelledby')).toEqual(customDialogConfig.ariaLabelledBy);
        expect(dialogWindowEl.getAttribute('aria-describedby')).toEqual(customDialogConfig.ariaDescribedBy);
    });

    it('should close the dialog on router navigation start', async () => {
        await setup();
        const event = new NavigationStart(42, '/');
        jest.spyOn(dialogRef, 'dismiss');
        routerEventsSubject.next(event);

        expect(dialogRef.dismiss).toHaveBeenCalled();
    });
});
