import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BreadcrumbModule, ToolbarModule, ButtonModule } from '@fundamental-ngx/core';
import { CLASS_NAME } from '../../constants';
import { PlatformDynamicPageModule } from '../../dynamic-page.module';
import { DynamicPageService } from '../../dynamic-page.service';
import { DynamicPageGlobalActionsComponent } from '../actions/global-actions/dynamic-page-global-actions.component';
import { DynamicPageLayoutActionsComponent } from '../actions/layout-actions/dynamic-page-layout-actions.component';
import { DynamicPageKeyInfoComponent } from '../key-info/dynamic-page-key-info.component';
import { DynamicPageTitleComponent } from './dynamic-page-title.component';

@Component({
    template: ` <fdp-dynamic-page-title [title]="title" [subtitle]="subtitle" [size]="size" [background]="background">
        <fd-breadcrumb>
            <fd-breadcrumb-item>
                <a fd-breadcrumb-link [attr.href]="'#'">Men</a>
            </fd-breadcrumb-item>
            <fd-breadcrumb-item>
                <a fd-breadcrumb-link [attr.href]="'#'">Shoes</a>
            </fd-breadcrumb-item>
        </fd-breadcrumb>

        <fdp-dynamic-page-key-info> </fdp-dynamic-page-key-info>
    </fdp-dynamic-page-title>`
})
class TestComponent {
    title = 'Some title ';
    subtitle: string;
    size = 'medium';
    background = '';
    @ViewChild(DynamicPageTitleComponent) dynamicPageTitleComponent: DynamicPageTitleComponent;
    @ViewChild(DynamicPageKeyInfoComponent) dynamicPageKeyInfoComponent: DynamicPageKeyInfoComponent;
    @ViewChild(DynamicPageGlobalActionsComponent) dynamicPageGlobalActionsComponent: DynamicPageGlobalActionsComponent;
    @ViewChild(DynamicPageLayoutActionsComponent) dynamicPageLayoutActionsComponent: DynamicPageLayoutActionsComponent;
}

describe('DynamicPageTitleComponent', () => {
    let fixture: ComponentFixture<TestComponent>;
    let pageTitleComponent: DynamicPageTitleComponent;
    let pageTitleKeyInfoComponent: DynamicPageKeyInfoComponent;
    let component: TestComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, PlatformDynamicPageModule, BreadcrumbModule, ToolbarModule, ButtonModule],
            declarations: [TestComponent],
            providers: [DynamicPageService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        pageTitleComponent = component.dynamicPageTitleComponent;
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should add correct classes to host', async () => {
        fixture.detectChanges();
        expect(
            pageTitleComponent.elementRef().nativeElement.classList.contains(CLASS_NAME.dynamicPageTitleArea)
        ).toBeTruthy();
    });

    it('should add tabindex to host', async () => {
        fixture.detectChanges();
        expect(pageTitleComponent.elementRef().nativeElement.getAttribute('tabindex')).toEqual('0');
    });

    describe('title text', () => {
        it('should bind to title', () => {
            component.title = 'Sample';
            fixture.detectChanges();
            expect(pageTitleComponent.title).toBe('Sample');
        });

        it('should render it in view', () => {
            component.title = 'Sample';
            fixture.detectChanges();
            const titleElement: HTMLElement = fixture.debugElement.query(By.css('.fd-dynamic-page__title'))
                .nativeElement;
            expect(titleElement?.innerText).toBe('Sample');
        });
    });
    describe('subtitle text', () => {
        it('should bind to title', () => {
            component.subtitle = 'Some subtitle';
            fixture.detectChanges();
            expect(pageTitleComponent.subtitle).toBe('Some subtitle');
        });

        it('should render it in view', () => {
            component.subtitle = 'Some subtitle';
            fixture.detectChanges();
            const titleElement: HTMLElement = fixture.debugElement.query(By.css('.fd-dynamic-page__subtitle'))
                .nativeElement;
            expect(titleElement?.innerText).toBe('Some subtitle');
        });
    });
    describe('page title area', () => {
        it('should set size', async () => {
            const titleElement = fixture.debugElement.query(By.css('.fd-dynamic-page__title-area'));
            expect(titleElement.nativeElement.classList.contains('fd-dynamic-page__title-area--md')).toBeTruthy();
            component.size = 'large';
            fixture.detectChanges();
            expect(titleElement.nativeElement.classList.contains('fd-dynamic-page__title-area--lg')).toBeTruthy();
            component.size = 'small';
            fixture.detectChanges();
            expect(titleElement.nativeElement.classList.contains('fd-dynamic-page__title-area--sm')).toBeTruthy();
        });
        it('should set background styles', async () => {
            const titleElement = fixture.debugElement.query(By.css('.fd-dynamic-page__title-area'));
            component.background = 'transparent';
            fixture.detectChanges();
            expect(
                titleElement.nativeElement.classList.contains('fd-dynamic-page__title-area--transparent-bg')
            ).toBeTruthy();
            component.background = 'solid';
            fixture.detectChanges();
            expect(
                titleElement.nativeElement.classList.contains('fd-dynamic-page__title-area--transparent-bg')
            ).toBeFalsy();
        });
    });

    it('should set key info class', async () => {
        pageTitleKeyInfoComponent = component.dynamicPageKeyInfoComponent;
        fixture.detectChanges();
        expect(
            fixture.debugElement
                .query(By.directive(DynamicPageKeyInfoComponent))
                .nativeElement.classList.contains(CLASS_NAME.dynamicPageKeyInfo)
        ).toBeTruthy();
    });
});
