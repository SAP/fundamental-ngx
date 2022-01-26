import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ChangeDetectionStrategy } from '@angular/core';
import { By } from '@angular/platform-browser';

import { PaginationModule } from './pagination.module';
import { SelectComponent } from '@fundamental-ngx/core/select';

import { PaginationComponent } from './pagination.component';
import { NgModel } from '@angular/forms';

const TOTAL_ITEMS = 3;
const CURRENT_PAGE = 1;
const ITEMS_PER_PAGE = 2;

describe('Pagination Component', () => {
    let component: PaginationComponent;
    let fixture: ComponentFixture<PaginationComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({ imports: [PaginationModule] })
                .overrideComponent(PaginationComponent, {
                    set: { changeDetection: ChangeDetectionStrategy.Default }
                })
                .compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(PaginationComponent);
        component = fixture.componentInstance;
        component.totalItems = TOTAL_ITEMS;
        component.currentPage = CURRENT_PAGE;
        component.itemsPerPage = ITEMS_PER_PAGE;
        fixture.detectChanges();
    });

    it('should default to first page', () => {
        component.currentPage = null;
        fixture.detectChanges();

        expect(component.currentPage).toEqual(CURRENT_PAGE);
    });

    it('should get the pagination object for the service', () => {
        const retVal = component.paginationObject;

        expect(retVal).toEqual({ totalItems: TOTAL_ITEMS, currentPage: CURRENT_PAGE, itemsPerPage: ITEMS_PER_PAGE });
    });

    it('should have default select for item per page with options', async () => {
        component.totalItems = 100;
        component.itemsPerPageOptions = [2, 4, 6];
        fixture.detectChanges();

        const selectComponent = fixture.debugElement.query(By.directive(SelectComponent));
        const selectInstance = selectComponent.injector.get(SelectComponent);

        expect(selectInstance).toBeInstanceOf(SelectComponent);
    });

    it('should handle mouseevent', () => {
        spyOn(component.pageChangeStart, 'emit');

        component.goToPage(1);

        expect(component.pageChangeStart.emit).toHaveBeenCalledWith(1);
    });

    it("shouldn't navigate to invalid page", () => {
        const wantedPage = CURRENT_PAGE + 999;
        component.goToPage(wantedPage);

        expect(wantedPage).not.toEqual(component.currentPage);
    });

    describe('itemsPerPage', () => {
        beforeEach(() => {
            component.totalItems = 100;
        });

        it('should be converted to number', async () => {
            component.itemsPerPage = '10' as any;
            fixture.detectChanges();

            expect(component.itemsPerPage).toBe(10);
        });

        it('should be rounded to the largest integer less than or equal to a given number', async () => {
            component.itemsPerPage = 5.5;
            fixture.detectChanges();

            expect(component.itemsPerPage).toBe(5);
        });

        it('should degrade to default 10 if value is not parsable', async () => {
            component.itemsPerPage = NaN;
            fixture.detectChanges();

            expect(component.itemsPerPage).toBe(10);
        });

        it('should be no more than totalItems', async () => {
            component.totalItems = 5;
            component.itemsPerPage = 6;
            fixture.detectChanges();

            expect(component.itemsPerPage).toBe(5);
        });

        it('should correctly update itemsPerPage after the total has changed', async () => {
            component.totalItems = 3000;
            component.itemsPerPage = 25;
            component.currentPage = 1;

            // NgOnChanges won't be executed when changing inputs from code
            component.ngOnChanges({ itemsPerPage: { currentValue: 25 } } as any);
            component['_cdr'].detectChanges();

            expect(component.itemsPerPage).toBe(25);

            component.totalItems = 10;

            // NgOnChanges won't be executed when changing inputs from code
            component.ngOnChanges({ totalItems: 10 } as any);
            component['_cdr'].detectChanges();

            expect(component.itemsPerPage).toBe(10);

            component.totalItems = 500;

            // NgOnChanges won't be executed when changing inputs from code
            component.ngOnChanges({ totalItems: 500 } as any);
            component['_cdr'].detectChanges();

            expect(component.itemsPerPage).toBe(25);
        });
    });

    describe('currentPage', () => {
        it('should be converted to number', async () => {
            component.currentPage = '3' as any;
            fixture.detectChanges();

            expect(component.currentPage).toBe(3);
        });

        it('should be rounded to the largest integer less than or equal to a given number', async () => {
            component.currentPage = 5.5;
            fixture.detectChanges();

            expect(component.currentPage).toBe(5);
        });

        it('should reset input field', () => {
            const model = { reset: (value: any) => {} } as NgModel;
            const modelMockSpy = spyOn(model, 'reset');

            component.currentPage = 3;
            fixture.detectChanges();

            component._restoreInputValue(model);

            expect(modelMockSpy).toHaveBeenCalledWith(component.currentPage);
        });
    });

    describe('itemsPerPageOptions', () => {
        it('should be converted to numbers', async () => {
            component.totalItems = 100;
            component.itemsPerPageOptions = ['10', '20', '30'] as any;
            fixture.detectChanges();

            expect(component.itemsPerPageOptions).toEqual([10, 20, 30]);
        });

        it('should be rounded to the largest integer less than or equal to a given number', async () => {
            component.totalItems = 100;
            component.itemsPerPageOptions = [10.5, 20.7, 30.1];
            fixture.detectChanges();

            expect(component.itemsPerPageOptions).toEqual([10, 20, 30]);
        });

        it('should set itemsPerPage to the first collection item', async () => {
            component.totalItems = 100;
            component.itemsPerPage = 10;
            component.itemsPerPageOptions = [5, 15, 30];
            fixture.detectChanges();

            expect(component.itemsPerPage).toEqual(5);
        });

        it('should sort values ascending', async () => {
            component.totalItems = 100;
            component.itemsPerPageOptions = [20, 10, 30, 50, 40];
            fixture.detectChanges();

            expect(component.itemsPerPageOptions).toEqual([10, 20, 30, 40, 50]);
        });

        it('should filter values and keep only > 0', async () => {
            component.totalItems = 100;
            component.itemsPerPageOptions = [-10, 0, 10, 50, 100, 150];
            fixture.detectChanges();

            expect(component.itemsPerPageOptions).toEqual([10, 50, 100, 150]);
        });
    });
});
