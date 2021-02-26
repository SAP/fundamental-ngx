import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { whenStable } from './../utils/tests/when-stable';
import { CarouselModule } from '../utils/directives/carousel/carousel.module';
import { CarouselComponent } from './carousel.component';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';
import { ButtonModule } from '../button/button.module';

@Component({
    selector: 'fd-test-carousel',
    template: `
        <fd-carousel
            [visibleSlidesCount]="visibleItemsCount"
            [pageIndicatorContainer]="showPageIndicatorContainer"
            [pageIndicator]="showPageIndicator"
            [navigation]="showNavigator"
            [navigatorInPageIndicator]="navigatorInPageIndicator"
            [carouselIndicatorsOrientation]="pageIndicatorContainerPlacement"
            [loop]="isCircular"
        >
            <fd-carousel-item>
                Item 1 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus facilis doloribus repellendus
                quia consequuntur distinctio nobis unde omnis laboriosam. Saepe voluptatum laborum dicta, dignissimos
                quo voluptate consequuntur quidem maiores vitae assumenda iure magnam natus quae ea repudiandae nihil
                tempore ratione, rem accusantium quibusdam culpa deleniti reprehenderit. Consequatur autem sed nesciunt
                hic ex blanditiis quidem, tempore reprehenderit dolorum. Praesentium ipsa cum perspiciatis voluptatem,
                aliquam error soluta exercitationem ullam saepe eum, amet illo beatae qui nobis est nemo, libero
                cupiditate consequatur omnis hic voluptatum odit quia at fugiat. Sint minus enim, ipsum necessitatibus
                quos alias perspiciatis architecto similique veniam pariatur commodi amet.
            </fd-carousel-item>

            <fd-carousel-item>
                Item 2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus facilis doloribus repellendus
                quia consequuntur distinctio nobis unde omnis laboriosam. Saepe voluptatum laborum dicta, dignissimos
                quo voluptate consequuntur quidem maiores vitae assumenda iure magnam natus quae ea repudiandae nihil
                tempore ratione, rem accusantium quibusdam culpa deleniti reprehenderit. Consequatur autem sed nesciunt
                hic ex blanditiis quidem, tempore reprehenderit dolorum. Praesentium ipsa cum perspiciatis voluptatem,
                aliquam error soluta exercitationem ullam saepe eum, amet illo beatae qui nobis est nemo, libero
                cupiditate consequatur omnis hic voluptatum odit quia at fugiat. Sint minus enim, ipsum necessitatibus
                quos alias perspiciatis architecto similique veniam pariatur commodi amet.
            </fd-carousel-item>

            <fd-carousel-item>
                Item 3 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus facilis doloribus repellendus
                quia consequuntur distinctio nobis unde omnis laboriosam. Saepe voluptatum laborum dicta, dignissimos
                quo voluptate consequuntur quidem maiores vitae assumenda iure magnam natus quae ea repudiandae nihil
                tempore ratione, rem accusantium quibusdam culpa deleniti reprehenderit. Consequatur autem sed nesciunt
                hic ex blanditiis quidem, tempore reprehenderit dolorum. Praesentium ipsa cum perspiciatis voluptatem,
                aliquam error soluta exercitationem ullam saepe eum, amet illo beatae qui nobis est nemo, libero
                cupiditate consequatur omnis hic voluptatum odit quia at fugiat. Sint minus enim, ipsum necessitatibus
                quos alias perspiciatis architecto similique veniam pariatur commodi amet.
            </fd-carousel-item>

            <fd-carousel-item>
                Item 4 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus facilis doloribus repellendus
                quia consequuntur distinctio nobis unde omnis laboriosam. Saepe voluptatum laborum dicta, dignissimos
                quo voluptate consequuntur quidem maiores vitae assumenda iure magnam natus quae ea repudiandae nihil
                tempore ratione, rem accusantium quibusdam culpa deleniti reprehenderit. Consequatur autem sed nesciunt
                hic ex blanditiis quidem, tempore reprehenderit dolorum. Praesentium ipsa cum perspiciatis voluptatem,
                aliquam error soluta exercitationem ullam saepe eum, amet illo beatae qui nobis est nemo, libero
                cupiditate consequatur omnis hic voluptatum odit quia at fugiat. Sint minus enim, ipsum necessitatibus
                quos alias perspiciatis architecto similique veniam pariatur commodi amet.
            </fd-carousel-item>

            <fd-carousel-item>
                Item 5 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus facilis doloribus repellendus
                quia consequuntur distinctio nobis unde omnis laboriosam. Saepe voluptatum laborum dicta, dignissimos
                quo voluptate consequuntur quidem maiores vitae assumenda iure magnam natus quae ea repudiandae nihil
                tempore ratione, rem accusantium quibusdam culpa deleniti reprehenderit. Consequatur autem sed nesciunt
                hic ex blanditiis quidem, tempore reprehenderit dolorum. Praesentium ipsa cum perspiciatis voluptatem,
                aliquam error soluta exercitationem ullam saepe eum, amet illo beatae qui nobis est nemo, libero
                cupiditate consequatur omnis hic voluptatum odit quia at fugiat. Sint minus enim, ipsum necessitatibus
                quos alias perspiciatis architecto similique veniam pariatur commodi amet.
            </fd-carousel-item>

            <fd-carousel-item>
                Item 6 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus facilis doloribus repellendus
                quia consequuntur distinctio nobis unde omnis laboriosam. Saepe voluptatum laborum dicta, dignissimos
                quo voluptate consequuntur quidem maiores vitae assumenda iure magnam natus quae ea repudiandae nihil
                tempore ratione, rem accusantium quibusdam culpa deleniti reprehenderit. Consequatur autem sed nesciunt
                hic ex blanditiis quidem, tempore reprehenderit dolorum. Praesentium ipsa cum perspiciatis voluptatem,
                aliquam error soluta exercitationem ullam saepe eum, amet illo beatae qui nobis est nemo, libero
                cupiditate consequatur omnis hic voluptatum odit quia at fugiat. Sint minus enim, ipsum necessitatibus
                quos alias perspiciatis architecto similique veniam pariatur commodi amet.
            </fd-carousel-item>

            <fd-carousel-item>
                Item 7 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus facilis doloribus repellendus
                quia consequuntur distinctio nobis unde omnis laboriosam. Saepe voluptatum laborum dicta, dignissimos
                quo voluptate consequuntur quidem maiores vitae assumenda iure magnam natus quae ea repudiandae nihil
                tempore ratione, rem accusantium quibusdam culpa deleniti reprehenderit. Consequatur autem sed nesciunt
                hic ex blanditiis quidem, tempore reprehenderit dolorum. Praesentium ipsa cum perspiciatis voluptatem,
                aliquam error soluta exercitationem ullam saepe eum, amet illo beatae qui nobis est nemo, libero
                cupiditate consequatur omnis hic voluptatum odit quia at fugiat. Sint minus enim, ipsum necessitatibus
                quos alias perspiciatis architecto similique veniam pariatur commodi amet.
            </fd-carousel-item>

            <fd-carousel-item>
                Item 8 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus facilis doloribus repellendus
                quia consequuntur distinctio nobis unde omnis laboriosam. Saepe voluptatum laborum dicta, dignissimos
                quo voluptate consequuntur quidem maiores vitae assumenda iure magnam natus quae ea repudiandae nihil
                tempore ratione, rem accusantium quibusdam culpa deleniti reprehenderit. Consequatur autem sed nesciunt
                hic ex blanditiis quidem, tempore reprehenderit dolorum. Praesentium ipsa cum perspiciatis voluptatem,
                aliquam error soluta exercitationem ullam saepe eum, amet illo beatae qui nobis est nemo, libero
                cupiditate consequatur omnis hic voluptatum odit quia at fugiat. Sint minus enim, ipsum necessitatibus
                quos alias perspiciatis architecto similique veniam pariatur commodi amet.
            </fd-carousel-item>
        </fd-carousel>
    `
})
class TestCarouselComponent {
    @ViewChild(CarouselComponent)
    carousel: CarouselComponent;

    visibleItemsCount = 1;
    showPageIndicatorContainer = true;
    showPageIndicator = true;
    showNavigator = true;
    navigatorInPageIndicator = true;
    pageIndicatorContainerPlacement = 'top';
    isCircular = false;
}

describe('CarouselComponent', () => {
    let component: TestCarouselComponent;
    let fixture: ComponentFixture<TestCarouselComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CarouselComponent, CarouselItemComponent, TestCarouselComponent],
            imports: [CarouselModule, ButtonModule]
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

    it('should have 8 carousel items', async () => {
        whenStable(fixture);
        expect(component.carousel.slides.length).toEqual(8);
    });

    it('should left navigation button be disabled and right navigation button enabled on default carousel', async () => {
        whenStable(fixture);
        const leftNavigationBtn = fixture.debugElement.query(By.css('.fd-carousel__button--left'));
        const rightNavigationBtn = fixture.debugElement.query(By.css('.fd-carousel__button--right'));

        expect(leftNavigationBtn.nativeElement.disabled).toEqual(true);
        expect(rightNavigationBtn.nativeElement.disabled).toEqual(false);

        // click right button 7 time to reach last item.
        rightNavigationBtn.nativeElement.click();
        whenStable(fixture);

        expect(leftNavigationBtn.nativeElement.disabled).toEqual(false);
        expect(rightNavigationBtn.nativeElement.disabled).toEqual(false);

        rightNavigationBtn.nativeElement.click();
        rightNavigationBtn.nativeElement.click();
        rightNavigationBtn.nativeElement.click();
        rightNavigationBtn.nativeElement.click();
        rightNavigationBtn.nativeElement.click();
        rightNavigationBtn.nativeElement.click();
        whenStable(fixture);

        expect(leftNavigationBtn.nativeElement.disabled).toEqual(false);
        expect(rightNavigationBtn.nativeElement.disabled).toEqual(true);
    });
});

@Component({
    selector: 'fd-test-multiple-active-item-carousel',
    template: `
        <fd-carousel
            [visibleSlidesCount]="visibleItemsCount"
            [pageIndicatorContainer]="showPageIndicatorContainer"
            [pageIndicator]="showPageIndicator"
            [navigation]="showNavigator"
            [navigatorInPageIndicator]="navigatorInPageIndicator"
            [carouselIndicatorsOrientation]="pageIndicatorContainerPlacement"
            [loop]="isCircular"
        >
            <fd-carousel-item>
                Item 1 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus facilis doloribus repellendus
                quia consequuntur distinctio nobis unde omnis laboriosam. Saepe voluptatum laborum dicta, dignissimos
                quo voluptate consequuntur quidem maiores vitae assumenda iure magnam natus quae ea repudiandae nihil
                tempore ratione, rem accusantium quibusdam culpa deleniti reprehenderit. Consequatur autem sed nesciunt
                hic ex blanditiis quidem, tempore reprehenderit dolorum. Praesentium ipsa cum perspiciatis voluptatem,
                aliquam error soluta exercitationem ullam saepe eum, amet illo beatae qui nobis est nemo, libero
                cupiditate consequatur omnis hic voluptatum odit quia at fugiat. Sint minus enim, ipsum necessitatibus
                quos alias perspiciatis architecto similique veniam pariatur commodi amet.
            </fd-carousel-item>

            <fd-carousel-item>
                Item 2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus facilis doloribus repellendus
                quia consequuntur distinctio nobis unde omnis laboriosam. Saepe voluptatum laborum dicta, dignissimos
                quo voluptate consequuntur quidem maiores vitae assumenda iure magnam natus quae ea repudiandae nihil
                tempore ratione, rem accusantium quibusdam culpa deleniti reprehenderit. Consequatur autem sed nesciunt
                hic ex blanditiis quidem, tempore reprehenderit dolorum. Praesentium ipsa cum perspiciatis voluptatem,
                aliquam error soluta exercitationem ullam saepe eum, amet illo beatae qui nobis est nemo, libero
                cupiditate consequatur omnis hic voluptatum odit quia at fugiat. Sint minus enim, ipsum necessitatibus
                quos alias perspiciatis architecto similique veniam pariatur commodi amet.
            </fd-carousel-item>

            <fd-carousel-item>
                Item 3 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus facilis doloribus repellendus
                quia consequuntur distinctio nobis unde omnis laboriosam. Saepe voluptatum laborum dicta, dignissimos
                quo voluptate consequuntur quidem maiores vitae assumenda iure magnam natus quae ea repudiandae nihil
                tempore ratione, rem accusantium quibusdam culpa deleniti reprehenderit. Consequatur autem sed nesciunt
                hic ex blanditiis quidem, tempore reprehenderit dolorum. Praesentium ipsa cum perspiciatis voluptatem,
                aliquam error soluta exercitationem ullam saepe eum, amet illo beatae qui nobis est nemo, libero
                cupiditate consequatur omnis hic voluptatum odit quia at fugiat. Sint minus enim, ipsum necessitatibus
                quos alias perspiciatis architecto similique veniam pariatur commodi amet.
            </fd-carousel-item>

            <fd-carousel-item>
                Item 4 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus facilis doloribus repellendus
                quia consequuntur distinctio nobis unde omnis laboriosam. Saepe voluptatum laborum dicta, dignissimos
                quo voluptate consequuntur quidem maiores vitae assumenda iure magnam natus quae ea repudiandae nihil
                tempore ratione, rem accusantium quibusdam culpa deleniti reprehenderit. Consequatur autem sed nesciunt
                hic ex blanditiis quidem, tempore reprehenderit dolorum. Praesentium ipsa cum perspiciatis voluptatem,
                aliquam error soluta exercitationem ullam saepe eum, amet illo beatae qui nobis est nemo, libero
                cupiditate consequatur omnis hic voluptatum odit quia at fugiat. Sint minus enim, ipsum necessitatibus
                quos alias perspiciatis architecto similique veniam pariatur commodi amet.
            </fd-carousel-item>

            <fd-carousel-item>
                Item 5 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus facilis doloribus repellendus
                quia consequuntur distinctio nobis unde omnis laboriosam. Saepe voluptatum laborum dicta, dignissimos
                quo voluptate consequuntur quidem maiores vitae assumenda iure magnam natus quae ea repudiandae nihil
                tempore ratione, rem accusantium quibusdam culpa deleniti reprehenderit. Consequatur autem sed nesciunt
                hic ex blanditiis quidem, tempore reprehenderit dolorum. Praesentium ipsa cum perspiciatis voluptatem,
                aliquam error soluta exercitationem ullam saepe eum, amet illo beatae qui nobis est nemo, libero
                cupiditate consequatur omnis hic voluptatum odit quia at fugiat. Sint minus enim, ipsum necessitatibus
                quos alias perspiciatis architecto similique veniam pariatur commodi amet.
            </fd-carousel-item>

            <fd-carousel-item>
                Item 6 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus facilis doloribus repellendus
                quia consequuntur distinctio nobis unde omnis laboriosam. Saepe voluptatum laborum dicta, dignissimos
                quo voluptate consequuntur quidem maiores vitae assumenda iure magnam natus quae ea repudiandae nihil
                tempore ratione, rem accusantium quibusdam culpa deleniti reprehenderit. Consequatur autem sed nesciunt
                hic ex blanditiis quidem, tempore reprehenderit dolorum. Praesentium ipsa cum perspiciatis voluptatem,
                aliquam error soluta exercitationem ullam saepe eum, amet illo beatae qui nobis est nemo, libero
                cupiditate consequatur omnis hic voluptatum odit quia at fugiat. Sint minus enim, ipsum necessitatibus
                quos alias perspiciatis architecto similique veniam pariatur commodi amet.
            </fd-carousel-item>

            <fd-carousel-item>
                Item 7 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus facilis doloribus repellendus
                quia consequuntur distinctio nobis unde omnis laboriosam. Saepe voluptatum laborum dicta, dignissimos
                quo voluptate consequuntur quidem maiores vitae assumenda iure magnam natus quae ea repudiandae nihil
                tempore ratione, rem accusantium quibusdam culpa deleniti reprehenderit. Consequatur autem sed nesciunt
                hic ex blanditiis quidem, tempore reprehenderit dolorum. Praesentium ipsa cum perspiciatis voluptatem,
                aliquam error soluta exercitationem ullam saepe eum, amet illo beatae qui nobis est nemo, libero
                cupiditate consequatur omnis hic voluptatum odit quia at fugiat. Sint minus enim, ipsum necessitatibus
                quos alias perspiciatis architecto similique veniam pariatur commodi amet.
            </fd-carousel-item>

            <fd-carousel-item>
                Item 8 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus facilis doloribus repellendus
                quia consequuntur distinctio nobis unde omnis laboriosam. Saepe voluptatum laborum dicta, dignissimos
                quo voluptate consequuntur quidem maiores vitae assumenda iure magnam natus quae ea repudiandae nihil
                tempore ratione, rem accusantium quibusdam culpa deleniti reprehenderit. Consequatur autem sed nesciunt
                hic ex blanditiis quidem, tempore reprehenderit dolorum. Praesentium ipsa cum perspiciatis voluptatem,
                aliquam error soluta exercitationem ullam saepe eum, amet illo beatae qui nobis est nemo, libero
                cupiditate consequatur omnis hic voluptatum odit quia at fugiat. Sint minus enim, ipsum necessitatibus
                quos alias perspiciatis architecto similique veniam pariatur commodi amet.
            </fd-carousel-item>
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
    pageIndicatorContainerPlacement = 'top';
    isCircular = false;
}

describe('CarouselComponent Multiple Active Item', () => {
    let component: TestCarouselMultipleActiveItemComponent;
    let fixture: ComponentFixture<TestCarouselMultipleActiveItemComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CarouselComponent, CarouselItemComponent, TestCarouselMultipleActiveItemComponent],
            imports: [CarouselModule]
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
        whenStable(fixture);

        const leftNavigationBtn = fixture.debugElement.query(By.css('.fd-carousel__button--left'));
        const rightNavigationBtn = fixture.debugElement.query(By.css('.fd-carousel__button--right'));

        expect(leftNavigationBtn.nativeElement.disabled).toEqual(true);
        expect(rightNavigationBtn.nativeElement.disabled).toEqual(false);

        rightNavigationBtn.nativeElement.click();
        rightNavigationBtn.nativeElement.click();
        rightNavigationBtn.nativeElement.click();
        rightNavigationBtn.nativeElement.click();

        whenStable(fixture);
        expect(leftNavigationBtn.nativeElement.disabled).toEqual(false);
        expect(rightNavigationBtn.nativeElement.disabled).toEqual(false);

        rightNavigationBtn.nativeElement.click();
        rightNavigationBtn.nativeElement.click();

        whenStable(fixture);
        expect(leftNavigationBtn.nativeElement.disabled).toEqual(false);
        expect(rightNavigationBtn.nativeElement.disabled).toEqual(true);

        leftNavigationBtn.nativeElement.click();
        leftNavigationBtn.nativeElement.click();
        leftNavigationBtn.nativeElement.click();
        leftNavigationBtn.nativeElement.click();
        leftNavigationBtn.nativeElement.click();
        leftNavigationBtn.nativeElement.click();

        whenStable(fixture);
        expect(leftNavigationBtn.nativeElement.disabled).toEqual(true);
        expect(rightNavigationBtn.nativeElement.disabled).toEqual(false);
    });

    it('should make right button disabled on last item active', async () => {
        whenStable(fixture);

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

        whenStable(fixture);
        expect(leftNavigationBtn.nativeElement.disabled).toEqual(false);
        expect(rightNavigationBtn.nativeElement.disabled).toEqual(true);
    });

    it('should have left button disabled on first item active', async () => {
        whenStable(fixture);

        const leftNavigationBtn = fixture.debugElement.query(By.css('.fd-carousel__button--left'));
        const rightNavigationBtn = fixture.debugElement.query(By.css('.fd-carousel__button--right'));

        expect(leftNavigationBtn.nativeElement.disabled).toEqual(true);
        expect(rightNavigationBtn.nativeElement.disabled).toEqual(false);

        rightNavigationBtn.nativeElement.click();
        rightNavigationBtn.nativeElement.click();

        whenStable(fixture);
        expect(leftNavigationBtn.nativeElement.disabled).toEqual(false);
        expect(rightNavigationBtn.nativeElement.disabled).toEqual(false);
    });
});

@Component({
    selector: 'fd-test-looping-navigation-carousel',
    template: `
        <fd-carousel
            [visibleSlidesCount]="visibleItemsCount"
            [pageIndicatorContainer]="showPageIndicatorContainer"
            [pageIndicator]="showPageIndicator"
            [navigation]="showNavigator"
            [navigatorInPageIndicator]="navigatorInPageIndicator"
            [carouselIndicatorsOrientation]="pageIndicatorContainerPlacement"
            [loop]="isCircular"
        >
            <fd-carousel-item>
                Item 1 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus facilis doloribus repellendus
                quia consequuntur distinctio nobis unde omnis laboriosam. Saepe voluptatum laborum dicta, dignissimos
                quo voluptate consequuntur quidem maiores vitae assumenda iure magnam natus quae ea repudiandae nihil
                tempore ratione, rem accusantium quibusdam culpa deleniti reprehenderit. Consequatur autem sed nesciunt
                hic ex blanditiis quidem, tempore reprehenderit dolorum. Praesentium ipsa cum perspiciatis voluptatem,
                aliquam error soluta exercitationem ullam saepe eum, amet illo beatae qui nobis est nemo, libero
                cupiditate consequatur omnis hic voluptatum odit quia at fugiat. Sint minus enim, ipsum necessitatibus
                quos alias perspiciatis architecto similique veniam pariatur commodi amet.
            </fd-carousel-item>

            <fd-carousel-item>
                Item 2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus facilis doloribus repellendus
                quia consequuntur distinctio nobis unde omnis laboriosam. Saepe voluptatum laborum dicta, dignissimos
                quo voluptate consequuntur quidem maiores vitae assumenda iure magnam natus quae ea repudiandae nihil
                tempore ratione, rem accusantium quibusdam culpa deleniti reprehenderit. Consequatur autem sed nesciunt
                hic ex blanditiis quidem, tempore reprehenderit dolorum. Praesentium ipsa cum perspiciatis voluptatem,
                aliquam error soluta exercitationem ullam saepe eum, amet illo beatae qui nobis est nemo, libero
                cupiditate consequatur omnis hic voluptatum odit quia at fugiat. Sint minus enim, ipsum necessitatibus
                quos alias perspiciatis architecto similique veniam pariatur commodi amet.
            </fd-carousel-item>

            <fd-carousel-item>
                Item 3 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus facilis doloribus repellendus
                quia consequuntur distinctio nobis unde omnis laboriosam. Saepe voluptatum laborum dicta, dignissimos
                quo voluptate consequuntur quidem maiores vitae assumenda iure magnam natus quae ea repudiandae nihil
                tempore ratione, rem accusantium quibusdam culpa deleniti reprehenderit. Consequatur autem sed nesciunt
                hic ex blanditiis quidem, tempore reprehenderit dolorum. Praesentium ipsa cum perspiciatis voluptatem,
                aliquam error soluta exercitationem ullam saepe eum, amet illo beatae qui nobis est nemo, libero
                cupiditate consequatur omnis hic voluptatum odit quia at fugiat. Sint minus enim, ipsum necessitatibus
                quos alias perspiciatis architecto similique veniam pariatur commodi amet.
            </fd-carousel-item>

            <fd-carousel-item>
                Item 4 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus facilis doloribus repellendus
                quia consequuntur distinctio nobis unde omnis laboriosam. Saepe voluptatum laborum dicta, dignissimos
                quo voluptate consequuntur quidem maiores vitae assumenda iure magnam natus quae ea repudiandae nihil
                tempore ratione, rem accusantium quibusdam culpa deleniti reprehenderit. Consequatur autem sed nesciunt
                hic ex blanditiis quidem, tempore reprehenderit dolorum. Praesentium ipsa cum perspiciatis voluptatem,
                aliquam error soluta exercitationem ullam saepe eum, amet illo beatae qui nobis est nemo, libero
                cupiditate consequatur omnis hic voluptatum odit quia at fugiat. Sint minus enim, ipsum necessitatibus
                quos alias perspiciatis architecto similique veniam pariatur commodi amet.
            </fd-carousel-item>

            <fd-carousel-item>
                Item 5 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus facilis doloribus repellendus
                quia consequuntur distinctio nobis unde omnis laboriosam. Saepe voluptatum laborum dicta, dignissimos
                quo voluptate consequuntur quidem maiores vitae assumenda iure magnam natus quae ea repudiandae nihil
                tempore ratione, rem accusantium quibusdam culpa deleniti reprehenderit. Consequatur autem sed nesciunt
                hic ex blanditiis quidem, tempore reprehenderit dolorum. Praesentium ipsa cum perspiciatis voluptatem,
                aliquam error soluta exercitationem ullam saepe eum, amet illo beatae qui nobis est nemo, libero
                cupiditate consequatur omnis hic voluptatum odit quia at fugiat. Sint minus enim, ipsum necessitatibus
                quos alias perspiciatis architecto similique veniam pariatur commodi amet.
            </fd-carousel-item>

            <fd-carousel-item>
                Item 6 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus facilis doloribus repellendus
                quia consequuntur distinctio nobis unde omnis laboriosam. Saepe voluptatum laborum dicta, dignissimos
                quo voluptate consequuntur quidem maiores vitae assumenda iure magnam natus quae ea repudiandae nihil
                tempore ratione, rem accusantium quibusdam culpa deleniti reprehenderit. Consequatur autem sed nesciunt
                hic ex blanditiis quidem, tempore reprehenderit dolorum. Praesentium ipsa cum perspiciatis voluptatem,
                aliquam error soluta exercitationem ullam saepe eum, amet illo beatae qui nobis est nemo, libero
                cupiditate consequatur omnis hic voluptatum odit quia at fugiat. Sint minus enim, ipsum necessitatibus
                quos alias perspiciatis architecto similique veniam pariatur commodi amet.
            </fd-carousel-item>

            <fd-carousel-item>
                Item 7 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus facilis doloribus repellendus
                quia consequuntur distinctio nobis unde omnis laboriosam. Saepe voluptatum laborum dicta, dignissimos
                quo voluptate consequuntur quidem maiores vitae assumenda iure magnam natus quae ea repudiandae nihil
                tempore ratione, rem accusantium quibusdam culpa deleniti reprehenderit. Consequatur autem sed nesciunt
                hic ex blanditiis quidem, tempore reprehenderit dolorum. Praesentium ipsa cum perspiciatis voluptatem,
                aliquam error soluta exercitationem ullam saepe eum, amet illo beatae qui nobis est nemo, libero
                cupiditate consequatur omnis hic voluptatum odit quia at fugiat. Sint minus enim, ipsum necessitatibus
                quos alias perspiciatis architecto similique veniam pariatur commodi amet.
            </fd-carousel-item>

            <fd-carousel-item>
                Item 8 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus facilis doloribus repellendus
                quia consequuntur distinctio nobis unde omnis laboriosam. Saepe voluptatum laborum dicta, dignissimos
                quo voluptate consequuntur quidem maiores vitae assumenda iure magnam natus quae ea repudiandae nihil
                tempore ratione, rem accusantium quibusdam culpa deleniti reprehenderit. Consequatur autem sed nesciunt
                hic ex blanditiis quidem, tempore reprehenderit dolorum. Praesentium ipsa cum perspiciatis voluptatem,
                aliquam error soluta exercitationem ullam saepe eum, amet illo beatae qui nobis est nemo, libero
                cupiditate consequatur omnis hic voluptatum odit quia at fugiat. Sint minus enim, ipsum necessitatibus
                quos alias perspiciatis architecto similique veniam pariatur commodi amet.
            </fd-carousel-item>
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
    pageIndicatorContainerPlacement = 'bottom';
    isCircular = true;
}

describe('CarouselComponent looping navigation', () => {
    let component: TestCarouselLoopingNavigationComponent;
    let fixture: ComponentFixture<TestCarouselLoopingNavigationComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CarouselComponent, CarouselItemComponent, TestCarouselLoopingNavigationComponent],
            imports: [CarouselModule]
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
        whenStable(fixture);

        const leftNavigationBtn = fixture.debugElement.query(By.css('.fd-carousel__button--left'));
        const rightNavigationBtn = fixture.debugElement.query(By.css('.fd-carousel__button--right'));

        expect(leftNavigationBtn.nativeElement.disabled).toEqual(false);
        expect(rightNavigationBtn.nativeElement.disabled).toEqual(false);
    });
});
