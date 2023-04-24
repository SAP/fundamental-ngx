import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { whenStable } from '@fundamental-ngx/core/tests';

import { ROOT_PAGE } from '../constants';
import { SplitterModule } from '../splitter.module';
import { SplitterSplitPaneComponent } from '../splitter-split-pane/splitter-split-pane.component';
import { SplitterPaneContainerComponent } from './splitter-pane-container.component';

@Component({
    template: `
        <fd-splitter>
            <fd-splitter-pane-container>
                <fd-splitter-split-pane #paneOne [id]="paneOneId"> Pane {{ paneOneId }} </fd-splitter-split-pane>

                <fd-splitter-split-pane #paneTwo [id]="paneTwoId"> Pane {{ paneTwoId }} </fd-splitter-split-pane>
            </fd-splitter-pane-container>
        </fd-splitter>
    `
})
class SplitterHostComponent {
    @ViewChild(SplitterPaneContainerComponent)
    paneContainerComponent: SplitterPaneContainerComponent;

    @ViewChild('paneOne')
    paneOne: SplitterSplitPaneComponent;

    @ViewChild('paneTwo')
    paneTwo: SplitterSplitPaneComponent;

    paneOneId = 'one';

    paneTwoId = 'two';
}

describe('SplitterPaneContainerComponent', () => {
    let hostComponent: SplitterHostComponent;
    let paneContainerComponent: SplitterPaneContainerComponent;
    let fixture: ComponentFixture<SplitterHostComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SplitterHostComponent],
            imports: [SplitterModule]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(SplitterHostComponent);
        hostComponent = fixture.debugElement.componentInstance;

        await whenStable(fixture);

        paneContainerComponent = hostComponent.paneContainerComponent;
    });

    it('should create', () => {
        expect(hostComponent).toBeTruthy();
    });

    it('should resize', () => {
        const spy = jest.spyOn(paneContainerComponent.resize, 'emit');

        paneContainerComponent._startResize();
        fixture.detectChanges();

        paneContainerComponent._onResize(hostComponent.paneOneId, -1);
        paneContainerComponent._endResize();
        fixture.detectChanges();

        expect(spy).toHaveBeenCalled();
    });

    it('should switch pages', () => {
        expect(paneContainerComponent._pages.length).toEqual(0);
        expect(paneContainerComponent._currentPage).toEqual(ROOT_PAGE);

        hostComponent.paneOne.hideFromCanvas();
        hostComponent.paneTwo.hideFromCanvas();
        fixture.detectChanges();

        expect(paneContainerComponent._pages.length).toEqual(2);

        paneContainerComponent._onPageChange(hostComponent.paneTwoId);
        fixture.detectChanges();

        expect(paneContainerComponent._currentPage).toEqual(hostComponent.paneTwoId);

        paneContainerComponent._onPageChange(hostComponent.paneOneId);
        fixture.detectChanges();

        expect(paneContainerComponent._currentPage).toEqual(hostComponent.paneOneId);

        hostComponent.paneOne.showOnCanvas();
        hostComponent.paneTwo.showOnCanvas();
        fixture.detectChanges();

        expect(paneContainerComponent._pages.length).toEqual(0);
        expect(paneContainerComponent._currentPage).toEqual(ROOT_PAGE);
    });
});
