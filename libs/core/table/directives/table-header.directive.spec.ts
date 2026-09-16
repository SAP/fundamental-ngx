import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableHeaderDirective } from './table-header.directive';

@Component({
    template: `
        <table>
            <thead fd-table-header>
                <tr>
                    <th>Header</th>
                </tr>
            </thead>
        </table>
    `,
    imports: [TableHeaderDirective]
})
class TestComponent {}

describe('TableHeaderDirective', () => {
    describe('basic functionality', () => {
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
            const header = fixture.nativeElement.querySelector('[fd-table-header]');
            expect(header.classList.contains('fd-table__header')).toBe(true);
        });

        it('should set role="rowgroup"', () => {
            const header = fixture.nativeElement.querySelector('[fd-table-header]');
            expect(header.getAttribute('role')).toBe('rowgroup');
        });
    });

    describe('modifier classes', () => {
        it('should apply noBorderX modifier class', async () => {
            @Component({
                template: `<table>
                    <thead fd-table-header [noBorderX]="true">
                        <tr>
                            <th>Header</th>
                        </tr>
                    </thead>
                </table>`,
                imports: [TableHeaderDirective]
            })
            class TestComp {}

            await TestBed.configureTestingModule({ imports: [TestComp] }).compileComponents();
            const fixture = TestBed.createComponent(TestComp);
            fixture.detectChanges();
            const header = fixture.nativeElement.querySelector('thead');
            expect(header.classList.contains('fd-table__header--no-horizontal-borders')).toBe(true);
        });

        it('should apply noBorderY modifier class', async () => {
            @Component({
                template: `<table>
                    <thead fd-table-header [noBorderY]="true">
                        <tr>
                            <th>Header</th>
                        </tr>
                    </thead>
                </table>`,
                imports: [TableHeaderDirective]
            })
            class TestComp {}

            await TestBed.configureTestingModule({ imports: [TestComp] }).compileComponents();
            const fixture = TestBed.createComponent(TestComp);
            fixture.detectChanges();
            const header = fixture.nativeElement.querySelector('thead');
            expect(header.classList.contains('fd-table__header--no-vertical-borders')).toBe(true);
        });

        it('should apply nonInteractive modifier class', async () => {
            @Component({
                template: `<table>
                    <thead fd-table-header [nonInteractive]="true">
                        <tr>
                            <th>Header</th>
                        </tr>
                    </thead>
                </table>`,
                imports: [TableHeaderDirective]
            })
            class TestComp {}

            await TestBed.configureTestingModule({ imports: [TestComp] }).compileComponents();
            const fixture = TestBed.createComponent(TestComp);
            fixture.detectChanges();
            const header = fixture.nativeElement.querySelector('thead');
            expect(header.classList.contains('fd-table__header--non-interactive')).toBe(true);
        });
    });
});
