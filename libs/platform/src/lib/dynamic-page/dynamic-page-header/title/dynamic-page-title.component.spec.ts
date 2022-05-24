import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, DebugElement, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { DynamicPageTitleComponent } from '../../dynamic-page-header/title/dynamic-page-title.component';
import { DynamicPageService } from '../../dynamic-page.service';
import { DynamicPageKeyInfoComponent } from '../../dynamic-page-header/key-info/dynamic-page-key-info.component';
import { DynamicPageGlobalActionsComponent } from '../../dynamic-page-header/actions/global-actions/dynamic-page-global-actions.component';
import { DynamicPageLayoutActionsComponent } from '../../dynamic-page-header/actions/layout-actions/dynamic-page-layout-actions.component';

import { CLASS_NAME } from '../../constants';
import { PlatformDynamicPageModule } from '../../dynamic-page.module';
import { DynamicPageTitleHostComponent } from './dynamic-page-title-host.component';

@Component({
    template: `
        <fdp-dynamic-page-title [title]="title" [subtitle]="subtitle" [size]="size" [background]="background">
            <fd-breadcrumb>
                <fd-breadcrumb-item>
                    <a fd-breadcrumb-link [attr.href]="'#'">Men</a>
                </fd-breadcrumb-item>
                <fd-breadcrumb-item>
                    <a fd-breadcrumb-link [attr.href]="'#'">Shoes</a>
                </fd-breadcrumb-item>
            </fd-breadcrumb>

            <fdp-dynamic-page-key-info>Key info content</fdp-dynamic-page-key-info>

            <fdp-dynamic-page-global-actions>
                <fd-toolbar fdType="transparent" [clearBorder]="true">
                    <button
                        fd-toolbar-item
                        fd-button
                        [compact]="true"
                        fdType="positive"
                        (click)="$event.stopPropagation()"
                    >
                        Accept
                    </button>
                </fd-toolbar>
            </fdp-dynamic-page-global-actions>
            <fdp-dynamic-page-layout-actions>
                <!-- layout actions -->
                <fd-toolbar fdType="transparent" [clearBorder]="true">
                    <button fd-button fdType="transparent" aria-label="Resize">
                        <i class="sap-icon--resize"></i>
                    </button>
                </fd-toolbar>
            </fdp-dynamic-page-layout-actions>
        </fdp-dynamic-page-title>

        <div #outlet>
            <ng-container *ngTemplateOutlet="dynamicPageTitleComponent?.contentTemplateRef"></ng-container>
        </div>
    `
})
class TestComponent implements AfterViewInit {
    title = 'Some title ';
    subtitle: string;
    size = 'medium';
    background = '';
    @ViewChild(DynamicPageTitleComponent) dynamicPageTitleComponent: DynamicPageTitleComponent;
    @ViewChild(DynamicPageKeyInfoComponent) dynamicPageKeyInfoComponent: DynamicPageKeyInfoComponent;
    @ViewChild(DynamicPageGlobalActionsComponent) dynamicPageGlobalActionsComponent: DynamicPageGlobalActionsComponent;
    @ViewChild(DynamicPageLayoutActionsComponent) dynamicPageLayoutActionsComponent: DynamicPageLayoutActionsComponent;

    @ViewChild('outlet')
    outlet: ElementRef<HTMLElement>;

    constructor(private cd: ChangeDetectorRef) {}

    ngAfterViewInit(): void {
        this.cd.detectChanges();
    }
}
describe('DynamicPageTitleComponent', () => {
    let fixture: ComponentFixture<TestComponent>;
    let pageTitleComponent: DynamicPageTitleComponent;
    let component: TestComponent;
    let titleHostComponentDebugElement: DebugElement;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [CommonModule, PlatformDynamicPageModule, BreadcrumbModule, ToolbarModule, ButtonModule],
                declarations: [TestComponent],
                providers: [DynamicPageService]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        pageTitleComponent = component.dynamicPageTitleComponent;
    });

    beforeEach(() => {
        titleHostComponentDebugElement = fixture.debugElement.query(By.directive(DynamicPageTitleHostComponent));
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should add correct classes to host', () => {
        expect(
            titleHostComponentDebugElement.nativeElement.className.includes(CLASS_NAME.dynamicPageTitleArea)
        ).toBeTruthy();
    });

    it('should add tabindex to host', async () => {
        expect(titleHostComponentDebugElement.attributes['tabindex']).toEqual('0');
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
            const titleElement: HTMLElement = titleHostComponentDebugElement.query(
                By.css('.fd-dynamic-page__title')
            ).nativeElement;
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
            const titleElement: HTMLElement = titleHostComponentDebugElement.query(
                By.css('.fd-dynamic-page__subtitle')
            ).nativeElement;
            expect(titleElement?.innerText).toBe('Some subtitle');
        });
    });

    describe('page title area', () => {
        it('should set size', async () => {
            const titleElement = titleHostComponentDebugElement;
            expect(titleElement.nativeElement.classList.contains('fd-dynamic-page__title-area--md')).toBeTruthy();
            component.size = 'large';
            fixture.detectChanges();
            expect(titleElement.nativeElement.classList.contains('fd-dynamic-page__title-area--lg')).toBeTruthy();
            component.size = 'small';
            fixture.detectChanges();
            expect(titleElement.nativeElement.classList.contains('fd-dynamic-page__title-area--sm')).toBeTruthy();
        });
        it('should set background styles', async () => {
            const titleElement = titleHostComponentDebugElement;
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

    describe('Key Info Area', () => {
        it('should assign class name', async () => {
            const keyInfoEl = titleHostComponentDebugElement.query(By.css(`.${CLASS_NAME.dynamicPageKeyInfo}`));
            expect(keyInfoEl).toBeDefined();
        });
        it('should render key info content', async () => {
            const keyInfoEl = titleHostComponentDebugElement.query(By.css(`.${CLASS_NAME.dynamicPageKeyInfo}`));
            expect(keyInfoEl?.nativeElement.innerText).toEqual('Key info content');
        });
    });

    describe('Toolbar Area', () => {
        it('should add correct classes to toolbar', async () => {
            fixture.detectChanges();

            const toolbarContainer = titleHostComponentDebugElement.query(
                By.css('.' + CLASS_NAME.dynamicPageActionsContainer)
            );
            expect(toolbarContainer).toBeTruthy();
            expect(
                toolbarContainer.nativeElement.className.includes(CLASS_NAME.dynamicPageActionsContainerMedium)
            ).toBeTruthy();

            const globalActionsContainer = titleHostComponentDebugElement.query(
                By.css('.' + CLASS_NAME.dynamicPageGlobalActions)
            );
            expect(
                globalActionsContainer.nativeElement.className.includes(
                    CLASS_NAME.dynamicPageGlobalActionsToolbarMedium
                )
            ).toBeTruthy();

            const layoutActionsContainer = titleHostComponentDebugElement.query(
                By.css('.' + CLASS_NAME.dynamicPageLayoutActions)
            );
            expect(
                layoutActionsContainer.nativeElement.className.includes(
                    CLASS_NAME.dynamicPageLayoutActionsToolbarMedium
                )
            ).toBeTruthy();
        });
    });
});
