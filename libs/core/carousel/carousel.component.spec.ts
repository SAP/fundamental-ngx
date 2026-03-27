import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { whenStable } from '@fundamental-ngx/core/tests';
import { CarouselBackgroundOptions, CarouselComponent, PageIndicatorsOrientation } from './carousel.component';
import { CarouselModule } from './carousel.module';

@Component({
    selector: 'fd-test-carousel',
    standalone: true,
    imports: [CarouselModule],
    template: `
        <fd-carousel
            [vertical]="vertical"
            [visibleSlidesCount]="visibleItemsCount"
            [pageIndicatorContainer]="showPageIndicatorContainer"
            [pageIndicator]="showPageIndicator"
            [navigation]="showNavigator"
            [navigatorInPageIndicator]="navigatorInPageIndicator"
            [pageIndicatorsOrientation]="pageIndicatorContainerPlacement"
            [loop]="isCircular"
            [noPaginationContainerBorder]="noPaginationContainerBorder"
            [contentBackground]="contentBackground"
            [pageIndicatorBackground]="pageIndicatorBackground"
        >
            <fd-carousel-item>Item 1 Lorem ipsum dolor sit amet.</fd-carousel-item>
            <fd-carousel-item>Item 2 Lorem ipsum dolor sit amet.</fd-carousel-item>
            <fd-carousel-item>Item 3 Lorem ipsum dolor sit amet.</fd-carousel-item>
            <fd-carousel-item>Item 4 Lorem ipsum dolor sit amet.</fd-carousel-item>
            <fd-carousel-item>Item 5 Lorem ipsum dolor sit amet.</fd-carousel-item>
            <fd-carousel-item>Item 6 Lorem ipsum dolor sit amet.</fd-carousel-item>
            <fd-carousel-item>Item 7 Lorem ipsum dolor sit amet.</fd-carousel-item>
            <fd-carousel-item>Item 8 Lorem ipsum dolor sit amet.</fd-carousel-item>
        </fd-carousel>
    `
})
class TestCarouselComponent {
    @ViewChild(CarouselComponent)
    carousel: CarouselComponent;

    vertical = false;
    visibleItemsCount = 1;
    showPageIndicatorContainer = true;
    showPageIndicator = true;
    showNavigator = true;
    navigatorInPageIndicator = true;
    pageIndicatorContainerPlacement: PageIndicatorsOrientation = 'top';
    isCircular = false;
    noPaginationContainerBorder = false;
    contentBackground: CarouselBackgroundOptions;
    pageIndicatorBackground: CarouselBackgroundOptions;
}

describe('CarouselComponent', () => {
    let component: TestCarouselComponent;
    let fixture: ComponentFixture<TestCarouselComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestCarouselComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestCarouselComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should apply background config', async () => {
        const backgroundOptions: CarouselBackgroundOptions[] = ['solid', 'translucent', 'transparent'];

        // Apply properties in a separate loop to exclude possibility of incorrect property binding.
        backgroundOptions.forEach((option) => {
            component.contentBackground = option;
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('.fd-carousel__content').classList).toContain(
                `fd-carousel__content--${option}`
            );
        });

        backgroundOptions.forEach((option) => {
            component.pageIndicatorBackground = option;
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('.fd-carousel__page-indicator-container').classList).toContain(
                `fd-carousel__page-indicator-container--${option}`
            );
        });
    });

    it('should change icons for vertical carousel', async () => {
        component.vertical = false;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.fd-carousel__content').classList).toContain(
            'fd-carousel__content--horizontal'
        );
        expect(fixture.nativeElement.querySelector('.fd-carousel__button--left')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('.fd-carousel__button--up')).toBeFalsy();
        expect(fixture.nativeElement.querySelector('.fd-carousel__button--right')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('.fd-carousel__button--down')).toBeFalsy();
        expect(
            fixture.nativeElement.querySelector('.fd-carousel__button--left .sap-icon--slim-arrow-left')
        ).toBeTruthy();
        expect(fixture.nativeElement.querySelector('.fd-carousel__button--left .sap-icon--slim-arrow-up')).toBeFalsy();
        expect(
            fixture.nativeElement.querySelector('.fd-carousel__button--right .sap-icon--slim-arrow-right')
        ).toBeTruthy();
        expect(
            fixture.nativeElement.querySelector('.fd-carousel__button--right .sap-icon--slim-arrow-down')
        ).toBeFalsy();

        component.vertical = true;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.fd-carousel__content').classList).not.toContain(
            'fd-carousel__content--horizontal'
        );
        expect(fixture.nativeElement.querySelector('.fd-carousel__button--left')).toBeFalsy();
        expect(fixture.nativeElement.querySelector('.fd-carousel__button--up')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('.fd-carousel__button--right')).toBeFalsy();
        expect(fixture.nativeElement.querySelector('.fd-carousel__button--down')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('.fd-carousel__button--up .sap-icon--slim-arrow-left')).toBeFalsy();
        expect(fixture.nativeElement.querySelector('.fd-carousel__button--up .sap-icon--slim-arrow-up')).toBeTruthy();
        expect(
            fixture.nativeElement.querySelector('.fd-carousel__button--down .sap-icon--slim-arrow-right')
        ).toBeFalsy();
        expect(
            fixture.nativeElement.querySelector('.fd-carousel__button--down .sap-icon--slim-arrow-down')
        ).toBeTruthy();
    });

    it('should have 8 carousel items', async () => {
        await whenStable(fixture);
        expect(component.carousel.slides.length).toEqual(8);
    });

    it('should handle changes to visibleSlidesCount', () => {
        jest.spyOn(component.carousel.slideChange, 'emit');
        component.visibleItemsCount = 2;
        fixture.detectChanges();
        expect(component.carousel.slideChange.emit).toHaveBeenCalled();
    });

    it('should left navigation button be disabled and right navigation button enabled on default carousel', async () => {
        await whenStable(fixture);
        const leftNavigationBtn = fixture.debugElement.query(By.css('.fd-carousel__button--left'));
        const rightNavigationBtn = fixture.debugElement.query(By.css('.fd-carousel__button--right'));

        expect(leftNavigationBtn.nativeElement.disabled).toEqual(true);
        expect(rightNavigationBtn.nativeElement.disabled).toEqual(false);

        // click right button 7 time to reach last item.
        rightNavigationBtn.nativeElement.click();
        await whenStable(fixture);

        expect(leftNavigationBtn.nativeElement.disabled).toEqual(false);
        expect(rightNavigationBtn.nativeElement.disabled).toEqual(false);

        rightNavigationBtn.nativeElement.click();
        rightNavigationBtn.nativeElement.click();
        rightNavigationBtn.nativeElement.click();
        rightNavigationBtn.nativeElement.click();
        rightNavigationBtn.nativeElement.click();
        rightNavigationBtn.nativeElement.click();
        await whenStable(fixture);

        expect(leftNavigationBtn.nativeElement.disabled).toEqual(false);
        expect(rightNavigationBtn.nativeElement.disabled).toEqual(true);
    });

    it('should set first slide visible and others hidden initially', async () => {
        await whenStable(fixture);

        const slides = component.carousel.slides.toArray();
        expect(slides[0].visibility).toBe('visible');
        for (let i = 1; i < slides.length; i++) {
            expect(slides[i].visibility).toBe('hidden');
        }
    });

    it('should set style.visibility on slide host elements', async () => {
        await whenStable(fixture);

        const slideElements = fixture.debugElement.queryAll(By.css('fd-carousel-item'));
        expect(slideElements[0].nativeElement.style.visibility).toBe('visible');
        expect(slideElements[1].nativeElement.style.visibility).toBe('hidden');
    });

    it('should update slide visibility after navigating to next slide', async () => {
        await whenStable(fixture);

        const rightBtn = fixture.debugElement.query(By.css('.fd-carousel__button--right'));
        rightBtn.nativeElement.click();
        await whenStable(fixture);

        const slides = component.carousel.slides.toArray();
        expect(slides[0].visibility).toBe('hidden');
        expect(slides[1].visibility).toBe('visible');
        expect(slides[2].visibility).toBe('hidden');
    });

    it('should update aria-hidden and aria-selected on slides after navigation', async () => {
        await whenStable(fixture);

        const slides = component.carousel.slides.toArray();
        expect(slides[0].ariaHidden()).toBe(false);
        expect(slides[0].ariaSelected()).toBe(true);
        expect(slides[1].ariaHidden()).toBe(true);
        expect(slides[1].ariaSelected()).toBe(false);

        const rightBtn = fixture.debugElement.query(By.css('.fd-carousel__button--right'));
        rightBtn.nativeElement.click();
        await whenStable(fixture);

        expect(slides[0].ariaHidden()).toBe(true);
        expect(slides[0].ariaSelected()).toBe(false);
        expect(slides[1].ariaHidden()).toBe(false);
        expect(slides[1].ariaSelected()).toBe(true);
    });

    it('should update currentActiveSlidesIds after navigation', async () => {
        await whenStable(fixture);

        const slides = component.carousel.slides.toArray();
        expect(component.carousel.currentActiveSlidesIds).toEqual([slides[0].id]);

        const rightBtn = fixture.debugElement.query(By.css('.fd-carousel__button--right'));
        rightBtn.nativeElement.click();
        await whenStable(fixture);

        expect(component.carousel.currentActiveSlidesIds).toEqual([slides[1].id]);
    });

    it('should update ariaActivedescendant after navigation', async () => {
        await whenStable(fixture);

        const slides = component.carousel.slides.toArray();
        expect(component.carousel.ariaActivedescendant).toBe(slides[0].id);

        const rightBtn = fixture.debugElement.query(By.css('.fd-carousel__button--right'));
        rightBtn.nativeElement.click();
        await whenStable(fixture);

        expect(component.carousel.ariaActivedescendant).toBe(slides[1].id);
    });
});

@Component({
    selector: 'fd-test-multiple-active-item-carousel',
    standalone: true,
    imports: [CarouselModule],
    template: `
        <fd-carousel
            [visibleSlidesCount]="visibleItemsCount"
            [pageIndicatorContainer]="showPageIndicatorContainer"
            [pageIndicator]="showPageIndicator"
            [navigation]="showNavigator"
            [navigatorInPageIndicator]="navigatorInPageIndicator"
            [pageIndicatorsOrientation]="pageIndicatorContainerPlacement"
            [loop]="isCircular"
        >
            <fd-carousel-item>Item 1 Lorem ipsum dolor sit amet.</fd-carousel-item>
            <fd-carousel-item>Item 2 Lorem ipsum dolor sit amet.</fd-carousel-item>
            <fd-carousel-item>Item 3 Lorem ipsum dolor sit amet.</fd-carousel-item>
            <fd-carousel-item>Item 4 Lorem ipsum dolor sit amet.</fd-carousel-item>
            <fd-carousel-item>Item 5 Lorem ipsum dolor sit amet.</fd-carousel-item>
            <fd-carousel-item>Item 6 Lorem ipsum dolor sit amet.</fd-carousel-item>
            <fd-carousel-item>Item 7 Lorem ipsum dolor sit amet.</fd-carousel-item>
            <fd-carousel-item>Item 8 Lorem ipsum dolor sit amet.</fd-carousel-item>
        </fd-carousel>
    `
})
class TestCarouselMultipleActiveItemComponent {
    @ViewChild(CarouselComponent)
    carousel: CarouselComponent;

    visibleItemsCount = 2;
    showPageIndicatorContainer = true;
    showPageIndicator = true;
    showNavigator = true;
    navigatorInPageIndicator = true;
    pageIndicatorContainerPlacement: PageIndicatorsOrientation = 'top';
    isCircular = false;
}

describe('CarouselComponent Multiple Active Item', () => {
    let component: TestCarouselMultipleActiveItemComponent;
    let fixture: ComponentFixture<TestCarouselMultipleActiveItemComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestCarouselMultipleActiveItemComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestCarouselMultipleActiveItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have both navigation button enabled', async () => {
        await whenStable(fixture);

        const leftNavigationBtn = fixture.debugElement.query(By.css('.fd-carousel__button--left'));
        const rightNavigationBtn = fixture.debugElement.query(By.css('.fd-carousel__button--right'));

        expect(leftNavigationBtn.nativeElement.disabled).toEqual(true);
        expect(rightNavigationBtn.nativeElement.disabled).toEqual(false);

        rightNavigationBtn.nativeElement.click();
        rightNavigationBtn.nativeElement.click();
        rightNavigationBtn.nativeElement.click();
        rightNavigationBtn.nativeElement.click();

        await whenStable(fixture);
        expect(leftNavigationBtn.nativeElement.disabled).toEqual(false);
        expect(rightNavigationBtn.nativeElement.disabled).toEqual(false);

        rightNavigationBtn.nativeElement.click();
        rightNavigationBtn.nativeElement.click();

        await whenStable(fixture);
        expect(leftNavigationBtn.nativeElement.disabled).toEqual(false);
        expect(rightNavigationBtn.nativeElement.disabled).toEqual(true);

        leftNavigationBtn.nativeElement.click();
        leftNavigationBtn.nativeElement.click();
        leftNavigationBtn.nativeElement.click();
        leftNavigationBtn.nativeElement.click();
        leftNavigationBtn.nativeElement.click();
        leftNavigationBtn.nativeElement.click();

        await whenStable(fixture);
        expect(leftNavigationBtn.nativeElement.disabled).toEqual(true);
        expect(rightNavigationBtn.nativeElement.disabled).toEqual(false);
    });

    it('should make right button disabled on last item active', async () => {
        await whenStable(fixture);

        const leftNavigationBtn = fixture.debugElement.query(By.css('.fd-carousel__button--left'));
        const rightNavigationBtn = fixture.debugElement.query(By.css('.fd-carousel__button--right'));

        expect(leftNavigationBtn.nativeElement.disabled).toEqual(true);
        expect(rightNavigationBtn.nativeElement.disabled).toEqual(false);

        rightNavigationBtn.nativeElement.click();
        rightNavigationBtn.nativeElement.click();
        rightNavigationBtn.nativeElement.click();
        rightNavigationBtn.nativeElement.click();
        rightNavigationBtn.nativeElement.click();
        rightNavigationBtn.nativeElement.click();

        await whenStable(fixture);
        expect(leftNavigationBtn.nativeElement.disabled).toEqual(false);
        expect(rightNavigationBtn.nativeElement.disabled).toEqual(true);
    });

    it('should have left button disabled on first item active', async () => {
        await whenStable(fixture);

        const leftNavigationBtn = fixture.debugElement.query(By.css('.fd-carousel__button--left'));
        const rightNavigationBtn = fixture.debugElement.query(By.css('.fd-carousel__button--right'));

        expect(leftNavigationBtn.nativeElement.disabled).toEqual(true);
        expect(rightNavigationBtn.nativeElement.disabled).toEqual(false);

        rightNavigationBtn.nativeElement.click();
        rightNavigationBtn.nativeElement.click();

        await whenStable(fixture);
        expect(leftNavigationBtn.nativeElement.disabled).toEqual(false);
        expect(rightNavigationBtn.nativeElement.disabled).toEqual(false);
    });

    it('should set first two slides visible and others hidden with visibleSlidesCount=2', async () => {
        await whenStable(fixture);

        const slides = component.carousel.slides.toArray();
        expect(slides[0].visibility).toBe('visible');
        expect(slides[1].visibility).toBe('visible');
        for (let i = 2; i < slides.length; i++) {
            expect(slides[i].visibility).toBe('hidden');
        }
    });

    it('should update visibility range when navigating with multiple visible slides', async () => {
        await whenStable(fixture);

        const rightBtn = fixture.debugElement.query(By.css('.fd-carousel__button--right'));
        rightBtn.nativeElement.click();
        await whenStable(fixture);

        const slides = component.carousel.slides.toArray();
        expect(slides[0].visibility).toBe('hidden');
        expect(slides[1].visibility).toBe('visible');
        expect(slides[2].visibility).toBe('visible');
        expect(slides[3].visibility).toBe('hidden');
    });

    it('should include multiple slide ids in currentActiveSlidesIds', async () => {
        await whenStable(fixture);

        const slides = component.carousel.slides.toArray();
        expect(component.carousel.currentActiveSlidesIds).toEqual([slides[0].id, slides[1].id]);

        const rightBtn = fixture.debugElement.query(By.css('.fd-carousel__button--right'));
        rightBtn.nativeElement.click();
        await whenStable(fixture);

        expect(component.carousel.currentActiveSlidesIds).toEqual([slides[1].id, slides[2].id]);
    });
});

@Component({
    selector: 'fd-test-looping-navigation-carousel',
    imports: [CarouselModule],
    standalone: true,
    template: `
        <fd-carousel
            [visibleSlidesCount]="visibleItemsCount"
            [pageIndicatorContainer]="showPageIndicatorContainer"
            [pageIndicator]="showPageIndicator"
            [navigation]="showNavigator"
            [navigatorInPageIndicator]="navigatorInPageIndicator"
            [pageIndicatorsOrientation]="pageIndicatorContainerPlacement"
            [loop]="isCircular"
        >
            <fd-carousel-item>Item 1 Lorem ipsum dolor sit amet.</fd-carousel-item>
            <fd-carousel-item>Item 2 Lorem ipsum dolor sit amet.</fd-carousel-item>
            <fd-carousel-item>Item 3 Lorem ipsum dolor sit amet.</fd-carousel-item>
            <fd-carousel-item>Item 4 Lorem ipsum dolor sit amet.</fd-carousel-item>
            <fd-carousel-item>Item 5 Lorem ipsum dolor sit amet.</fd-carousel-item>
            <fd-carousel-item>Item 6 Lorem ipsum dolor sit amet.</fd-carousel-item>
            <fd-carousel-item>Item 7 Lorem ipsum dolor sit amet.</fd-carousel-item>
            <fd-carousel-item>Item 8 Lorem ipsum dolor sit amet.</fd-carousel-item>
        </fd-carousel>
    `
})
class TestCarouselLoopingNavigationComponent {
    @ViewChild(CarouselComponent)
    carousel: CarouselComponent;

    visibleItemsCount = 1;
    showPageIndicatorContainer = true;
    showPageIndicator = true;
    showNavigator = true;
    navigatorInPageIndicator = true;
    pageIndicatorContainerPlacement: PageIndicatorsOrientation = 'bottom';
    isCircular = true;
}

describe('CarouselComponent looping navigation', () => {
    let component: TestCarouselLoopingNavigationComponent;
    let fixture: ComponentFixture<TestCarouselLoopingNavigationComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestCarouselLoopingNavigationComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestCarouselLoopingNavigationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have both navigation button enabled', async () => {
        await whenStable(fixture);

        const leftNavigationBtn = fixture.debugElement.query(By.css('.fd-carousel__button--left'));
        const rightNavigationBtn = fixture.debugElement.query(By.css('.fd-carousel__button--right'));

        expect(leftNavigationBtn.nativeElement.disabled).toEqual(false);
        expect(rightNavigationBtn.nativeElement.disabled).toEqual(false);
    });
});
