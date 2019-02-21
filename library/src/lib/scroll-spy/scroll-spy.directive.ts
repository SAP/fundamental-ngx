import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
    selector: '[fdScrollSpy]'
})
export class ScrollSpyDirective {

    @Input()
    public trackedTags: string[] = [];

    @Input()
    public fireEmpty: boolean = false;

    @Output()
    public topSpyChange: EventEmitter<string> = new EventEmitter<string>();

    private currentTop: string;

    constructor(private elRef: ElementRef) {}

    @HostListener('scroll', ['$event'])
    onScroll(event: any) {
        let topSpiedTag: string;
        const children = this.elRef.nativeElement.children;
        const targetScrollTop = event.target.scrollTop;
        const targetOffsetTop = event.target.offsetTop;

        for (let i = 0; i < children.length; i++) {
            const element = children[i];
            if (this.trackedTags.some(tag => tag.toLocaleLowerCase() === element.tagName.toLocaleLowerCase())) {
                if ((element.offsetTop - targetOffsetTop) <= targetScrollTop) {
                    topSpiedTag = element.id;
                }
            }
        }

        if ((topSpiedTag || this.fireEmpty) && topSpiedTag !== this.currentTop) {
            this.currentTop = topSpiedTag;
            this.topSpyChange.emit(this.currentTop);
        }
    }

}
