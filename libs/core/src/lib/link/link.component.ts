import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { applyCssClass, CssClassBuilder } from '../utils/public_api';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fdLink], [fd-link]',
    template: `
        <ng-content></ng-content>
    `,
    styleUrls: ['./link.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkComponent implements OnChanges, CssClassBuilder {

    /** user's custom classes */
    @Input()
    public class: string;

    /** Whether user wants to use emphasized mode */
    @Input()
    public emphasized: boolean;

    /** Whether user wants to put disabled mode */
    @Input()
    public disabled: boolean;

    /** Whether user wants to use inverted mode */
    @Input()
    public inverted: boolean;

    /** @hidden */
    constructor(
        private _elementRef: ElementRef
    ) { }

    /** @hidden */
    public ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function is responsible for order which css classes are applied
     */
    public buildComponentCssClass(): string {
        return [
            'fd-link',
            this.emphasized ? 'fd-link--emphasized' : '',
            this.disabled ? 'is-disabled' : '',
            this.inverted ? `fd-link--inverted` : '',
            this.class
        ].filter(x => x !== '').join(' ');
    }

    /** @hidden */
    public elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
