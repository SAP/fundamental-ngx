import {
    ElementRef, Injectable,
} from '@angular/core';
import { MessageStates } from './form-message.component';
import { PopoverService } from '../../popover/popover-service/popover.service';
import { CSS_CLASS_NAME, getTypeClassName } from './constants';

@Injectable()
export class PopoverFormMessageService {
    private _type: MessageStates;
    private _message: string;
    private _hidden = false;

    constructor(
        private _popoverService: PopoverService
    ) {
        this._popoverService.tmp = true;
        this._popoverService.triggers = ['mouseenter', 'mouseleave'];
    }

    set messageType(type: MessageStates) {
        this._type = type;
        this._updatePopover();
    }

    set message(message: string) {
        this._message = message;
        this._updatePopover();
    }

    set triggers(triggers: string[]) {
        this._popoverService.triggers = triggers;
        this._updatePopover();
    }

    init(triggerElement: ElementRef): void {
        this._popoverService.initialise(triggerElement);
    }

    hide(): void {
        this._hidden = true;
        this._updatePopover();
    }

    show(): void {
        this._hidden = false;
        this._updatePopover();
    }

    private _getAdditionalClass(): string[] {
        return [
            CSS_CLASS_NAME.message,
            getTypeClassName(this._type),
            this._shouldBeHidden() ? 'is-hidden' : ''
        ];
    }

    private _updatePopover(): void {
        this._popoverService.additionalBodyClass = this._getAdditionalClass().join(' ');
        this._popoverService.updateContent(this._message, null);
    }

    private _shouldBeHidden(): boolean {
        return this._hidden || !this._message
    }
}
