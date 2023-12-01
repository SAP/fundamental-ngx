import { SemanticColor } from '../types';

/**
 * Associations for colors of the tabs.
 * If any of the color associations provided, they'll be read by screenreader instead of the actual color
 */
export type TabColorAssociations = Partial<Record<SemanticColor, string>>;
