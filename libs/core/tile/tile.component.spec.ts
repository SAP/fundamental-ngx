import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TileComponent } from './tile.component';

@Component({
    template: '<a fd-tile href="/test" target="_blank" rel="noopener">Link Tile</a>',
    imports: [TileComponent]
})
class TestLinkComponent {}

describe('TileComponent', () => {
    let component: TileComponent;
    let fixture: ComponentFixture<TileComponent>;

    beforeEach(() => {
        fixture = TestBed.createComponent(TileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component).toBeDefined();
    });

    it('should apply base class', () => {
        const hostElement = fixture.nativeElement as HTMLElement;
        expect(hostElement.className).toContain('fd-tile');
    });

    it('should apply size class when size input is set', () => {
        fixture.componentRef.setInput('size', 's');
        fixture.detectChanges();

        const hostElement = fixture.nativeElement as HTMLElement;
        expect(hostElement.className).toContain('fd-tile--s');
    });

    it('should apply double class when double input is true', () => {
        fixture.componentRef.setInput('double', true);
        fixture.detectChanges();

        const hostElement = fixture.nativeElement as HTMLElement;
        expect(hostElement.className).toContain('fd-tile--double');
    });

    it('should apply type class when type input is set', () => {
        fixture.componentRef.setInput('type', 'kpi');
        fixture.detectChanges();

        const hostElement = fixture.nativeElement as HTMLElement;
        expect(hostElement.className).toContain('fd-tile--kpi');
    });

    it('should apply action class when action input is true', () => {
        fixture.componentRef.setInput('action', true);
        fixture.detectChanges();

        const hostElement = fixture.nativeElement as HTMLElement;
        expect(hostElement.className).toContain('fd-tile--action');
    });

    it('should apply multiple classes together', () => {
        fixture.componentRef.setInput('type', 'kpi');
        fixture.componentRef.setInput('action', true);
        fixture.componentRef.setInput('double', true);
        fixture.componentRef.setInput('size', 's');
        fixture.detectChanges();

        const hostElement = fixture.nativeElement as HTMLElement;
        expect(hostElement.className).toContain('fd-tile');
        expect(hostElement.className).toContain('fd-tile--s');
        expect(hostElement.className).toContain('fd-tile--double');
        expect(hostElement.className).toContain('fd-tile--kpi');
        expect(hostElement.className).toContain('fd-tile--action');
    });

    it('should set tabindex to 0 when clickable is true', () => {
        fixture.componentRef.setInput('clickable', true);
        fixture.detectChanges();

        const hostElement = fixture.nativeElement as HTMLElement;
        expect(hostElement.getAttribute('tabindex')).toBe('0');
    });

    it('should set tabindex to -1 when clickable is false', () => {
        fixture.componentRef.setInput('clickable', false);
        fixture.detectChanges();

        const hostElement = fixture.nativeElement as HTMLElement;
        expect(hostElement.getAttribute('tabindex')).toBe('-1');
    });

    it('should emit tileClick when clicked and clickable is true', () => {
        fixture.componentRef.setInput('clickable', true);
        fixture.detectChanges();

        const emitSpy = jest.fn();
        component.tileClick.subscribe(emitSpy);

        const hostElement = fixture.nativeElement as HTMLElement;
        hostElement.click();

        expect(emitSpy).toHaveBeenCalled();
    });

    it('should not emit tileClick when clicked and clickable is false', () => {
        fixture.componentRef.setInput('clickable', false);
        fixture.detectChanges();

        const emitSpy = jest.fn();
        component.tileClick.subscribe(emitSpy);

        const hostElement = fixture.nativeElement as HTMLElement;
        hostElement.click();

        expect(emitSpy).not.toHaveBeenCalled();
    });

    it('should emit tileClick on enter key when clickable is true', () => {
        fixture.componentRef.setInput('clickable', true);
        fixture.detectChanges();

        const emitSpy = jest.fn();
        component.tileClick.subscribe(emitSpy);

        const hostElement = fixture.nativeElement as HTMLElement;
        const event = new KeyboardEvent('keyup', { key: 'Enter' });
        hostElement.dispatchEvent(event);

        expect(emitSpy).toHaveBeenCalled();
    });

    it('should emit tileClick on space key when clickable is true', () => {
        fixture.componentRef.setInput('clickable', true);
        fixture.detectChanges();

        const emitSpy = jest.fn();
        component.tileClick.subscribe(emitSpy);

        const hostElement = fixture.nativeElement as HTMLElement;
        const event = new KeyboardEvent('keyup', { key: ' ' });
        hostElement.dispatchEvent(event);

        expect(emitSpy).toHaveBeenCalled();
    });

    it('should render overlay when action is true', () => {
        fixture.componentRef.setInput('action', true);
        fixture.detectChanges();

        const hostElement = fixture.nativeElement as HTMLElement;
        const overlay = hostElement.querySelector('.fd-tile__overlay');
        expect(overlay).toBeTruthy();
    });

    it('should not render overlay when action is false', () => {
        fixture.componentRef.setInput('action', false);
        fixture.detectChanges();

        const hostElement = fixture.nativeElement as HTMLElement;
        const overlay = hostElement.querySelector('.fd-tile__overlay');
        expect(overlay).toBeFalsy();
    });

    describe('as native link (attribute selector)', () => {
        let linkFixture: ComponentFixture<TestLinkComponent>;
        let linkElement: HTMLAnchorElement;

        beforeEach(() => {
            linkFixture = TestBed.createComponent(TestLinkComponent);
            linkFixture.detectChanges();
            linkElement = linkFixture.nativeElement.querySelector('a');
        });

        it('should work as attribute selector on <a> tag', () => {
            expect(linkElement).toBeTruthy();
            expect(linkElement.tagName).toBe('A');
            expect(linkElement.className).toContain('fd-tile');
        });

        it('should preserve native link attributes', () => {
            expect(linkElement.getAttribute('href')).toBe('/test');
            expect(linkElement.getAttribute('target')).toBe('_blank');
            expect(linkElement.getAttribute('rel')).toBe('noopener');
        });

        it('should not set tabindex on native link', () => {
            // Native links manage their own tabindex
            expect(linkElement.getAttribute('tabindex')).toBeNull();
        });

        it('should not set role on native link', () => {
            // Native <a> has implicit role
            expect(linkElement.getAttribute('role')).toBeNull();
        });

        it('should emit tileClick when native link is clicked', () => {
            const tileComponent = linkFixture.debugElement.children[0].componentInstance;
            const emitSpy = jest.fn();
            tileComponent.tileClick.subscribe(emitSpy);

            linkElement.click();

            expect(emitSpy).toHaveBeenCalled();
        });
    });
});
