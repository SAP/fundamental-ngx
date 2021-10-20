import { Component, TemplateRef, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { DialogService } from './dialog.service';
import { DialogModule } from '../dialog.module';

@Component({
    template: `
        <ng-template let-dialogRef let-dialogConfig="dialogConfig" #testTemplate>
            <fd-dialog [dialogRef]="dialogRef" [dialogConfig]="dialogConfig"></fd-dialog>
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
            imports: [DialogModule]
        })
            .overrideModule(BrowserDynamicTestingModule, {
                set: { entryComponents: [TemplateTestComponent] }
            })
            .compileComponents();

        service = TestBed.inject<DialogService>(DialogService);
    });

    it('should create', () => {
        expect(service).toBeDefined();
        expect(service.hasOpenDialogs()).toBeFalse();
    });

    it('should open dialog from template', () => {
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

    it('should dismiss all modals', () => {
        service.open(TemplateTestComponent);
        service.open(TemplateTestComponent);
        service.open(TemplateTestComponent);

        expect(service.hasOpenDialogs()).toBeTrue();

        service.dismissAll();

        expect(service.hasOpenDialogs()).toBeFalse();
    });
});
