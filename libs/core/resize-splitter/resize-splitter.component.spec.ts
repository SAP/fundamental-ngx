import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResizeSplitterComponent } from './resize-splitter.component';

@Component({
    imports: [ResizeSplitterComponent],
    template: `<fd-resize-splitter [size]="size()" [min]="100" [max]="400" (sizeChange)="size.set($event)" />`
})
class ResizeSplitterTestHostComponent {
    readonly size = signal(200);
}

@Component({
    imports: [ResizeSplitterComponent],
    template: `<fd-resize-splitter [disabled]="true" />`
})
class ResizeSplitterDisabledTestHostComponent {}

describe('ResizeSplitterComponent', () => {
    let fixture: ComponentFixture<ResizeSplitterTestHostComponent>;
    let host: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [ResizeSplitterTestHostComponent] });
        fixture = TestBed.createComponent(ResizeSplitterTestHostComponent);
        fixture.detectChanges();
        host = fixture.nativeElement.querySelector('fd-resize-splitter');
    });

    it('applies fdkSplitter separator semantics on its host', () => {
        expect(host.getAttribute('role')).toBe('separator');
        expect(host.getAttribute('aria-valuenow')).toBe('200');
        expect(host.getAttribute('aria-valuemin')).toBe('100');
        expect(host.getAttribute('aria-valuemax')).toBe('400');
        expect(host.getAttribute('tabindex')).toBe('0');
    });

    it('renders the grip affordance', () => {
        expect(host.querySelector('.fd-resize-splitter__grip')).toBeTruthy();
    });

    it('forwards keyboard resize through to sizeChange', () => {
        host.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
        fixture.detectChanges();
        expect(fixture.componentInstance.size()).toBe(210);
    });
});

describe('ResizeSplitterComponent (disabled)', () => {
    it('forwards disabled: host is not tabbable and is aria-disabled', () => {
        TestBed.configureTestingModule({ imports: [ResizeSplitterDisabledTestHostComponent] });
        const fixture = TestBed.createComponent(ResizeSplitterDisabledTestHostComponent);
        fixture.detectChanges();
        const host = fixture.nativeElement.querySelector('fd-resize-splitter') as HTMLElement;

        expect(host.getAttribute('tabindex')).toBe('-1');
        expect(host.getAttribute('aria-disabled')).toBe('true');
    });
});
