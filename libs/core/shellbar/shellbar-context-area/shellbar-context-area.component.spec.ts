import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShellbarContextAreaComponent } from './shellbar-context-area.component';
import { ResizeObserverService } from '@fundamental-ngx/core/utils';
import { ElementRef } from '@angular/core';
import { Subject } from 'rxjs';

export class ResizeObservableServiceMock {
    private readonly observerMap = new Map<Element | ElementRef<Element>, Subject<ResizeObserverEntry[]>>();

    observe(elementOrRef: Element | ElementRef<Element>): Subject<ResizeObserverEntry[]> {
        const subj = new Subject<ResizeObserverEntry[]>();
        this.observerMap.set(elementOrRef, subj);
        return subj;
    }

    trigger(elementOrRef: Element | ElementRef<Element>, data: ResizeObserverEntry[]): void {
        this.observerMap.get(elementOrRef)?.next(data);
    }
}

describe('ShellbarContextAreaComponent', () => {
    let component: ShellbarContextAreaComponent;
    let fixture: ComponentFixture<ShellbarContextAreaComponent>;
    let resizeObserverServiceMock: ResizeObservableServiceMock;

    beforeEach(async () => {
        resizeObserverServiceMock = new ResizeObservableServiceMock();

        await TestBed.configureTestingModule({
            imports: [ShellbarContextAreaComponent],
            providers: [
                {
                    provide: ResizeObserverService,
                    useValue: resizeObserverServiceMock
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ShellbarContextAreaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call updateVisibility on resize event', async () => {
        const updateVisibilitySpy = jest.spyOn(component, 'updateVisibility');

        await fixture.whenRenderingDone();

        resizeObserverServiceMock.trigger(component.el.nativeElement, []);

        fixture.detectChanges();

        expect(updateVisibilitySpy).toHaveBeenCalled();
    });
});
