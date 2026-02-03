import { Component, ElementRef, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
    TileActionCloseDirective,
    TileActionContainerDirective,
    TileActionIndicatorDirective,
    TileBackgroundImgDirective,
    TileContainerDirective,
    TileContentDirective,
    TileContentTextDirective,
    TileFooterDirective,
    TileFooterTextDirective,
    TileHeaderContentDirective,
    TileHeaderDirective,
    TileLogoDirective,
    TilePageIndicatorDirective,
    TileProfileImgDirective,
    TileRefreshDirective,
    TileSectionDirective,
    TileSubtitleDirective,
    TileTitleContainerDirective,
    TileTitleDirective,
    TileToggleDirective
} from './tile.directives';

@Component({
    selector: 'fd-test-component',
    template: `
        <button #actionClose fd-tile-action-close></button>
        <button #actionIndicator fd-tile-action-indicator></button>
        <div #header fd-tile-header [twoColumn]="true">
            <div fd-tile-header-content></div>
        </div>
        <div fd-tile-title-container>
            <div fd-tile-title></div>
            <div fd-tile-subtitle></div>
        </div>
        <div #content fd-tile-content [twoColumn]="true">
            <div fd-tile-content-text></div>
            <i fd-tile-refresh glyph="refresh"></i>
            <span #profileImg fd-tile-profile-img backgroundImage="https://picsum.photos/60/60"></span>
            <span #backgroundImg fd-tile-background-img backgroundImage="https://picsum.photos/60/60"></span>
            <span fd-tile-logo></span>
            <span fd-tile-toggle></span>
        </div>
        <div #footer fd-tile-footer [twoColumn]="true">
            <div fd-tile-footer-text></div>
            <div fd-tile-section></div>
        </div>
        <div #container fd-tile-container [list]="true"></div>
    `,
    imports: [
        TileActionCloseDirective,
        TileActionContainerDirective,
        TileActionIndicatorDirective,
        TileBackgroundImgDirective,
        TileContainerDirective,
        TileContentDirective,
        TileContentTextDirective,
        TileFooterDirective,
        TileFooterTextDirective,
        TileHeaderContentDirective,
        TileHeaderDirective,
        TileLogoDirective,
        TilePageIndicatorDirective,
        TileProfileImgDirective,
        TileRefreshDirective,
        TileSectionDirective,
        TileSubtitleDirective,
        TileTitleContainerDirective,
        TileTitleDirective,
        TileToggleDirective
    ]
})
class TestComponent {
    readonly header = viewChild<ElementRef>('header');
    readonly content = viewChild<ElementRef>('content');
    readonly footer = viewChild<ElementRef>('footer');
    readonly refresh = viewChild(TileRefreshDirective);
    readonly profileImg = viewChild<ElementRef>('profileImg');
    readonly backgroundImg = viewChild<ElementRef>('backgroundImg');
    readonly container = viewChild<ElementRef>('container');
    readonly actionClose = viewChild<ElementRef>('actionClose');
    readonly actionIndicator = viewChild<ElementRef>('actionIndicator');
}

describe('TileDirectives', () => {
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should assign classes', () => {
        // Header classes
        const headerEl = component.header()?.nativeElement;
        expect(headerEl.className).toContain('fd-tile__header');
        expect(headerEl.className).toContain('fd-tile__header--2-col');

        // Content classes
        const contentEl = component.content()?.nativeElement;
        expect(contentEl.className).toContain('fd-tile__content');
        expect(contentEl.className).toContain('fd-tile__content--2-col');

        // Footer classes
        const footerEl = component.footer()?.nativeElement;
        expect(footerEl.className).toContain('fd-tile__footer');
        expect(footerEl.className).toContain('fd-tile__footer--2-col');

        // Refresh directive with icon
        const refreshDirective = component.refresh();
        expect(refreshDirective).toBeDefined();
        const refreshEl = refreshDirective?.elementRef.nativeElement;
        expect(refreshEl?.className).toContain('fd-tile__refresh');
        expect(refreshEl?.className).toContain('sap-icon--refresh');

        // Profile image
        const profileImgEl = component.profileImg()?.nativeElement;
        expect(profileImgEl.className).toContain('fd-tile__profile-img');
        expect(profileImgEl.id).toContain('fd-profileTile-');
        expect(profileImgEl.style.getPropertyValue('background-image')).toContain('url("https://picsum.photos/60/60")');

        // Background image
        const backgroundImgEl = component.backgroundImg()?.nativeElement;
        expect(backgroundImgEl.className).toContain('fd-tile__background-img');
        expect(backgroundImgEl.style.getPropertyValue('background-image')).toContain(
            'url("https://picsum.photos/60/60")'
        );

        // Container
        const containerEl = component.container()?.nativeElement;
        expect(containerEl.className).toContain('fd-tile-container');
        expect(containerEl.className).toContain('fd-tile-container--list');

        // Action buttons with icons
        const actionCloseEl = component.actionClose()?.nativeElement;
        expect(actionCloseEl.className).toContain('fd-tile__action-close');
        expect(actionCloseEl.querySelector('.sap-icon--decline')).toBeTruthy();

        const actionIndicatorEl = component.actionIndicator()?.nativeElement;
        expect(actionIndicatorEl.className).toContain('fd-tile__action-indicator');
        expect(actionIndicatorEl.querySelector('.sap-icon--overflow')).toBeTruthy();
    });
});
