import { ChangeDetectorRef } from '@angular/core';

import { MessageBoxDefaultComponent } from './message-box-default.component';
import { MessageBoxContent } from '../utils/message-box-content.class';
import { MessageBoxConfig } from '../utils/message-box-config.class';

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
        const messageBoxContent = {
            closeButtonCallback: jest.fn(),
            cancelButtonCallback: jest.fn(),
            approveButtonCallback: jest.fn()
        } as MessageBoxContent;

        component._messageBoxContent = messageBoxContent;

        component._onCloseButton();
        expect(messageBoxContent.closeButtonCallback).toHaveBeenCalled();

        component._onCancelButton();
        expect(messageBoxContent.cancelButtonCallback).toHaveBeenCalled();

        component._onApproveButton();
        expect(messageBoxContent.approveButtonCallback).toHaveBeenCalled();
    });
});
