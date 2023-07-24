import { DeclarationReflection, DefaultThemeRenderContext, JSX as React, JSX } from 'typedoc';
import { classNames } from '../utils';

export function memberGetterSetter(context: DefaultThemeRenderContext, props: DeclarationReflection) {
    return (
        <>
            <ul
                class={classNames(
                    {
                        'tsd-signatures': true,
                        'tsd-kind-accessor': true,
                        'tsd-parent-kind-class': true
                    },
                    context.getReflectionClasses(props)
                )}
            >
                {!!props.getSignature && (
                    <li class="tsd-signature tsd-kind-icon" id={props.getSignature.anchor}>
                        <span class="tsd-signature-symbol">get</span> {props.name}
                        {context.memberSignatureTitle(props.getSignature, {
                            hideName: true
                        })}
                    </li>
                )}
                {!!props.setSignature && (
                    <li class="tsd-signature tsd-kind-icon" id={props.setSignature.anchor}>
                        <span class="tsd-signature-symbol">set</span> {props.name}
                        {context.memberSignatureTitle(props.setSignature, {
                            hideName: true
                        })}
                    </li>
                )}
            </ul>
            {(!!props.getSignature || !!props.setSignature) && (
                <ul class="tsd-descriptions">
                    {!!props.getSignature && (
                        <li class="tsd-description">{context.memberSignatureBody(props.getSignature)}</li>
                    )}
                    {!!props.setSignature && (
                        <li class="tsd-description">{context.memberSignatureBody(props.setSignature)}</li>
                    )}
                </ul>
            )}
        </>
    );
}
