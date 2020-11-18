import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    Optional,
    ViewEncapsulation
} from '@angular/core';
import { DialogHeaderBase } from '../../dialog/base/dialog-header-base.class';
import {
    MESSAGE_BOX_CONFIG,
    MESSAGE_BOX_CONFIGURABLE_ELEMENT,
    MessageBoxConfig
} from '../utils/message-box-config.class';

@Component({
    selector: 'fd-message-box-header',
    templateUrl: './message-box-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        { provide: MESSAGE_BOX_CONFIGURABLE_ELEMENT, useExisting: MessageBoxHeaderComponent, multi: true }
    ]
})
export class MessageBoxHeaderComponent extends DialogHeaderBase implements AfterContentInit {

    constructor(
        @Optional() @Inject(MESSAGE_BOX_CONFIG) public _messageBoxConfig: MessageBoxConfig,
        changeDetectorRef: ChangeDetectorRef
    ) {
        super(changeDetectorRef);
        this._messageBoxConfig = this._messageBoxConfig || {};
    }

    ngAfterContentInit(): void {
        super.ngAfterContentInit();
    }

}
