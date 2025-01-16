import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    DestroyRef,
    ElementRef,
    HostBinding,
    Input,
    QueryList,
    ViewEncapsulation,
    inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { FD_LINK_COMPONENT } from '@fundamental-ngx/core/link';
import { startWith } from 'rxjs/operators';

@Component({
    selector: 'fd-object-identifier',
    template: `
        <p class="fd-object-identifier__title" [class.fd-object-identifier__title--bold]="bold">
            <ng-content></ng-content>
        </p>
        @if (description) {
            <p class="fd-object-identifier__text">
                {{ description }}
            </p>
        }
    `,
    styleUrl: './object-identifier.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: []
})
export class ObjectIdentifierComponent implements AfterContentInit {
    /** Description text */
    @Input()
    description: Nullable<string>;

    /** Whether the title should be bolded */
    @Input()
    bold = false;

    /** Whether the title is medium size */
    @Input()
    @HostBinding('class.fd-object-identifier--medium')
    medium = false;

    /** @hidden */
    @HostBinding('class.fd-object-identifier')
    objectIdentifierClass = true;

    /** @hidden */
    @ContentChildren(FD_LINK_COMPONENT, { read: ElementRef })
    linkComponents: QueryList<ElementRef>;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    ngAfterContentInit(): void {
        this._listenOnLinkQueryChange();
    }

    /** @hidden */
    private _listenOnLinkQueryChange(): void {
        this.linkComponents.changes
            .pipe(startWith(0), takeUntilDestroyed(this._destroyRef))
            .subscribe(() => this.linkComponents.forEach((link) => this._addIdentifierClass(link)));
    }

    /** @hidden */
    private _addIdentifierClass(link: ElementRef): void {
        link.nativeElement.classList.add('fd-object-identifier__link');
    }
}
