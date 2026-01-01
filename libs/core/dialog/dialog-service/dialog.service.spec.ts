import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DialogModule } from '../dialog.module';
import { DialogService } from './dialog.service';

@Component({
    template: ``,
    standalone: true,
    imports: [DialogModule]
})
class DialogServiceTestComponent {
    constructor(public dialogService: DialogService) {}
}

@Component({
    template: `
        <ng-template let-dialogRef let-dialogConfig="dialogConfig" #testTemplate>
            <fd-dialog [dialogRef]="dialogRef" [dialogConfig]="dialogConfig"></fd-dialog>
        </ng-template>
    `,
    standalone: true,
    imports: [DialogModule]
})
class TemplateTestComponent {
    @ViewChild('testTemplate') templateRef: TemplateRef<any>;
}

describe('DialogService', () => {
    let service: DialogService;
    let component: TemplateTestComponent;
    let rootComponent: DialogServiceTestComponent;
    let fixture: ComponentFixture<DialogServiceTestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({}).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogServiceTestComponent);
        rootComponent = fixture.componentInstance;
        component = TestBed.createComponent(TemplateTestComponent).componentInstance;
        service = rootComponent.dialogService;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(service).toBeDefined();
        expect(service.hasOpenDialogs()).toBe(false);
    });

    it('should open dialog from template', fakeAsync(() => {
        const destroyDialogSpy = jest.spyOn(service as any, '_destroyDialog');
        const templateRef = component.templateRef;
        const dialogRef = service.open(templateRef);

        fixture.detectChanges();
        tick();
        expect(service.hasOpenDialogs()).toBe(true);

        dialogRef.dismiss();
        fixture.detectChanges();
        tick();

        // Manually trigger animationend since CSS animations don't fire in jsdom
        const container = document.querySelector('.fd-dialog-container');
        if (container) {
            const event = new Event('animationend', { bubbles: true });
            Object.defineProperty(event, 'target', { value: container, enumerable: true });
            container.dispatchEvent(event);
        }

        tick();
        expect(destroyDialogSpy).toHaveBeenCalled();
        expect(service.hasOpenDialogs()).toBe(false);
    }));

    it('should open dialog from component', fakeAsync(() => {
        const destroyDialogSpy = jest.spyOn(service as any, '_destroyDialog');
        const dialogRef = service.open(TemplateTestComponent);

        fixture.detectChanges();
        tick();
        expect(service.hasOpenDialogs()).toBe(true);

        dialogRef.dismiss();
        fixture.detectChanges();
        tick();

        // Manually trigger animationend since CSS animations don't fire in jsdom
        const container = document.querySelector('.fd-dialog-container');
        if (container) {
            const event = new Event('animationend', { bubbles: true });
            Object.defineProperty(event, 'target', { value: container, enumerable: true });
            container.dispatchEvent(event);
        }

        tick();
        expect(destroyDialogSpy).toHaveBeenCalled();
        expect(service.hasOpenDialogs()).toBe(false);
    }));

    it('should dismiss all dialogs', fakeAsync(() => {
        service.open(TemplateTestComponent);
        service.open(TemplateTestComponent);
        service.open(TemplateTestComponent);

        expect(service.hasOpenDialogs()).toBe(true);
        service.dismissAll();
        fixture.detectChanges();
        tick();

        // Manually trigger animationend for all containers since CSS animations don't fire in jsdom
        const containers = document.querySelectorAll('.fd-dialog-container');
        containers.forEach((container) => {
            const event = new Event('animationend', { bubbles: true });
            Object.defineProperty(event, 'target', { value: container, enumerable: true });
            container.dispatchEvent(event);
        });

        tick();
        expect(service.hasOpenDialogs()).toBe(false);
    }));
});
