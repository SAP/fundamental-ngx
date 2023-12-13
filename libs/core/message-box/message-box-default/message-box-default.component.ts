import { NgTemplateOutlet } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { InitialFocusDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonBarComponent } from '@fundamental-ngx/core/bar';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { MessageBoxBodyComponent } from '../message-box-body/message-box-body.component';
import { MessageBoxFooterComponent } from '../message-box-footer/message-box-footer.component';
import { MessageBoxHeaderComponent } from '../message-box-header/message-box-header.component';
import { MessageBoxComponent } from '../message-box.component';
import { MessageBoxConfig } from '../utils/message-box-config.class';
import { MessageBoxContent } from '../utils/message-box-content.class';

/** Message box component used to create the message box in object based approach */
@Component({
    selector: 'fd-message-box-default',
    templateUrl: './message-box-default.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MessageBoxComponent,
        MessageBoxHeaderComponent,
        TitleComponent,
        MessageBoxBodyComponent,
        NgTemplateOutlet,
        MessageBoxFooterComponent,
        ButtonBarComponent,
        InitialFocusDirective,
        ContentDensityDirective
    ]
})
export class MessageBoxDefaultComponent implements OnInit, AfterViewInit {
    /** @ignore */
    @ViewChild('textContent')
    _textContentTemplate: TemplateRef<any>;

    /** @ignore */
    _contentTemplate: TemplateRef<any>;

    /** @ignore */
    _messageBoxContent: MessageBoxContent | null;

    /** @ignore */
    _footerVisible: boolean;

    /** @ignore */
    constructor(
        public _messageBoxConfig: MessageBoxConfig,
        private _changeDetectorRef: ChangeDetectorRef
    ) {}

    /** @ignore */
    ngOnInit(): void {
        this._footerVisible = !!(this._messageBoxContent?.cancelButton || this._messageBoxContent?.approveButton);
    }

    /** @ignore */
    ngAfterViewInit(): void {
        this._setContentTemplate();
    }

    /** @ignore */
    _onCloseButton(): void {
        this._messageBoxContent?.closeButtonCallback?.();
    }

    /** @ignore */
    _onApproveButton(): void {
        this._messageBoxContent?.approveButtonCallback?.();
    }

    /** @ignore */
    _onCancelButton(): void {
        this._messageBoxContent?.cancelButtonCallback?.();
    }

    /** @ignore */
    private _setContentTemplate(): void {
        this._contentTemplate =
            this._messageBoxContent?.content instanceof TemplateRef
                ? this._messageBoxContent.content
                : this._textContentTemplate;

        this._changeDetectorRef.detectChanges();
    }
}
