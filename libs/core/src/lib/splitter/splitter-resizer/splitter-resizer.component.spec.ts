import { DOCUMENT } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { whenStable } from '@fundamental-ngx/core/tests';

import { SplitterModule } from '../splitter.module';
import { SplitterResizerComponent } from './splitter-resizer.component';


describe('SplitterResizerComponent', () => {
    let component: SplitterResizerComponent;
    let fixture: ComponentFixture<SplitterResizerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [SplitterModule]
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

    it('should resize with mouse', () => {
        const initialValue = 100;
        const changedValue = 150;

        const startResizeSpy = spyOn(component.startResize, 'emit').and.callThrough();
        const endResizeSpy = spyOn(component.endResize, 'emit').and.callThrough();
        const resizeSpy = spyOn(component.resize, 'emit').and.callThrough();
        const document = TestBed.inject(DOCUMENT);

        component._onMouseDown(new MouseEvent('mousedown', { clientX: initialValue }));
        fixture.detectChanges();

        expect(startResizeSpy).toHaveBeenCalled();

        document.dispatchEvent(new MouseEvent('mousemove', { clientX: changedValue }));
        fixture.detectChanges();

        const diff = changedValue - initialValue;
        expect(resizeSpy).toHaveBeenCalledWith(diff);

        document.dispatchEvent(new MouseEvent('mouseup'));
        fixture.detectChanges();

        expect(endResizeSpy).toHaveBeenCalled();
    });

    it('should resize with keyboard', () => {
        const startResizeSpy = spyOn(component.startResize, 'emit').and.callThrough();
        const endResizeSpy = spyOn(component.endResize, 'emit').and.callThrough();
        const resizeSpy = spyOn(component.resize, 'emit').and.callThrough();

        component._onKeydown(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
        fixture.detectChanges();

        let initialValue = component._start;
        let changedValue = initialValue - 1;

        expect(startResizeSpy).toHaveBeenCalled();
        expect(resizeSpy).toHaveBeenCalledWith(changedValue);
        expect(endResizeSpy).toHaveBeenCalled();

        component._onKeydown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        fixture.detectChanges();

        initialValue = component._start;
        changedValue = initialValue + 1;

        expect(startResizeSpy).toHaveBeenCalled();
        expect(resizeSpy).toHaveBeenCalledWith(changedValue);
        expect(endResizeSpy).toHaveBeenCalled();
    });
});
