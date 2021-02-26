import { Component, DebugElement, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
    TileActionCloseDirective,
    TileActionContainerDirective,
    TileActionIndicatorDirective,
    TileBackgroundImgDirective,
    TileContainerDirective,
    TileContentBylineDirective,
    TileContentDirective,
    TileContentTextDirective,
    TileDotDirective,
    TileFooterDirective,
    TileFooterTextDirective,
    TileHeaderContentDirective,
    TileHeaderDirective,
    TileLogoDirective,
    TilePageIndicatorDirective,
    TileProfileImgDirective,
    TileRefreshDirective,
    TileSectionDirective,
    TileSlideContainerDirective,
    TileSubtitleDirective,
    TileTitleContainerDirective,
    TileTitleDirective,
    TileToggleDirective
} from './tile.directives';

@Component({
    selector: 'fd-test-component',
    template: `
        <button fd-button fd-tile-action-close [compact]="true" fdType="transparent"></button>
        <button fd-button fd-tile-action-indicator [compact]="true" fdType="transparent"></button>
        <div #header fd-tile-header [twoColumn]="true">
            <div fd-tile-header-content></div>
        </div>
        <div fd-tile-title-container>
            <div fd-tile-title></div>
            <div fd-tile-subtitle></div>
        </div>
        <div #content fd-tile-content [twoColumn]="true">
            <div fd-tile-content-text></div>
            <div fd-tile-content-byline></div>
            <i fd-tile-refresh glyph="refresh"></i>
            <span #profileImg fd-tile-profile-img backgroundImage="https://picsum.photos/60/60"></span>
            <span #backgroundImg fd-tile-background-img backgroundImage="https://picsum.photos/60/60"></span>
            <span fd-tile-logo></span>
            <span fd-tile-toggle></span>
        </div>
        <div fd-tile-slide-container #slideContainer>
            <span fd-tile-page-indicator></span>
            <span #dot fd-tile-dot [active]="true"></span>
        </div>
        <div #footer fd-tile-footer [twoColumn]="true">
            <div fd-tile-footer-text></div>
            <div fd-tile-section></div>
        </div>
        <div #container fd-tile-container [list]="true"></div>
    `
})
export class TestComponent {
    @ViewChild('header')
    header: ElementRef;

    @ViewChild('content')
    content: ElementRef;

    @ViewChild('footer')
    footer: ElementRef;

    @ViewChild(TileRefreshDirective)
    refresh: TileRefreshDirective;

    @ViewChild('profileImg')
    profileImg: ElementRef;

    @ViewChild('backgroundImg')
    backgroundImg: ElementRef;

    @ViewChild('container')
    container: ElementRef;

    @ViewChild('slideContainer')
    slideContainer: ElementRef;

    @ViewChild('dot')
    dot: ElementRef;

    @ViewChild(TileActionCloseDirective)
    actionClose: TileActionCloseDirective;

    @ViewChild(TileActionIndicatorDirective)
    actionIndicator: TileActionIndicatorDirective;
}

describe('TileDirectives', () => {
    let fixture: ComponentFixture<TestComponent>,
        component: TestComponent,
        debugElement: DebugElement,
        element: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                TileHeaderDirective,
                TileContentDirective,
                TileFooterDirective,
                TileTitleDirective,
                TileSubtitleDirective,
                TileSectionDirective,
                TileRefreshDirective,
                TileFooterTextDirective,
                TileHeaderContentDirective,
                TileProfileImgDirective,
                TileLogoDirective,
                TileContentBylineDirective,
                TileContentTextDirective,
                TileBackgroundImgDirective,
                TileToggleDirective,
                TileContainerDirective,
                TilePageIndicatorDirective,
                TileDotDirective,
                TileActionCloseDirective,
                TileActionIndicatorDirective,
                TileTitleContainerDirective,
                TileActionContainerDirective,
                TileSlideContainerDirective,
                TestComponent
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        element = debugElement.nativeElement;
        fixture.detectChanges();
    });

    it('should assign classes', () => {
        expect(component.header.nativeElement.className).toContain('fd-tile__header');
        expect(component.header.nativeElement.className).toContain('fd-tile__header--2-col');
        expect(component.content.nativeElement.className).toContain('fd-tile__content');
        expect(component.content.nativeElement.className).toContain('fd-tile__content--2-col');
        expect(component.footer.nativeElement.className).toContain('fd-tile__footer');
        expect(component.footer.nativeElement.className).toContain('fd-tile__footer--2-col');
        component.refresh.buildComponentCssClass();
        expect(component.refresh.elementRef().nativeElement.className).toContain('fd-tile__refresh');
        expect(component.refresh.elementRef().nativeElement.className).toContain('sap-icon--refresh');
        expect(component.profileImg.nativeElement.className).toContain('fd-tile__profile-img');
        expect(component.profileImg.nativeElement.id).toContain('fd-profileTile-');
        expect(component.profileImg.nativeElement.style.getPropertyValue('background-image')).toContain(
            'url("https://picsum.photos/60/60")'
        );
        expect(component.container.nativeElement.className).toContain('fd-tile-container');
        expect(component.container.nativeElement.className).toContain('fd-tile-container--list');
        expect(component.backgroundImg.nativeElement.className).toContain('fd-tile__background-img');
        expect(component.backgroundImg.nativeElement.style.getPropertyValue('background-image')).toContain(
            'url("https://picsum.photos/60/60")'
        );
        expect(component.slideContainer.nativeElement.className).toContain('fd-tile__container');
        expect(component.dot.nativeElement.className).toContain('fd-tile__dot');
        expect(component.dot.nativeElement.className).toContain('fd-tile__dot--active');
        component.actionClose.buildComponentCssClass();
        expect(component.actionClose.elementRef().nativeElement.className).toContain('fd-tile__action-close');
        component.actionIndicator.buildComponentCssClass();
        expect(component.actionIndicator.elementRef().nativeElement.className).toContain('fd-tile__action-indicator');
    });
});
