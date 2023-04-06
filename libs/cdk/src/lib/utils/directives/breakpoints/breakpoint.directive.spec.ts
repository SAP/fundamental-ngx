import { BreakpointDirective } from './breakpoint.directive';
import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { ViewportSizeObservable } from '../../tokens/viewport-size.observable';

@Component({
    template: `
        <ng-template
            [fdkBreakpointS]="showOnS"
            [fdkBreakpointM]="showOnM"
            [fdkBreakpointL]="showOnL"
            [fdkBreakpointXL]="showOnXL"
            [fdkBreakpointLt]="lt"
            [fdkBreakpointGt]="gt"
        >
            <div id="element">Hello World!</div>
        </ng-template>
    `
})
class TestComponent {
    showOnS: boolean;
    showOnM: boolean;
    showOnL: boolean;
    showOnXL: boolean;
    lt: number;
    gt: number;
}

describe('BreakpointDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    const viewportSizeObservable$ = new BehaviorSubject<number>(800);
    const findElement = (): HTMLElement => fixture.nativeElement.querySelector('#element');
    beforeEach(() => {
        viewportSizeObservable$.next(1920);
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [BreakpointDirective],
            providers: [{ provide: ViewportSizeObservable, useValue: viewportSizeObservable$ }]
        });

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show element on s', () => {
        component.showOnS = true;
        viewportSizeObservable$.next(400);
        fixture.detectChanges();
        expect(findElement()).toBeTruthy();
    });

    it('should hide element on M', () => {
        component.showOnS = true;
        component.showOnM = false;
        viewportSizeObservable$.next(1000);
        fixture.detectChanges();
        expect(findElement()).toBeFalsy();
    });

    it('should show and hide element on lt specification', () => {
        component.lt = 1000;
        viewportSizeObservable$.next(800);
        fixture.detectChanges();
        expect(findElement()).toBeTruthy();

        viewportSizeObservable$.next(1500);
        fixture.detectChanges();
        expect(findElement()).toBeFalsy();
    });

    it('should show and hide element on gt specification', () => {
        component.gt = 1000;
        viewportSizeObservable$.next(800);
        fixture.detectChanges();
        expect(findElement()).toBeFalsy();

        viewportSizeObservable$.next(1001);
        fixture.detectChanges();
        expect(findElement()).toBeTruthy();
    });
});
