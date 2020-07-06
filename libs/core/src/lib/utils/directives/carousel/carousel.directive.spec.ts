import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselConfig, CarouselDirective } from './carousel.directive';
import { CarouselItemDirective } from './carousel-item.directive';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HammerConfig } from './carousel.module';
import { CommonModule } from '@angular/common';


@Component({
    template: `
        <div #directiveElement fdCarousel [config]="configuration">
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

    configuration: CarouselConfig = { vertical: true };
}

@Component({
    template: `
        <div #directiveElement fdCarousel [config]="configuration">
            <div fdCarouselItem value="1" style="width: 30px"></div>
            <div fdCarouselItem value="2" style="width: 30px"></div>
            <div fdCarouselItem value="3" style="width: 30px"></div>
            <div fdCarouselItem value="4" style="width: 30px"></div>
            <div fdCarouselItem value="5" style="width: 30px"></div>
            <div fdCarouselItem value="6" style="width: 30px"></div>
            <div fdCarouselItem value="7" style="width: 30px"></div>
        </div>
    `
})
class HorizontalCarouselComponent {
    @ViewChild(CarouselDirective)
    directive: CarouselDirective;

    @ViewChildren(CarouselItemDirective)
    items: QueryList<CarouselItemDirective>;

    configuration: CarouselConfig = {};
}

describe('CarouselDirective', () => {
    let horizontalComponent: HorizontalCarouselComponent;
    let verticalComponent: VerticalCarouselComponent;
    let horizontalDirective: CarouselDirective;
    let verticalDirective: CarouselDirective;
    let verticalFixture: ComponentFixture<VerticalCarouselComponent>;
    let horizontalFixture: ComponentFixture<HorizontalCarouselComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [HorizontalCarouselComponent, VerticalCarouselComponent, CarouselItemDirective, CarouselDirective],
            providers: [ {
                provide: HAMMER_GESTURE_CONFIG,
                useClass: HammerConfig
            }]
        }).compileComponents();
    }));

    beforeEach(() => {
        horizontalFixture = TestBed.createComponent(HorizontalCarouselComponent);
        verticalFixture = TestBed.createComponent(VerticalCarouselComponent);
        horizontalFixture.detectChanges();
        verticalFixture.detectChanges();
        horizontalComponent = horizontalFixture.componentInstance;
        verticalComponent = verticalFixture.componentInstance;
        horizontalDirective = horizontalComponent.directive;
        verticalDirective = verticalComponent.directive;
        horizontalFixture.detectChanges();
        verticalFixture.detectChanges();
    });

    it('should create', () => {
        expect(verticalComponent).toBeTruthy();
        expect(horizontalComponent).toBeTruthy();
    });

    it('should put translate on vertical', () => {
        const distance: number = verticalComponent.items.first.getHeight() * 4;

        verticalDirective.goToItem(verticalDirective.items.toArray()[4], false);
        verticalFixture.detectChanges();

        expect(verticalDirective['_currentTransitionPx']).toBe(-distance);
    });

    it('should put translate on vertical and be on middle at end', () => {
        const distance: number = verticalComponent.items.first.getHeight() * 4;

        verticalDirective.goToItem(verticalDirective.items.toArray()[4], false);
        verticalFixture.detectChanges();

        expect(verticalDirective['_currentTransitionPx']).toBe(-distance);
    });

    it('should center, when scrolled', () => {
        const distanceCenter: number = verticalComponent.items.first.getHeight() * 4;

        verticalDirective.config.infinite = true;

        verticalDirective.goToItem(verticalComponent.items.toArray()[6], false);
        verticalFixture.detectChanges();
        verticalFixture.detectChanges();

        expect(verticalDirective['_currentTransitionPx']).toBe(-distanceCenter);

        verticalDirective.goToItem(verticalComponent.items.toArray()[0], false);
        verticalFixture.detectChanges();
        verticalFixture.detectChanges();

        expect(verticalDirective['_currentTransitionPx']).toBe(-distanceCenter);
    });

    it('should handle pan start and move', () => {
        spyOn<any>(verticalDirective.dragged, 'emit').and.callThrough();

        (<any>verticalDirective)._handlePanStart();

        expect(verticalDirective.dragged.emit).toHaveBeenCalledWith(true);

        const firstDelta: number = -10;
        (<any>verticalDirective)._handlePan(firstDelta);

        verticalFixture.detectChanges();

        expect(verticalDirective['_currentTransitionPx']).toBe(firstDelta);

        const secondDelta: number = -20;
        (<any>verticalDirective)._handlePan(secondDelta);

        verticalFixture.detectChanges();

        expect(verticalDirective['_currentTransitionPx']).toBe(secondDelta);

        const thirdDelta: number = -120;
        (<any>verticalDirective)._handlePan(thirdDelta);

        verticalFixture.detectChanges();

        expect(verticalDirective['_currentTransitionPx']).toBe(thirdDelta);
        expect((<any>verticalDirective)._getClosest().value).toBe(verticalDirective.items.toArray()[4].value);
    });

    it('should handle pan end', () => {
        spyOn(verticalDirective.activeChange, 'emit');

        (<any>verticalDirective)._handlePanEnd(-170);
        verticalFixture.detectChanges();

        expect(verticalDirective.activeChange.emit).toHaveBeenCalledWith(verticalDirective.items.toArray()[6]);
    });

    it('should return closest with half', () => {
        verticalDirective['_currentTransitionPx'] = -160;

        expect((<any>verticalDirective)._getClosest().value).toBe(verticalDirective.items.toArray()[5].value);
        verticalDirective['_currentTransitionPx'] = -170;

        expect((<any>verticalDirective)._getClosest().value).toBe(verticalDirective.items.toArray()[6].value);
    });

    it('should handle get put last/first element when pan after/before list ', () => {
        (<any>verticalDirective)._handlePanStart();

        (<any>verticalDirective)._handlePanEnd(-6000);
        verticalFixture.detectChanges();

        expect(verticalDirective['_currentTransitionPx']).toBe(-verticalDirective.items.first.getHeight() * 6);

        (<any>verticalDirective)._handlePanEnd(1000);
        verticalFixture.detectChanges();

        expect(verticalDirective['_currentTransitionPx']).toBe(0);
    });
});
