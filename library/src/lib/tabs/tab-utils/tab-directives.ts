import { Directive, EmbeddedViewRef, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-tab-title]'
})
export class TabTitleDirective {
}

@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-tab-load-title]'
})
export class TabLoadTitleDirective implements OnInit {
    @Input('fd-tab-load-title')
    content: TemplateRef<any>;

    private contentRef: EmbeddedViewRef<any>;

    constructor(private viewRef: ViewContainerRef) {}

    ngOnInit(): void {
        this.viewRef.clear();
        this.contentRef = this.viewRef.createEmbeddedView(this.content);
    }
}
