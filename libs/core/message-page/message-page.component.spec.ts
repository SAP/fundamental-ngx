import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MessagePageComponent } from './message-page.component';
import { MessagePageModule } from './message-page.module';

@Component({
    selector: 'fd-message-page-test',
    template: `
        <fd-message-page [type]="type" [glyph]="glyph" [hasIcon]="hasIcon">
            <fd-message-page-title>{{ titleText }}</fd-message-page-title>
            <fd-message-page-subtitle>
                {{ subtitleText }}
            </fd-message-page-subtitle>
            <fd-message-page-actions>
                {{ actionsText }}
            </fd-message-page-actions>
            <fd-message-page-more>
                {{ moreText }}
            </fd-message-page-more>
        </fd-message-page>
    `
})
class TestMessagePageComponent {
    @ViewChild(MessagePageComponent)
    messagePageComponent: MessagePageComponent;

    type = 'error';
    glyph: string;
    hasIcon = true;
    titleText = 'No matching items found.';
    subtitleText = ' Check the filter settings.';
    actionsText = 'Actions';
    moreText = 'Show Details';
}

describe('MessagePageComponent', () => {
    let component: MessagePageComponent;
    let fixture: ComponentFixture<TestMessagePageComponent>;
    let host: TestMessagePageComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MessagePageModule],
            declarations: [TestMessagePageComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestMessagePageComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
        component = host.messagePageComponent;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add proper class to the host', () => {
        const messagePageDebugEl = fixture.debugElement.query(By.directive(MessagePageComponent));
        expect(messagePageDebugEl.nativeElement.className.includes('fd-message-page')).toBe(true);
    });

    it('should render title', () => {
        const messagePageEl: HTMLElement = fixture.debugElement.query(By.directive(MessagePageComponent)).nativeElement;
        expect(messagePageEl.textContent?.includes(host.titleText)).toBeTruthy();
    });

    it('should render subtitle', () => {
        const messagePageEl: HTMLElement = fixture.debugElement.query(By.directive(MessagePageComponent)).nativeElement;
        expect(messagePageEl.textContent?.includes(host.subtitleText)).toBeTruthy();
    });

    it('should render actions', () => {
        const messagePageEl: HTMLElement = fixture.debugElement.query(By.directive(MessagePageComponent)).nativeElement;
        expect(messagePageEl.textContent?.includes(host.actionsText)).toBeTruthy();
    });

    it('should render more', () => {
        const messagePageEl: HTMLElement = fixture.debugElement.query(By.directive(MessagePageComponent)).nativeElement;
        expect(messagePageEl.textContent?.includes(host.moreText)).toBeTruthy();
    });

    it('should has type binding', () => {
        expect(component.type).toBe(host.type);
    });

    it('should has glyph binding', () => {
        expect(component.glyph).toBe('document');
    });

    it('should has hasIcon binding', () => {
        expect(component.hasIcon).toBe(host.hasIcon);
    });
});
