import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent, getElementArrayLength } from '../../driver/wdio';

export class sideNavigation extends CoreBaseComponentPo {
    private url = '/sideNavigation';

    root = '#page-content';

    NavigationExample = 'fd-side-navigation-example ';
    TitilesExample = 'fd-side-navigation-titles-example ';
    CompactExample = 'fd-side-navigation-compact-example ';
    NonSelectableExample = 'fd-side-navigation-non-selectable-example ';
    ThreeLevelsExample = 'fd-side-navigation-three-levels-example ';
    MultipleSelectedExample = 'fd-side-navigation-multiple-selected-example ';
    pragmaticalyExample = 'fd-side-navigation-programmatically-example ';
    iconsExample = 'fd-side-navigation-icons-example ';
    condensedExample = 'fd-side-navigation-condensed-example ';
    objectExample = 'fd-side-navigation-object-example ';
    condensedObjectExample = 'fd-side-navigation-condensed-object-example ';

    mainListPoint = '.fd-nested-list__link';
    listItem = 'li.fd-nested-list__item'
    expandArrow = '.sap-icon--navigation-right-arrow';
    selectedClass1 = 'fd-nested-list__link is-selected';
    selectedClass2 = 'fd-nested-list__link ng-star-inserted is-selected';
    selectedClass3 = 'fd-nested-list__content has-child ng-star-inserted is-selected';

    pointContainsSubList = '.has-child';
    expandListExample = 'fd-popover-body ';
    expandedListPoint = '.fd-popover__popper ul li a';
    subList = '.level-2'
    subListItem = this.subList + ' li a';

    condensedObjectSelected = 'fd-nested-list__link ng-star-inserted is-selected';
    objectSelected = 'fd-nested-list__link is-selected';
    expandList = this.expandListExample + this.expandedListPoint;

    selectChildBtn = this.pragmaticalyExample + '> button:nth-child(2)';
    openBtn = this.pragmaticalyExample + '> button:nth-child(3)';
    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.title);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'switch'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'switch'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }

}