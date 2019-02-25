import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
    selector: '[fdScrollSpy]'
})
export class ScrollSpyDirective {

    @Input()
    public trackedTags: string[] = [];

    @Input()
    public fireEmpty: boolean = false;

    @Input()
    public targetPercent: number = 0;

    @Output()
    public spyChange: EventEmitter<any> = new EventEmitter<any>();

    private currentActive: any;

    constructor(private elRef: ElementRef) {}

    @HostListener('scroll', ['$event'])
    onScroll(event: any) {
        let spiedTag: any;
        const children = this.elRef.nativeElement.children;
        const targetScrollTop = event.target.scrollTop;
        const targetOffsetTop = event.target.offsetTop;

        for (let i = 0; i < children.length; i++) {
            const element = children[i];
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
