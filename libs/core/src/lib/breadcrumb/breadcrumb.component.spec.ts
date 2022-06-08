// import { ComponentFixture } from '@angular/core/testing';
// // import { BreadcrumbComponent } from "./breadcrumb.component";
//
// import { Component, ViewChild } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
//
// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// import { PopoverModule } from '@fundamental-ngx/core/popover';
// import { MenuModule } from '@fundamental-ngx/core/menu';
// import { IconModule } from '@fundamental-ngx/core/icon';
// import { LinkModule } from '@fundamental-ngx/core/link';
// import { RtlService } from '@fundamental-ngx/core/utils';
// import { BreadcrumbItemComponent } from './breadcrumb-item.component';
// import { BreadcrumbComponent } from './breadcrumb.component';
// import { whenStable } from '@fundamental-ngx/core/tests';
// import { BreadcrumbHiddenItemComponent } from "./breadcrumb-hidden-item/breadcrumb-hidden-item.component";
//
// @Component({
//     selector: 'fd-breadcrumb-test-component',
//     template: `
//         <fd-breadcrumb>
//             <fd-breadcrumb-item>
//                 <a fd-link [routerLink]="'#'">Breadcrumb Level 1</a>
//             </fd-breadcrumb-item>
//             <fd-breadcrumb-item>
//                 <a fd-link [routerLink]="'#'">Breadcrumb Level 2</a>
//             </fd-breadcrumb-item>
//             <fd-breadcrumb-item>
//                 <span>Breadcrumb Level 3</span>
//             </fd-breadcrumb-item>
//         </fd-breadcrumb>
//     `
// })
// class BreadcrumbWrapperComponent {
//     @ViewChild(BreadcrumbComponent) breadcrumb: BreadcrumbComponent;
// }

describe('BreadcrumbComponent', () => {
    // let component: BreadcrumbComponent;
    // let fixture: ComponentFixture<BreadcrumbWrapperComponent>;
    //
    // beforeEach(
    //     waitForAsync(() => {
    //         TestBed.configureTestingModule({
    //             declarations: [BreadcrumbComponent, BreadcrumbItemComponent, BreadcrumbHiddenItemComponent, BreadcrumbWrapperComponent],
    //             imports: [PopoverModule, MenuModule, IconModule, LinkModule, RouterModule, RouterTestingModule],
    //             providers: [RtlService, {
    //                 provide: BreadcrumbItemComponent,
    //                 useValue: {
    //                     width: 1,
    //                     hide: () => {},
    //                     show: () => {}
    //                 }
    //             }]
    //         }).compileComponents();
    //     })
    // );
    //
    // beforeEach(async () => {
    //     fixture = TestBed.createComponent(BreadcrumbWrapperComponent);
    //
    //     await whenStable(fixture);
    //
    //     component = fixture.componentInstance.breadcrumb;
    // });
    //
    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
    //
    // it('should handle onResize - enlarging the screen', async () => {
    //     spyOn(component.elementRef.nativeElement.parentElement as Element, 'getBoundingClientRect').and.returnValue({
    //         width: 3
    //     } as any);
    //     spyOn(component.elementRef.nativeElement, 'getBoundingClientRect').and.returnValue({ width: 1 } as any);
    //
    //     component.onResize();
    //
    //     await whenStable(fixture);
    //
    //     expect(component.collapsedBreadcrumbItems.length).toBe(3);
    // });
    //
    // it('should handle onResize - shrinking the screen', () => {
    //     spyOn(component.elementRef.nativeElement.parentElement as Element, 'getBoundingClientRect').and.returnValue({
    //         width: 1
    //     } as any);
    //     spyOn(component.elementRef.nativeElement, 'getBoundingClientRect').and.returnValue({ width: 3 } as any);
    //
    //     component.onResize();
    //
    //     expect(component.expandBreadcrumbs).not.toHaveBeenCalled();
    //     expect(component.collapseBreadcrumbs).toHaveBeenCalled();
    //     expect(component.previousContainerWidth).toBe(1);
    // });
    //
    // it('should collapse the breadcrumbs', async () => {
    //     spyOn(component.elementRef.nativeElement, 'getBoundingClientRect').and.returnValue({ width: 2 } as any);
    //     spyOn(component, 'getContainerBoundary').and.returnValue(1);
    //
    //     component.collapseBreadcrumbs();
    //
    //     await whenStable(fixture);
    //
    //     component.breadcrumbItems.forEach((item) => {
    //         expect(item.elementRef.nativeElement.style.display).toBe('none');
    //     });
    //
    //     expect(component.collapsedBreadcrumbItems.length).toBe(3);
    // });
    //
    // it('should expand all of the breadcrumbs', () => {
    //     // collapse all the breadcrumbs first
    //     spyOn(component.elementRef.nativeElement, 'getBoundingClientRect').and.returnValue({ width: 3 } as any);
    //     spyOn(component, 'getContainerBoundary').and.returnValue(2);
    //     component.collapseBreadcrumbs();
    //
    //     spyOn(component.elementRef.nativeElement, 'getBoundingClientRect').and.returnValue({ width: 1 } as any);
    //
    //     component.expandBreadcrumbs();
    //
    //     component.breadcrumbItems.forEach((item) => {
    //         expect(item.elementRef.nativeElement.style.display).toBe('inline-block');
    //         expect(item.elementRef.nativeElement.style.visibility).toBe('visible');
    //     });
    //     expect(component.collapsedBreadcrumbItems.length).toBe(0);
    // });
});
