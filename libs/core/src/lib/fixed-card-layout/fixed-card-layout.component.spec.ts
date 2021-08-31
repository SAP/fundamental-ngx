import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CardModule } from '@fundamental-ngx/core/card';
import { FixedCardLayoutComponent, FixedCardLayoutModule } from '@fundamental-ngx/core/fixed-card-layout';
import { whenStable } from '@fundamental-ngx/core/tests';
import { RtlService } from '@fundamental-ngx/core/utils';

@Component({
    template: `
        <div>
            <fd-fixed-card-layout>
                <fd-card *fdCardDef>1</fd-card>
                <fd-card *fdCardDef>2</fd-card>
                <fd-card *fdCardDef>3</fd-card>
                <fd-card *fdCardDef>4</fd-card>
                <fd-card *fdCardDef>5</fd-card>
            </fd-fixed-card-layout>
        </div>
    `
})
class TestFixedCardLayoutComponent {
    @ViewChild(FixedCardLayoutComponent)
    fixedCardLayout: FixedCardLayoutComponent;
}

describe('FixedCardLayoutComponent', () => {
    let component: TestFixedCardLayoutComponent;
    let fixture: ComponentFixture<TestFixedCardLayoutComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CardModule, FixedCardLayoutModule],
            declarations: [TestFixedCardLayoutComponent],
            providers: [RtlService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestFixedCardLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have 5 cards on screen', async () => {
        await whenStable(fixture);

        expect(component.fixedCardLayout.cards.length).toEqual(5);
    });

    it('should have 4 columns on Laptop width size value of 1600px', async () => {
        await whenStable(fixture);

        spyOn(component.fixedCardLayout, 'getWidthAvailable').and.returnValue(1600);

        component.fixedCardLayout.updateLayout();
        await whenStable(fixture);

        expect(component.fixedCardLayout.columns.length).toEqual(4);
    });

    it('should have 1 columns on 500px width size value', async () => {
        await whenStable(fixture);

        spyOn(component.fixedCardLayout, 'getWidthAvailable').and.returnValue(500);

        component.fixedCardLayout.updateLayout();
        await whenStable(fixture);

        expect(component.fixedCardLayout.columns.length).toEqual(1);
    });

    it('should have 2 columns on 656px width size value', async () => {
        await whenStable(fixture);

        spyOn(component.fixedCardLayout, 'getWidthAvailable').and.returnValue(656);

        component.fixedCardLayout.updateLayout();
        await whenStable(fixture);

        expect(component.fixedCardLayout.columns.length).toEqual(2);
    });

    it('should have 3 columns on 992px width size value', async () => {
        await whenStable(fixture);

        spyOn(component.fixedCardLayout, 'getWidthAvailable').and.returnValue(992);

        component.fixedCardLayout.updateLayout();
        await whenStable(fixture);

        expect(component.fixedCardLayout.columns.length).toEqual(3);
    });

    it('should have 5 columns on 1664px width size value', async () => {
        await whenStable(fixture);

        spyOn(component.fixedCardLayout, 'getWidthAvailable').and.returnValue(1664);

        component.fixedCardLayout.updateLayout();
        await whenStable(fixture);

        expect(component.fixedCardLayout.columns.length).toEqual(5);
    });

    it('should have 1 columns on 300px width size value', async () => {
        await whenStable(fixture);

        spyOn(component.fixedCardLayout, 'getWidthAvailable').and.returnValue(300);

        component.fixedCardLayout.updateLayout();
        await whenStable(fixture);

        expect(component.fixedCardLayout.columns.length).toEqual(1);
    });
});
