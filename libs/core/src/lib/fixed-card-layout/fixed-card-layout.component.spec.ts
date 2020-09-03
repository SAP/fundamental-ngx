import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, ViewChild } from '@angular/core';

import { FixedCardLayoutComponent, CardDefinitionDirective } from './fixed-card-layout.component';
@Component({
    template: `
        <div [style.width]="containerWidth">
            <fd-fixed-card-layout>
                <li *fdCardDef>1</li>
                <li *fdCardDef>2</li>
                <li *fdCardDef>3</li>
                <li *fdCardDef>4</li>
                <li *fdCardDef>5</li>
            </fd-fixed-card-layout>
        </div>
    `
})
class TestFixedCardLayoutComponent {
    containerWidth: string;

    @ViewChild(FixedCardLayoutComponent)
    fixedCardLayout: FixedCardLayoutComponent;
}

describe('FixedCardLayoutComponent', () => {
    let component: TestFixedCardLayoutComponent;
    let fixture: ComponentFixture<TestFixedCardLayoutComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FixedCardLayoutComponent, CardDefinitionDirective, TestFixedCardLayoutComponent],
            imports: [CommonModule, DragDropModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestFixedCardLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    async function wait(componentFixture: ComponentFixture<any>): Promise<void> {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have 5 cards on screen', async () => {
        await wait(fixture);
        fixture.detectChanges();

        expect(component.fixedCardLayout.cards.length).toEqual(5);
    });

    it('should have 4 columns on Laptop width size value of 1600px', async () => {
        await wait(fixture);

        spyOn(component.fixedCardLayout, 'getWidthAvailable').and.returnValue(1600);

        component.fixedCardLayout.onResize();
        await wait(fixture);

        expect(component.fixedCardLayout.columns.length).toEqual(4);
    });

    it('should have 1 columns on 500px width size value', async () => {
        await wait(fixture);

        spyOn(component.fixedCardLayout, 'getWidthAvailable').and.returnValue(500);

        component.fixedCardLayout.onResize();
        await wait(fixture);

        expect(component.fixedCardLayout.columns.length).toEqual(1);
    });

    it('should have 2 columns on 656px width size value', async () => {
        await wait(fixture);

        spyOn(component.fixedCardLayout, 'getWidthAvailable').and.returnValue(656);

        component.fixedCardLayout.onResize();
        await wait(fixture);

        expect(component.fixedCardLayout.columns.length).toEqual(2);
    });

    it('should have 3 columns on 992px width size value', async () => {
        await wait(fixture);

        spyOn(component.fixedCardLayout, 'getWidthAvailable').and.returnValue(992);

        component.fixedCardLayout.onResize();
        await wait(fixture);

        expect(component.fixedCardLayout.columns.length).toEqual(3);
    });

    it('should have 5 columns on 1664px width size value', async () => {
        await wait(fixture);

        spyOn(component.fixedCardLayout, 'getWidthAvailable').and.returnValue(1664);

        component.fixedCardLayout.onResize();
        await wait(fixture);

        expect(component.fixedCardLayout.columns.length).toEqual(5);
    });

    it('should have 1 columns on 300px width size value', async () => {
        await wait(fixture);

        spyOn(component.fixedCardLayout, 'getWidthAvailable').and.returnValue(300);

        component.fixedCardLayout.onResize();
        await wait(fixture);

        expect(component.fixedCardLayout.columns.length).toEqual(1);
    });
});
