import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

export type SkeletonType = 'circle' | 'rectangle' | 'text';
export type SkeletonWidth = 'rand' | string;
export type SkeletonHeight = 'auto' | string;

@Component({
    selector: 'fd-skeleton',
    template: ``,
    styleUrls: ['skeleton.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
    host: {
        class: 'fd-skeleton'
    }
})
export class SkeletonComponent {
    /** Wight of the skeleton */
    @Input()
    set width(value: SkeletonWidth) {
        if (value === 'rand') {
            this._width = getRandomWidth();
        }

        this._width = value === 'rand' ? getRandomWidth() : value;
    }

    /** Height of the skeleton. Relevant if type 'circle' or 'rectangle'. */
    @Input()
    height: SkeletonHeight;

    /** Type of the skeleton. When set to 'text' height is automatically calculated. */
    @Input()
    type: SkeletonType = 'rectangle';

    /** Whether the skeleton has animation. */
    @Input()
    @HostBinding('class.fd-skeleton--animated')
    animation = true;

    /** @hidden */
    @HostBinding('style.width')
    _width = getRandomWidth();

    /** @hidden */
    @HostBinding('style.height')
    get _height(): string {
        return this.type === 'text' ? 'auto' : this.height;
    }

    /** @hidden */
    @HostBinding('class.fd-skeleton--text')
    get _textClass(): boolean {
        return this.type === 'text';
    }

    /** @hidden */
    @HostBinding('class.fd-skeleton--circle')
    get _circleClass(): boolean {
        return this.type === 'circle';
    }
}

function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomWidth(): string {
    return `${getRandomNumber(30, 90)}%`;
}
