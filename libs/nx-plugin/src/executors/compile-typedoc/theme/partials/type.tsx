import { DefaultThemeRenderContext, SomeType, TypeContext } from 'typedoc';
import { FormattedCodeBuilder, FormattedCodeGenerator, Wrap } from 'typedoc/dist/lib/output/formatter.js';

export function type(
    context: DefaultThemeRenderContext,
    type: SomeType | undefined,
    options: { topLevelLinks: boolean } = { topLevelLinks: false }
) {
    const builder = new FormattedCodeBuilder(context.urlTo);
    const tree = builder.type(type, TypeContext.none, options);
    const generator = new FormattedCodeGenerator(context.options.getValue('typePrintWidth'));
    generator.node(tree, Wrap.Detect);
    return generator.toElement();
}
