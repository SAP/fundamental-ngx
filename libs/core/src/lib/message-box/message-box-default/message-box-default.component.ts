import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { MessageBoxContent } from '../utils/message-box-content.class';
import { MessageBoxConfig } from '../utils/message-box-config.class';

/** Message box component used to create the message box in object based approach */
@Component({
    selector: 'fd-message-box-default',
    templateUrl: './message-box-default.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageBoxDefaultComponent implements AfterViewInit {

    /** @hidden */
    @ViewChild('textContent')
    _textContentTemplate: TemplateRef<any>;

    /** @hidden */
    _contentTemplate: TemplateRef<any>;

    /** @hidden */
    _messageBoxContent: MessageBoxContent;

    /** @hidden */
    constructor(public _messageBoxConfig: MessageBoxConfig, private _changeDetectorRef: ChangeDetectorRef) { }

    /** @hidden */
    ngAfterViewInit(): void {
        this._setContentTemplate();
    }

    /** @hidden */
    _onCloseButton(): void {
        this._messageBoxContent.closeButtonCallback();
    }

    /** @hidden */
    _onApproveButton(): void {
        this._messageBoxContent.approveButtonCallback();
    }

    /** @hidden */
    _onCancelButton(): void {
        this._messageBoxContent.cancelButtonCallback();
    }

    /** @hidden */
    private _setContentTemplate(): void {
        this._contentTemplate = this._messageBoxContent.content instanceof TemplateRef
            ? this._messageBoxContent.content
            : this._textContentTemplate;

        this._changeDetectorRef.detectChanges();
    }
}
