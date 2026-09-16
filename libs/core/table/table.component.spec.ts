import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableCellDirective } from './directives/table-cell.directive';
import { TableRowDirective } from './directives/table-row.directive';
import { TableComponent } from './table.component';

@Component({
    template: `
        <table fd-table>
            <tbody>
                <tr fd-table-row>
                    <td fd-table-cell>Cell 1</td>
                    <td fd-table-cell>Cell 2</td>
                </tr>
            </tbody>
        </table>
    `,
    imports: [TableComponent, TableCellDirective, TableRowDirective]
})
class TestComponent {}

describe('TableComponent', () => {
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(fixture.componentInstance).toBeTruthy();
    });

    it('should apply base class', () => {
        const table = fixture.nativeElement.querySelector('[fd-table]');
        expect(table.classList.contains('fd-table')).toBe(true);
    });

    it('should set role="grid" by default', () => {
        const table = fixture.nativeElement.querySelector('[fd-table]');
        expect(table.getAttribute('role')).toBe('grid');
    });

    describe('modifier classes', () => {
        it('should apply noBorderX modifier class', async () => {
            @Component({
                template: `<table fd-table [noBorderX]="true">
                    <tbody>
                        <tr>
                            <td>Cell</td>
                        </tr>
                    </tbody>
                </table>`,
                imports: [TableComponent]
            })
            class NoBorderXTestComp {}

            TestBed.resetTestingModule();
            await TestBed.configureTestingModule({ imports: [NoBorderXTestComp] }).compileComponents();
            const modifierFixture = TestBed.createComponent(NoBorderXTestComp);
            modifierFixture.detectChanges();
            const table = modifierFixture.nativeElement.querySelector('table');
            expect(table.classList.contains('fd-table--no-horizontal-borders')).toBe(true);
        });

        it('should apply noBorderY modifier class', async () => {
            @Component({
                template: `<table fd-table [noBorderY]="true">
                    <tbody>
                        <tr>
                            <td>Cell</td>
                        </tr>
                    </tbody>
                </table>`,
                imports: [TableComponent]
            })
            class NoBorderYTestComp {}

            TestBed.resetTestingModule();
            await TestBed.configureTestingModule({ imports: [NoBorderYTestComp] }).compileComponents();
            const modifierFixture = TestBed.createComponent(NoBorderYTestComp);
            modifierFixture.detectChanges();
            const table = modifierFixture.nativeElement.querySelector('table');
            expect(table.classList.contains('fd-table--no-vertical-borders')).toBe(true);
        });

        it('should apply noOuterBorder modifier class', async () => {
            @Component({
                template: `<table fd-table [noOuterBorder]="true">
                    <tbody>
                        <tr>
                            <td>Cell</td>
                        </tr>
                    </tbody>
                </table>`,
                imports: [TableComponent]
            })
            class NoOuterBorderTestComp {}

            TestBed.resetTestingModule();
            await TestBed.configureTestingModule({ imports: [NoOuterBorderTestComp] }).compileComponents();
            const modifierFixture = TestBed.createComponent(NoOuterBorderTestComp);
            modifierFixture.detectChanges();
            const table = modifierFixture.nativeElement.querySelector('table');
            expect(table.classList.contains('fd-table--no-outer-border')).toBe(true);
        });

        it('should apply topBorder modifier class', async () => {
            @Component({
                template: `<table fd-table [topBorder]="true">
                    <tbody>
                        <tr>
                            <td>Cell</td>
                        </tr>
                    </tbody>
                </table>`,
                imports: [TableComponent]
            })
            class TopBorderTestComp {}

            TestBed.resetTestingModule();
            await TestBed.configureTestingModule({ imports: [TopBorderTestComp] }).compileComponents();
            const modifierFixture = TestBed.createComponent(TopBorderTestComp);
            modifierFixture.detectChanges();
            const table = modifierFixture.nativeElement.querySelector('table');
            expect(table.classList.contains('fd-table--top-border')).toBe(true);
        });

        it('should apply popIn modifier class', async () => {
            @Component({
                template: `<table fd-table [popIn]="true">
                    <tbody>
                        <tr>
                            <td>Cell</td>
                        </tr>
                    </tbody>
                </table>`,
                imports: [TableComponent]
            })
            class PopInTestComp {}

            TestBed.resetTestingModule();
            await TestBed.configureTestingModule({ imports: [PopInTestComp] }).compileComponents();
            const modifierFixture = TestBed.createComponent(PopInTestComp);
            modifierFixture.detectChanges();
            const table = modifierFixture.nativeElement.querySelector('table');
            expect(table.classList.contains('fd-table--pop-in')).toBe(true);
        });

        it('should apply responsive modifier class', async () => {
            @Component({
                template: `<table fd-table [responsive]="true">
                    <tbody>
                        <tr>
                            <td>Cell</td>
                        </tr>
                    </tbody>
                </table>`,
                imports: [TableComponent]
            })
            class ResponsiveTestComp {}

            TestBed.resetTestingModule();
            await TestBed.configureTestingModule({ imports: [ResponsiveTestComp] }).compileComponents();
            const modifierFixture = TestBed.createComponent(ResponsiveTestComp);
            modifierFixture.detectChanges();
            const table = modifierFixture.nativeElement.querySelector('table');
            expect(table.classList.contains('fd-table--responsive')).toBe(true);
        });
    });
});
