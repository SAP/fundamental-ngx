import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DialogComponent } from './dialog.component';
import { DialogService } from './dialog-service/dialog.service';
import { DialogModule } from './dialog.module';
import { Component, NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DialogRef } from './utils/dialog-ref.class';
import { DialogConfig } from './utils/dialog-config.class';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationStart, Router, RouterEvent, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
    template: `
        <fd-dialog>
            <fd-dialog-header></fd-dialog-header>
            <fd-dialog-body></fd-dialog-body>
            <fd-dialog-footer>
                <button></button>
            </fd-dialog-footer>
        </fd-dialog>
    `
})
class TemplateTestComponent {
    @ViewChild(DialogComponent) dialog: DialogComponent;
}

@NgModule({
    declarations: [TemplateTestComponent],
    imports: [CommonModule, BrowserModule, DialogModule, NoopAnimationsModule],
    providers: [DialogService],
    entryComponents: [TemplateTestComponent]
})
class TestModule {}

describe('DialogComponent', () => {
    let component: TemplateTestComponent;
    let dialogComponent: DialogComponent;
    let fixture: ComponentFixture<TemplateTestComponent>;

    let dialogService: DialogService;
    const dialogRef = new DialogRef();
    const dialogConfig = new DialogConfig();
    const routerEventsSubject = new Subject<RouterEvent>();
    const mockRouter = { events: routerEventsSubject.asObservable() };
    let router: Router;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestModule, RouterModule, RouterTestingModule],
            providers: [
                { provide: DialogRef, useValue: dialogRef },
                { provide: DialogConfig, useValue: dialogConfig },
                { provide: Router, useValue: mockRouter }
            ]
        });
    }));

    function setup(providers: { token: any; provider: { useValue: any } }[] = []): void {
        providers.forEach((provider) => TestBed.overrideProvider(provider.token, provider.provider));
        TestBed.compileComponents();

        fixture = TestBed.createComponent(TemplateTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        dialogService = TestBed.inject<DialogService>(DialogService);
        dialogComponent = fixture.componentInstance.dialog;
        router = TestBed.inject(Router)
    }

    it('should create', () => {
        setup();
        expect(component).toBeTruthy();
        expect(dialogComponent).toBeTruthy();
    });

    it('should create w/o Router', () => {
        setup([{ token: Router, provider: { useValue: null } }]);
        expect(router).toBeNull();
        expect(component).toBeTruthy();
        expect(dialogComponent).toBeTruthy();
    });

    it('should hide dialog', () => {
        setup();

        dialogRef.hide(true);
        fixture.detectChanges();

        const dialogEl = fixture.nativeElement.querySelector('.fd-dialog');
        expect(dialogEl).not.toHaveClass('.fd-dialog--active');
    });

    it('should close after esc pressed', () => {
        setup();

        const dismissSpy = spyOn(dialogRef, 'dismiss');

        dialogComponent['_elementRef'].nativeElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }));
        fixture.detectChanges();

        expect(dismissSpy).toHaveBeenCalled();
    });

    it('should close after backdrop clicked', () => {
        setup();

        const dismissSpy = spyOn(dialogRef, 'dismiss');
        fixture.detectChanges();

        fixture.nativeElement.querySelector('.fd-dialog').dispatchEvent(new MouseEvent('mousedown'));
        fixture.detectChanges();

        expect(dismissSpy).toHaveBeenCalled();
    });

    it('should set custom position', () => {
        const customDialogConfig = { ...new DialogConfig(), position: { bottom: '100px', right: '50px' } };
        setup([{ token: DialogConfig, provider: { useValue: customDialogConfig } }]);

        expect(dialogComponent.dialogWindow.nativeElement.style.right).toEqual('50px');
        expect(dialogComponent.dialogWindow.nativeElement.style.bottom).toEqual('100px');
    });

    it('should set custom size', () => {
        const customSize = {
            width: '500px',
            height: '600px',
            minWidth: '450px',
            minHeight: '550px',
            maxWidth: '1000px',
            maxHeight: '900px'
        };
        const customDialogConfig = { ...new DialogConfig(), ...customSize };

        setup([{ token: DialogConfig, provider: { useValue: customDialogConfig } }]);

        expect(dialogComponent.dialogWindow.nativeElement.style.width).toEqual(customSize.width);
        expect(dialogComponent.dialogWindow.nativeElement.style.height).toEqual(customSize.height);
        expect(dialogComponent.dialogWindow.nativeElement.style.minWidth).toEqual(customSize.minWidth);
        expect(dialogComponent.dialogWindow.nativeElement.style.minHeight).toEqual(customSize.minHeight);
        expect(dialogComponent.dialogWindow.nativeElement.style.maxWidth).toEqual(customSize.maxWidth);
        expect(dialogComponent.dialogWindow.nativeElement.style.maxHeight).toEqual(customSize.maxHeight);
    });

    it('should have custom classes', () => {
        const customDialogConfig = {
            ...new DialogConfig(),
            backdropClass: 'customBackdropClass',
            dialogPanelClass: 'customPanelClass'
        };
        setup([{ token: DialogConfig, provider: { useValue: customDialogConfig } }]);

        expect(fixture.nativeElement.querySelector('.fd-dialog')).toHaveClass('customBackdropClass');
        expect(fixture.nativeElement.querySelector('.fd-dialog__content')).toHaveClass('customPanelClass');
    });

    it('should display in mobile mode', () => {
        const customDialogConfig = { ...new DialogConfig(), mobile: true };
        setup([{ token: DialogConfig, provider: { useValue: customDialogConfig } }]);

        expect(fixture.nativeElement.querySelector('.fd-dialog__content')).toHaveClass('fd-dialog__content--mobile');
    });

    it('should display in mobile mode', () => {
        const customDialogConfig = { ...new DialogConfig(), fullScreen: true };
        setup([{ token: DialogConfig, provider: { useValue: customDialogConfig } }]);

        expect(fixture.nativeElement.querySelector('.fd-dialog__content')).toHaveClass(
            'fd-dialog__content--full-screen'
        );
    });

    it('should display in mobile mode with no stretch', () => {
        const customDialogConfig = { ...new DialogConfig(), mobileOuterSpacing: true };
        setup([{ token: DialogConfig, provider: { useValue: customDialogConfig } }]);

        expect(fixture.nativeElement.querySelector('.fd-dialog__content')).toHaveClass(
            'fd-dialog__content--no-mobile-stretch'
        );
    });

    it('should be draggable', () => {
        const customDialogConfig = { ...new DialogConfig(), draggable: true };
        setup([{ token: DialogConfig, provider: { useValue: customDialogConfig } }]);

        expect(fixture.nativeElement.querySelector('.fd-dialog__content')).toHaveClass(
            'fd-dialog__content--draggable-grab'
        );

        fixture.nativeElement.querySelector('fd-dialog-header').dispatchEvent(new MouseEvent('mousedown'));
    });

    it('should be resizable', () => {
        const customDialogConfig = { ...new DialogConfig(), resizable: true };
        setup([{ token: DialogConfig, provider: { useValue: customDialogConfig } }]);

        expect(fixture.nativeElement.querySelector('.fd-dialog__resize-handle')).toBeTruthy();

        fixture.nativeElement.querySelector('fd-dialog-header').dispatchEvent(new MouseEvent('mousedown'));
    });

    it('should use custom attributes', () => {
        const customDialogConfig = {
            ...new DialogConfig(),
            id: 'customId',
            ariaLabel: 'customAriaLabel',
            ariaLabelledBy: 'customAriLabelledBy',
            ariaDescribedBy: 'customAriaDescribedBy'
        };
        setup([{ token: DialogConfig, provider: { useValue: customDialogConfig } }]);

        const dialogWindowEl = fixture.nativeElement.querySelector('.fd-dialog__content');

        expect(dialogWindowEl.getAttribute('id')).toEqual(customDialogConfig.id);
        expect(dialogWindowEl.getAttribute('aria-label')).toEqual(customDialogConfig.ariaLabel);
        expect(dialogWindowEl.getAttribute('aria-labelledby')).toEqual(customDialogConfig.ariaLabelledBy);
        expect(dialogWindowEl.getAttribute('aria-describedby')).toEqual(customDialogConfig.ariaDescribedBy);
    });

    it('should close the dialog on router navigation start', () => {
        setup();
        const event = new NavigationStart(42, '/');
        spyOn(dialogRef, 'dismiss');
        routerEventsSubject.next(event);

        expect(dialogRef.dismiss).toHaveBeenCalled();
    });
});
