import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    ViewEncapsulation,
    OnInit
} from '@angular/core';
import { applyCssClass } from '@fundamental-ngx/core/utils';
import { CssClassBuilder } from '@fundamental-ngx/core/utils';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fdLink], [fd-link]',
    template: ` <ng-content></ng-content> `,
    styleUrls: ['./link.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkComponent implements OnChanges, OnInit, CssClassBuilder {
    /** user's custom classes */
    @Input()
    class: string;

    /** Whether user wants to use emphasized mode */
    @Input()
    emphasized: boolean;

    /** Whether user wants to put disabled mode */
    @Input()
    disabled: boolean;

    /** Whether user wants to use inverted mode */
    @Input()
    inverted: boolean;

    /** Whether user wants to use subtle mode */
    @Input()
    subtle: boolean;

    /** @hidden */
    constructor(private _elementRef: ElementRef) {}

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string[] {
        return [
            'fd-link',
            this.emphasized ? 'fd-link--emphasized' : '',
            this.disabled ? 'is-disabled' : '',
            this.inverted ? `fd-link--inverted` : '',
            this.subtle ? 'fd-link--subtle' : '',
            this.class
        ];
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }
}
