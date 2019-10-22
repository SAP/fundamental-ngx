import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-side-navigation-example',
    templateUrl: './side-navigation-example.component.html',
})
export class SideNavigationExampleComponent { }

@Component({
    selector: 'fd-side-navigation-collapsed-example',
    templateUrl: './side-navigation-collapsed-example.component.html',
    styleUrls: ['side-navigation-collapsed-example.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SideNavigationCollapsedExampleComponent { }

@Component({
    selector: 'fd-side-navigation-icons-example',
    templateUrl: './side-navigation-icons-example.component.html',
    styleUrls: ['side-navigation-icons-example.component.scss']
})
export class SideNavigationIconsExampleComponent { }

@Component({
    selector: 'fd-side-navigation-levels-example',
    templateUrl: './side-navigation-levels-example.component.html'
})
export class SideNavigationLevelsExampleComponent { }

@Component({
    selector: 'fd-side-navigation-titles-example',
    templateUrl: './side-navigation-titles-example.component.html'
})
export class SideNavigationTitlesExampleComponent { }
