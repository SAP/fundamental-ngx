import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { Component } from '@angular/core';
import { PopoverModule, PopoverService } from '@fundamental-ngx/core/popover';
import { PopoverFormMessageService } from './popover-form-message.service';

@Component({
    template: ``,
    providers: [PopoverService, PopoverFormMessageService],
    standalone: true,
    imports: [PopoverModule]
})
class PopoverFormMessageTestComponent {
    constructor(public formService: PopoverFormMessageService) {}
}
describe('PopoverFormMessageService', () => {
    let service: PopoverFormMessageService;
    let fixture: ComponentFixture<PopoverFormMessageTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PopoverFormMessageTestComponent]
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
