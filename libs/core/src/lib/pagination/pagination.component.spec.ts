import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ChangeDetectionStrategy } from '@angular/core';
import { By } from '@angular/platform-browser';

import { SelectModule, SelectComponent } from '../select/public_api';
import { PaginationComponent } from './pagination.component';
import { PaginationService } from './pagination.service';

describe('Pagination Test', () => {
    let component: PaginationComponent;
    let fixture: ComponentFixture<PaginationComponent>;
    let paginationServiceSpy: jasmine.SpyObj<PaginationService>;

    beforeEach(
        waitForAsync(() => {
            const paginationSpy = jasmine.createSpyObj('PaginationService', ['getTotalPages', 'getPages']);

            TestBed.configureTestingModule({
                declarations: [PaginationComponent],
                imports: [SelectModule],
                providers: [{ provide: PaginationService, useValue: paginationSpy }]
            })
                .overrideComponent(PaginationComponent, {
                    set: { changeDetection: ChangeDetectionStrategy.Default }
                })
                .compileComponents();

            paginationServiceSpy = TestBed.get(PaginationService);
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(PaginationComponent);
        component = fixture.componentInstance;
        component.totalItems = 3;
        component.currentPage = 1;
        component.itemsPerPage = 2;
        fixture.detectChanges();
    });

    it('should default to first page', () => {
        component.currentPage = null;
        fixture.detectChanges();
        expect(component.currentPage).toEqual(1);
    });

    it('should get the pagination object for the service', () => {
        const retVal = component.getPaginationObject();

        expect(retVal).toEqual({ totalItems: 3, currentPage: 1, itemsPerPage: 2 });
    });

    it('should handle keypress', () => {
        const keyboardEvent = new KeyboardEvent('keypress', {
            key: 'Enter'
        });
        spyOn(keyboardEvent, 'preventDefault');
        spyOn(component, 'goToPage');

        component.onKeypressHandler(1, keyboardEvent);

        expect(keyboardEvent.preventDefault).toHaveBeenCalled();
        expect(component.goToPage).toHaveBeenCalledWith(1);
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
        const mouseEvent = new MouseEvent('click');
        spyOn(mouseEvent, 'preventDefault');
        spyOn(component.pageChangeStart, 'emit');

        component.goToPage(1, mouseEvent);

        expect(component.pageChangeStart.emit).toHaveBeenCalledWith(1);
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
            fixture.detectChanges();
            component.totalItems = 10;
            fixture.detectChanges();
            component.totalItems = 500;
            fixture.detectChanges();
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
        it('should filter values and keep only > 0 AND < totalItems', async () => {
            component.totalItems = 100;
            component.itemsPerPageOptions = [-10, 0, 10, 50, 100, 150];
            fixture.detectChanges();
            expect(component.itemsPerPageOptions).toEqual([10, 50]);
        });
    });
});
