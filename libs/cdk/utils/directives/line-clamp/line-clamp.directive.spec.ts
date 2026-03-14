import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

import { ViewportSizeObservable } from '../../tokens/viewport-size.observable';
import { LineClampDirective, LineClampTargetDirective } from './line-clamp.directive';

const LONG_TEXT =
    'Long text, you can toggle view with more/less button. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.';

@Component({
    template: `
        <div
            fdkLineClamp
            [fdLineclampState]="clampState"
            [fdLineClampLines]="rows"
            (lineCountUpdate)="onLineCountUpdate($event)"
        >
            <span
                fdkLineClampTarget
                [fdLineClampTargetText]="text"
                (update)="lineClampDirective?.refreshTarget($event)"
            >
                {{ text }}
            </span>
        </div>
    `,
    imports: [LineClampDirective, LineClampTargetDirective]
})
class TestComponent {
    @ViewChild(LineClampDirective) lineClampDirective: LineClampDirective;
    @ViewChild(LineClampTargetDirective) lineClampTargetDirective: LineClampTargetDirective;

    text = LONG_TEXT;
    rows = 2;
    clampState = true;
    lineCount: number | undefined;

    onLineCountUpdate(count: number): void {
        this.lineCount = count;
    }
}

@Component({
    template: `
        <div fdkLineClamp [fdLineclampState]="false" [fdLineClampLines]="3">
            <span fdkLineClampTarget [fdLineClampTargetText]="text">{{ text }}</span>
        </div>
    `,
    imports: [LineClampDirective, LineClampTargetDirective]
})
class DisabledClampTestComponent {
    text = LONG_TEXT;
}

@Component({
    template: ` <div fdkLineClampTarget [fdLineClampTargetText]="text">{{ text }}</div> `,
    imports: [LineClampTargetDirective]
})
class StandaloneTargetTestComponent {
    @ViewChild(LineClampTargetDirective) targetDirective: LineClampTargetDirective;
    text = 'Sample text';
}

describe('LineClampDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let lineClampDebugElement: DebugElement;
    let lineClampTargetDebugElement: DebugElement;
    let viewportSizeSubject: BehaviorSubject<number>;

    beforeEach(() => {
        viewportSizeSubject = new BehaviorSubject<number>(1024);

        TestBed.configureTestingModule({
            imports: [TestComponent],
            providers: [{ provide: ViewportSizeObservable, useValue: viewportSizeSubject.asObservable() }]
        });

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        lineClampDebugElement = fixture.debugElement.query(By.directive(LineClampDirective));
        lineClampTargetDebugElement = fixture.debugElement.query(By.directive(LineClampTargetDirective));
    });

    it('should create LineClampDirective instance', () => {
        expect(lineClampDebugElement).toBeTruthy();
        expect(component.lineClampDirective).toBeTruthy();
    });

    it('should create LineClampTargetDirective instance', () => {
        expect(lineClampTargetDebugElement).toBeTruthy();
        expect(component.lineClampTargetDirective).toBeTruthy();
    });

    it('should expose rootElement via getter', () => {
        const rootElement = component.lineClampDirective.rootElement;
        expect(rootElement).toBe(lineClampDebugElement.nativeElement);
    });

    it('should expose targetElement via getter on LineClampTargetDirective', () => {
        const targetElement = component.lineClampTargetDirective.targetElement;
        expect(targetElement).toBe(lineClampTargetDebugElement.nativeElement);
    });

    describe('native line-clamp support', () => {
        it('should apply native CSS styles when clampState is true', () => {
            component.clampState = true;
            component.rows = 3;
            fixture.detectChanges();

            const rootElement = lineClampDebugElement.nativeElement as HTMLElement;

            expect(rootElement.style.display).toBe('-webkit-box');
            expect(rootElement.style.overflow).toBe('hidden');
            expect(rootElement.style.textOverflow).toBe('ellipsis');
            expect(rootElement.style.webkitLineClamp).toBe('3');
        });

        it('should reset native CSS styles when clampState changes to false', () => {
            component.clampState = true;
            fixture.detectChanges();

            component.clampState = false;
            fixture.detectChanges();

            const rootElement = lineClampDebugElement.nativeElement as HTMLElement;

            expect(rootElement.style.display).toBe('');
            expect(rootElement.style.overflow).toBe('');
            expect(rootElement.style.webkitLineClamp).toBe('');
        });
    });

    describe('line count changes', () => {
        it('should update styles when fdLineClampLines changes', () => {
            component.rows = 2;
            fixture.detectChanges();

            const rootElement = lineClampDebugElement.nativeElement as HTMLElement;
            expect(rootElement.style.webkitLineClamp).toBe('2');

            component.rows = 5;
            fixture.detectChanges();

            expect(rootElement.style.webkitLineClamp).toBe('5');
        });

        it('should accept a string attribute value and apply the correct line clamp', () => {
            (component as any).rows = '4';
            fixture.detectChanges();

            const rootElement = lineClampDebugElement.nativeElement as HTMLElement;
            expect(rootElement.style.webkitLineClamp).toBe('4');
        });
    });

    describe('text updates', () => {
        it('should refresh target when text changes', () => {
            const newText = 'New shorter text';
            component.text = newText;
            fixture.detectChanges();

            const targetElement = lineClampTargetDebugElement.nativeElement as HTMLElement;
            expect(targetElement.textContent?.trim()).toContain(newText);
        });

        it('should emit update event when target text changes', () => {
            const updateSpy = jest.spyOn(component.lineClampTargetDirective.update, 'emit');

            component.text = 'Changed text';
            fixture.detectChanges();

            expect(updateSpy).toHaveBeenCalled();
        });
    });

    describe('lineCountUpdate output', () => {
        it('should emit lineCountUpdate after view init', fakeAsync(() => {
            tick();
            expect(component.lineCount).toBeDefined();
            expect(typeof component.lineCount).toBe('number');
        }));
    });

    describe('viewport resize handling', () => {
        it('should recalculate line count on viewport resize', fakeAsync(() => {
            tick();

            viewportSizeSubject.next(800);
            tick(250);

            expect(component.lineCount).toBeDefined();
        }));
    });

    describe('reset functionality', () => {
        it('should restore original text on reset', () => {
            component.clampState = true;
            fixture.detectChanges();

            component.lineClampDirective.reset();

            const targetElement = lineClampTargetDebugElement.nativeElement as HTMLElement;
            expect(targetElement.textContent?.trim()).toContain(LONG_TEXT);
        });
    });
});

describe('LineClampTargetDirective (standalone)', () => {
    let fixture: ComponentFixture<StandaloneTargetTestComponent>;
    let component: StandaloneTargetTestComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [StandaloneTargetTestComponent]
        });

        fixture = TestBed.createComponent(StandaloneTargetTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create standalone target directive', () => {
        expect(component.targetDirective).toBeTruthy();
    });

    it('should expose targetElement', () => {
        const element = component.targetDirective.targetElement;
        expect(element).toBeTruthy();
        expect(element.tagName).toBe('DIV');
    });

    it('should display the provided text in the target element', () => {
        expect(component.targetDirective.targetElement.textContent?.trim()).toContain('Sample text');
    });

    it('should emit update event on changes', () => {
        const updateSpy = jest.spyOn(component.targetDirective.update, 'emit');

        component.text = 'Updated text';
        fixture.detectChanges();

        expect(updateSpy).toHaveBeenCalledWith(component.targetDirective);
    });

    it('should emit update event after view init', () => {
        const newFixture = TestBed.createComponent(StandaloneTargetTestComponent);
        const newComponent = newFixture.componentInstance;

        const updateSpy = jest.fn();
        newFixture.detectChanges();

        newComponent.targetDirective.update.subscribe(updateSpy);
        newComponent.text = 'trigger change';
        newFixture.detectChanges();

        expect(updateSpy).toHaveBeenCalled();
    });
});

describe('LineClampDirective with fdLineclampState disabled', () => {
    let fixture: ComponentFixture<DisabledClampTestComponent>;
    let lineClampDebugElement: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [DisabledClampTestComponent],
            providers: [{ provide: ViewportSizeObservable, useValue: new BehaviorSubject<number>(1024).asObservable() }]
        });

        fixture = TestBed.createComponent(DisabledClampTestComponent);
        fixture.detectChanges();

        lineClampDebugElement = fixture.debugElement.query(By.directive(LineClampDirective));
    });

    it('should not apply any clamping styles when fdLineclampState is false', () => {
        const rootElement = lineClampDebugElement.nativeElement as HTMLElement;
        expect(rootElement.style.display).toBe('');
        expect(rootElement.style.overflow).toBe('');
        expect(rootElement.style.textOverflow).toBe('');
        expect(rootElement.style.webkitLineClamp).toBe('');
    });
});

describe('LineClampDirective selectors', () => {
    @Component({
        template: `<div fdLineClampTarget [fdLineClampTargetText]="'test'">Test</div>`,
        imports: [LineClampTargetDirective]
    })
    class FdLineClampTargetSelectorComponent {}

    @Component({
        template: `<div fd-lineclamp-target [fdLineClampTargetText]="'test'">Test</div>`,
        imports: [LineClampTargetDirective]
    })
    class FdLineclampTargetSelectorComponent {}

    it('should work with fdLineClampTarget selector', () => {
        const selectorFixture = TestBed.createComponent(FdLineClampTargetSelectorComponent);
        selectorFixture.detectChanges();

        const directive = selectorFixture.debugElement.query(By.directive(LineClampTargetDirective));
        expect(directive).toBeTruthy();
    });

    it('should work with fd-lineclamp-target selector', () => {
        const selectorFixture = TestBed.createComponent(FdLineclampTargetSelectorComponent);
        selectorFixture.detectChanges();

        const directive = selectorFixture.debugElement.query(By.directive(LineClampTargetDirective));
        expect(directive).toBeTruthy();
    });
});
