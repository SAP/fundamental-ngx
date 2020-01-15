import { async, ComponentFixture, TestBed, discardPeriodicTasks, fakeAsync } from '@angular/core/testing';
import { CarouselModule } from './carosuel.module';
import { CarosuelComponent } from './carosuel.component';
import { CarouselConfig } from './carosuel-config';
import { By } from '@angular/platform-browser';
import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
    selector: 'fdp-test-component',
    template: `
        <fdp-carosuel
        [id]="'myCarouselOntop'"
        [animation]="animation"
        [indicatorPosition]="indicatorPosition"
        [isControls]="isControls"
        [noPause]="noPause"
        [noWrap]="noWrap"
        [interval]="interval"
        [activeSlideIndex]="activeSlideIndex"
        [inMiddle]="inMiddle">
        <fdp-carousel-item>
            <img src="../../../../../assets/01.png"">
        </fdp-carousel-item>
        <fdp-carousel-item>
            <img src="h../../../../../assets/02.png"">
        </fdp-carousel-item>
        <fdp-carousel-item>
            <img src="../../../../../assets/03.png"">
        </fdp-carousel-item>
      </fdp-carosuel>
    `
})
class TestComponent {
    @Input() id: string;
    @Input() animation: string;
    @Input() isControls = true;
    @Input() indicatorPosition: string;
    @Input() inMiddle = false;
    @Input() noPause = false;
    @Input() keyboard = true;
    @Input() noWrap = false;
    @Input() interval: number;
    @Input() activeSlideIndex: number;
    @ViewChild('CarosuelComponent', { static: false }) carosuel: CarosuelComponent;
}

describe('CarosuelComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [FormsModule, CarouselModule]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize inputs with default values', () => {
        const defaultConfig = new CarouselConfig();
        expect(component.noPause).toBe(defaultConfig.noPause);
        expect(component.keyboard).toBe(defaultConfig.keyboard);
        expect(component.noWrap).toBe(defaultConfig.noWrap);
    });

    it('should render slides and navigation indicators', fakeAsync(() => {
        const slideElms = fixture.nativeElement.querySelectorAll('.carousel-item');
        expect(slideElms.length).toBe(3);
        expect(fixture.nativeElement.querySelectorAll('ol.carousel-indicators > span > li').length).toBe(3);
        discardPeriodicTasks();
    }));

    it('should mark the first slide as active by default', fakeAsync(() => {
        component.activeSlideIndex = 0;
        const indicatorElms = fixture.nativeElement.querySelectorAll('ol.carousel-indicators > span > li');
        expect(indicatorElms[0]).toHaveClass('active');
        expect(indicatorElms[1]).not.toHaveClass('active');
        expect(indicatorElms[2]).not.toHaveClass('active');
        discardPeriodicTasks();
    }));

    it('should not display controllers', fakeAsync(() => {

        component.isControls = false;
        fixture.detectChanges();
        const tag = fixture.nativeElement.querySelector('fdp-carosuel');
        expect(tag.getAttribute('ng-reflect-is-controls')).toEqual('false');

        const prev = fixture.debugElement.query(By.css('.sap-icon--slim-arrow-left'));
        expect(prev).toBe(null);

        const next = fixture.debugElement.query(By.css('.sap-icon--slim-arrow-right'));
        expect(next).toBe(null);

        discardPeriodicTasks();
    }));


    it('should not pause the slides', fakeAsync(() => {

        component.noPause = true;
        fixture.detectChanges();
        const tag = fixture.nativeElement.querySelector('fdp-carosuel');
        expect(tag.getAttribute('ng-reflect-no-pause')).toEqual('true');

        discardPeriodicTasks();
    }));


    it('should display controllers', fakeAsync(() => {

        component.isControls = true;
        fixture.detectChanges();
        const tag = fixture.nativeElement.querySelector('fdp-carosuel');
        expect(tag.getAttribute('ng-reflect-is-controls')).toEqual('true');

        const prev = fixture.debugElement.query(By.css('.sap-icon--slim-arrow-left'));
        expect(prev.nativeElement.getAttribute('title')).toEqual('Previous');

        const next = fixture.debugElement.query(By.css('.sap-icon--slim-arrow-right'));
        expect(next.nativeElement.getAttribute('title')).toEqual('Next');

        discardPeriodicTasks();
    }));

    it('should display controllers in Middle', fakeAsync(() => {

        component.isControls = true;
        component.inMiddle = true;
        fixture.detectChanges();
        const tag = fixture.nativeElement.querySelector('fdp-carosuel');
        expect(tag.getAttribute('ng-reflect-is-controls')).toEqual('true');
        expect(tag.getAttribute('ng-reflect-in-middle')).toEqual('true');

        const prev = fixture.debugElement.query(By.css('.sap-icon--slim-arrow-left'));
        expect(prev.nativeElement.getAttribute('title')).toEqual('Previous');

        const next = fixture.debugElement.query(By.css('.sap-icon--slim-arrow-right'));
        expect(next.nativeElement.getAttribute('title')).toEqual('Next');

        discardPeriodicTasks();
    }));

    it('should display slides in specified intervals', fakeAsync(() => {

        component.interval = 1000;
        fixture.detectChanges();
        const tag = fixture.nativeElement.querySelector('fdp-carosuel');
        expect(tag.getAttribute('ng-reflect-interval')).toEqual('1000');

        discardPeriodicTasks();
    }));
});
