import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableIconDirective } from './table-icon.directive';

@Component({
    template: `
        <table>
            <tbody>
                <tr>
                    <td>
                        <span fd-table-icon></span>
                    </td>
                </tr>
            </tbody>
        </table>
    `,
    imports: [TableIconDirective]
})
class TestComponent {}

describe('TableIconDirective', () => {
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
            const icon = fixture.nativeElement.querySelector('[fd-table-icon]');
            expect(icon.classList.contains('fd-table__icon')).toBe(true);
        });
    });

    describe('modifier classes', () => {
        it('should apply navigation modifier class', async () => {
            @Component({
                template: `<table>
                    <tbody>
                        <tr>
                            <td><span fd-table-icon [navigation]="true"></span></td>
                        </tr>
                    </tbody>
                </table>`,
                imports: [TableIconDirective]
            })
            class TestComp {}

            await TestBed.configureTestingModule({ imports: [TestComp] }).compileComponents();
            const fixture = TestBed.createComponent(TestComp);
            fixture.detectChanges();
            const icon = fixture.nativeElement.querySelector('span');
            expect(icon.classList.contains('fd-table__icon--navigation')).toBe(true);
        });

        it('should apply glyph class when glyph is provided', async () => {
            @Component({
                template: `<table>
                    <tbody>
                        <tr>
                            <td><span fd-table-icon [glyph]="'accept'"></span></td>
                        </tr>
                    </tbody>
                </table>`,
                imports: [TableIconDirective]
            })
            class TestComp {}

            await TestBed.configureTestingModule({ imports: [TestComp] }).compileComponents();
            const fixture = TestBed.createComponent(TestComp);
            fixture.detectChanges();
            const icon = fixture.nativeElement.querySelector('span');
            expect(icon.className).toContain('sap-icon--accept');
        });
    });
});
