import { TestBed } from '@angular/core/testing';
import { NgModule, TemplateRef, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MessageToastService } from './message-toast.service';
import { DynamicComponentService } from '@fundamental-ngx/cdk/utils';
import { MessageToastComponent } from '../message-toast.component';
import { MessageToastContainerComponent } from '../message-toast-utils/message-toast-container.component';
import { MessageToastRef } from '../message-toast-utils/message-toast-ref';
import { MessageToastConfig } from '../message-toast-utils/message-toast-config';
import { MESSAGE_TOAST_CONFIG } from '../constants';

@Component({
    template: ` <ng-template #testTemplate let-messageToast> Message Toast Test Content </ng-template> `
})
class TemplateTestComponent {
    @ViewChild('testTemplate') templateRef: TemplateRef<any>;
}

@NgModule({
    declarations: [MessageToastComponent, MessageToastContainerComponent, TemplateTestComponent],
    imports: [CommonModule, BrowserModule],
    providers: [
        MessageToastService,
        DynamicComponentService,
        {
            provide: MESSAGE_TOAST_CONFIG,
            useValue: new MessageToastConfig()
        }
    ]
})
class TestModule {}

describe('MessageToastService', () => {
    let service: MessageToastService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();

        service = TestBed.get(MessageToastService);
    });

    it('should create', () => {
        expect(service).toBeDefined();
    });

    it('should open message toast container', () => {
        service.open('Message Toast Test Content');
        expect(service['_messageToastContainerRef']).toBeTruthy();
    });

    it('should open message toast from string', () => {
        spyOn<any>(service, '_destroyMessageToastComponent').and.callThrough();

        expect(service['_messageToasts'].length).toBe(0);
        expect(service['_messageToastContainerRef']).toBeFalsy();

        const messageToastRef: MessageToastRef = service.open('Message Toast Test Content', {
            duration: 5000
        } as MessageToastConfig);
        expect(service['_messageToasts'].length).toBe(1);
        expect(service['_messageToastContainerRef']).toBeTruthy();

        messageToastRef.timeout();
        expect((service as any)._destroyMessageToastComponent).toHaveBeenCalled();
        expect(service['_messageToasts'].length).toBe(0);
        expect(service['_messageToastContainerRef']).toBeFalsy();
    });

    it('should open message toast from template', () => {
        spyOn<any>(service, '_destroyMessageToastComponent').and.callThrough();

        expect(service['_messageToasts'].length).toBe(0);
        expect(service['_messageToastContainerRef']).toBeFalsy();

        const fixtureElTmp = TestBed.createComponent(TemplateTestComponent).componentInstance.templateRef;
        const messageToastRef: MessageToastRef = service.open(fixtureElTmp);
        expect(service['_messageToasts'].length).toBe(1);
        expect(service['_messageToastContainerRef']).toBeTruthy();

        messageToastRef.timeout();
        expect((service as any)._destroyMessageToastComponent).toHaveBeenCalled();
        expect(service['_messageToasts'].length).toBe(0);
        expect(service['_messageToastContainerRef']).toBeFalsy();
    });

    it('should open message toast from component', () => {
        spyOn<any>(service, '_destroyMessageToastComponent').and.callThrough();

        expect(service['_messageToasts'].length).toBe(0);
        expect(service['_messageToastContainerRef']).toBeFalsy();

        const messageToastRef: MessageToastRef = service.open(TemplateTestComponent);
        expect(service['_messageToasts'].length).toBe(1);
        expect(service['_messageToastContainerRef']).toBeTruthy();

        messageToastRef.timeout();
        expect((service as any)._destroyMessageToastComponent).toHaveBeenCalled();
        expect(service['_messageToasts'].length).toBe(0);
        expect(service['_messageToastContainerRef']).toBeFalsy();
    });

    it('should hide all message toasts', () => {
        service.open('Message Toast 1');
        service.open('Message Toast 2');
        service.open('Message Toast 2');
        expect(service['_messageToasts'].length).toBe(3);

        (service as any).hideAll();
        expect(service['_messageToasts'].length).toBe(0);
    });
});
