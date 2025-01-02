/*
 * Start
 *
 * Contains:
 * - loading of javascript files via require.js
 * - initialize carousel on frontpage
 * - removes content from modal box
 * -
 *
 * Copyright (c) 2013 Dynamicweb
 *
 * Licensed under the MIT license:
 *	 http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *	 https://github.com/dynamicweb/solutionset
 *
 * Version: 0.9.0
 *
 */
if (typeof designBaseUrl === 'undefined') {
	alert('designBaseUrl is not defined');
}

require.config({
	baseUrl: designBaseUrl+'/assets/vendor/',
	paths: {
		'InstantSearch' : '/Admin/Content/JsLib/dw/InstantSearch.min',
		// jQuery and its plugins
		'jquery': 'empty:',
		'modernizer' : '../vendor/modernizr.min',
		'jquery-ui' : '../vendor/jquery-ui-1.8.23.custom.min',
		'touch-punch' : '../vendor/jquery.ui.touch-punch.min',
		'jquery-autocomplete' : 'jquery.ui.autocompleteAddress',
		'jquery-query' : '../vendor/jquery.query.min',
		'jquery-lazyload' : '../vendor/jquery.lazyload.min',
		'jquery-wrapmenu' : 'jquery.wrapMenu.min',
		'dw-productsload' : 'dynamicweb.productsAutoLoad',
		'jquery-instantarrows': 'jquery.instantArrows.min',
		'jquery-printElement' : '../vendor/jquery.printElement',
		'jquery-zoom' : '../vendor/jquery.zoom',
		'jquery-cookie' : '../vendor/jquery.cookie',
		// Bootstrap JS and its componetns
		'bootstrap' : '../vendor/bootstrap/bootstrap.min',
		'dw-carousel' : 'dynamicweb.thumbnailsCarousel',
		'filters' : 'dynamicweb.filters', //.min',
		'layout' : 'dynamicweb.layout' //.min'
	},
	shim: {
		'layout' : [
			'modernizer',
			'jquery',
			'jquery-query',
			'jquery-ui',
			'touch-punch',
			'filters',
			'InstantSearch' // Need to change code to avoid this dependence
		],
		'filters' : [
			'jquery',
			'jquery-ui',
			'jquery-query'
		],
		'jquery-printElement' :['jquery'],
		'jquery-ui' : ['jquery'],
		'touch-punch' : ['jquery-ui'],
		'jquery-autocomplete' : ['jquery', 'jquery-ui'],
		'jquery-query' : ['jquery'],
		'jquery-lazyload' : ['jquery'],
		'productsload' : ['jquery'],
		'jquery-wrapmenu' : ['jquery'],
		'bootstrap': ['jquery'],
    'dw-carousel' : ['bootstrap'],
    'respond': []
	}
});

require(
	[
		'jquery',
		'layout',
		'bootstrap',
		'jquery-wrapmenu',
		'jquery-instantarrows'
	],
	function ($) {

    if (!window.matchMedia && !window.msMatchMedia) {
      require(['respond']);
    }

	$(document).ready(function () {
		//initialize carousel
		$('.carousel').carousel();

		//removes content from modal box
		$('body').on('hidden', '.modal', function () {
			$(this).removeData('modal');
		});
		$('body').on('click.collapse-next.data-api', '[data-toggle=collapse-next]', function (e) {
				var $this = $(this)
					, $target = $(this).parents('.collapse-container').find('.collapse');
				$target.collapse('toggle');
				$this[!$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed');
		});
	});

	//Makes the keydown
		$(document).keydown(function (e) {
					$('#product-instant-search, #product-instant-search-bottom, #product-quickadd-instant-search').InstantArrows(e);
		});

	}
);
