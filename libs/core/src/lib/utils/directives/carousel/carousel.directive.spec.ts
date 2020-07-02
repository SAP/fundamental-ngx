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
            <div fdCarouselItem style="height: 30px"></div>
            <div fdCarouselItem style="height: 30px"></div>
            <div fdCarouselItem style="height: 30px"></div>
            <div fdCarouselItem style="height: 30px"></div>
            <div fdCarouselItem style="height: 30px"></div>
            <div fdCarouselItem style="height: 30px"></div>
            <div fdCarouselItem style="height: 30px"></div>
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
            <div fdCarouselItem style="width: 30px"></div>
            <div fdCarouselItem style="width: 30px"></div>
            <div fdCarouselItem style="width: 30px"></div>
            <div fdCarouselItem style="width: 30px"></div>
            <div fdCarouselItem style="width: 30px"></div>
            <div fdCarouselItem style="width: 30px"></div>
            <div fdCarouselItem style="width: 30px"></div>
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

fdescribe('CarouselDirective', () => {
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
        verticalDirective.config.offset = 0;

        const distance: number = verticalComponent.items.first.getHeight() * 4;

        verticalDirective.goToItem(verticalDirective.items.toArray()[4], false);
        verticalFixture.detectChanges();

        expect(verticalDirective['_currentTransitionPx']).toBe(-distance);
    });

    it('should put translate on vertical with offset', () => {
        verticalDirective.config.offset = 3;

        const distance: number = verticalComponent.items.first.getHeight() * (4 - 3);

        verticalDirective.goToItem(verticalDirective.items.toArray()[4], false);
        verticalFixture.detectChanges();

        expect(verticalDirective['_currentTransitionPx']).toBe(-distance);
    });

    it('should put some elements down/up, when scrolled', () => {
        verticalDirective.config.offset = 0;
        verticalDirective.config.infinite = true;

        spyOn<any>(verticalDirective, '_placeOnBottom');
        spyOn<any>(verticalDirective, '_placeOnTop');

        verticalDirective.goToItem(verticalComponent.items.toArray()[6], false);
        verticalFixture.detectChanges();

        expect(verticalDirective['_placeOnBottom']).toHaveBeenCalled();

        verticalDirective.goToItem(verticalComponent.items.toArray()[0], false);
        verticalFixture.detectChanges();

        expect(verticalDirective['_placeOnTop']).toHaveBeenCalled();
    });

    it('should handle pan start, move and end ', () => {
        verticalDirective.config.offset = 0;

        spyOn<any>(verticalDirective.dragged, 'emit').and.callThrough();

        (<any>verticalDirective)._handlePanStart();

        expect(verticalDirective.dragged.emit).toHaveBeenCalledWith(true);

        const firstDelta: number = 10;
        (<any>verticalDirective)._handlePan(firstDelta);

        verticalFixture.detectChanges();

        expect(verticalDirective['_currentTransitionPx']).toBe(firstDelta);

        const secondDelta: number = 20;
        (<any>verticalDirective)._handlePan(secondDelta);

        verticalFixture.detectChanges();

        expect(verticalDirective['_currentTransitionPx']).toBe(secondDelta);

        const thirdDelta: number = 120;
        (<any>verticalDirective)._handlePan(thirdDelta);

        verticalFixture.detectChanges();

        expect(verticalDirective['_currentTransitionPx']).toBe(thirdDelta);

        expect((<any>verticalDirective)._getClosest()).toBe(verticalDirective.items.toArray()[4]);

        // Should Return fifth, because it's pre half
        (<any>verticalDirective)._handlePan(160);

        verticalFixture.detectChanges();

        expect(verticalDirective['_currentTransitionPx']).toBe(160);

        expect((<any>verticalDirective)._getClosest()).toBe(verticalDirective.items.toArray()[4]);

        // Should Return sixth, because it's after half
        (<any>verticalDirective)._handlePan(170);

        verticalFixture.detectChanges();

        expect(verticalDirective['_currentTransitionPx']).toBe(170);

        expect((<any>verticalDirective)._getClosest()).toBe(verticalDirective.items.toArray()[5]);

        (<any>verticalDirective)._handlePanEnd(170);

        verticalFixture.detectChanges();

        expect(verticalDirective.dragged.emit).toHaveBeenCalledWith(false);

        // Should be aligned to 6th element
        expect(verticalDirective['_currentTransitionPx']).toBe(verticalDirective.items.first.getHeight() * 5);
    });

    it('should handle get put last/first element when pan after/before list ', () => {
        verticalDirective.config.offset = 0;

        (<any>verticalDirective)._handlePanStart();

        (<any>verticalDirective)._handlePanEnd(6000);
        verticalFixture.detectChanges();

        expect(verticalDirective['_currentTransitionPx']).toBe(verticalDirective.items.first.getHeight() * 6);

        (<any>verticalDirective)._handlePanEnd(0);
        verticalFixture.detectChanges();

        expect(verticalDirective['_currentTransitionPx']).toBe(0);
    });
});
