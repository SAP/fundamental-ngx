import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselConfig, CarouselDirective } from './carousel.directive';
import { CarouselItemDirective } from './carousel-item.directive';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HammerConfig } from './hammer.config';
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

    configuration: CarouselConfig = { vertical: true,  elementsAtOnce: 1 };
}

@Component({
    template: `
        <div #directiveElement class="container-ex" fdCarousel [config]="configuration">
            <div fdCarouselItem value="1" [initialWidth]="30" class="element"></div>
            <div fdCarouselItem value="2" [initialWidth]="30" class="element"></div>
            <div fdCarouselItem value="3" [initialWidth]="30" class="element"></div>
            <div fdCarouselItem value="4" [initialWidth]="30" class="element"></div>
            <div fdCarouselItem value="5" [initialWidth]="30" class="element"></div>
            <div fdCarouselItem value="6" [initialWidth]="30" class="element"></div>
            <div fdCarouselItem value="7" [initialWidth]="30" class="element"></div>
        </div>
    `,
    styles: [
        `
            .element {
                width: 30px;
                min-width: 30px;
                height: 30px;
                align-items: center;
                display: flex;
            }


            .container-wrap {
                overflow: hidden;
                width: 210px;
                min-width: 210px;
            }

            .container-ex {
                display: flex;
                width: 210px;
                min-width: 210px;
            }`
    ]
})
class HorizontalCarouselComponent {
    @ViewChild(CarouselDirective)
    directive: CarouselDirective;

    @ViewChildren(CarouselItemDirective)
    items: QueryList<CarouselItemDirective>;

    configuration: CarouselConfig = { vertical: false, elementsAtOnce: 1 };
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

    it('should put translate on last and first', () => {
        const height: number = verticalComponent.items.first.getHeight();

        verticalDirective.goToItem(verticalComponent.items.toArray()[6], false);
        verticalFixture.detectChanges();

        expect(verticalDirective['_currentTransitionPx']).toBe(-height * 6);

        verticalDirective.goToItem(verticalComponent.items.toArray()[0], false);
        verticalFixture.detectChanges();

        expect(verticalDirective['_currentTransitionPx']).toBe(0);
    });

    it('should handle pan start and move', () => {
        spyOn<any>(verticalDirective.dragStateChange, 'emit').and.callThrough();

        (<any>verticalDirective)._handlePanStart();

        expect(verticalDirective.dragStateChange.emit).toHaveBeenCalledWith(true);

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

        expect(verticalDirective.activeChange.emit).toHaveBeenCalledWith({
            item: verticalDirective.items.toArray()[6],
            after: true
        });
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

    it('horizontal should handle pan start and move', () => {

        spyOn<any>(horizontalDirective.dragStateChange, 'emit').and.callThrough();

        (<any>horizontalDirective)._handlePanStart();

        expect(horizontalDirective.dragStateChange.emit).toHaveBeenCalledWith(true);

        const firstDelta: number = -10;
        (<any>horizontalDirective)._handlePan(firstDelta);

        horizontalFixture.detectChanges();

        expect(horizontalDirective['_currentTransitionPx']).toBe(firstDelta);

        const secondDelta: number = -20;
        (<any>horizontalDirective)._handlePan(secondDelta);

        horizontalFixture.detectChanges();

        expect(horizontalDirective['_currentTransitionPx']).toBe(secondDelta);

        const thirdDelta: number = -120;
        (<any>horizontalDirective)._handlePan(thirdDelta);

        horizontalFixture.detectChanges();

        expect(horizontalDirective['_currentTransitionPx']).toBe(thirdDelta);
        expect((<any>horizontalDirective)._getClosest().value).toBe(horizontalDirective.items.toArray()[4].value);
    });

    it('horizontal should return closest with half', () => {

        horizontalDirective['_currentTransitionPx'] = -160;

        expect((<any>horizontalDirective)._getClosest().value).toBe(horizontalDirective.items.toArray()[5].value);
        horizontalDirective['_currentTransitionPx'] = -170;

        expect((<any>horizontalDirective)._getClosest().value).toBe(horizontalDirective.items.toArray()[6].value);
    });

    it('horizontal should handle get put last/first element when pan after/before list ', () => {

        (<any>horizontalDirective)._handlePanStart();

        (<any>horizontalDirective)._handlePanEnd(-6000);
        horizontalFixture.detectChanges();

        expect(horizontalDirective['_currentTransitionPx']).toBe(-horizontalDirective.items.first.getWidth() * 6);

        (<any>horizontalDirective)._handlePanEnd(1000);
        horizontalFixture.detectChanges();

        expect(horizontalDirective['_currentTransitionPx']).toBe(0);
    });

});
