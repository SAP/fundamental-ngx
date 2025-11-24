import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    inject,
    Input,
    OnChanges,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { FdbViewMode } from '@fundamental-ngx/btp/shared';
import { applyCssClass, CssClassBuilder, HasElementRef, Nullable } from '@fundamental-ngx/cdk/utils';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fdbToolLayout]', // Using camel case, because it should become directive sometime in the future
    template: ` <ng-content></ng-content>`,
    styleUrls: ['./tool-layout.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class ToolLayoutComponent implements OnChanges, OnInit, CssClassBuilder, HasElementRef {
    /** user's custom classes */
    @Input()
    class: string;

    /** Whether the Tool Layout is in Desktop, Tablet or Mobile/Phone mode
     * Types available: '' | 'tablet' | 'phone'
     * The default (not specified) mode is desktop.
     */
    @Input()
    mode: Nullable<FdbViewMode>;

    /** whether to remove the gaps between layout containers */
    @Input({ transform: booleanAttribute })
    noGaps = false;

    /** @hidden */
    readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    /** @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            'fd-tool-layout',
            this.mode ? `fd-tool-layout--${this.mode}` : '',
            this.noGaps ? 'fd-tool-layout--no-gaps' : '',
            this.class
        ];
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }
}
