import {
    DestroyRef,
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnInit,
    Output,
    inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { resizeObservable } from '@fundamental-ngx/cdk/utils';
import { debounceTime } from 'rxjs';

/**
 * A directive designed to help navigation elements determine the element currently in view of the user.
 */
@Directive({
    selector: '[fdScrollSpy]',
    standalone: true,
    exportAs: 'fdScrollSpy'
})
export class ScrollSpyDirective implements OnInit {
    /**
     * An array of tags to track.
     */
    @Input()
    trackedTags: string[] = [];

    /**
     * Whether events are still fired if there is no tag present on the user's screen.
     */
    @Input()
    fireEmpty = false;

    /**
     * A number that represent at what location in the container the event is fired.
     * 0.5 would fire the events in the middle of the container,
     * 0 for the top and 1 for the bottom.
     */
    @Input()
    targetPercent = 0;

    /**
     * Number that represents the offset in pixels for fired target. `100` value means that the event will be fired for
     * target that is 100 pixels below the spy container.
     */
    @Input()
    targetOffset = 0;

    /**
     * Whether to disable scroll spy
     */
    @Input()
    scrollSpyDisabled = false;

    /**
     * Event fired on the scroll element when a new item becomes activated by the scrollspy .
     * The returned value is the HTMLElement itself.
     */
    @Output()
    readonly spyChange: EventEmitter<HTMLElement> = new EventEmitter<HTMLElement>();

    /** @hidden */
    private _currentActive: HTMLElement | undefined;

    /** @hidden */
    private readonly _elRef = inject(ElementRef);

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    @HostListener('scroll', ['$event'])
    onScroll(event?: Event, forced = false): void {
        if (this.scrollSpyDisabled) {
            return;
        }

        let spiedTag: HTMLElement | undefined;
        const target = (event?.target || this._elRef.nativeElement) as HTMLElement;
        const children: HTMLElement[] = this._elRef.nativeElement.children;
        const [firstChild] = children;
        const childrenLength = children.length;
        const targetScrollTop = target.scrollTop;
        const targetOffsetTop = target.offsetTop + this.targetOffset - (target.offsetTop - firstChild.offsetTop);

        for (let i = 0; i < childrenLength; i++) {
            const element = children[i];
            if (this.trackedTags.some((tag) => tag.toLocaleUpperCase() === element.tagName.toLocaleUpperCase())) {
                if (element.offsetTop - targetOffsetTop <= targetScrollTop + target.offsetHeight * this.targetPercent) {
                    spiedTag = element;
                }
            }
        }

        if (forced || ((spiedTag || this.fireEmpty) && spiedTag !== this._currentActive)) {
            this._currentActive = spiedTag;
            this.spyChange.emit(this._currentActive);
        }
    }

    /** @hidden */
    ngOnInit(): void {
        // When the spy container being resized, re-evaluate scroll position.
        resizeObservable(this._elRef.nativeElement)
            .pipe(debounceTime(30), takeUntilDestroyed(this._destroyRef))
            .subscribe(() => {
                this.onScroll(undefined, true);
            });
    }
}
