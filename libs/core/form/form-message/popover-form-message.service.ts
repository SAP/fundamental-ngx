import { ElementRef, Injectable, OnDestroy, TemplateRef } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { PopoverService } from '@fundamental-ngx/core/popover';

@Injectable()
export class PopoverFormMessageService implements OnDestroy {
    /** @ignore */
    private _message: Nullable<string | TemplateRef<any>>;

    /** @ignore */
    private _hidden = false;

    /** @ignore */
    constructor(private _popoverService: PopoverService) {}

    /** @ignore */
    set message(message: Nullable<string | TemplateRef<any>>) {
        this._message = message;
        this._updatePopover();
    }

    /** @ignore */
    set triggers(triggers: string[]) {
        this._popoverService.triggers = triggers;
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

    /** @ignore */
    ngOnDestroy(): void {
        this._popoverService.onDestroy();
    }

    /** @ignore */
    private _getAdditionalClass(): string[] {
        return [this._shouldBeHidden() ? 'fd-popover__body--hidden' : ''].filter((v): v is string => !!v);
    }

    /** @ignore */
    private _updatePopover(): void {
        this._popoverService.additionalBodyClass = this._getAdditionalClass().join(' ');
        this._popoverService.updateContent(this._message, null);
    }

    /** @ignore */
    private _shouldBeHidden(): boolean {
        return this._hidden || !this._message;
    }
}
