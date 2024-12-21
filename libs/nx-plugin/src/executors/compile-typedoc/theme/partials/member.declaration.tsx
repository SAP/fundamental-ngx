import { DeclarationReflection, DefaultThemeRenderContext, JSX } from 'typedoc';
import { getKindClass, hasTypeParameters, renderTypeParametersSignature, wbr } from '../utils';

export function memberDeclaration(context: DefaultThemeRenderContext, props: DeclarationReflection) {
    return (
        <>
            <div class="tsd-signature tsd-kind-icon">
                <span class={getKindClass(props)}>{wbr(props.name)}</span>
                {renderTypeParametersSignature(context, props.typeParameters)}
                {props.type && (
                    <>
                        <span class="tsd-signature-symbol">{!!props.flags.isOptional && '?'}:</span>{' '}
                        {context.type(props.type)}
                    </>
                )}
                {!!props.defaultValue && (
                    <>
                        <span class="tsd-signature-symbol">
                            {' = '}
                            {props.defaultValue}
                        </span>
                    </>
                )}
            </div>

            {context.commentSummary(props)}

            {hasTypeParameters(props) && context.typeParameters(props.typeParameters)}

            {props.type && context.typeDeclaration(props.type)}

            {context.commentTags(props)}

            {context.memberSources(props)}
        </>
    );
}
