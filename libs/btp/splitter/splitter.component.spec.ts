import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { whenStable } from '@fundamental-ngx/core/tests';
import { SplitterPaneContainerComponent } from './splitter-pane-container/splitter-pane-container.component';

import { SplitterSplitPaneComponent } from './splitter-split-pane/splitter-split-pane.component';
import { SplitterComponent } from './splitter.component';

@Component({
    template: `
        <fdb-splitter>
            <fdb-splitter-pane-container>
                <fdb-splitter-split-pane #paneOne [id]="paneOneId"> Pane {{ paneOneId }} </fdb-splitter-split-pane>
            </fdb-splitter-pane-container>
        </fdb-splitter>
    `,
    standalone: true,
    imports: [SplitterComponent, SplitterSplitPaneComponent, SplitterPaneContainerComponent]
})
class SplitterHostComponent {
    @ViewChild(SplitterComponent)
    splitterComponent: SplitterComponent;

    @ViewChild('paneOne')
    paneOne: SplitterSplitPaneComponent;

    paneOneId = 'one';
}

describe('SplitterComponent', () => {
    let hostComponent: SplitterHostComponent;
    let splitterComponent: SplitterComponent;
    let fixture: ComponentFixture<SplitterHostComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [SplitterHostComponent]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(SplitterHostComponent);
        hostComponent = fixture.debugElement.componentInstance;

        await whenStable(fixture);

        splitterComponent = hostComponent.splitterComponent;
    });

    it('should create', () => {
        expect(hostComponent).toBeTruthy();
    });

    it('should toggle pane on the canvas', () => {
        const hideSpy = jest.spyOn(hostComponent.paneOne, 'hideFromCanvas');
        const showSpy = jest.spyOn(hostComponent.paneOne, 'showOnCanvas');

        splitterComponent.hidePaneFromCanvas(hostComponent.paneOneId);
        fixture.detectChanges();

        expect(hideSpy).toHaveBeenCalled();
        expect(splitterComponent.isPaneOnCanvas(hostComponent.paneOneId)).toBe(false);

        splitterComponent.showPaneOnCanvas(hostComponent.paneOneId);
        fixture.detectChanges();

        expect(showSpy).toHaveBeenCalled();
        expect(splitterComponent.isPaneOnCanvas(hostComponent.paneOneId)).toBe(true);
    });
});
