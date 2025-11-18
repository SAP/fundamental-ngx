import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    DestroyRef,
    ElementRef,
    QueryList,
    ViewEncapsulation,
    booleanAttribute,
    computed,
    inject,
    input
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { FD_LINK_COMPONENT } from '@fundamental-ngx/core/link';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { startWith } from 'rxjs/operators';

let objIdentifierId = 0;

@Component({
    selector: 'fd-object-identifier',
    template: `
        <p class="fd-object-identifier__title" [class.fd-object-identifier__title--bold]="bold()">
            <ng-content></ng-content>
        </p>
        @if (description()) {
            <p class="fd-object-identifier__text" [id]="_descriptionId()">
                {{ description() }}
            </p>
        }
        <span class="fd-object-identifier__sr-only" [id]="_srId()">{{
            'coreObjectIdentifier.announcement' | fdTranslate
        }}</span>
    `,
    styleUrl: './object-identifier.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.fd-object-identifier--medium]': 'medium()',
        '[class.fd-object-identifier]': 'objectIdentifierClass'
    },
    imports: [FdTranslatePipe]
})
export class ObjectIdentifierComponent implements AfterContentInit {
    /** @hidden */
    @ContentChildren(FD_LINK_COMPONENT, { read: ElementRef })
    linkComponents: QueryList<ElementRef>;

    /**
     * obj identifier id
     * if not set, a default value is provided
     */
    id = input('fd-obj-identifier-id-' + ++objIdentifierId);

    /** @hidden */
    _srId = computed(() => `${this.id()}-sr`);

    /** @hidden */
    _descriptionId = computed(() => `${this.id()}-desc`);

    /** Description text */
    description = input<Nullable<string>>();

    /** Whether the title should be bolded */
    bold = input(false, { transform: booleanAttribute });

    /** Whether the title is medium size */
    medium = input(false, { transform: booleanAttribute });

    /** @hidden */
    objectIdentifierClass = true;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    ngAfterContentInit(): void {
        this._listenOnLinkQueryChange();
    }

    /** @hidden */
    private _listenOnLinkQueryChange(): void {
        this.linkComponents.changes.pipe(startWith(0), takeUntilDestroyed(this._destroyRef)).subscribe(() =>
            this.linkComponents.forEach((link) => {
                this._addIdentifierClass(link);
                this._addAriaDescribedBy(link);
            })
        );
    }

    /** @hidden */
    private _addIdentifierClass(link: ElementRef): void {
        link.nativeElement.classList.add('fd-object-identifier__link');
    }

    /** @hidden */
    private _addAriaDescribedBy(link: ElementRef): void {
        const describedBy = this.description() ? `${this._srId()} ${this._descriptionId()}` : `${this._srId()}`;
        link.nativeElement.setAttribute('aria-describedby', describedBy);
    }
}
