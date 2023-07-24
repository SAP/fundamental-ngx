import { DeclarationReflection, DefaultThemeRenderContext, JSX as React, JSX, ReferenceReflection } from 'typedoc';
import { classNames, getDisplayName, reflectionFlags, wbr } from '../utils';

export function member(context: DefaultThemeRenderContext, props: DeclarationReflection) {
    context.page.pageHeadings.push({
        link: `#${props.anchor}`,
        text: getDisplayName(props),
        kind: props.kind,
        classes: context.getReflectionClasses(props)
    });
    return (
        <section
            class={classNames(
                { 'tsd-panel': true, 'tsd-member': true, 'tsd-kind-property': true, 'tsd-parent-kind-class': true },
                context.getReflectionClasses(props)
            )}
        >
            <a id={props.anchor} class="tsd-anchor"></a>
            {!!props.name && (
                <h3>
                    {reflectionFlags(context, props)}
                    <span class={classNames({ deprecated: props.isDeprecated() })}>{wbr(props.name)}</span>
                </h3>
            )}
            {props.signatures
                ? context.memberSignatures(props)
                : props.hasGetterOrSetter()
                ? context.memberGetterSetter(props)
                : props instanceof ReferenceReflection
                ? context.memberReference(props)
                : context.memberDeclaration(props)}

            {props.groups?.map((item) => item.children.map((item) => !item.hasOwnDocument && context.member(item)))}
        </section>
    );
}
