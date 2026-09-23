import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableTextDirective } from './table-text.directive';

@Component({
    template: `
        <table>
            <tbody>
                <tr>
                    <td>
                        <span fd-table-text>Text</span>
                    </td>
                </tr>
            </tbody>
        </table>
    `,
    imports: [TableTextDirective]
})
class TestComponent {}

describe('TableTextDirective', () => {
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

        it('should apply base class by default', () => {
            const text = fixture.nativeElement.querySelector('[fd-table-text]');
            expect(text.classList.contains('fd-table__text')).toBe(true);
        });
    });

    describe('modifier classes', () => {
        it('should not apply base class when fdTableTextClass is false', async () => {
            @Component({
                template: `<table>
                    <tbody>
                        <tr>
                            <td><span fd-table-text [fdTableTextClass]="false">Text</span></td>
                        </tr>
                    </tbody>
                </table>`,
                imports: [TableTextDirective]
            })
            class TestComp {}

            await TestBed.configureTestingModule({ imports: [TestComp] }).compileComponents();
            const fixture = TestBed.createComponent(TestComp);
            fixture.detectChanges();
            const text = fixture.nativeElement.querySelector('span');
            expect(text.classList.contains('fd-table__text')).toBe(false);
        });

        it('should apply noWrap modifier class', async () => {
            @Component({
                template: `<table>
                    <tbody>
                        <tr>
                            <td><span fd-table-text [noWrap]="true">Text</span></td>
                        </tr>
                    </tbody>
                </table>`,
                imports: [TableTextDirective]
            })
            class TestComp {}

            await TestBed.configureTestingModule({ imports: [TestComp] }).compileComponents();
            const fixture = TestBed.createComponent(TestComp);
            fixture.detectChanges();
            const text = fixture.nativeElement.querySelector('span');
            expect(text.classList.contains('fd-table__text--no-wrap')).toBe(true);
        });

        it('should apply title modifier class', async () => {
            @Component({
                template: `<table>
                    <tbody>
                        <tr>
                            <td><span fd-table-text [title]="true">Text</span></td>
                        </tr>
                    </tbody>
                </table>`,
                imports: [TableTextDirective]
            })
            class TestComp {}

            await TestBed.configureTestingModule({ imports: [TestComp] }).compileComponents();
            const fixture = TestBed.createComponent(TestComp);
            fixture.detectChanges();
            const text = fixture.nativeElement.querySelector('span');
            expect(text.classList.contains('fd-table__text--title')).toBe(true);
        });

        it('should apply maxWidth style', async () => {
            @Component({
                template: `<table>
                    <tbody>
                        <tr>
                            <td><span fd-table-text [maxWidth]="'200px'">Text</span></td>
                        </tr>
                    </tbody>
                </table>`,
                imports: [TableTextDirective]
            })
            class TestComp {}

            await TestBed.configureTestingModule({ imports: [TestComp] }).compileComponents();
            const fixture = TestBed.createComponent(TestComp);
            fixture.detectChanges();
            const text = fixture.nativeElement.querySelector('span');
            expect(text.style.maxWidth).toBe('200px');
        });
    });
});
