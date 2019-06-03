import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

/**
 * A directive designed to help navigation elements determine the element currently in view of the user. 
 */
@Directive({
    selector: '[fdScrollSpy]'
})
export class ScrollSpyDirective {
    /**
     * An array of tags to track.
     */
    @Input()
    public trackedTags: string[] = [];

    /**
     * Whether events are still fired if there is no tag present on the user's screen.
     */
    @Input()
    public fireEmpty: boolean = false;

    /** 
     * A number that represent at what location in the container the event is fired. 
     * 0.5 would fire the events in the middle of the container, 
     * 0 for the top and 1 for the bottom.
     */
    @Input()
    public targetPercent: number = 0;

    /** 
     * Event fired on the scroll element when a new item becomes activated by the scrollspy . 
     * The returned value is the HTMLElement itself.
     */
    @Output()
    public readonly spyChange: EventEmitter<HTMLElement> = new EventEmitter<HTMLElement>();

    /** @hidden */
    private currentActive: HTMLElement;

    /** @hidden */
    constructor(private elRef: ElementRef) {}

    /** @hidden */
    @HostListener('scroll', ['$event'])
    onScroll(event: any) {
        let spiedTag: HTMLElement;
        const children = this.elRef.nativeElement.children;
        const targetScrollTop = event.target.scrollTop;
        const targetOffsetTop = event.target.offsetTop;

        for (let i = 0; i < children.length; i++) {
            const element: HTMLElement = children[i];
            if (this.trackedTags.some(tag => tag.toLocaleUpperCase() === element.tagName.toLocaleUpperCase())) {
                if ((element.offsetTop - targetOffsetTop) <= targetScrollTop + event.target.offsetHeight * this.targetPercent) {
                    spiedTag = element;
                }
            }
        }

        if ((spiedTag || this.fireEmpty) && spiedTag !== this.currentActive) {
            this.currentActive = spiedTag;
            this.spyChange.emit(this.currentActive);
        }
    }

}
