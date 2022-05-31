import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    QueryList,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { applyCssClass, CssClassBuilder } from '@fundamental-ngx/core/utils';
import { ContentObserver } from '@angular/cdk/observers';
import { map, startWith, Subject, takeUntil, tap } from 'rxjs';
import { DomPortal, Portal } from '@angular/cdk/portal';
import { IconComponent } from '@fundamental-ngx/core/icon';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fdLink], [fd-link]',
    templateUrl: './link.component.html',
    styleUrls: ['./link.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkComponent implements OnChanges, OnInit, CssClassBuilder, AfterViewInit, OnDestroy {
    @ContentChildren(IconComponent)
    iconComponents: QueryList<IconComponent>;

    @ViewChild('content')
    contentSpan: ElementRef<HTMLSpanElement>;

    /** user's custom classes */
    @Input()
    class: string;

    /** Whether user wants to use emphasized mode */
    @Input()
    emphasized: boolean;

    /** Whether user wants to put disabled mode */
    @Input()
    disabled: boolean;

    /** Whether user wants to use inverted mode */
    @Input()
    inverted: boolean;

    /** Whether user wants to use subtle mode */
    @Input()
    subtle: boolean;

    /** Whether user wants to have a link without underline decoration */
    @Input()
    undecorated: boolean;

    prefixPortal: Portal<any> | null;
    postfixPortal: Portal<any> | null;

    /** @hidden */
    private _destroyed$ = new Subject<void>();

    /** @hidden */
    constructor(
        private _elementRef: ElementRef<Element>,
        private contentObserver: ContentObserver,
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string[] {
        return [
            'fd-link',
            this.emphasized ? 'fd-link--emphasized' : '',
            this.disabled ? 'is-disabled' : '',
            this.inverted ? `fd-link--inverted` : '',
            this.subtle ? 'fd-link--subtle' : '',
            this.undecorated ? 'fd-link--undecorated' : '',
            this.class
        ];
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this.iconComponents.changes
            .pipe(
                startWith(this.iconComponents),
                map((c) => c.toArray()),
                map((icons) =>
                    // We are only interested in the first descendant of the content element
                    icons.filter(
                        (icon) => icon.elementRef().nativeElement.parentElement === this.contentSpan.nativeElement
                    )
                ),
                map((icons) => {
                    if (icons.length === 0) {
                        return {};
                    }
                    const prefix =
                        icons[0].elementRef().nativeElement === this.contentSpan.nativeElement.childNodes[0]
                            ? icons[0].elementRef().nativeElement
                            : null;
                    const postfix =
                        icons[icons.length - 1].elementRef().nativeElement ===
                        this.contentSpan.nativeElement.childNodes[this.contentSpan.nativeElement.childNodes.length - 1]
                            ? icons[icons.length - 1].elementRef().nativeElement
                            : null;
                    return { prefix, postfix };
                }),
                tap(() => {
                    if (this.prefixPortal?.isAttached) {
                        this.prefixPortal.detach();
                    }
                    if (this.postfixPortal?.isAttached) {
                        this.postfixPortal.detach();
                    }
                }),
                tap(({ prefix, postfix }) => {
                    this.prefixPortal = prefix ? new DomPortal(prefix) : null;
                    this.postfixPortal = postfix ? new DomPortal(postfix) : null;
                }),
                tap(() => {
                    this.changeDetectorRef.detectChanges();
                }),
                takeUntil(this._destroyed$)
            )
            .subscribe();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._destroyed$.next();
        this._destroyed$.complete();
    }
}
