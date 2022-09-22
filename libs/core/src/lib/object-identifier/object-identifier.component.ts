import {
    ChangeDetectionStrategy,
    Component,
    Input,
    ViewEncapsulation,
    HostBinding,
    ContentChildren,
    QueryList,
    AfterContentInit,
    ChangeDetectorRef,
    OnDestroy
} from '@angular/core';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { startWith, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Nullable } from '@fundamental-ngx/core/shared';
import { SkeletonConsumerDirective, skeletonConsumerProviders } from '@fundamental-ngx/core/skeleton';

@Component({
    selector: 'fd-object-identifier',
    template: `
        <p class="fd-object-identifier__title" [class.fd-object-identifier__title--bold]="bold">
            <ng-content></ng-content>
        </p>

        <p class="fd-object-identifier__text" *ngIf="description">
            {{ description }}
        </p>
    `,
    styleUrls: ['./object-identifier.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: skeletonConsumerProviders({ width: '5rem', height: '1.25rem' })
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

    /** @hidden */
    @HostBinding('class.fd-object-identifier')
    objectIdentifierClass = true;

    @ContentChildren(LinkComponent)
    linkComponents: QueryList<LinkComponent>;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private readonly _skeletonConsumer: SkeletonConsumerDirective
    ) {
        _skeletonConsumer.consume();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._listenOnLinkQueryChange();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @hidden */
    private _listenOnLinkQueryChange(): void {
        this.linkComponents.changes
            .pipe(takeUntil(this._onDestroy$), startWith(0))
            .subscribe(() => this.linkComponents.forEach((link) => this._addIdentifierClass(link)));
    }

    /** @hidden */
    private _addIdentifierClass(link: LinkComponent): void {
        link.elementRef().nativeElement.classList.add('fd-object-identifier__link');
    }
}
