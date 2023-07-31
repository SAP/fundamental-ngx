import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, DebugElement, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { DynamicPageHeaderComponent } from '@fundamental-ngx/core/dynamic-page';
import { DynamicPageTitleComponent } from '../../dynamic-page-header/title/dynamic-page-title.component';
import { DynamicPageService } from '../../dynamic-page.service';
import { DynamicPageKeyInfoComponent } from '../../dynamic-page-header/key-info/dynamic-page-key-info.component';
import { DynamicPageGlobalActionsComponent } from '../../dynamic-page-header/actions/global-actions/dynamic-page-global-actions.component';
import { DynamicPageLayoutActionsComponent } from '../../dynamic-page-header/actions/layout-actions/dynamic-page-layout-actions.component';

import { CLASS_NAME, DynamicPageBackgroundType, DynamicPageResponsiveSize } from '../../constants';
import { PlatformDynamicPageModule } from '../../dynamic-page.module';
import { DynamicPageComponent } from '../../dynamic-page.component';

@Component({
    template: `
        <fdp-dynamic-page>
            <fdp-dynamic-page-title [title]="title" [subtitle]="subtitle" [size]="size" [background]="background">
                <fd-breadcrumb>
                    <fd-breadcrumb-item>
                        <a fd-link [attr.href]="'#'">Men</a>
                    </fd-breadcrumb-item>
                    <fd-breadcrumb-item>
                        <a fd-link [attr.href]="'#'">Shoes</a>
                    </fd-breadcrumb-item>
                </fd-breadcrumb>

                <fdp-dynamic-page-key-info>Key info content</fdp-dynamic-page-key-info>

                <fdp-dynamic-page-global-actions>
                    <fd-toolbar fdType="transparent" [clearBorder]="true">
                        <button
                            fd-toolbar-item
                            fd-button
                            fdCompact
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
        </fdp-dynamic-page>
    `
})
class TestComponent implements AfterViewInit {
    title = 'Some title ';
    subtitle: string;
    size: DynamicPageResponsiveSize = 'medium';
    background: DynamicPageBackgroundType;

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
    let titleComponent: DynamicPageTitleComponent;
    let component: TestComponent;
    let titleComponentDebugElement: DebugElement;
    let componentDebugElement: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, PlatformDynamicPageModule, BreadcrumbModule, ToolbarModule, ButtonModule],
            declarations: [TestComponent],
            providers: [DynamicPageService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        component = fixture.componentInstance;
        componentDebugElement = fixture.debugElement.query(By.directive(DynamicPageComponent));

        titleComponent = component.dynamicPageTitleComponent;
        titleComponentDebugElement = fixture.debugElement.query(By.directive(DynamicPageHeaderComponent));
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should add correct classes to host', () => {
        expect(
            titleComponentDebugElement.nativeElement.className.includes(CLASS_NAME.dynamicPageTitleArea)
        ).toBeTruthy();
    });

    it('should add tabindex to host', async () => {
        expect(titleComponentDebugElement.attributes['tabindex']).toEqual('0');
    });

    describe('title text', () => {
        it('should bind to title', () => {
            component.title = 'Sample';
            fixture.detectChanges();
            expect(titleComponent.title).toBe('Sample');
        });

        it('should render it in view', () => {
            component.title = 'Sample';
            fixture.detectChanges();

            const titleElement: HTMLElement = componentDebugElement.query(
                By.css('.fd-dynamic-page__title')
            ).nativeElement;
            expect(titleElement?.textContent?.trim()).toBe('Sample');
        });
    });

    describe('subtitle text', () => {
        it('should bind to title', () => {
            component.subtitle = 'Some subtitle';
            fixture.detectChanges();
            expect(titleComponent.subtitle).toBe('Some subtitle');
        });

        it('should render it in view', () => {
            component.subtitle = 'Some subtitle';
            fixture.detectChanges();
            const titleElement: HTMLElement = titleComponentDebugElement.query(
                By.css('.fd-dynamic-page__subtitle')
            ).nativeElement;
            expect(titleElement?.textContent?.trim()).toBe('Some subtitle');
        });
    });

    describe('Key Info Area', () => {
        it('should assign class name', async () => {
            const keyInfoEl = titleComponentDebugElement.query(By.css(`.${CLASS_NAME.dynamicPageKeyInfo}`));
            expect(keyInfoEl).toBeDefined();
        });
        it('should render key info content', async () => {
            const keyInfoEl = componentDebugElement.query(By.css(`.${CLASS_NAME.dynamicPageKeyInfo}`));
            expect(keyInfoEl?.nativeElement.textContent?.trim()).toEqual('Key info content');
        });
    });
});
