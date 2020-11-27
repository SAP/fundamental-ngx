import { ChangeDetectorRef } from '@angular/core';

import { MessageBoxDefaultComponent } from './message-box-default.component';
import { MessageBoxContent } from '../utils/message-box-content.class';
import { MessageBoxConfig } from '../utils/message-box-config.class';
import createSpy = jasmine.createSpy;

describe('MessageBoxDefaultComponent', () => {
    let component: MessageBoxDefaultComponent;
    const changeDetectorRefMock = { detectChanges: () => {} } as ChangeDetectorRef;

    beforeEach(() => {
        component = new MessageBoxDefaultComponent(new MessageBoxConfig(), changeDetectorRefMock);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call callbacks', () => {
        const messageBoxContent: MessageBoxContent = {
            closeButtonCallback: createSpy(),
            cancelButtonCallback: createSpy(),
            approveButtonCallback: createSpy()
        };

        component._messageBoxContent = messageBoxContent;

        component._onCloseButton();
        expect(messageBoxContent.closeButtonCallback).toHaveBeenCalled();

        component._onCancelButton();
        expect(messageBoxContent.cancelButtonCallback).toHaveBeenCalled();

        component._onApproveButton();
        expect(messageBoxContent.approveButtonCallback).toHaveBeenCalled();
    });
});
