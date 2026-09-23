import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableBodyDirective } from './table-body.directive';

@Component({
    template: `
        <table>
            <tbody fd-table-body>
                <tr>
                    <td>Cell</td>
                </tr>
            </tbody>
        </table>
    `,
    imports: [TableBodyDirective]
})
class TestComponent {}

describe('TableBodyDirective', () => {
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
            const body = fixture.nativeElement.querySelector('[fd-table-body]');
            expect(body.classList.contains('fd-table__body')).toBe(true);
        });

        it('should set role="rowgroup"', () => {
            const body = fixture.nativeElement.querySelector('[fd-table-body]');
            expect(body.getAttribute('role')).toBe('rowgroup');
        });
    });

    describe('modifier classes', () => {
        it('should apply noBorderX modifier class', async () => {
            @Component({
                template: `<table>
                    <tbody fd-table-body [noBorderX]="true">
                        <tr>
                            <td>Cell</td>
                        </tr>
                    </tbody>
                </table>`,
                imports: [TableBodyDirective]
            })
            class TestComp {}

            await TestBed.configureTestingModule({ imports: [TestComp] }).compileComponents();
            const fixture = TestBed.createComponent(TestComp);
            fixture.detectChanges();
            const body = fixture.nativeElement.querySelector('tbody');
            expect(body.classList.contains('fd-table__body--no-horizontal-borders')).toBe(true);
        });

        it('should apply noBorderY modifier class', async () => {
            @Component({
                template: `<table>
                    <tbody fd-table-body [noBorderY]="true">
                        <tr>
                            <td>Cell</td>
                        </tr>
                    </tbody>
                </table>`,
                imports: [TableBodyDirective]
            })
            class TestComp {}

            await TestBed.configureTestingModule({ imports: [TestComp] }).compileComponents();
            const fixture = TestBed.createComponent(TestComp);
            fixture.detectChanges();
            const body = fixture.nativeElement.querySelector('tbody');
            expect(body.classList.contains('fd-table__body--no-vertical-borders')).toBe(true);
        });
    });
});
