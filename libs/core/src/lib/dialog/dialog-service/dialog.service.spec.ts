import { Component, TemplateRef, ViewChild } from '@angular/core';

import { DialogService } from './dialog.service';
import { TestBed } from '@angular/core/testing';
import { DialogRef } from '../dialog-utils/dialog-ref.class';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DialogModule } from '../dialog.module';
import { DIALOG_DEFAULT_CONFIG, DialogConfig } from '../dialog-utils/dialog-config.class';

@Component({
    template: `
            <ng-template #testTemplate let-alert>
                <fd-dialog></fd-dialog>
            </ng-template>
    `
})
class TemplateTestComponent {
    @ViewChild('testTemplate') templateRef: TemplateRef<any>;
}

describe('DialogService', () => {
    let service: DialogService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TemplateTestComponent],
            imports: [DialogModule],
            providers: [{provide: DIALOG_DEFAULT_CONFIG, useValue: {...new DialogConfig(), resizable: true}}],
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {entryComponents: [TemplateTestComponent]}
        }).compileComponents();

        service = TestBed.inject<DialogService>(DialogService);
    });

    it('should create', () => {
        expect(service).toBeDefined();
    });

    it('should open dialog from template', () => {
        spyOn<any>(service, '_destroyDialogComponent').and.callThrough();
        expect(service['_dialogs'].length).toBe(0);

        const fixtureElTmp = TestBed.createComponent(TemplateTestComponent).componentInstance.templateRef;
        const modalRef: DialogRef = service.open(fixtureElTmp);
        expect(service['_dialogs'].length).toBe(1);
        expect(service['_dialogs'][0]).toBeTruthy();

        modalRef.dismiss();
        expect((service as any)._destroyDialogComponent).toHaveBeenCalled();
        expect(service['_dialogs'].length).toBe(0);
    });

    it('should open dialog from component', () => {
        spyOn<any>(service, '_destroyDialogComponent').and.callThrough();
        expect(service['_dialogs'].length).toBe(0);

        const modalRef: DialogRef = service.open(TemplateTestComponent);
        expect(service['_dialogs'].length).toBe(1);
        expect(service['_dialogs'][0]).toBeTruthy();

        modalRef.dismiss();
        expect((service as any)._destroyDialogComponent).toHaveBeenCalled();
        expect(service['_dialogs'].length).toBe(0);
    });

    it('should dismiss all modals', () => {
        service.open(TemplateTestComponent);
        service.open(TemplateTestComponent);
        service.open(TemplateTestComponent);
        expect(service['_dialogs'].length).toBe(3);

        service.dismissAll();
        expect(service['_dialogs'].length).toBe(0);
    });

    it('should support hasOpenDialogs', () => {
        expect(service.hasOpenDialogs()).toBe(false);
        service.open(TemplateTestComponent);
        expect(service.hasOpenDialogs()).toBe(true);
    });

    it('should use default values', () => {
        const dialogConfig = service['_applyDefaultConfig'](new DialogConfig(), service['_defaultConfig']);
        expect(dialogConfig.resizable).toEqual(true);
    });
});
