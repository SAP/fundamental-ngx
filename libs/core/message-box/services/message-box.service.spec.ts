import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';
import { MessageBoxModule } from '../message-box.module';
import { MessageBoxService } from './message-box.service';

@Component({
    template: ``,
    standalone: true,
    imports: [CommonModule, MessageBoxModule]
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
    imports: [CommonModule, MessageBoxModule]
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
        await TestBed.configureTestingModule({
            imports: [
                CommonModule,
                OverlayModule,
                NoopAnimationsModule,
                TemplateTestComponent,
                MessageBoxServiceTestComponent
            ]
        }).compileComponents();
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
        tick(200); // Wait for the closing animation or processing

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
        tick(200); // Wait for the closing animation or processing

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
        tick(); // Wait for the closing animation or processing
        expect(service.hasOpenDialogs()).toBe(false);
    }));
});
