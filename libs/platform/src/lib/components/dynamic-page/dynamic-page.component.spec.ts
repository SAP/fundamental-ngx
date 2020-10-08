import { ScrollDispatcher, ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
    CLASS_NAME,
    DynamicPageComponent,
    DynamicPageService,
    PlatformDynamicPageModule
} from '@fundamental-ngx/platform';

import { DynamicPageContentComponent } from './dynamic-page-content/dynamic-page-content.component';
import { DynamicPageHeaderComponent } from './dynamic-page-header/header/dynamic-page-header.component';
import { DynamicPageTitleComponent } from './dynamic-page-header/title/dynamic-page-title.component';

@Component({
    template: `<fdp-dynamic-page [size]="size" [background]="background">
        <fdp-dynamic-page-title></fdp-dynamic-page-title>
        <fdp-dynamic-page-header></fdp-dynamic-page-header>
        <fdp-dynamic-page-content>DynamicPage Content Text</fdp-dynamic-page-content>
    </fdp-dynamic-page>`
})
class TestComponent {
    size = 'medium';
    background = '';
    @ViewChild(DynamicPageComponent) dynamicPage: DynamicPageComponent;
    @ViewChild(DynamicPageTitleComponent) dynamicPageTitleComponent: DynamicPageTitleComponent;
    @ViewChild(DynamicPageHeaderComponent) dynamicPageHeaderComponent: DynamicPageHeaderComponent;
    @ViewChild(DynamicPageContentComponent) dynamicPageContentComponent: DynamicPageContentComponent;
}
describe('DynamicPageComponent default values', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let dynamicPageComponent: DynamicPageComponent;
    let dynamicPageTitleComponent: DynamicPageTitleComponent;
    let dynamicPageContentComponent: DynamicPageContentComponent;

    beforeEach(async(() => {
        const scrollableSpy = jasmine.createSpyObj('DynamicPageService', ['expandHeader', 'collapseHeader']);
        TestBed.configureTestingModule({
            imports: [CommonModule, PlatformDynamicPageModule, ScrollingModule],
            declarations: [TestComponent],
            providers: [{ provide: DynamicPageService, useValue: scrollableSpy }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        dynamicPageComponent = component.dynamicPage;
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should add correct classes to host', async () => {
        fixture.detectChanges();
        expect(dynamicPageComponent.elementRef().nativeElement.classList.contains(CLASS_NAME.dynamicPage)).toBeTruthy();
    });

    it('should add correct classes to title', async () => {
        dynamicPageTitleComponent = component.dynamicPageTitleComponent;
        fixture.detectChanges();
        expect(
            dynamicPageTitleComponent.elementRef().nativeElement.classList.contains(CLASS_NAME.dynamicPageTitleArea)
        ).toBeTruthy();
    });
    it('should add correct classes to header', async () => {
        fixture.detectChanges();
        const headerElement = fixture.debugElement.query(By.css('.fd-dynamic-page__collapsible-header'));
        expect(headerElement).toBeTruthy();
    });

    it('should add correct classes to content', async () => {
        dynamicPageContentComponent = component.dynamicPageContentComponent;
        fixture.detectChanges();
        expect(
            dynamicPageContentComponent.getElementRef().nativeElement.classList.contains(CLASS_NAME.dynamicPageContent)
        ).toBeTruthy();
    });

    it('should set size to children', async () => {
        fixture.detectChanges();
        expect(component.dynamicPageTitleComponent.size).toBe('medium');
        component.dynamicPage.size = 'large';
        component.dynamicPage.ngAfterContentInit();
        fixture.detectChanges();
        expect(component.dynamicPageTitleComponent.size).toBe('large');
        component.dynamicPage.size = 'small';
        component.dynamicPage.ngAfterContentInit();
        fixture.detectChanges();
        expect(component.dynamicPageTitleComponent.size).toBe('small');
    });
    it('should set background styles', async () => {
        fixture.detectChanges();
        expect(component.dynamicPageTitleComponent.background).toBe(undefined);
        component.dynamicPage.background = 'solid';
        component.dynamicPage.ngAfterContentInit();
        fixture.detectChanges();
        expect(component.dynamicPageTitleComponent.background).toBe('solid');
        component.dynamicPage.background = 'transparent';
        component.dynamicPage.ngAfterContentInit();
        fixture.detectChanges();
        expect(component.dynamicPageTitleComponent.background).toBe('transparent');
        component.dynamicPage.background = 'list';
        component.dynamicPage.ngAfterContentInit();
        fixture.detectChanges();
        expect(component.dynamicPageTitleComponent.background).toBe('list');
    });

    it('should render content in view', () => {
        fixture.detectChanges();
        expect(component.dynamicPageContentComponent.getElementRef().nativeElement.innerText).toBe(
            'DynamicPage Content Text'
        );
    });

    it('should collapse header on click of title', async () => {
        dynamicPageTitleComponent = component.dynamicPageTitleComponent;
        dynamicPageComponent.toggleCollapse();
        component.dynamicPage.ngAfterViewInit();
        fixture.detectChanges();
        const contentEl: HTMLElement = fixture.debugElement.query(By.css('.fd-dynamic-page__collapsible-header'))
            .nativeElement;
        expect(contentEl.getAttribute('aria-hidden')).toBeTruthy();
    });

    describe('Content scrolling', () => {
        let scroll: ScrollDispatcher;
        let scrollFixture: ComponentFixture<DynamicPageContentComponent>;

        beforeEach(inject([ScrollDispatcher], (s: ScrollDispatcher) => {
            scroll = s;

            scrollFixture = TestBed.createComponent(DynamicPageContentComponent);
            scrollFixture.detectChanges();
        }));

        it('should trigger the scrollable subscriptions on scrolling', fakeAsync(() => {
            const throttleTime = 100;
            spyOn(component.dynamicPageHeaderComponent, 'collapseHeader');
            component.dynamicPageContentComponent._elementRef.nativeElement.dispatchEvent(new Event('scroll'));
            tick(throttleTime);
            expect(component.dynamicPageHeaderComponent.collapseHeader).toHaveBeenCalled();
        }));
    });
});
