import {
    Component,
    ViewChild,
    TemplateRef,
    ContentChild,
    ElementRef,
    Renderer2,
    AfterContentInit,
    Provider,
    forwardRef,
    ChangeDetectionStrategy
} from '@angular/core';

import { ContentDensity } from '@fundamental-ngx/core/utils';
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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputGroupAddonComponent implements AfterContentInit {
    /** @hidden */
    set contentDensity(contentDensity: ContentDensity) {
        this._contentDensity = contentDensity;
        this._setButtonControlOptions();
    }
    get contentDensity(): ContentDensity {
        return this._contentDensity;
    }

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
    @ContentChild(ButtonComponent)
    button: ButtonComponent;

    /** @hidden */
    @ContentChild(ButtonComponent, { read: ElementRef })
    set buttonElementRef(buttonComponentElementRef: ElementRef<HTMLElement>) {
        this._setButtonElementClass(buttonComponentElementRef?.nativeElement);
    }

    /** @hidden */
    private _contentDensity: ContentDensity;

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
        const button = this.button;

        if (!button) {
            return;
        }

        // button.contentDensity = this._contentDensity;
        button.disabled = this._disabled;

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
