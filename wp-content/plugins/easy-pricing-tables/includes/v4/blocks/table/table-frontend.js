(function(){
	
	function toggle(){
		var toggles = document.querySelectorAll( '.fca-ept-period-toggle' )
		toggles.forEach( function( el ){
			var parent_wrapper = el.closest( '.wp-block-easy-pricing-tables-toggle-table' )
			var tables = parent_wrapper.querySelectorAll('.wp-block-easy-pricing-tables-table')
			if( tables.length < 2 ) {
				return
			}
			if( el.checked ) {
				tables[1].classList.remove('visible')
				tables[1].classList.add('hidden')
				tables[0].classList.remove('hidden')
				tables[0].classList.add('visible')
			} else {
				tables[0].classList.remove('visible')
				tables[0].classList.add('hidden')
				tables[1].classList.remove('hidden')
				tables[1].classList.add('visible')
			}
		})
		matchRowHeight()
	}
	
	function isInEditor() {
		return !!(
			(window.wp && wp.data && (
				wp.data.select('core/block-editor') ||
				wp.data.select('core/edit-post') ||
				wp.data.select('core/edit-site')
			)) ||
			document.body.classList.contains('block-editor-page') ||
			document.querySelector('.editor-styles-wrapper')
		)
	}

	function comparisonTables() {
		var comparisonTables = document.querySelectorAll( '.wp-block-easy-pricing-tables-table.layout-8, .wp-block-easy-pricing-tables-table.layout-9, .wp-block-easy-pricing-tables-table.layout-12' )
		
		var isEditor = isInEditor()
		
		//FOR AVADA COMPATIBILITY, DISABLE IN BUILDER
		var avada_fusion_editor = document.querySelectorAll( '.fusion-live-editable' )
		if( avada_fusion_editor.length > 0 || isEditor ) {
			return
		}
		
		for( var i = 0; i < comparisonTables.length; i++ ) {
			var comparisonList = comparisonTables[i].querySelectorAll( '.comparisonText li' )
			
			for( var j = 0; j < comparisonList.length; j++ ) {
				var featuresTextRows = comparisonTables[i].querySelectorAll( '.featuresText:not(.comparisonText) li:nth-of-type('+ (j+1) +')' )
				featuresTextRows.forEach( function( selector ) {
					selector.innerHTML = "<p class='comparison-mobile-text'>"+ comparisonList[j].innerHTML +":</p>" + selector.innerHTML
				})
			}
			
		}
		
	}
	
	var matchRowHeightScheduled = false
	
	function matchRowHeight() {
		if (matchRowHeightScheduled) {
			return
		}
		window.requestAnimationFrame(matchRowHeightAnimation)
	}
	
	function matchRowHeightAnimation() {
		
		var tables = document.querySelectorAll( '.wp-block-easy-pricing-tables-table' )
		var isMobile = window.innerWidth < 781
		
		for( var j = 0; j < tables.length; j++ ) {
			var hasMatchRowHeight = tables[j].classList.contains('matchRowHeight')
			var setMinHeight = hasMatchRowHeight && !isMobile
			
			var elementsToMatch = [ '.planText', '.planSubText', '.priceText', '.pricePeriod', '.periodText', '.billingText' ]
			var isTemplate9 = tables[j].querySelectorAll( '.ept4Template-9' ).length > 0
			var isTemplate12 = tables[j].querySelectorAll( '.ept4Template-12' ).length > 0
			
			elementsToMatch.forEach( function( selector ) {
				
				var divs = tables[j].querySelectorAll( selector )		
				var minDivHeight = 0
				
				for( var i = 0; i < divs.length; i++ ) {				
					divs[i].style.minHeight = 0
					
					if ( divs[i].offsetHeight > minDivHeight ) {
						minDivHeight = divs[i].offsetHeight
					}
				}
				
				//SET DIV CSS
				if( setMinHeight ) {	
					for( var i = 0; i < divs.length; i++ ) {					
						divs[i].style.minHeight = minDivHeight + 'px'
					}
				}
			})
			
			//IMAGES -> MAX HEIGHT
			if( !isTemplate9 ) {
				var imgDivs = tables[j].querySelectorAll( '.planImage img' )		
				var maxDivHeight = 99999
				
				for( var i = 0; i < imgDivs.length; i++ ) {							
					imgDivs[i].style.maxHeight = 'none'
					
					if ( imgDivs[i].offsetHeight && imgDivs[i].offsetHeight < maxDivHeight ) {
						maxDivHeight = imgDivs[i].offsetHeight
					}
					
				}
				
				//SET DIV CSS
				if( setMinHeight ) {
					for( var i = 0; i < imgDivs.length; i++ ) {				
						imgDivs[i].style.maxHeight = maxDivHeight + 'px'
					}
				}
			}
			
			if( isTemplate9 ) {
				var spacerBlock =  tables[j].querySelector( '.comparisonSpacer' )
				spacerBlock.style.minHeight = 0
				var columns = tables[j].querySelectorAll( '.ept4Template-9' )
				var firstFeaturesDiv = columns[1]
				var elementsToCheck = [ '.planText', '.planImage', '.priceText', '.periodText' ]
				var minHeight = 0
				elementsToCheck.forEach( function( selector ) {
					if( firstFeaturesDiv.querySelector( selector ) ) {
						minHeight += firstFeaturesDiv.querySelector( selector ).offsetHeight
					}
				})
				
				if ( !isMobile ) {
					spacerBlock.style.minHeight = ( minHeight ) + 'px'					
				}
			}
			
			if( isTemplate12 ) {
				var spacerBlock =  tables[j].querySelector( '.comparisonSpacer' )
				spacerBlock.style.minHeight = 0
				var columns = tables[j].querySelectorAll( '.ept4Template-12' )
				var firstFeaturesDiv = columns[1]
				var elementsToCheck = [ '.planText', '.planImage', '.priceText', '.periodText' ]
				
				var minHeight = parseInt( firstFeaturesDiv.style.paddingTop )
				elementsToCheck.forEach( function( selector ) {
					if( firstFeaturesDiv.querySelector( selector ) ) {
						minHeight += firstFeaturesDiv.querySelector( selector ).offsetHeight
					}
				})
				
				if ( !isMobile ) {
					spacerBlock.style.minHeight = ( minHeight + 2 ) + 'px'					
				}
			}
			
			//RESET HEIGHTS
			var listItems = tables[j].querySelectorAll( '.featuresText li' )	
			listItems.forEach( function( item ) {
				item.style.minHeight = 0
			})
			
			//FIND LONGEST LIST..?
			var featuresTextLists = tables[j].querySelectorAll( '.featuresText' )	
			var longestList = []
			featuresTextLists.forEach( function( currentList ) {
				currentList.style.minHeight = 0
				var currentListItems = currentList.querySelectorAll('li')
				if( currentListItems.length > longestList.length ) {
					longestList = currentListItems
				}
			})
				
			for( var x = 1; x <= longestList.length; x++ ) {		
				var itemMinHeight = 0
				var ThislistItemRow = tables[j].querySelectorAll( ".featuresText li:nth-child("+x+")" )
				ThislistItemRow.forEach( function( currentItem ) {
					if ( currentItem.offsetHeight > itemMinHeight ) {
						itemMinHeight = currentItem.offsetHeight
					}
				})
				
				
				//SET DIV CSS
				if( setMinHeight ) {					
					for(  var z = 0; z < ThislistItemRow.length; z++ ) {				
						ThislistItemRow[z].style.minHeight = itemMinHeight + 'px'
					}
				}
			}
			
			//MATCH LIST LENGTHS
			var listMinHeight = 0
			featuresTextLists.forEach( function( currentList ) {
				if ( currentList.offsetHeight > listMinHeight ) {
					listMinHeight = currentList.offsetHeight
				}
			})
			
			//SET LIST DIV CSS
			if( setMinHeight ) {	
				featuresTextLists.forEach( function( currentList ) {
					currentList.style.minHeight = listMinHeight + 'px'
				})
			}			
		}
		
	}
		
	document.addEventListener( 'DOMContentLoaded', toggle )
	
	window.addEventListener( 'load', comparisonTables )
	window.addEventListener( 'load', toggle )
	
	document.addEventListener( 'keyup', toggle )
	document.addEventListener( 'click', toggle )
	
})()
