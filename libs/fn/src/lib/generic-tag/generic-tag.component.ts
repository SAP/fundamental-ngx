import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { IconFont } from '@fundamental-ngx/core/icon';
import { applyCssClass, CssClassBuilder } from '@fundamental-ngx/cdk/utils';

export type GenericTagState = 'positive' | 'critical' | 'negative' | 'info';

@Component({
    selector: 'fn-generic-tag',
    templateUrl: './generic-tag.component.html',
    styleUrls: ['./generic-tag.component.scss'],
    host: {
        class: 'fn-generic-tag'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericTagComponent implements OnInit, OnChanges, CssClassBuilder {
    /** Generic tag text. */
    @Input()
    label: string;

    /** Generic tag number suffix. */
    @Input()
    number: string;

    /** Element state */
    @Input()
    state: GenericTagState;

    /** The icon name to display. See the icon page for the list of icons
     * here: https://sap.github.io/fundamental-ngx/icon
     * */
    @Input()
    glyph: string;

    /**
     * The icon font
     * Options include: 'SAP-icons', 'BusinessSuiteInAppSymbols' and 'SAP-icons-TNT'
     */
    @Input() font: IconFont = 'SAP-icons';

    /** Aria-label for Icon. */
    @Input()
    iconAriaLabel: string | null = null;

    /** Whether element is disabled */
    @Input()
    @HostBinding('class.is-disabled')
    disabled = false;

    /** @hidden User's custom classes */
    @Input()
    class: string;

    /** @hidden */
    @HostBinding('[attr.tabindex]')
    get _tabindex(): number {
        return this.disabled ? -1 : 0;
    }

    /** @hidden */
    constructor(private _elRef: ElementRef<HTMLElement>) {}

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
        return this.state ? [this.class, `fn-generic-tag--${this.state}`] : [];
    }

    /** @hidden */
    elementRef(): ElementRef {
        return this._elRef;
    }
}
