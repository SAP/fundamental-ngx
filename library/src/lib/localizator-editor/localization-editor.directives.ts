import { Directive, EmbeddedViewRef, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-localization-editor-input]',
    host: {
        '[class.fd-input--compact]': 'compact'
    }
})
export class LocalizationEditorInputDirective {
    public compact: boolean;
}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-localization-editor-label]',
})
export class LocalizationEditorLabel {}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-localization-editor-load-label]'
})
export class LocalizationEditorLoadLabel implements OnInit {
    @Input('fd-localization-editor-load-label')
    content: TemplateRef<any>;

    private contentRef: EmbeddedViewRef<any>;

    constructor(private viewRef: ViewContainerRef) {}

    ngOnInit(): void {
        this.viewRef.clear();
        this.contentRef = this.viewRef.createEmbeddedView(this.content);
    }
}
