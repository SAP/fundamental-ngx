import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MessageBoxModule } from '../message-box.module';
import { MessageBoxService } from './message-box.service';

@Component({
    template: ``,
    standalone: true,
    imports: [MessageBoxModule]
})
class MessageBoxServiceTestComponent {
    constructor(public messageBoxService: MessageBoxService) {}
}

@Component({
    template: `
        <ng-template #testTemplate let-messageBoxRef let-messageBoxConfig="messageBoxConfig">
            <fd-message-box [messageBoxRef]="messageBoxRef" [messageBoxConfig]="messageBoxConfig"></fd-message-box>
        </ng-template>
    `,
    standalone: true,
    imports: [MessageBoxModule]
})
class TemplateTestComponent {
    @ViewChild('testTemplate') templateRef: TemplateRef<any>;
}

describe('MessageBoxService', () => {
    let service: MessageBoxService;
    let component: TemplateTestComponent;
    let rootComponent: MessageBoxServiceTestComponent;
    let fixture: ComponentFixture<MessageBoxServiceTestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({}).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MessageBoxServiceTestComponent);
        rootComponent = fixture.componentInstance;
        component = TestBed.createComponent(TemplateTestComponent).componentInstance;
        service = rootComponent.messageBoxService;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(service).toBeDefined();
        expect(service.hasOpenDialogs()).toBe(false);
    });

    it('should open message box from template', fakeAsync(() => {
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

    it('should dismiss all message boxes', fakeAsync(() => {
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
