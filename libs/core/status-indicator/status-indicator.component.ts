import { NgTemplateOutlet } from '@angular/common';
import {
    AfterViewInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    inject,
    input,
    signal,
    ViewEncapsulation
} from '@angular/core';
import { HasElementRef, Nullable } from '@fundamental-ngx/cdk/utils';

export type StatusIndicatorSize = 'sm' | 'md' | 'lg' | 'xl';
export type StatusIndicatorColor = 'negative' | 'critical' | 'positive';
export type LablePosition = 'left' | 'right' | 'top' | 'bottom';
export type FillingType = 'radial' | 'angled' | 'linearup' | 'lineardown' | 'linearleft';
export type FillingDirection = 'clockwise' | 'counterclockwise';

let statusIndicatorId = 0;

export class Point {
    /** @hidden */
    constructor(
        public x: number,
        public y: number
    ) {}
}

@Component({
    selector: 'fd-status-indicator',
    templateUrl: './status-indicator.component.html',
    styleUrl: './status-indicator.component.scss',
    host: {
        '[class]': '_cssClass()',
        '[attr.aria-label]': 'ariaLabel()',
        '[attr.aria-roledescription]': 'ariaRoleDescription()',
        '[attr.focusable]': 'focusable()',
        '[attr.title]': 'title()',
        '[attr.role]': 'role()',
        '[attr.aria-valuetext]': 'ariaValueText()',
        '[attr.aria-valuenow]': 'fillPercentage() || 0',
        '[attr.aria-valuemin]': '0',
        '[attr.aria-valuemax]': '100',
        '[attr.tabindex]': 'focusable() ? 0 : -1'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgTemplateOutlet]
})
export class StatusIndicatorComponent implements AfterViewInit, HasElementRef {
    /**
     * value id defines the id of the object.
     */
    readonly id = input('fd-status-indicator-' + ++statusIndicatorId);

    /**
     * defines the size of the status indicator.
     * Can be one of the following: 'sm' | 'md' | 'lg' | 'xl'
     * Default size is Medium(md).
     */
    readonly size = input<StatusIndicatorSize>('md');

    /**
     * The status represented by the Status Indicator.
     * Can be one of the following: 'negative' | 'critical' | 'informative'
     * For default Object Status omit this property
     */
    readonly status = input<StatusIndicatorColor>();

    /** Define the text content of the Status indicator*/
    readonly statusLabel = input<string>();

    /**
     * positioning of the status indicator image within the defined height and width .
     */
    readonly viewBox = input<string>();

    /**
     * boolean value to be marked as clickable
     */
    readonly clickable = input(false);

    /**
     * defines the size of the status indicator.
     * Can be one of the following: 'sm' | 'md' | 'lg' | 'xl'
     */
    readonly labelSize = input<StatusIndicatorSize>('sm');

    /** Aria label for the Status Indicator. */
    readonly ariaLabel = input<Nullable<string>>();

    /** Aria defines role description for the Status Indicator. */
    readonly ariaRoleDescription = input<Nullable<string>>();

    /** Aria Focusable for the Status Indicator. */
    readonly focusable = input(false, { transform: booleanAttribute });

    /** Aria Role for the Status Indicator. */
    readonly role = input<Nullable<string>>();

    /** Aria Value Text for the Status Indicator. */
    readonly ariaValueText = input<Nullable<string>>();

    /** Aria title for the status indicator. */
    readonly title = input<Nullable<string>>();

    /** defines the label position the value can be 'left' | 'right' | 'top' | 'bottom' */
    readonly labelPosition = input<LablePosition>();

    /** Path for the status indicator */
    readonly path = input<string[]>();

    /**
     * Offset value to be filled under the give percentatge value.
     */
    readonly fillPercentage = input<number>();

    /**
     * value to define fill direction
     */
    readonly fillDirection = input<FillingDirection>('clockwise');

    /**
     * FillingType to represent the fill pattern of the component
     */
    readonly fillingType = input<FillingType>('lineardown');

    /** represent the degree of angle to project the filling of the component */
    readonly angle = input<number>();

    /** @hidden */
    readonly elementRef = inject(ElementRef<HTMLElement>);

    /** @hidden */
    protected readonly binaryString = signal<string>('');
    /** @hidden */
    protected readonly x1 = signal<string>('');
    /** @hidden */
    protected readonly y1 = signal<string>('');
    /** @hidden */
    protected readonly x2 = signal<string>('');
    /** @hidden */
    protected readonly y2 = signal<string>('');
    /** @hidden */
    protected readonly pointsArray = signal<string[]>([]);

    /** @hidden Computed fill calculator based on percentage and path length */
    protected readonly fillCalculator = computed(() => {
        const percentage = this.fillPercentage();
        const pathLength = this.path()?.length || 0;

        if (percentage === undefined || percentage < 0) {
            return 0;
        }
        return (percentage * pathLength) / 100;
    });

    /** @hidden Computed CSS class */
    protected readonly _cssClass = computed(() =>
        [
            'fd-status-indicator',
            this.size() ? `fd-status-indicator--${this.size()}` : '',
            this.status() ? `fd-status-indicator--${this.status()}` : '',
            this.clickable() ? 'fd-status-indicator--link' : '',
            this.labelPosition() === 'right' || this.labelPosition() === 'left'
                ? 'fd-status-indicator--horizontal-label'
                : ''
        ]
            .filter(Boolean)
            .join(' ')
    );

    protected readonly _labelCssClass = computed(() =>
        [
            'fd-status-indicator__label',
            this.labelSize() ? `fd-status-indicator__label--${this.labelSize()}` : '',
            this.labelPosition() ? `fd-status-indicator__label--${this.labelPosition()}` : ''
        ]
            .filter(Boolean)
            .join(' ')
    );

    /** @hidden */
    ngAfterViewInit(): void {
        this._angleCalculation();
    }

    /** @hidden */
    private _angleCalculation(): void {
        let sPointsAttributeValue: Array<Point>;
        let polygonPoints: string;
        const fillType = this.fillingType();

        switch (fillType) {
            case 'angled': {
                const angleValue = this.angle();
                if (angleValue !== undefined) {
                    const binaryStr = this._convertAngleToBinary(angleValue);
                    this.binaryString.set(binaryStr);
                    this._assignBinaryValue(binaryStr);
                }
                break;
            }
            case 'radial': {
                const tempPercent = this.fillCalculator() % 1;
                const fillNumber = Number(tempPercent.toFixed(2));
                const element = this.elementRef.nativeElement.querySelectorAll('svg');
                const points: string[] = [];

                for (let i = 1; i < element.length; i++) {
                    sPointsAttributeValue = this._getPolygonPointsForCircularFilling(
                        fillNumber * 100,
                        element[i].getBBox()
                    );
                    polygonPoints = sPointsAttributeValue.reduce((acc, item) => acc + item.x + ',' + item.y + ' ', '');
                    points.push(polygonPoints);
                }
                this.pointsArray.set(points);
                break;
            }
            case 'linearup': {
                const binaryStr = this._convertAngleToBinary(90);
                this.binaryString.set(binaryStr);
                this._assignBinaryValue(binaryStr);
                break;
            }
            case 'lineardown': {
                const binaryStr = this._convertAngleToBinary(270);
                this.binaryString.set(binaryStr);
                this._assignBinaryValue(binaryStr);
                break;
            }
            case 'linearleft': {
                const binaryStr = this._convertAngleToBinary(180);
                this.binaryString.set(binaryStr);
                this._assignBinaryValue(binaryStr);
                break;
            }
            default:
                throw new Error(`fdStatusIndicator: No fillType found for ${fillType}.`);
        }
    }

    /** @hidden */
    private _convertAngleToBinary(angle: number): string {
        if (angle > 0 && angle <= 45) {
            return '1,0,0,1';
        } else if (angle >= 45 && angle < 90) {
            return '0,0,0,1';
        } else if (angle >= 90 && angle < 135) {
            return '0,0,0,1';
        } else if (angle >= 135 && angle < 180) {
            return '0,0,1,1';
        } else if (angle >= 180 && angle < 225) {
            return '0,0,1,0';
        } else if (angle >= 225 && angle < 270) {
            return '0,1,1,0';
        } else if (angle >= 270 && angle < 315) {
            return '0,1,0,0';
        } else if (angle >= 315 && angle < 360) {
            return '1,1,0,0';
        } else if (angle === 0 || angle === 360) {
            return '1,0,0,0';
        } else {
            return 'invalid';
        }
    }

    /** @hidden */
    private _assignBinaryValue(binaryString: string): void {
        const binaryValue = binaryString.split(',');
        this.x1.set(binaryValue[0]);
        this.y1.set(binaryValue[1]);
        this.x2.set(binaryValue[2]);
        this.y2.set(binaryValue[3]);
    }

    /** @hidden */
    private _getPolygonPointsForCircularFilling(value: number, boundingBoxSvg: DOMRect): Array<Point> {
        const angle = 3.6 * value;
        const points: Point[] = [];
        let xDifferenceFromBoundaryCentre: number;
        let yDifferenceFromBoundaryCentre: number;
        let polygonPoint: Point;

        // starts at 12, the algorithm computes the coordination for clockwise direction only
        // counter clockwise direction is managed by symmetry
        const oStartPoint = new Point(boundingBoxSvg.x + boundingBoxSvg.width / 2, boundingBoxSvg.y);
        const oCentrePoint = new Point(
            boundingBoxSvg.x + boundingBoxSvg.width / 2,
            boundingBoxSvg.y + boundingBoxSvg.height / 2
        );

        // Reflects x coordinate by centre point for Counter Clockwise type
        const _adjustIfCounterClockwise = (oPoint: Point): Point => {
            const res = Object.assign({}, oPoint);

            if (this.fillDirection() === 'counterclockwise') {
                const iXDistanceFromCentre = oPoint.x - oCentrePoint.x;
                res.x = oCentrePoint.x - iXDistanceFromCentre;
            }

            return res;
        };

        // Boundary centre is given by angle distance from the beginning (0°). The returned difference is related
        // to x or y coordinate depending on boundary centre angle (e.g. 0° -> x, 90° -> y, 180° -> x  270° -> y).
        // Boundary length is length of the corresponding side of bounding box (width for x, height for y).
        const computeDifferenceFromBoundaryCentre = (
            inAngle: number,
            iBoundaryCentreAngle: number,
            iBoundaryLength: number
        ): number => {
            const tan = Math.tan(((iBoundaryCentreAngle - inAngle) * Math.PI) / 180);

            return (tan * iBoundaryLength) / 2;
        };

        points.push(oStartPoint);

        if (0 < angle && angle < 45) {
            xDifferenceFromBoundaryCentre = computeDifferenceFromBoundaryCentre(angle, 0, boundingBoxSvg.height);
            polygonPoint = new Point(oStartPoint.x - xDifferenceFromBoundaryCentre, oStartPoint.y);
            points.push(_adjustIfCounterClockwise(polygonPoint));
        }

        if (45 <= angle) {
            points.push(
                _adjustIfCounterClockwise(new Point(boundingBoxSvg.x + boundingBoxSvg.width, boundingBoxSvg.y))
            );
        }

        if (45 < angle && angle < 135) {
            yDifferenceFromBoundaryCentre = computeDifferenceFromBoundaryCentre(angle, 90, boundingBoxSvg.width);
            polygonPoint = new Point(
                boundingBoxSvg.x + boundingBoxSvg.width,
                boundingBoxSvg.y + boundingBoxSvg.height / 2 - yDifferenceFromBoundaryCentre
            );
            points.push(_adjustIfCounterClockwise(polygonPoint));
        }

        if (135 <= angle) {
            points.push(
                _adjustIfCounterClockwise(
                    new Point(boundingBoxSvg.x + boundingBoxSvg.width, boundingBoxSvg.y + boundingBoxSvg.height)
                )
            );
        }

        if (135 < angle && angle < 225) {
            xDifferenceFromBoundaryCentre = computeDifferenceFromBoundaryCentre(angle, 180, boundingBoxSvg.height);
            polygonPoint = new Point(
                boundingBoxSvg.x + boundingBoxSvg.width / 2 + xDifferenceFromBoundaryCentre,
                boundingBoxSvg.y + boundingBoxSvg.height
            );
            points.push(_adjustIfCounterClockwise(polygonPoint));
        }

        if (225 <= angle) {
            points.push(
                _adjustIfCounterClockwise(new Point(boundingBoxSvg.x, boundingBoxSvg.y + boundingBoxSvg.height))
            );
        }

        if (225 < angle && angle < 315) {
            yDifferenceFromBoundaryCentre = computeDifferenceFromBoundaryCentre(angle, 270, boundingBoxSvg.width);
            polygonPoint = new Point(
                boundingBoxSvg.x,
                boundingBoxSvg.y + boundingBoxSvg.height / 2 + yDifferenceFromBoundaryCentre
            );
            points.push(_adjustIfCounterClockwise(polygonPoint));
        }

        if (315 <= angle) {
            points.push(_adjustIfCounterClockwise(new Point(boundingBoxSvg.x, boundingBoxSvg.y)));
        }

        if (315 < angle && angle <= 360) {
            xDifferenceFromBoundaryCentre = computeDifferenceFromBoundaryCentre(angle, 360, boundingBoxSvg.height);
            polygonPoint = new Point(
                boundingBoxSvg.x + boundingBoxSvg.width / 2 - xDifferenceFromBoundaryCentre,
                boundingBoxSvg.y
            );
            points.push(_adjustIfCounterClockwise(polygonPoint));
        }

        points.push(oCentrePoint);

        return points;
    }
}
