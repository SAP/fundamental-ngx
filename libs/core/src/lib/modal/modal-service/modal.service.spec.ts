import { Component, NgModule, TemplateRef, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ModalService } from './modal.service';
import { ModalModule } from '../modal.module';
import { TestBed } from '@angular/core/testing';
import { DynamicComponentService } from '../../utils/dynamic-component/dynamic-component.service';
import { ModalRef } from '../modal-utils/modal-ref';

@Component({
    template: `        
            <ng-template #testTemplate let-alert>
                <h1>test</h1>
            </ng-template>
    `
})
class TemplateTestComponent {
    @ViewChild('testTemplate') templateRef: TemplateRef<any>;
}

@NgModule({
    declarations: [TemplateTestComponent],
    imports: [CommonModule, BrowserModule, ModalModule],
    providers: [ModalService, DynamicComponentService],
    entryComponents: [TemplateTestComponent]
})
class TestModule {}

describe('ModalService', () => {
    let service: ModalService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();

        service = TestBed.get(ModalService);
    });

    it('should create', () => {
        expect(service).toBeDefined();
    });

    it('should open modal from template', () => {
        spyOn<any>(service, '_destroyModalComponent').and.callThrough();
        expect(service['modals'].length).toBe(0);

        const fixtureElTmp = TestBed.createComponent(TemplateTestComponent).componentInstance.templateRef;
        const modalRef: ModalRef = service.open(fixtureElTmp);
        expect(service['modals'].length).toBe(1);
        expect(service['modals'][0].modalRef).toBeTruthy();
        expect(service['modals'][0].containerRef).toBeTruthy();
        expect(service['modals'][0].backdropRef).toBeTruthy();

        modalRef.dismiss();
        expect((service as any)._destroyModalComponent).toHaveBeenCalled();
        expect(service['modals'].length).toBe(0);
    });

    it('should open modal from component', () => {
        spyOn<any>(service, '_destroyModalComponent').and.callThrough();
        expect(service['modals'].length).toBe(0);

        const modalRef: ModalRef = service.open(TemplateTestComponent);
        expect(service['modals'].length).toBe(1);
        expect(service['modals'][0].modalRef).toBeTruthy();
        expect(service['modals'][0].containerRef).toBeTruthy();
        expect(service['modals'][0].backdropRef).toBeTruthy();

        modalRef.dismiss();
        expect((service as any)._destroyModalComponent).toHaveBeenCalled();
        expect(service['modals'].length).toBe(0);
    });

    it('should support disabled backdrop', () => {
        spyOn<any>(service, '_destroyModalComponent').and.callThrough();
        expect(service['modals'].length).toBe(0);

        const modalRef: ModalRef = service.open(TemplateTestComponent, {hasBackdrop: false});
        expect(service['modals'].length).toBe(1);
        expect(service['modals'][0].modalRef).toBeTruthy();
        expect(service['modals'][0].containerRef).toBeTruthy();
        expect(service['modals'][0].backdropRef).toBeFalsy();

        modalRef.dismiss();
        expect((service as any)._destroyModalComponent).toHaveBeenCalled();
        expect(service['modals'].length).toBe(0);
    });

    it('should support setting modal size', () => {
        const width = '400px';
        const height = '200px';

        service.open(TemplateTestComponent, {
            maxWidth: width,
            minWidth: width,
            width: width,
            maxHeight: height,
            minHeight: height,
            height: height
        });

        expect(service['modals'].length).toBe(1);
        expect(service['modals'][0].modalRef.location.nativeElement.style.maxWidth).toBe(width);
        expect(service['modals'][0].modalRef.location.nativeElement.style.minWidth).toBe(width);
        expect(service['modals'][0].modalRef.location.nativeElement.style.width).toBe(width);
        expect(service['modals'][0].modalRef.location.nativeElement.style.maxHeight).toBe(height);
        expect(service['modals'][0].modalRef.location.nativeElement.style.minHeight).toBe(height);
        expect(service['modals'][0].modalRef.location.nativeElement.style.height).toBe(height);
    });

    it('should support setting modal position', () => {
        const top = '400px';
        const bottom = '300px';
        const right = '200px';
        const left = '100px';

        service.open(TemplateTestComponent, {
            position: {top: top, bottom: bottom, right: right, left: left}
        });

        expect(service['modals'].length).toBe(1);
        expect(service['modals'][0].modalRef.location.nativeElement.style.top).toBe(top);
        expect(service['modals'][0].modalRef.location.nativeElement.style.bottom).toBe(bottom);
        expect(service['modals'][0].modalRef.location.nativeElement.style.right).toBe(right);
        expect(service['modals'][0].modalRef.location.nativeElement.style.left).toBe(left);
    });

    it('should close modal on backdrop click', () => {

        expect(service.hasOpenModals()).toBe(false);

        service.open(TemplateTestComponent, {backdropClickCloseable: true});

        expect(service.hasOpenModals()).toBeTruthy();

        expect(service['modals'][0].modalRef).toBeTruthy();
        expect(service['modals'][0].containerRef).toBeTruthy();
        expect(service['modals'][0].backdropRef).toBeTruthy();

        service['modals'][0].backdropRef.location.nativeElement.click();
        expect(service.hasOpenModals()).toBe(false);

        service.open(TemplateTestComponent, {backdropClickCloseable: false});
        service['modals'][0].backdropRef.location.nativeElement.click();

        expect(service.hasOpenModals()).toBeTruthy();

    });

    it('should dismiss all modals', () => {
        service.open(TemplateTestComponent);
        service.open(TemplateTestComponent);
        service.open(TemplateTestComponent);
        expect(service['modals'].length).toBe(3);

        service.dismissAll();
        expect(service['modals'].length).toBe(0);
    });

    it('should support hasOpenModals', () => {
        expect(service.hasOpenModals()).toBe(false);
        service.open(TemplateTestComponent);
        expect(service.hasOpenModals()).toBe(true);
    });

});
