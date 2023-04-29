import { CommonModule } from '@angular/common';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Component, TemplateRef, ViewChild } from '@angular/core';

import { MessageBoxService } from './message-box.service';
import { MessageBoxModule } from '../message-box.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
    template: ``
})
class MessageBoxServiceTestComponent {
    constructor(public messageBoxService: MessageBoxService) {}
}

@Component({
    template: `
        <ng-template let-messageBoxRef let-messageBoxConfig="messageBoxConfig" #testTemplate>
            <fd-message-box [messageBoxRef]="messageBoxRef" [messageBoxConfig]="messageBoxConfig"></fd-message-box>
        </ng-template>
    `
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
            declarations: [TemplateTestComponent, MessageBoxServiceTestComponent],
            imports: [CommonModule, MessageBoxModule, NoopAnimationsModule]
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
        expect(service.hasOpenDialogs()).toBeFalse();
    });

    it('should open message box from template', fakeAsync(async () => {
        const destroyDialogSpy = spyOn<any>(service, '_destroyDialog').and.callThrough();
        const templateRef = component.templateRef;
        const dialogRef = service.open(templateRef);

        fixture.detectChanges();

        await fixture.whenRenderingDone();

        expect(service.hasOpenDialogs()).toBeTrue();

        dialogRef.dismiss();

        fixture.detectChanges();

        tick(200);

        expect(destroyDialogSpy).toHaveBeenCalled();
        expect(service.hasOpenDialogs()).toBeFalse();
    }));

    it('should open dialog from component', fakeAsync(async () => {
        const destroyDialogSpy = spyOn<any>(service, '_destroyDialog').and.callThrough();
        const dialogRef = service.open(TemplateTestComponent);

        fixture.detectChanges();

        expect(service.hasOpenDialogs()).toBeTrue();

        fixture.detectChanges();

        await fixture.whenRenderingDone();

        expect(service.hasOpenDialogs()).toBeTrue();

        dialogRef.dismiss();

        fixture.detectChanges();

        tick(200);

        expect(destroyDialogSpy).toHaveBeenCalled();
        expect(service.hasOpenDialogs()).toBeFalse();
    }));

    it('should dismiss all message boxes', () => {
        service.open(TemplateTestComponent);
        service.open(TemplateTestComponent);
        service.open(TemplateTestComponent);

        expect(service.hasOpenDialogs()).toBeTrue();

        service.dismissAll();

        expect(service.hasOpenDialogs()).toBeFalse();
    });
});
