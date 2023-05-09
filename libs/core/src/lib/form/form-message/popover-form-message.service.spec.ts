import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverFormMessageService } from './popover-form-message.service';
import { PopoverModule, PopoverService } from '@fundamental-ngx/core/popover';
import { Component } from '@angular/core';

@Component({
    template: ``,
    providers: [PopoverService, PopoverFormMessageService]
})
class PopoverFormMessageTestComponent {
    constructor(public formService: PopoverFormMessageService) {}
}
describe('PopoverFormMessageService', () => {
    let service: PopoverFormMessageService;
    let fixture: ComponentFixture<PopoverFormMessageTestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PopoverFormMessageTestComponent],
            imports: [PopoverModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PopoverFormMessageTestComponent);
        service = fixture.componentInstance.formService;
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should trigger _updatePopover on message change ', () => {
        const updateSpy = jest.spyOn(<any>service, '_updatePopover');

        service.message = 'New Message';

        expect(updateSpy).toHaveBeenCalled();
    });

    it('should trigger _updatePopover on message type change ', () => {
        const updateSpy = jest.spyOn(<any>service, '_updatePopover');

        service.messageType = 'information';

        expect(updateSpy).toHaveBeenCalled();
    });

    it('should trigger _updatePopover and hide', () => {
        service.message = 'test';
        const updateSpy = jest.spyOn(<any>service, '_updatePopover');

        service.hide();

        fixture.detectChanges();

        expect(updateSpy).toHaveBeenCalled();
        expect((<any>service)._shouldBeHidden()).toBeTruthy();
        expect((<any>service)._hidden).toBeTruthy();
    });

    it('should trigger _updatePopover and show', () => {
        service.message = 'test';
        service.hide();

        expect((<any>service)._shouldBeHidden()).toBeTruthy();

        const updateSpy = jest.spyOn(<any>service, '_updatePopover');

        service.show();

        expect(updateSpy).toHaveBeenCalled();
        expect((<any>service)._shouldBeHidden()).toBe(false);
    });
});
