/*
const query = this.entityStore.queryBuilder.where(
    and(
        eq('currency', 'USD')
        gt('amount.value', 300)
    )
);

this.req$ = this.query.orderBy(..).firstResult(15).maxResult(100).select();

this.query.next();
 */

describe('Store: Query', () => {

    it('should work', () => {
        expect(true).toBeTruthy();
    });

});
/*

  private String processWhereSpecification( StringBuilder queryBuilder,
                                                        Predicate<Composite> spec)
        {
            if( spec == null )
            {
                return matchAllQuery();
            }
            if( spec instanceof QuerySpecification )
            {
                return wrapperQuery( ( (QuerySpecification) spec ).query() );
            }
            processSpecification( queryBuilder, spec, variables );
            return matchAllQuery();
        }
    }

    private void processSpecification( StringBuilder queryBuilder,
                                           Predicate<Composite> spec)
            throws EntityFinderException
        {
            if( spec instanceof BinaryPredicate )
            {
                BinaryPredicate binSpec = (BinaryPredicate) spec;
                processBinarySpecification( queryBuilder, binSpec, variables );
            }
            else if( spec instanceof Notpredicate )
            {
                Notpredicate notSpec = (Notpredicate) spec;
                processNotSpecification( queryBuilder, notSpec, variables );
            }
            else if( spec instanceof ComparisonPredicate )
            {
                ComparisonPredicate<?> compSpec = (ComparisonPredicate<?>) spec;
                processComparisonSpecification( queryBuilder, compSpec, variables );
            }
            else if( spec instanceof ContainsAllPredicate )
            {
                ContainsAllPredicate<?> contAllSpec = (ContainsAllPredicate) spec;
                processContainsAllSpecification( queryBuilder, contAllSpec, variables );
            else
            {
                throw new UnsupportedOperationException( "Query specification unsupported by Elastic Search "
                                                         + "(New Query API support missing?): "
                                                         + spec.getClass() + ": " + spec );
            }
        }

        private void processBinarySpecification( StringBuilder c,
                                                 BinaryPredicate spec )
            throws EntityFinderException {}
            Iterable<Predicate<Composite>> operands = spec.operands();
            if( spec instanceof AndPredicate )
            {
                BoolQueryBuilder andBuilder = boolQuery();
                for( Predicate<Composite> operand : operands )
                {
                    processSpecification( andBuilder, operand, variables );
                }
                queryBuilder.add( andBuilder );
            }
            else if( spec instanceof OrPredicate )
            {
                BoolQueryBuilder orBuilder = boolQuery();
                for( Predicate<Composite> operand : operands )
                {
                    BoolQueryBuilder shouldBuilder = boolQuery();
                    processSpecification( shouldBuilder, operand, variables );
                    orBuilder.should( shouldBuilder );
                }
                orBuilder.minimumShouldMatch( 1 );
                queryBuilder.add( orBuilder );
            }
            else
            {
                throw new UnsupportedOperationException( "Binary Query specification is nor an AndSpecification "
                                                         + "nor an OrSpecification, cannot continue." );
            }
        }
 private void processComparisonSpecification( String queryBuilder,
                                                     ComparisonPredicate<?> spec ) {
                // Query by simple property value
                String name = spec.property().toString();
                Object value = resolveVariable( spec.value(), variables );
                if( spec instanceof EqPredicate )
                {
                    queryBuilder.add( eqQuery( name, value ) );
                }
                else if( spec instanceof NePredicate )
                {
                    queryBuilder.add( neQuery( name, value ) );
                }
               ....
        }


*/
