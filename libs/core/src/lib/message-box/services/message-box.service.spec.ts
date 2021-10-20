import { TestBed } from '@angular/core/testing';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { MessageBoxService } from './message-box.service';
import { MessageBoxModule } from '../message-box.module';

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

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TemplateTestComponent],
            imports: [MessageBoxModule]
        })
            .overrideModule(BrowserDynamicTestingModule, {
                set: { entryComponents: [TemplateTestComponent] }
            })
            .compileComponents();

        service = TestBed.inject<MessageBoxService>(MessageBoxService);
    });

    it('should create', () => {
        expect(service).toBeDefined();
        expect(service.hasOpenDialogs()).toBeFalse();
    });

    it('should open message box from template', () => {
        const destroyDialogSpy = spyOn<any>(service, '_destroyDialog').and.callThrough();
        const templateRef = TestBed.createComponent(TemplateTestComponent).componentInstance.templateRef;
        const dialogRef = service.open(templateRef);

        expect(service.hasOpenDialogs()).toBeTrue();

        dialogRef.dismiss();

        expect(destroyDialogSpy).toHaveBeenCalled();
        expect(service.hasOpenDialogs()).toBeFalse();
    });

    it('should open dialog from component', () => {
        const destroyDialogSpy = spyOn<any>(service, '_destroyDialog').and.callThrough();
        const dialogRef = service.open(TemplateTestComponent);

        expect(service.hasOpenDialogs()).toBeTrue();

        dialogRef.dismiss();

        expect(destroyDialogSpy).toHaveBeenCalled();
        expect(service.hasOpenDialogs()).toBeFalse();
    });

    it('should dismiss all message boxes', () => {
        service.open(TemplateTestComponent);
        service.open(TemplateTestComponent);
        service.open(TemplateTestComponent);

        expect(service.hasOpenDialogs()).toBeTrue();

        service.dismissAll();

        expect(service.hasOpenDialogs()).toBeFalse();
    });
});
