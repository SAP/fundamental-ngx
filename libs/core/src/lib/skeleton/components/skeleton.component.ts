import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input,
    OnChanges,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';

@Component({
    selector: 'fd-skeleton',
    template: `<ng-content></ng-content>`,
    styleUrls: ['skeleton.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonComponent implements OnChanges {
    /** Width of the skeleton. */
    @Input()
    width: string;

    /** Height of the skeleton. */
    @Input()
    height: string;

    /** Whether skeleton should be a circle shape. */
    @Input()
    set circle(value: BooleanInput) {
        this._circle = coerceBooleanProperty(value);
    }
    get circle(): BooleanInput {
        return this._circle;
    }

    /** Whether the skeleton is animated. */
    @Input()
    @HostBinding('class.fd-skeleton--animated')
    animation = true;

    /** @hidden */
    @HostBinding('style.width')
    _width: string;

    /** @hidden */
    @HostBinding('style.height')
    _height: string;

    /** @hidden */
    @HostBinding('class.fd-skeleton--circle')
    _circle = false;

    /** @hidden */
    @HostBinding('class')
    readonly _class = 'fd-skeleton fd-skeleton--component';

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['height']) {
            this._height = this.height;
        }

        if (changes['width']) {
            this._width = this.width;
        }
    }
}
