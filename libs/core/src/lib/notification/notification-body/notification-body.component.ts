import { 
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    ViewEncapsulation,
    OnChanges,
    OnInit
} from '@angular/core';
import { applyCssClass, CssClassBuilder } from '../../utils/public_api';

@Component({
    selector: 'fd-notification-body',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationBodyComponent  implements OnChanges, OnInit, CssClassBuilder {
    /** user's custom classes */
    @Input()
    class: string;

    @Input() hasMessage = false;

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
            'fd-notification__body',
            this.hasMessage ? 'fd-notification__body--message' : '',
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
