import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    Output
} from '@angular/core';

import { warnOnce } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent, ButtonType } from '@fundamental-ngx/core/button';
import { FD_DEFAULT_ICON_FONT_FAMILY, IconFont } from '@fundamental-ngx/core/icon';
import { BaseComponent } from '@fundamental-ngx/platform/shared';

/**
 * @deprecated
 * Button component is deprecated. Use `fd-button` from `@fundamental-ngx/core/button` with `@fundamental-ngx/core/menu` instead.
 */
@Component({
    selector: 'fdp-menu-button',
    templateUrl: './menu-button.component.html',
    styleUrl: './menu-button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent]
})
export class MenuButtonComponent extends BaseComponent {
    /** Label for menu button */
    @Input()
    label: string;

    /** text for tooltip */
    @Input()
    title: string;

    /** The Icon to include in the menu-button */
    @Input()
    icon: string;

    /** Glyph font family */
    @Input()
    iconFont: IconFont = FD_DEFAULT_ICON_FONT_FAMILY;

    /** The type of the button. Types include 'standard', 'positive', 'negative', 'transparent', 'attention', 'emphasized', 'ghost'.
     * Leave empty for default.'*/
    @Input()
    type: ButtonType;

    /** Event sent when menu-button is clicked */
    @Output()
    buttonClicked: EventEmitter<MouseEvent | KeyboardEvent | TouchEvent> = new EventEmitter();

    /** @hidden */
    constructor(public _elementRef: ElementRef) {
        super();
        warnOnce(
            'MenuButtonComponent is deprecated. Use `fd-button` from `@fundamental-ngx/core/button` with `@fundamental-ngx/core/menu` instead.'
        );
    }

    /**
     * @hidden disabling fd-button does not disables menu button.
     * because menu trigger is on menu-button; menu gets open.
     * to prevent this, need to apply disabled at menu-button level as well.
     */
    @HostBinding('class.fd-menu-button--disabled')
    get menuButtonDisabled(): boolean {
        return this.disabled;
    }

    /** @hidden tabindex for button. */
    get tabindex(): number {
        return this.disabled ? -1 : 0;
    }

    /**
     *  Handles menu-button click
     */
    public onButtonClick($event: any): void {
        this.buttonClicked.emit($event);
    }
}
