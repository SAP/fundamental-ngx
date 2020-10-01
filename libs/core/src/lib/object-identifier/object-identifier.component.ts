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
    OnDestroy, OnChanges, SimpleChanges
} from '@angular/core';
import { LinkComponent } from '../link/link.component';
import { startWith, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'fd-object-identifier',
    template: `
        <ng-content select="[fd-object-identifier-title]"></ng-content>
        <p  class="fd-object-identifier__title"
            [ngClass]="{
                'fd-object-identifier__title--bold': bold,
                'fd-object-identifier__title--link': link
            }">
            <ng-content></ng-content>
        </p>
        <p class="fd-object-identifier__text" *ngIf="description">
            {{description}}
        </p>
    `,
    styleUrls: ['./object-identifier.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectIdentifierComponent implements AfterContentInit, OnDestroy, OnChanges {

    /** Description text */
    @Input()
    description: string = null;

    /** Whether the title should be bolded */
    @Input()
    bold = false;

    /** Whether the there is link mode inside object identifier */
    @Input()
    link = false;

    /** */
    @Input()
    large = true;

    @HostBinding('class.fd-object-identifier--medium')
    objectIdentifierMedium = !this.large;

    /** @hidden */
    @HostBinding('class.fd-object-identifier')
    objectIdentifierClass = true;

    @ContentChildren(LinkComponent)
    linkComponents: QueryList<LinkComponent>;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef
    ) { }

    /** @hidden */
    ngAfterContentInit(): void {
        this._listenOnLinkQueryChange();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes['large']) {
            this.objectIdentifierMedium = !changes['large'].currentValue;
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @hidden */
    private _listenOnLinkQueryChange(): void {
        this.linkComponents.changes.pipe(
            takeUntil(this._onDestroy$),
            startWith(0)
        ).subscribe(() => {
            this.linkComponents.forEach(link => this._addIdentifierClass(link))
        });
    }

    /** @hidden */
    private _addIdentifierClass(link: LinkComponent): void {
        link.elementRef().nativeElement.classList.add('fd-object-identifier__link');
    }
}
