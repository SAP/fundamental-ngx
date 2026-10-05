import {R as Rt,b7 as Cht,b8 as aht,bb as Pvt,y as yo,h as pc,j as yi,a as Eo,bc as eCt,bd as Bht,bf as lyt,o as jn,aj as gc}from'./main-7S7RBFK2.js';var h=(()=>{class o{constructor(){this.componentName="Scoping";}static{this.\u0275fac=function(a){return new(a||o)};}static{this.\u0275cmp=Rt({type:o,selectors:[["ui5-scoping-header"]],decls:6,vars:1,template:function(a,l){a&1&&(yo(0,"fd-doc-page")(1,"header"),pc(2),yi(),yo(3,"description"),pc(4," Run multiple versions of UI5 Web Components on the same page without tag name collisions. "),yi(),Eo(5,"fd-header-tabs"),yi()),a&2&&(jn(2),gc(l.componentName));},dependencies:[eCt,Bht,aht,lyt],encapsulation:2});}}return o})();var E=(()=>{class o{static{this.\u0275fac=function(a){return new(a||o)};}static{this.\u0275cmp=Rt({type:o,selectors:[["ui5-scoping-docs"]],decls:234,vars:0,consts:[["id","overview","componentName","scoping"],["href","https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry","target","_blank","rel","noopener"],["id","when","componentName","scoping"],["id","setup","componentName","scoping"],["role","alert",1,"fd-message-strip","fd-message-strip--warning",2,"margin-top","0.5rem"],[1,"fd-message-strip__text"],["id","angular-templates","componentName","scoping"],["id","schemas","componentName","scoping"],["id","scoping-rules","componentName","scoping"],["id","css-selectors","componentName","scoping"],["id","complete-example","componentName","scoping"],["id","troubleshooting","componentName","scoping"]],template:function(a,l){a&1&&(yo(0,"fd-docs-section-title",0),pc(1," Overview "),yi(),yo(2,"description")(3,"p"),pc(4," UI5 Web Components are registered as "),yo(5,"a",1),pc(6,"custom elements"),yi(),pc(7," in the browser. The custom element registry is global and allows only "),yo(8,"strong"),pc(9,"one definition per tag name"),yi(),pc(10,". This becomes a problem when multiple micro-frontends or applications on the same page ship different versions of UI5 Web Components \u2014 they would try to register "),yo(11,"code"),pc(12,"<ui5-button>"),yi(),pc(13," twice. "),yi(),yo(14,"p")(15,"strong"),pc(16,"Scoping"),yi(),pc(17," solves this by appending a suffix to every tag name. For example, with the suffix "),yo(18,"code"),pc(19,"myapp"),yi(),pc(20,", the tag "),yo(21,"code"),pc(22,"<ui5-button>"),yi(),pc(23," becomes "),yo(24,"code"),pc(25,"<ui5-button-myapp>"),yi(),pc(26,". Each application gets its own isolated set of custom element definitions. "),yi()(),Eo(27,"separator"),yo(28,"fd-docs-section-title",2),pc(29," When do you need scoping? "),yi(),yo(30,"description")(31,"p"),pc(32," You need scoping when "),yo(33,"strong"),pc(34,"different versions"),yi(),pc(35," of UI5 Web Components run on the same page. This typically happens in: "),yi(),yo(36,"ul")(37,"li"),pc(38,"Micro-frontend architectures (Module Federation, single-spa, iframe-less shell apps)"),yi(),yo(39,"li"),pc(40,"Multiple Angular apps composed into a single page"),yi()(),yo(41,"p"),pc(42," If all apps on the page use the "),yo(43,"strong"),pc(44,"same version"),yi(),pc(45," of UI5 Web Components, they share the same custom element registration and scoping is not needed. "),yi()(),Eo(46,"separator"),yo(47,"fd-docs-section-title",3),pc(48," Setup "),yi(),yo(49,"description")(50,"p"),pc(51," Add this call at the very top of your "),yo(52,"code"),pc(53,"main.ts"),yi(),pc(54,", before any UI5 component import. The suffix must contain only alphanumeric characters, dashes, and underscores ("),yo(55,"code"),pc(56,"/^[a-zA-Z0-9_-]+$/"),yi(),pc(57,"). "),yi(),yo(58,"pre")(59,"code"),pc(60,`import { setCustomElementsScopingSuffix } from '@ui5/webcomponents-base/dist/CustomElementsScope.js';

setCustomElementsScopingSuffix('myapp');`),yi()(),yo(61,"div",4)(62,"p",5)(63,"strong"),pc(64,"Order matters."),yi(),yo(65,"code"),pc(66,"setCustomElementsScopingSuffix"),yi(),pc(67," must be called before any UI5 Web Components are imported or registered. If called too late, a console warning will appear and some components may not be scoped. "),yi()(),yo(68,"p"),pc(69,"That's it. No other configuration is needed \u2014 UI5 handles the rest internally."),yi()(),Eo(70,"separator"),yo(71,"fd-docs-section-title",6),pc(72,` Using scoped components in Angular templates
`),yi(),yo(73,"description")(74,"p"),pc(75," Once scoping is active, all UI5 custom element tags get the suffix appended (e.g. "),yo(76,"code"),pc(77,"<ui5-button>"),yi(),pc(78," becomes "),yo(79,"code"),pc(80,"<ui5-button-myapp>"),yi(),pc(81,"). The component behavior, properties, events, and slots remain identical \u2014 only the HTML tag name changes. "),yi(),yo(82,"p"),pc(83," Use the scoped tag name as the HTML element and add the original name as an attribute to activate the Angular wrapper: "),yi(),yo(84,"pre")(85,"code"),pc(86,`<!-- With suffix "myapp" -->
<ui5-button-myapp ui5-button [design]="'Emphasized'">Submit</ui5-button-myapp>
<ui5-input-myapp ui5-input [placeholder]="'Search...'"></ui5-input-myapp>
<ui5-dialog-myapp ui5-dialog [headerText]="'Confirm'">...</ui5-dialog-myapp>`),yi()(),yo(87,"div",4)(88,"p",5),pc(89," Both parts are required: the "),yo(90,"strong"),pc(91,"scoped tag"),yi(),pc(92," ("),yo(93,"code"),pc(94,"ui5-button-myapp"),yi(),pc(95,") registers the custom element, and the "),yo(96,"strong"),pc(97,"attribute"),yi(),pc(98," ("),yo(99,"code"),pc(100,"ui5-button"),yi(),pc(101,") activates the Angular wrapper. "),yi()()(),Eo(102,"separator"),yo(103,"fd-docs-section-title",7),pc(104,` Handling Angular's unknown element warnings
`),yi(),yo(105,"description")(106,"p"),pc(107," When you use scoped tag names like "),yo(108,"code"),pc(109,"<ui5-button-myapp>"),yi(),pc(110,", Angular does not recognize them as known elements by default. To suppress the "),yo(111,"code"),pc(112,"NG8001"),yi(),pc(113," warnings, add "),yo(114,"code"),pc(115,"CUSTOM_ELEMENTS_SCHEMA"),yi(),pc(116," to your component: "),yi(),yo(117,"pre")(118,"code"),pc(119,`import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

@Component({
    selector: 'app-my-feature',
    template: \`<ui5-button-myapp ui5-button [design]="'Emphasized'">Submit</ui5-button-myapp>\`,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [Button]
})
export class MyFeatureComponent { }`),yi()(),yo(120,"p"),pc(121,"This tells Angular to allow any unknown HTML element without throwing a compile error."),yi()(),Eo(122,"separator"),yo(123,"fd-docs-section-title",8),pc(124," Advanced: Scoping rules "),yi(),yo(125,"description")(126,"p"),pc(127," By default, all tags starting with "),yo(128,"code"),pc(129,"ui5-"),yi(),pc(130," are scoped. You can customize which tags get scoped using "),yo(131,"code"),pc(132,"setCustomElementsScopingRules"),yi(),pc(133,": "),yi(),yo(134,"pre")(135,"code"),pc(136,`import {
    setCustomElementsScopingSuffix,
    setCustomElementsScopingRules
} from '@ui5/webcomponents-base/dist/CustomElementsScope.js';

// Set the suffix
setCustomElementsScopingSuffix('myapp');

// Only scope tags starting with "ui5-" but exclude "ui5-icon"
setCustomElementsScopingRules({
    include: [/^ui5-/],
    exclude: [/^ui5-icon$/]
});`),yi()(),yo(137,"p")(138,"strong"),pc(139,"include"),yi(),pc(140," \u2014 array of regular expressions. A tag must match at least one to be scoped."),Eo(141,"br"),yo(142,"strong"),pc(143,"exclude"),yi(),pc(144," \u2014 array of regular expressions. A tag matching any exclude rule is not scoped, even if it matches an include rule. "),yi()(),Eo(145,"separator"),yo(146,"fd-docs-section-title",9),pc(147," CSS considerations "),yi(),yo(148,"description")(149,"p"),pc(150,"If you have global CSS rules targeting UI5 tag names, they need to be updated to match the scoped names:"),yi(),yo(151,"pre")(152,"code"),pc(153,`/* Before scoping */
ui5-button {
    margin-right: 8px;
}

/* After scoping (suffix: "myapp") */
ui5-button-myapp {
    margin-right: 8px;
}

/* Or use attribute selectors to work with any suffix */
[ui5-button] {
    margin-right: 8px;
}`),yi()(),yo(154,"p"),pc(155," Using the "),yo(156,"strong"),pc(157,"attribute selector"),yi(),yo(158,"code"),pc(159,"[ui5-button]"),yi(),pc(160," in CSS is a good strategy because it works regardless of whether scoping is enabled and what suffix is used. "),yi()(),Eo(161,"separator"),yo(162,"fd-docs-section-title",10),pc(163," Complete example "),yi(),yo(164,"description")(165,"p"),pc(166,"Putting it all together for a micro-frontend called "),yo(167,"code"),pc(168,"orders"),yi(),pc(169,":"),yi(),yo(170,"h4"),pc(171,"main.ts"),yi(),yo(172,"pre")(173,"code"),pc(174,`// main.ts \u2014 scoping FIRST, before anything else
import { setCustomElementsScopingSuffix } from '@ui5/webcomponents-base/dist/CustomElementsScope.js';
setCustomElementsScopingSuffix('orders');

(async () => {
    const { bootstrapApplication } = await import('@angular/platform-browser');
    const { appConfig } = await import('./app/app.config');
    const { App } = await import('./app/app');

    await bootstrapApplication(App, appConfig);
})().catch((err) => console.error(err));`),yi()(),yo(175,"h4"),pc(176,"order-list.ts"),yi(),yo(177,"pre")(178,"code"),pc(179,`import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Input } from '@fundamental-ngx/ui5-webcomponents/input';
import { Table } from '@fundamental-ngx/ui5-webcomponents/table';

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.html',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [Button, Input, Table]
})
export class OrderList {
    onSearch(event: Event): void {
        // handle search
    }
}`),yi()(),yo(180,"h4"),pc(181,"order-list.html"),yi(),yo(182,"pre")(183,"code"),pc(184,`<!-- All tags use the scoped name + attribute selector -->
<ui5-input-orders ui5-input
    [placeholder]="'Search orders...'"
    (ui5Input)="onSearch($event)">
</ui5-input-orders>

<ui5-table-orders ui5-table>
    <!-- table content -->
</ui5-table-orders>

<ui5-button-orders ui5-button [design]="'Emphasized'">
    New Order
</ui5-button-orders>`),yi()()(),Eo(185,"separator"),yo(186,"fd-docs-section-title",11),pc(187," Troubleshooting "),yi(),yo(188,"description")(189,"h4"),pc(190,'Console warning: "Setting the scoping suffix must be done before importing any components"'),yi(),yo(191,"p")(192,"code"),pc(193,"setCustomElementsScopingSuffix"),yi(),pc(194," was called after a UI5 component was already imported. Move the call to the very first lines of "),yo(195,"code"),pc(196,"main.ts"),yi(),pc(197,", before any other imports that might trigger component registration. "),yi(),yo(198,"h4"),pc(199,"Component does not render (empty element)"),yi(),yo(200,"p"),pc(201," Make sure the HTML tag uses the "),yo(202,"strong"),pc(203,"scoped name"),yi(),pc(204," (e.g. "),yo(205,"code"),pc(206,"<ui5-button-myapp>"),yi(),pc(207,"), not the original name ("),yo(208,"code"),pc(209,"<ui5-button>"),yi(),pc(210,"). With scoping active, the original tag name is not registered in the custom element registry. "),yi(),yo(211,"h4"),pc(212,"Angular input/output bindings not working"),yi(),yo(213,"p"),pc(214," Verify that the "),yo(215,"code"),pc(216,"ui5-button"),yi(),pc(217," (or equivalent) attribute is present on the element. The Angular wrapper needs the attribute to activate. Also check that the wrapper component is listed in the "),yo(218,"code"),pc(219,"imports"),yi(),pc(220," array of your component. "),yi(),yo(221,"h4"),pc(222,"NG8001: Unknown element warning"),yi(),yo(223,"p"),pc(224," Add "),yo(225,"code"),pc(226,"CUSTOM_ELEMENTS_SCHEMA"),yi(),pc(227," to the "),yo(228,"code"),pc(229,"schemas"),yi(),pc(230," array of your component decorator. See the "),yo(231,"strong"),pc(232,"Handling Angular's unknown element warnings"),yi(),pc(233," section above. "),yi()());},dependencies:[Cht,aht,Pvt],encapsulation:2});}}return o})();var M=[{path:"",component:h,data:{primary:true},children:[{path:"",component:E}]}],A="scoping";export{A as LIBRARY_NAME,M as ROUTES};