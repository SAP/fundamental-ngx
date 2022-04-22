import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    TemplateRef,
    Type,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { applyCssClass } from '@fundamental-ngx/core/utils';
import { CssClassBuilder } from '@fundamental-ngx/core/utils';
import { DynamicComponentContainer } from '@fundamental-ngx/core/utils';
import { MessageBoxConfig } from '../utils/message-box-config.class';
import { MessageBoxRef } from '../utils/message-box-ref.class';
import { MessageBoxContent } from '../utils/message-box-content.class';
import { MessageBoxDefaultComponent } from '../message-box-default/message-box-default.component';
import { MessageBoxContentType } from '../services/message-box.service';

/** Message box container where the message box content is embedded. */
@Component({
    selector: 'fd-message-box-container',
    template: '<ng-container #contentContainer></ng-container>'
})
export class MessageBoxContainerComponent
    extends DynamicComponentContainer<MessageBoxContentType>
    implements AfterViewInit, CssClassBuilder
{
    /** Custom classes */
    @Input()
    set class(userClass: string) {
        this._class = userClass;
        this.buildComponentCssClass();
    }

    /** @hidden */
    @ViewChild('contentContainer', { read: ViewContainerRef })
    containerRef: ViewContainerRef;

    /** @hidden */
    private _class = '';

    /** @hidden */
    constructor(
        public messageBoxConfig: MessageBoxConfig,
        private _messageBoxRef: MessageBoxRef,
        elementRef: ElementRef,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        super(elementRef);
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._loadContent();
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [this.messageBoxConfig.containerClass ? this.messageBoxConfig.containerClass : '', this._class];
    }

    /** @hidden */
    elementRef(): ElementRef {
        return this._elementRef;
    }

    /** @hidden Load received content */
    protected _loadContent(): void {
        if (this.childContent instanceof Type) {
            this._createFromComponent(this.childContent);
        } else if (this.childContent instanceof TemplateRef) {
            this._createFromTemplate(this.childContent, this._templateContext());
        } else {
            this._createFromDefaultMessageBox(this.childContent ?? null);
        }
        this._changeDetectorRef.detectChanges();
    }

    /** @hidden Returns context for embedded template*/
    private _templateContext(): { $implicit: MessageBoxRef; messageBoxConfig: MessageBoxConfig } {
        return { $implicit: this._messageBoxRef, messageBoxConfig: this.messageBoxConfig };
    }

    /** @hidden Load Dialog component from passed object */
    private _createFromDefaultMessageBox(content: MessageBoxContent | null): void {
        this.containerRef.clear();
        this._componentRef = this.containerRef.createComponent(MessageBoxDefaultComponent);
        this._componentRef.instance._messageBoxContent = content;
    }
}
