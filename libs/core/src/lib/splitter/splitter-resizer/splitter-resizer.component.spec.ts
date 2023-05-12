import { DOCUMENT } from '@angular/common';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { whenStable } from '@fundamental-ngx/core/tests';

import { SplitterResizerComponent } from './splitter-resizer.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SplitterResizerComponent', () => {
    let component: SplitterResizerComponent;
    let fixture: ComponentFixture<SplitterResizerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SplitterResizerComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(SplitterResizerComponent);
        component = fixture.debugElement.componentInstance;

        await whenStable(fixture);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should resize with mouse', fakeAsync(async () => {
        const initialValue = 100;
        const changedValue = 150;

        const startResizeSpy = jest.spyOn(component.startResize, 'emit');
        const endResizeSpy = jest.spyOn(component.endResize, 'emit');
        const resizeSpy = jest.spyOn(component.resize, 'emit');
        const document = TestBed.inject(DOCUMENT);

        component._onMouseDown(new MouseEvent('mousedown', { clientX: initialValue }));
        fixture.detectChanges();

        expect(startResizeSpy).toHaveBeenCalled();

        document.dispatchEvent(new MouseEvent('mousemove', { clientX: changedValue }));

        tick(10);
        fixture.detectChanges();

        const diff = changedValue - initialValue;
        expect(resizeSpy).toHaveBeenCalledWith(diff);

        document.dispatchEvent(new MouseEvent('mouseup'));
        fixture.detectChanges();

        expect(endResizeSpy).toHaveBeenCalled();
    }));

    it('should resize with keyboard', () => {
        const startResizeSpy = jest.spyOn(component.startResize, 'emit');
        const endResizeSpy = jest.spyOn(component.endResize, 'emit');
        const resizeSpy = jest.spyOn(component.resize, 'emit');

        component._onKeydown(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
        fixture.detectChanges();

        let initialValue = component._start as number;
        expect(initialValue).toBeDefined();
        let changedValue = initialValue - 1;

        expect(startResizeSpy).toHaveBeenCalled();
        expect(resizeSpy).toHaveBeenCalledWith(changedValue);
        expect(endResizeSpy).toHaveBeenCalled();

        component._onKeydown(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
        fixture.detectChanges();

        initialValue = component._start as number;
        expect(initialValue).toBeDefined();
        changedValue = initialValue + 1;

        expect(startResizeSpy).toHaveBeenCalled();
        expect(resizeSpy).toHaveBeenCalledWith(changedValue);
        expect(endResizeSpy).toHaveBeenCalled();
    });
});
