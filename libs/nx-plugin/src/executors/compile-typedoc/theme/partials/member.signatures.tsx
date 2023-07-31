import { DeclarationReflection, DefaultThemeRenderContext } from 'typedoc';

import { JSX as React, JSX } from 'typedoc';
import { classNames } from '../utils';
export function memberSignatures(context: DefaultThemeRenderContext, props: DeclarationReflection) {
    const content = props.signatures?.map((item) => (
        <>
            <ul
                class={classNames(
                    { 'tsd-signatures': true, 'tsd-kind-method': true, 'tsd-parent-kind-class': true },
                    context.getReflectionClasses(props)
                )}
            >
                <li class="tsd-signature tsd-kind-icon" id={item.anchor}>
                    {context.memberSignatureTitle(item)}
                </li>
            </ul>
            <ul class="tsd-descriptions">
                <li class="tsd-description">{context.memberSignatureBody(item)}</li>
            </ul>
        </>
    ));
    return <>{content}</>;
}
