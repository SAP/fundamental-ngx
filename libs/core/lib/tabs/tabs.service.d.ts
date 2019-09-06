import { Subject } from 'rxjs';
/**
 * Service that is responsible for providing keyboard actions support
 * */
export declare class TabsService {
    /** Event is thrown always when tab is selected by keyboard actions */
    tabSelected: Subject<number>;
    /** @hidden */
    tabHeaderKeyHandler(index: number, event: any, elements: HTMLElement[]): void;
    /** @hidden */
    private getTabLinkFromIndex;
}
