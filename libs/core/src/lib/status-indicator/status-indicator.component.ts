import {
    Component,
    Input,
    ElementRef,
    OnChanges,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    AfterViewInit,
    ChangeDetectorRef,
    OnInit
} from '@angular/core';
import { applyCssClass, CssClassBuilder } from '@fundamental-ngx/core/utils';
import { Nullable } from '@fundamental-ngx/core/shared';
import { SkeletonConsumerDirective, skeletonConsumerProviders } from '@fundamental-ngx/core/skeleton';

export type StatusIndicatorSize = 'sm' | 'md' | 'lg' | 'xl';
export type StatusIndicatorColor = 'negative' | 'critical' | 'positive';
export type LablePosition = 'left' | 'right' | 'top' | 'bottom';
export type FillingType = 'radial' | 'angled' | 'linearup' | 'lineardown' | 'linearleft';
export type FillingDirection = 'clockwise' | 'counterclockwise';

export class Point {
    constructor(public x: number, public y: number) {}
}

@Component({
    selector: 'fd-status-indicator',
    templateUrl: './status-indicator.component.html',
    styleUrls: ['./status-indicator.component.scss'],
    host: {
        '[attr.aria-label]': 'ariaLabel',
        '[attr.aria-roledescription]': 'ariaRoleDescription',
        '[attr.focusable]': 'focusable',
        '[attr.title]': 'title',
        '[attr.role]': 'role',
        '[attr.aria-valuetext]': 'ariaValueText',
        '[attr.aria-valuenow]': 'fillPercentage ? fillPercentage : 0',
        '[attr.aria-valuemin]': '0',
        '[attr.aria-valuemax]': '100',
        '[attr.tabindex]': 'focusable ? 0 : -1'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: skeletonConsumerProviders({ width: '5rem', height: '2.25rem' })
})
export class StatusIndicatorComponent implements OnChanges, AfterViewInit, CssClassBuilder, OnInit {
    /**
     * value id defines the id of the object.
     */
    @Input()
    id: string;

    /**
     * defines the size of the status indicator.
     * Can be one of the following: 'sm' | 'md' | 'lg' | 'xl'
     * Default size is Medium(md).
     */
    @Input()
    size: StatusIndicatorSize = 'md';

    /**
     * The status represented by the Status Indicator.
     * Can be one of the following: 'negative' | 'critical' | 'informative'
     * For default Object Status omit this property
     */
    @Input()
    status: StatusIndicatorColor;

    /** Define the text content of the Status indicator*/
    @Input()
    statusLabel: string;

    /**
     * positioning of the status indicator image withing the defined height and width .
     */
    @Input()
    viewBox: string;

    /**
     * boolean value to be marked as a clickable
     */
    @Input()
    clickable: boolean;

    /**
     * defines the size of the status indicator.
     * Can be one of the following: 'sm' | 'md' | 'lg' | 'xl'
     */
    @Input()
    labelSize: StatusIndicatorSize = 'sm';

    /** Aria label for the Status Indicator. */
    @Input()
    ariaLabel: Nullable<string>;

    /** Aria defines role description for the Status Indicator. */
    @Input()
    ariaRoleDescription: Nullable<string>;

    /** Aria Focusable for the Status Indicator. */
    @Input()
    focusable: boolean;

    /** Aria Role for the Status Indicator. */
    @Input()
    role: Nullable<string>;

    /** Aria Value Text for the Status Indicator. */
    @Input()
    ariaValueText: Nullable<string>;

    /** Aria title for the status indicator. */
    @Input()
    title: Nullable<string>;

    /** defines the label position the value can be 'left' | 'right' | 'top' | 'bottom' */
    @Input()
    labelPosition: LablePosition;

    @Input()
    path: string[];

    /**
     * Offset value to be filled under the give percentatge value.
     */
    @Input()
    fillPercentage: number;

    /**
     * value to define fill direction
     */
    @Input()
    fillDirection: FillingDirection = 'clockwise';

    get _fillDirection(): FillingDirection {
        return this.fillDirection;
    }

    set _fillDirection(direction: FillingDirection) {
        this.fillDirection = direction;
    }

    /**
     * FillingType to represent the fill pattern of the component
     */
    @Input()
    fillingType: FillingType = 'lineardown';

    /** represent the degree of angle to project the filling of the component */
    @Input()
    angle: number;

    /** @hidden */
    fillCalculator: number;
    /** @hidden */
    binaryString: string;
    /** @hidden */
    x1: string;
    /** @hidden */
    y1: string;
    /** @hidden */
    x2: string;
    /** @hidden */
    y2: string;
    /** @hidden */
    pointsArray: string[] = [];

    /** @hidden */
    constructor(
        private _elementRef: ElementRef<HTMLElement>,
        private _cd: ChangeDetectorRef,
        private readonly _skeletonConsumer: SkeletonConsumerDirective
    ) {
        _skeletonConsumer.consume();
    }

    /** @hidden */
    class: string;

    ngAfterViewInit(): void {
        this._angleCalculation();
        this._cd.detectChanges();
    }

    /** @hidden */
    ngOnChanges(): void {
        this._calculateFilling();
        this.buildComponentCssClass();
    }

    public ngOnInit(): void {
        this.buildComponentCssClass();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string[] {
        return [
            'fd-status-indicator',
            this.size ? `fd-status-indicator--${this.size}` : '',
            this.status ? `fd-status-indicator--${this.status}` : '',
            this.clickable ? `fd-status-indicator--link` : '',
            this.labelPosition === 'right' || this.labelPosition === 'left'
                ? `fd-status-indicator--horizontal-label`
                : '',
            this.class
        ];
    }

    elementRef(): ElementRef<any> {
        return this._elementRef;
    }

    /** @hidden */
    private _calculateFilling(): void {
        if (this.fillPercentage < 0 || this.fillPercentage === undefined) {
            this.fillCalculator = 0;
        } else {
            this.fillCalculator = (this.fillPercentage * this.path.length) / 100;
        }
    }

    /** @hidden */
    private _angleCalculation(): void {
        let sPointsAttributeValue: Array<Point>;
        let polygonPoints: string;
        switch (this.fillingType) {
            case 'angled':
                this.binaryString = this._convertAngleToBinary(this.angle);
                this._assignBinaryValue(this.binaryString);
                break;
            case 'radial': {
                const tempPercent = this.fillCalculator % 1;
                const fillNumber = Number(tempPercent.toFixed(2));
                const element = this._elementRef.nativeElement.querySelectorAll('svg');

                for (let i = 1; i < element.length; i++) {
                    sPointsAttributeValue = this._getPolygonPointsForCircularFilling(
                        fillNumber * 100,
                        element[i].getBBox()
                    );
                    polygonPoints = sPointsAttributeValue.reduce((acc, item) => acc + item.x + ',' + item.y + ' ', '');
                    this.pointsArray.push(polygonPoints);
                }
                break;
            }
            case 'linearup':
                this.binaryString = this._convertAngleToBinary(90);
                this._assignBinaryValue(this.binaryString);
                break;
            case 'lineardown':
                this.binaryString = this._convertAngleToBinary(270);
                this._assignBinaryValue(this.binaryString);
                break;
            case 'linearleft':
                this.binaryString = this._convertAngleToBinary(180);
                this._assignBinaryValue(this.binaryString);
                break;
            default:
                throw new Error(`fdStatusIndicator: No fillType found for ${this.fillingType}.`);
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
        this.x1 = binaryValue[0];
        this.y1 = binaryValue[1];
        this.x2 = binaryValue[2];
        this.y2 = binaryValue[3];
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

            if (this._fillDirection === 'counterclockwise') {
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
