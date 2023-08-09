import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselDirective } from './carousel.directive';
import { CarouselItemDirective } from './carousel-item.directive';
import { CommonModule } from '@angular/common';
import { CarouselConfig, CarouselService } from './carousel.service';

@Component({
    template: `
        <div fdCarousel [config]="configuration">
            <div fdCarouselItem value="1" style="height: 30px"></div>
            <div fdCarouselItem value="2" style="height: 30px"></div>
            <div fdCarouselItem value="3" style="height: 30px"></div>
            <div fdCarouselItem value="4" style="height: 30px"></div>
            <div fdCarouselItem value="5" style="height: 30px"></div>
            <div fdCarouselItem value="6" style="height: 30px"></div>
            <div fdCarouselItem value="7" style="height: 30px"></div>
        </div>
    `
})
class VerticalCarouselComponent {
    @ViewChild(CarouselDirective)
    directive: CarouselDirective;

    @ViewChildren(CarouselItemDirective)
    items: QueryList<CarouselItemDirective>;

    configuration: CarouselConfig = { vertical: true, elementsAtOnce: 1 };
}

@Component({
    template: `
        <div fdCarousel [config]="configuration">
            <div fdCarouselItem value="1" [initialWidth]="30" class="element"></div>
            <div fdCarouselItem value="2" [initialWidth]="30" class="element"></div>
            <div fdCarouselItem value="3" [initialWidth]="30" class="element"></div>
            <div fdCarouselItem value="4" [initialWidth]="30" class="element"></div>
            <div fdCarouselItem value="5" [initialWidth]="30" class="element"></div>
            <div fdCarouselItem value="6" [initialWidth]="30" class="element"></div>
            <div fdCarouselItem value="7" [initialWidth]="30" class="element"></div>
        </div>
    `
})
class HorizontalCarouselComponent {
    @ViewChild(CarouselDirective)
    directive: CarouselDirective;

    @ViewChildren(CarouselItemDirective)
    items: QueryList<CarouselItemDirective>;

    configuration: CarouselConfig = { vertical: false, elementsAtOnce: 1 };
}

describe('CarouselDirective', () => {
    beforeEach(() => {
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
            imports: [CommonModule, CarouselItemDirective, CarouselDirective],
            declarations: [HorizontalCarouselComponent, VerticalCarouselComponent],
            providers: [CarouselService]
        }).compileComponents();
    });
    describe('Horizontal carousel', () => {
        let horizontalComponent: HorizontalCarouselComponent;
        let horizontalDirective: CarouselDirective;
        let horizontalFixture: ComponentFixture<HorizontalCarouselComponent>;
        beforeEach(async () => {
            horizontalFixture = TestBed.createComponent(HorizontalCarouselComponent);
            horizontalFixture.detectChanges();
            await horizontalFixture.whenRenderingDone();
            horizontalComponent = horizontalFixture.componentInstance;
            horizontalDirective = horizontalComponent.directive;
            horizontalFixture.detectChanges();
            horizontalDirective.items.forEach((item) => {
                jest.spyOn(item.element, 'getBoundingClientRect').mockReturnValue({ width: 30, height: 30 } as DOMRect);
            });
        });

        it('should create', () => {
            expect(horizontalComponent).toBeTruthy();
        });

        it('should handle pan start and move', () => {
            jest.spyOn<any, any>(horizontalDirective.dragStateChange, 'emit');

            (<any>horizontalDirective)._carouselService._handlePanStart();

            expect(horizontalDirective.dragStateChange.emit).toHaveBeenCalledWith(true);

            const firstDelta = -10;
            (<any>horizontalDirective)._carouselService._handlePan(firstDelta);

            horizontalFixture.detectChanges();

            expect(horizontalDirective.carouselService.currentTransitionPx).toBe(firstDelta);

            const secondDelta = -20;
            (<any>horizontalDirective)._carouselService._handlePan(secondDelta);

            horizontalFixture.detectChanges();

            expect(horizontalDirective.carouselService.currentTransitionPx).toBe(secondDelta);

            const thirdDelta = -120;
            (<any>horizontalDirective)._carouselService._handlePan(thirdDelta);

            horizontalFixture.detectChanges();

            expect(horizontalDirective.carouselService.currentTransitionPx).toBe(thirdDelta);
            expect((<any>horizontalDirective)._carouselService._getClosest().value).toBe(
                horizontalDirective.items.toArray()[3].value
            );
        });

        it('should return closest with half', () => {
            horizontalDirective.carouselService.currentTransitionPx = -160;

            expect((<any>horizontalDirective)._carouselService._getClosest().value).toBe(
                horizontalDirective.items.toArray()[5].value
            );
            horizontalDirective.carouselService.currentTransitionPx = -170;

            expect((<any>horizontalDirective)._carouselService._getClosest().value).toBe(
                horizontalDirective.items.toArray()[6].value
            );
        });

        it('should handle get put last/first element when pan after/before list ', () => {
            (<any>horizontalDirective)._carouselService._handlePanStart();

            (<any>horizontalDirective)._carouselService._handlePanEnd(-6000);
            horizontalFixture.detectChanges();

            expect(horizontalDirective.carouselService.currentTransitionPx).toBe(
                -horizontalDirective.items.first.getWidth() * 6
            );

            (<any>horizontalDirective)._carouselService._handlePanEnd(1000);
            horizontalFixture.detectChanges();

            expect(horizontalDirective.carouselService.currentTransitionPx === 0).toBe(true);
        });
    });
    describe('Vertical carousel', () => {
        let verticalComponent: VerticalCarouselComponent;
        let verticalDirective: CarouselDirective;
        let verticalFixture: ComponentFixture<VerticalCarouselComponent>;

        beforeEach(async () => {
            verticalFixture = TestBed.createComponent(VerticalCarouselComponent);
            verticalFixture.detectChanges();
            verticalComponent = verticalFixture.componentInstance;
            verticalDirective = verticalComponent.directive;
            verticalFixture.detectChanges();
            await verticalFixture.whenRenderingDone();
            verticalComponent.directive.items.forEach((item) => {
                jest.spyOn(item.element, 'getBoundingClientRect').mockReturnValue({ width: 30, height: 30 } as DOMRect);
            });
        });

        it('should create', () => {
            expect(verticalComponent).toBeTruthy();
        });

        it('should put translate on vertical', () => {
            const distance: number = verticalComponent.items.first.getHeight() * 4;

            verticalDirective.goToItem(verticalDirective.items.toArray()[4], false);
            verticalFixture.detectChanges();

            expect(verticalDirective.carouselService.currentTransitionPx).toBe(-distance);
        });

        it('should put translate on vertical and be on middle at end', () => {
            const distance: number = verticalComponent.items.first.getHeight() * 4;

            verticalDirective.goToItem(verticalDirective.items.toArray()[4], false);
            verticalFixture.detectChanges();

            expect(verticalDirective.carouselService.currentTransitionPx).toBe(-distance);
        });

        it('should put translate on last and first', () => {
            const height: number = verticalComponent.items.first.getHeight();

            verticalDirective.goToItem(verticalComponent.items.toArray()[6], false);
            verticalFixture.detectChanges();

            expect(verticalDirective.carouselService.currentTransitionPx).toBe(-height * 6);

            verticalDirective.goToItem(verticalComponent.items.toArray()[0], false);
            verticalFixture.detectChanges();

            expect(verticalDirective.carouselService.currentTransitionPx === 0).toBe(true);
        });

        it('should handle pan start and move', () => {
            jest.spyOn<any, any>(verticalDirective.dragStateChange, 'emit');

            (<any>verticalDirective)._carouselService._handlePanStart();

            expect(verticalDirective.dragStateChange.emit).toHaveBeenCalledWith(true);

            const firstDelta = -10;
            (<any>verticalDirective)._carouselService._handlePan(firstDelta);

            verticalFixture.detectChanges();

            expect(verticalDirective.carouselService.currentTransitionPx).toBe(firstDelta);

            const secondDelta = -20;
            (<any>verticalDirective)._carouselService._handlePan(secondDelta);

            verticalFixture.detectChanges();

            expect(verticalDirective.carouselService.currentTransitionPx).toBe(secondDelta);

            const thirdDelta = -120;
            (<any>verticalDirective)._carouselService._handlePan(thirdDelta);

            verticalFixture.detectChanges();

            expect(verticalDirective.carouselService.currentTransitionPx).toBe(thirdDelta);
            expect((<any>verticalDirective)._carouselService._getClosest().value).toBe(
                verticalDirective.items.toArray()[3].value
            );
        });

        it('should handle pan end', () => {
            jest.spyOn(verticalDirective.activeChange, 'emit');

            (<any>verticalDirective)._carouselService._handlePanEnd(-170);
            verticalFixture.detectChanges();

            expect(verticalDirective.activeChange.emit).toHaveBeenCalledWith({
                item: verticalDirective.items.toArray()[6],
                after: true
            });
        });

        it('should return closest with half', () => {
            verticalDirective.carouselService.currentTransitionPx = -160;

            expect((<any>verticalDirective)._carouselService._getClosest().value).toBe(
                verticalDirective.items.toArray()[5].value
            );
            verticalDirective.carouselService.currentTransitionPx = -170;

            expect((<any>verticalDirective)._carouselService._getClosest().value).toBe(
                verticalDirective.items.toArray()[6].value
            );
        });

        it('should handle get put last/first element when pan after/before list ', () => {
            (<any>verticalDirective)._carouselService._handlePanStart();

            (<any>verticalDirective)._carouselService._handlePanEnd(-6000);
            verticalFixture.detectChanges();

            expect(verticalDirective.carouselService.currentTransitionPx).toBe(
                -verticalDirective.items.first.getHeight() * 6
            );

            (<any>verticalDirective)._carouselService._handlePanEnd(1000);
            verticalFixture.detectChanges();

            expect(verticalDirective.carouselService.currentTransitionPx === 0).toBe(true);
        });
    });
});
