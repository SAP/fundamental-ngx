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

import { ButtonComponent } from '@fundamental-ngx/platform/button';

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
    /** @ignore */
    set disabled(disabled: boolean) {
        this._disabled = disabled;
        this._setButtonControlOptions();
    }
    get disabled(): boolean {
        return this._disabled;
    }

    /** @ignore */
    @ViewChild(TemplateRef)
    contentTemplateRef: TemplateRef<any>;

    /** @ignore */
    @ContentChild(ButtonComponent)
    button: ButtonComponent;

    /** @ignore */
    @ContentChild(ButtonComponent, { read: ElementRef })
    set buttonElementRef(buttonComponentElementRef: ElementRef<HTMLElement>) {
        this._setButtonElementClass(buttonComponentElementRef?.nativeElement);
    }

    /** @ignore */
    private _disabled = false;

    /** @ignore */
    constructor(private _renderer: Renderer2) {}

    /** @ignore */
    ngAfterContentInit(): void {
        this._setButtonControlOptions();
    }

    /** @ignore */
    private _setButtonControlOptions(): void {
        const button = this.button;

        if (!button) {
            return;
        }

        button.disabled = this._disabled;

        button.markForCheck();
    }

    /** @ignore */
    private _setButtonElementClass(buttonComponentElement: HTMLElement): void {
        if (!buttonComponentElement) {
            return;
        }
        const button = buttonComponentElement.querySelector('button');
        this._renderer.addClass(button, CSS_CLASS_NAME.button);
    }
}
