import { DeclarationHierarchy, JSX as React, JSX, DefaultThemeRenderContext } from 'typedoc';
import { hierarchyList } from '../utils';

export function hierarchy(context: DefaultThemeRenderContext, props: DeclarationHierarchy | undefined) {
    if (!props) return;

    return (
        <section class="tsd-panel tsd-hierarchy">
            <h3>Hierarchy</h3>
            {hierarchyList(context, props)}
        </section>
    );
}
