import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RtlService } from '../../services/rtl.service';
import { SplitterDirective } from './splitter.directive';

@Component({
    imports: [SplitterDirective],
    template: `
        <div
            fdkSplitter
            grows="end"
            defaultSize="250"
            [size]="sizeSignal()"
            [min]="100"
            [max]="400"
            (sizeChange)="sizeSignal.set($event)"
            (resizeStart)="startCount = startCount + 1"
            (resizeEnd)="endCount = endCount + 1"
        ></div>
    `
})
class HostComponent {
    readonly sizeSignal = signal(200);
    startCount = 0;
    endCount = 0;

    set size(v: number) {
        this.sizeSignal.set(v);
    }

    get size(): number {
        return this.sizeSignal();
    }
}

describe('SplitterDirective', () => {
    let fixture: ComponentFixture<HostComponent>;
    let bar: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [HostComponent] });
        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        bar = fixture.nativeElement.querySelector('[fdkSplitter]');
    });

    it('exposes separator ARIA and is focusable', () => {
        expect(bar.getAttribute('role')).toBe('separator');
        expect(bar.getAttribute('aria-orientation')).toBe('vertical');
        expect(bar.getAttribute('aria-valuenow')).toBe('200');
        expect(bar.getAttribute('aria-valuemin')).toBe('100');
        expect(bar.getAttribute('aria-valuemax')).toBe('400');
        expect(bar.getAttribute('tabindex')).toBe('0');
    });

    function dispatchKey(el: HTMLElement, key: string, opts: KeyboardEventInit = {}): void {
        el.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, ...opts }));
    }

    describe('keyboard resize', () => {
        it('ArrowRight grows by step, ArrowLeft shrinks by step (LTR)', () => {
            dispatchKey(bar, 'ArrowRight');
            fixture.detectChanges();
            expect(fixture.componentInstance.size).toBe(210);
            dispatchKey(bar, 'ArrowLeft');
            fixture.detectChanges();
            expect(fixture.componentInstance.size).toBe(200);
        });

        it('Shift+ArrowRight uses largeStep', () => {
            dispatchKey(bar, 'ArrowRight', { shiftKey: true });
            fixture.detectChanges();
            expect(fixture.componentInstance.size).toBe(300);
        });

        it('clamps at max', () => {
            fixture.componentInstance.size = 395;
            fixture.detectChanges();
            dispatchKey(bar, 'ArrowRight'); // 395 + 10 -> clamp 400
            fixture.detectChanges();
            expect(fixture.componentInstance.size).toBe(400);
        });

        it('Home sets size to max, End sets size to min', () => {
            dispatchKey(bar, 'Home');
            fixture.detectChanges();
            expect(fixture.componentInstance.size).toBe(400); // max
            dispatchKey(bar, 'End');
            fixture.detectChanges();
            expect(fixture.componentInstance.size).toBe(100); // min
        });

        it('Enter resets size to the default input', () => {
            fixture.componentInstance.size = 350;
            fixture.detectChanges();
            dispatchKey(bar, 'Enter');
            fixture.detectChanges();
            expect(fixture.componentInstance.size).toBe(250); // host sets defaultSize="250"
        });
    });

    describe('pointer drag', () => {
        it('grows on +X movement when grows="end" (LTR), clamped, with start/end events', () => {
            bar.dispatchEvent(new MouseEvent('mousedown', { clientX: 500, bubbles: true }));
            expect(fixture.componentInstance.startCount).toBe(1);

            document.dispatchEvent(new MouseEvent('mousemove', { clientX: 540 })); // +40 -> 240
            fixture.detectChanges();
            expect(fixture.componentInstance.size).toBe(240);

            document.dispatchEvent(new MouseEvent('mousemove', { clientX: 1000 })); // +460 -> clamp 400
            fixture.detectChanges();
            expect(fixture.componentInstance.size).toBe(400);

            document.dispatchEvent(new MouseEvent('mouseup'));
            expect(fixture.componentInstance.endCount).toBe(1);

            document.dispatchEvent(new MouseEvent('mousemove', { clientX: 1100 }));
            fixture.detectChanges();
            expect(fixture.componentInstance.size).toBe(400);
        });
    });
});

describe('SplitterDirective keyboard (RTL)', () => {
    it('ArrowRight shrinks, ArrowLeft grows when RTL', () => {
        TestBed.configureTestingModule({
            imports: [HostComponent],
            providers: [{ provide: RtlService, useValue: { rtl: signal(true) } }]
        });
        const f = TestBed.createComponent(HostComponent);
        f.detectChanges();
        const el = f.nativeElement.querySelector('[fdkSplitter]') as HTMLElement;
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
        f.detectChanges();
        expect(f.componentInstance.size).toBe(190);
    });
});

@Component({
    imports: [SplitterDirective],
    template: `
        <div
            fdkSplitter
            grows="start"
            defaultSize="250"
            [size]="sizeSignal()"
            [min]="100"
            [max]="400"
            (sizeChange)="sizeSignal.set($event)"
        ></div>
    `
})
class GrowsStartHostComponent {
    readonly sizeSignal = signal(200);

    set size(v: number) {
        this.sizeSignal.set(v);
    }

    get size(): number {
        return this.sizeSignal();
    }
}

describe('SplitterDirective keyboard grows="start" (right-docked panel, LTR)', () => {
    it('ArrowLeft expands, ArrowRight shrinks', () => {
        TestBed.configureTestingModule({ imports: [GrowsStartHostComponent] });
        const f = TestBed.createComponent(GrowsStartHostComponent);
        f.detectChanges();
        const el = f.nativeElement.querySelector('[fdkSplitter]') as HTMLElement;

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
        f.detectChanges();
        expect(f.componentInstance.size).toBe(210); // expanded

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
        f.detectChanges();
        expect(f.componentInstance.size).toBe(200); // shrunk back
    });
});

@Component({
    imports: [SplitterDirective],
    template: `
        <div fdkSplitter [size]="sizeSignal()" [min]="100" [max]="400" (sizeChange)="sizeSignal.set($event)"></div>
    `
})
class BoundedNoDefaultHostComponent {
    readonly sizeSignal = signal(350);
}

describe('SplitterDirective Enter without defaultSize (finite bounds)', () => {
    it('Enter resets size to the midpoint of min/max', () => {
        TestBed.configureTestingModule({ imports: [BoundedNoDefaultHostComponent] });
        const f = TestBed.createComponent(BoundedNoDefaultHostComponent);
        f.detectChanges();
        const el = f.nativeElement.querySelector('[fdkSplitter]') as HTMLElement;
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        f.detectChanges();
        expect(f.componentInstance.sizeSignal()).toBe(250); // (100 + 400) / 2
    });
});

@Component({
    imports: [SplitterDirective],
    template: ` <div fdkSplitter [size]="sizeSignal()" (sizeChange)="sizeSignal.set($event)"></div> `
})
class UnboundedHostComponent {
    readonly sizeSignal = signal(200);
}

describe('SplitterDirective presets when unbounded (min=0, max=Infinity)', () => {
    let f: ComponentFixture<UnboundedHostComponent>;
    let el: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [UnboundedHostComponent] });
        f = TestBed.createComponent(UnboundedHostComponent);
        f.detectChanges();
        el = f.nativeElement.querySelector('[fdkSplitter]') as HTMLElement;
    });

    it('Home is a no-op (max is unbounded)', () => {
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
        f.detectChanges();
        expect(f.componentInstance.sizeSignal()).toBe(200);
    });

    it('Enter is a no-op (no defaultSize and unbounded midpoint)', () => {
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        f.detectChanges();
        expect(f.componentInstance.sizeSignal()).toBe(200);
    });
});
