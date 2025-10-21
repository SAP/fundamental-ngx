import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    DestroyRef,
    ElementRef,
    QueryList,
    ViewEncapsulation,
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
            <p class="fd-object-identifier__text">
                {{ description() }}
            </p>
        }
        <span class="fd-object-identifier__sr-only" [id]="id()">{{
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

    /** Description text */
    description = input<Nullable<string>>();

    /** Whether the title should be bolded */
    bold = input<boolean>(false);

    /** Whether the title is medium size */
    medium = input<boolean>(false);

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
        link.nativeElement.setAttribute('aria-describedby', this.id());
    }
}
