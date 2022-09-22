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
import { SkeletonConsumerDirective, skeletonConsumerProviders } from '@fundamental-ngx/core/skeleton';

@Component({
    selector: 'fdp-object-attribute',
    templateUrl: './object-attribute.component.html',
    styleUrls: ['./object-attribute.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: skeletonConsumerProviders({ width: '5rem', height: '1.25rem' })
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
    objectAttributeclick = new EventEmitter<Event>();

    /** @hidden */
    constructor(
        private _el: ElementRef,
        private _renderer: Renderer2,
        private readonly _skeletonConsumer: SkeletonConsumerDirective
    ) {
        _skeletonConsumer.consume();
    }

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
    onObjectAttributeClick(event: Event): void {
        if (this.islink) {
            this.objectAttributeclick.emit(event);
        }
    }
}
