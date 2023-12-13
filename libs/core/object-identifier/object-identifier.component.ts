import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    HostBinding,
    Input,
    OnDestroy,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { FD_LINK_COMPONENT } from '@fundamental-ngx/core/link';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

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
    standalone: true,
    imports: []
})
export class ObjectIdentifierComponent implements AfterContentInit, OnDestroy {
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

    /** @ignore */
    @HostBinding('class.fd-object-identifier')
    objectIdentifierClass = true;

    /** @ignore */
    @ContentChildren(FD_LINK_COMPONENT, { read: ElementRef })
    linkComponents: QueryList<ElementRef>;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @ignore */
    ngAfterContentInit(): void {
        this._listenOnLinkQueryChange();
    }

    /** @ignore */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @ignore */
    private _listenOnLinkQueryChange(): void {
        this.linkComponents.changes
            .pipe(takeUntil(this._onDestroy$), startWith(0))
            .subscribe(() => this.linkComponents.forEach((link) => this._addIdentifierClass(link)));
    }

    /** @ignore */
    private _addIdentifierClass(link: ElementRef): void {
        link.nativeElement.classList.add('fd-object-identifier__link');
    }
}
