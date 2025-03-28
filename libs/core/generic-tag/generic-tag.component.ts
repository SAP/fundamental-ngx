import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    ViewEncapsulation,
    inject
} from '@angular/core';
import { CssClassBuilder, Nullable, NullableObject, applyCssClass } from '@fundamental-ngx/cdk/utils';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { FD_GENERIC_TAG_COMPONENT } from './tokens';

export type GenericTagType = 'error' | 'success' | 'warning' | 'information';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-generic-tag]',
    templateUrl: './generic-tag.component.html',
    styleUrl: './generic-tag.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: FD_GENERIC_TAG_COMPONENT,
            useExisting: GenericTagComponent
        }
    ],
    host: {
        '[attr.tabindex]': '0',
        '[attr.aria-roledescription]': 'ariaRoleDescription',
        role: 'button'
    },
    imports: [IconComponent]
})
export class GenericTagComponent implements OnChanges, OnInit, CssClassBuilder {
    /** User's custom classes */
    @Input()
    class: string;

    /**
     * The type of the Generic Tag.
     * Can be one of the following: 'error' | 'success' | 'warning' | 'information'.
     * For default Generic Tag omit this property.
     */
    @Input()
    type: Nullable<GenericTagType>;

    /**
     * Required input
     * The KPI Name of the Generic tag. Standard text.
     * Always use a meaningful title. Keep it simple and try to use no more than 3 words.
     */
    @Input({ required: true })
    name!: string;

    /**
     * The KPI Value of the Generic tag.
     * The value represents the numeric (key) attribute and its unit.
     */
    @Input()
    value: Nullable<string>;

    /**
     *  Aria defines role description for the Generic Tag
     */
    @Input()
    ariaRoleDescription: Nullable<string> = 'Generic Tag';

    /** @hidden */
    readonly elementRef = inject(ElementRef);

    /** @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return buildObjectStatusCssClasses(this);
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }
}

type GenericTagData = NullableObject<{
    type: GenericTagType;
    class: string;
}>;

const buildObjectStatusCssClasses = (data: GenericTagData): string[] => [
    'fd-generic-tag',
    data.type ? `fd-generic-tag--${data.type}` : '',
    data.class || ''
];
