import { coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input,
    OnChanges,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';

export type SkeletonType = 'rectangle' | 'circle' | 'text';

let skeletonUniqueId = 0;

@Component({
    selector: 'fd-skeleton',
    templateUrl: './skeleton.component.html',
    styleUrls: ['./skeleton.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonComponent implements OnChanges {
    /** Whether the skeleton is animated. True by default. */
    @Input()
    @HostBinding('class.fd-skeleton--animated')
    animated = true;

    /** Type of the skeleton.
     * Can be one of the following: 'rectangle' | 'circle' | 'text'.
     * Default is not set, allowing to project any SVG elements to define own complex loading template.
     */
    @Input()
    type: SkeletonType;

    /** Number of lines when type is set to `text`. Default is 3. Last one is 60% in width if more than 1 line. */
    @Input()
    set textLines(value: NumberInput) {
        this._textLines = coerceNumberProperty(value);
    }
    get textLines(): number {
        return this._textLines;
    }

    /** Width of skeleton */
    @Input()
    set width(value: string) {
        this._width = value;
    }
    get width(): string {
        return this._width;
    }

    /** Height of skeleton */
    @Input()
    set height(value: string) {
        this._height = value;
    }
    get height(): string {
        return this._height;
    }

    /** @hidden */
    _id = `fd-skeleton-${skeletonUniqueId++}`;

    /** @hidden */
    @HostBinding('class.fd-skeleton')
    readonly _skeletonClass = true;

    /** @hidden */
    @HostBinding('style.width')
    _width: string;

    /** @hidden */
    @HostBinding('style.height')
    _height: string;

    /** @hidden */
    private _textLines = 3;

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['type'] && this.type === 'text') {
            if (!this.width) {
                this.width = '100%';
            }

            if (!this.height) {
                const textLines = this.textLines || 1;
                this.height = textLines > 1 ? 20 * textLines + 'px' : '8px';
            }

            return;
        }

        if (changes['type'] && this.type === 'circle') {
            if (!this.width && this.height) {
                this.width = this.height;
                return;
            }

            if (!this.height && this.width) {
                this.height = this.width;
                return;
            }
        }
    }
}
