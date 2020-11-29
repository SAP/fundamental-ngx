import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnInit,
    ViewChild
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'fd-carousel-dynamic-items-example',
    templateUrl: './carousel-dynamic-items-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselDynamicItemsExampleComponent implements OnInit, AfterViewInit {
    @ViewChild('carousel')
    elementRef: ElementRef;

    width = '900px';
    visibleSlidesCount = 3;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();
    card1Visibility = true;
    card2Visibility = true;
    card3Visibility = true;

    constructor(private _changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit(): void {
        fromEvent(window, 'resize')
            .pipe(debounceTime(60), takeUntil(this._onDestroy$))
            .subscribe(() => this.updateLayout());
    }

    ngAfterViewInit(): void {
        this.updateLayout();
    }

    updateLayout(): void {
        const width = this.elementRef.nativeElement?.getBoundingClientRect().width;
        if (width > 0 && width < 600) {
            this.visibleSlidesCount = 1;
            this.width = '300px';
        } else if (width >= 600 && width < 900) {
            this.visibleSlidesCount = 2;
            this.width = '600px';
        } else if (width >= 900) {
            this.visibleSlidesCount = 3;
            this.width = '900px';
        }
        this._changeDetectorRef.detectChanges();
    }

    public showHideCard(card: string): void {
        if (card === 'card1') {
            this.card1Visibility = !this.card1Visibility;
        } else if (card === 'card2') {
            this.card2Visibility = !this.card2Visibility;
        } else if (card === 'card3') {
            this.card3Visibility = !this.card3Visibility;
        }
    }
}
