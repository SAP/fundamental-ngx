import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { applyCssClass } from '@fundamental-ngx/cdk/utils';
import { CssClassBuilder } from '@fundamental-ngx/cdk/utils';
import { Nullable } from '@fundamental-ngx/cdk/utils';

export type FooterPosition = 'start' | 'end';

@Component({
    selector: 'fd-layout-panel-footer',
    templateUrl: './layout-panel-footer.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutPanelFooterComponent implements OnInit, OnChanges, CssClassBuilder {
    /** Apply user custom styles */
    @Input()
    class: string;

    /**
     * Footer variations, can be start (left aligned), end (right aligned) or null for default.
     * The default value will render the content of the footer in the middle.
     */
    @Input() position: Nullable<FooterPosition>;

    /** @hidden */
    constructor(public readonly elementRef: ElementRef<HTMLElement>) {}

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            'fd-layout-panel__footer',
            this.position ? `fd-layout-panel__footer--${this.position}` : '',
            this.class
        ];
    }
}
