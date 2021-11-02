import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    Renderer2,
    ViewEncapsulation
} from '@angular/core';

export class ObjectAttributeClickedEvent {
    constructor(public source: ObjectAttributeComponent, public payload: any) {}
}

@Component({
    selector: 'fdp-object-attribute',
    templateUrl: './object-attribute.component.html',
    styleUrls: ['./object-attribute.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectAttributeComponent implements OnInit {
    /** label for the element */
    @Input()
    label: string;

    /** Text in link */
    @Input()
    linkText: string;

    /** Is linked object attribute */
    @Input()
    islink: boolean;

    /** To disabled linked object attribute */
    @Input()
    disabled: boolean;

    /** Emitting object attribute link click event */
    @Output()
    objectAttributeclick: EventEmitter<ObjectAttributeClickedEvent> = new EventEmitter();

    /** @hidden */
    constructor(private _el: ElementRef, private _renderer: Renderer2) {}

    /** @hidden */
    ngOnInit(): void {
        this._renderer.addClass(this._el.nativeElement, 'fd-object-attribute');
        if (this.label !== null && this.label !== undefined) {
            this._renderer.setProperty(this._el.nativeElement, 'aria-label', this.label);
            this._renderer.setProperty(this._el.nativeElement, 'title', this.label);
        }
    }

    /**
     *  Handles link click
     */
    onObjectAttributeClick($event: ObjectAttributeClickedEvent): void {
        if (this.islink) {
            this.objectAttributeclick.emit($event);
        }
    }
}
