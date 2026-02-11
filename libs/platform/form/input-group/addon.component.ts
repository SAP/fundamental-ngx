import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ElementRef,
    Provider,
    Renderer2,
    TemplateRef,
    ViewChild,
    forwardRef
} from '@angular/core';

import { ButtonComponent, ButtonModel, FDP_BUTTON } from '@fundamental-ngx/platform/button';

import { Nullable } from '@fundamental-ngx/cdk/utils';
import { BaseButton, FD_BUTTON_COMPONENT } from '@fundamental-ngx/core/button';
import { CSS_CLASS_NAME, INPUT_GROUP_CHILD_TOKEN } from './constants';

export const inputGroupAddonChildProvider: Provider = {
    provide: INPUT_GROUP_CHILD_TOKEN,
    useExisting: forwardRef(() => InputGroupAddonComponent)
};

/**
 * Fundamental input group addon component
 *
 * This component is intended to be used inside `<fdp-input-group>`
 *
 *
 * Input group addon can contain a plain text:
 * ```
 * <fdp-input-group-addon>$</fdp-input-group-addon>
 * ```
 * Icon:
 * ```
 * <fdp-input-group-addon><i class="sap-icon--employee"></i></fdp-input-group-addon>
 * ```
 * Button component:
 * ```
 * <fdp-input-group-addon><fdp-button label="Action"></fdp-button></fdp-input-group-addon>
 * ```
 *
 */
@Component({
    selector: 'fdp-input-group-addon',
    template: '<ng-template><ng-content></ng-content></ng-template>',
    providers: [inputGroupAddonChildProvider],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class InputGroupAddonComponent implements AfterContentInit {
    /** @hidden */
    set disabled(disabled: boolean) {
        this._disabled = disabled;
        this._setButtonControlOptions();
    }
    get disabled(): boolean {
        return this._disabled;
    }

    /** @hidden */
    @ViewChild(TemplateRef)
    contentTemplateRef: TemplateRef<any>;

    /** @hidden */
    @ContentChild(FDP_BUTTON)
    platformButton: Nullable<ButtonModel>;

    /** @hidden */
    @ContentChild(FD_BUTTON_COMPONENT)
    coreButton: Nullable<BaseButton>;

    /** @hidden */
    @ContentChild(ButtonComponent, { read: ElementRef })
    set buttonElementRef(buttonComponentElementRef: ElementRef<HTMLElement>) {
        this._setButtonElementClass(buttonComponentElementRef?.nativeElement);
    }

    /** @hidden */
    get button(): Nullable<ButtonModel> {
        return this.platformButton || this.coreButton;
    }

    /** @hidden */
    private _disabled = false;

    /** @hidden */
    constructor(private _renderer: Renderer2) {}

    /** @hidden */
    ngAfterContentInit(): void {
        this._setButtonControlOptions();
    }

    /** @hidden */
    private _setButtonControlOptions(): void {
        const button = this.platformButton || this.coreButton;

        if (!button) {
            return;
        }

        button.setFdType('transparent');
        button.setDisabled(this._disabled);

        button.markForCheck();
    }

    /** @hidden */
    private _setButtonElementClass(buttonComponentElement: HTMLElement): void {
        if (!buttonComponentElement) {
            return;
        }
        const button = buttonComponentElement.querySelector('button');
        this._renderer.addClass(button, CSS_CLASS_NAME.button);
    }
}
