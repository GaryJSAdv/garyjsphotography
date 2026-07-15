( function( blocks, editor, element ) {

	var el  = React.createElement
	
	blocks.registerBlockType( 'easy-pricing-tables/shortcode', {	
		icon: 'shortcode',
		edit: function( props ) {
						
			return	el( 'div', {},
					el( wp.components.TextareaControl, {
						label: 'Shortcode (overrides default button)',
						value: props.attributes.content,
						onChange: function( newValue ){
							var parentMatches = wp.data.select('core/block-editor').getBlockParentsByBlockName( props.clientId, [ 'easy-pricing-tables/button' ] )
							var parentAttributes = wp.data.select('core/block-editor').getBlockAttributes( parentMatches[0] )
							parentAttributes.shortcode = newValue
							wp.data.dispatch('core/block-editor').updateBlock( parentMatches[0], parentAttributes )
							props.setAttributes({ content: newValue })
							
						}
					}),
					el( wp.serverSideRender, {
						key: 'ept4-shortcode-ssr',
						block: 'easy-pricing-tables/shortcode',
						attributes:  props.attributes,
					})
			)

		},
		save: function( props ) {
			return null
		}
	} )	
	
}(
	window.wp.blocks,
	window.wp.editor,
	window.wp.element
))