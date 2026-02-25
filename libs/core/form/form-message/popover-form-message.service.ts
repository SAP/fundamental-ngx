import { ElementRef, Injectable, TemplateRef } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { PopoverService } from '@fundamental-ngx/core/popover';

@Injectable()
export class PopoverFormMessageService {
    /** @hidden */
    private _message: Nullable<string | TemplateRef<any>>;

    /** @hidden */
    private _hidden = false;

    /** @hidden */
    constructor(private _popoverService: PopoverService) {}

    /** @hidden */
    set message(message: Nullable<string | TemplateRef<any>>) {
        this._message = message;
        this._updatePopover();
    }

    /** @hidden */
    set triggers(triggers: string[]) {
        this._popoverService.triggers.set(triggers);
        this._popoverService._refreshTriggerListeners();
    }

    /** Initialise popover service with trigger element */
    init(triggerElement: ElementRef): void {
        this._popoverService.initialise(triggerElement);
    }

    /** Forces hidden state onto popover, without any collision with triggering events */
    hide(): void {
        this._hidden = true;
        this._updatePopover();
    }

    /** Removes hidden state onto popover, without any collision with triggering events */
    show(): void {
        this._hidden = false;
        this._updatePopover();
    }

    /** @hidden */
    private _getAdditionalClass(): string[] {
        return [this._shouldBeHidden() ? 'fd-popover__body--hidden' : ''].filter((v): v is string => !!v);
    }

    /** @hidden */
    private _updatePopover(): void {
        this._popoverService.additionalBodyClass.set(this._getAdditionalClass().join(' '));
        this._popoverService.updateContent(this._message, null);
    }

    /** @hidden */
    private _shouldBeHidden(): boolean {
        return this._hidden || !this._message;
    }
}
