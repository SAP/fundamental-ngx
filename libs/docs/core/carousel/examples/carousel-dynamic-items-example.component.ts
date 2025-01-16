import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    ElementRef,
    OnInit,
    ViewChild
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { CardModule } from '@fundamental-ngx/core/card';
import { CarouselComponent, CarouselItemComponent } from '@fundamental-ngx/core/carousel';
import { ListModule } from '@fundamental-ngx/core/list';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'fd-carousel-dynamic-items-example',
    templateUrl: './carousel-dynamic-items-example.component.html',
    styleUrls: ['./carousel-dynamic-items-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        SegmentedButtonModule,
        FormsModule,
        ButtonComponent,
        CarouselComponent,
        CarouselItemComponent,
        CardModule,
        AvatarComponent,
        ListModule
    ]
})
export class CarouselDynamicItemsExampleComponent implements OnInit, AfterViewInit {
    @ViewChild('carousel')
    elementRef: ElementRef;

    width = '900px';
    visibleSlidesCount = 3;
    cardsHidden = [];

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private readonly _destroyRef: DestroyRef
    ) {}

    ngOnInit(): void {
        fromEvent(window, 'resize')
            .pipe(debounceTime(60), takeUntilDestroyed(this._destroyRef))
            .subscribe(() => this.updateLayout());
    }

    ngAfterViewInit(): void {
        this.updateLayout();
    }

    isHidden(card: string): boolean {
        return this.cardsHidden.some((_card) => _card === card);
    }

    update(): void {
        this._changeDetectorRef.detectChanges();
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
}
