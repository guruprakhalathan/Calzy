/*eslint-disable */

var COIL = COIL || {};

COIL.AboutPanel = function() {
  var _aboutToggle = null;
  var _aboutPanel = null;

  function initializeDomElements() {
    _aboutToggle = $(".js-about-toggle");
    _aboutPanel = $(".about-panel");
  }

  function wireEvents() {
    _aboutToggle.click(toggleAboutPanel)
  }

  function toggleAboutPanel() {
    _aboutPanel.toggleClass("is-active");
  }

  function initialize() {
    initializeDomElements();
    wireEvents();
  }

  return {
    initialize: initialize
  };
}();

$(document).ready(function() {
  COIL.AboutPanel.initialize();
})

var Coil = Coil || {};

Coil.Drawer = function() {
  var _drawerSelector = null;
  var _contentWrapper = null;
  var _blackout = null;
  var _drawer = null;

  function initializeDomElements() {
    _drawerSelector = $(".js-toggle-drawer");
    _contentWrapper = $(".coil-content-wrapper");
    _blackout = $(".coil-content__blackout");
    _drawer = $(".drawer");
  }

  function wireEvents() {
    _drawerSelector.click(toggleDrawer);
    _blackout.click(toggleDrawer);
  }

  function toggleDrawer() {
    _contentWrapper.toggleClass("has-open-drawer");
    _drawer.toggleClass("is-open");
  }

  function initialize() {
    initializeDomElements();
    wireEvents();
  }

  return {
    initialize: initialize
  };
}();

$(document).ready(function() {
  Coil.Drawer.initialize();
})

var COIL = COIL || {};

COIL.Validation = function() {
  var _inputWithError = null;

  function initializeDomElements() {
    _inputWithError = $('.has-error .form-control');
  }

  function wireEvents() {
    _inputWithError.focus(showErrorMessage);
  }

  function showErrorMessage() {
    var focusedInput = $(this);
    var errorMessage = focusedInput.data('error-message');

    focusedInput.tooltip({'trigger':'focus', 'title': '' + errorMessage +'', 'placement': 'right'});
  }

  function initialize() {
    initializeDomElements();
    wireEvents();
  }

  return {
    initialize: initialize
  };
}();

$(document).ready(function() {
  COIL.Validation.initialize();
})

var Coil = Coil || {};

Coil.Navpanel = function() {
  var _navpanel = null;
  var _navpanelToggle = null;
  var _navpanelPin = null;

  function initializeDomElements() {
    _navpanel = $(".navpanel");
    _navpanelToggle = $(".navbar__menu-toggle");
    _navpanelPin = $(".js-pin-navpanel");
  }

  function wireEvents() {
    _navpanelToggle.hover(showNav);
    _navpanel.mouseleave(hideNav);
    _navpanelPin.click(pinNav);
  }

  function showNav() {
    _navpanel.addClass("is-active");    // only add the class because we want it to stay open when you're not hovering
  }

  function hideNav() {
    _navpanel.removeClass("is-active");
  }

  function pinNav() {
    _navpanel.toggleClass("is-pinned");
  }

  function initialize() {
    initializeDomElements();
    wireEvents();
  }

  return {
    initialize: initialize
  };
}();

$(document).ready(function() {
  Coil.Navpanel.initialize();
})

var COIL = COIL || {};

COIL.Notifications = function() {
  var _toasterToggle = null;
  var _toasterClose = null;

  function initializeDomElements() {
    _toasterToggle = $('.js-toaster-toggle');
    _toasterClose = $('.toaster svg');
  }

  function wireEvents() {
    _toasterToggle.click(toggleToaster);
    _toasterClose.click(closeSelectedToaster);
  }

  function toggleToaster() {
    var toaster = $(this);
    var selectedToaster = toaster.data('toaster');

    selectedToaster = $(selectedToaster);
    selectedToaster.toggleClass('is-open');
  }

  function closeSelectedToaster() {
    var closeButton = $(this);
    var selectedToaster = closeButton.closest('.toaster');

    selectedToaster.removeClass('is-open');
  }

  function initialize() {
    initializeDomElements();
    wireEvents();
  }

  return {
    initialize: initialize
  };
}();

$(document).ready(function() {
  COIL.Notifications.initialize();
})

var COIL = COIL || {};

COIL.Popovers = function() {
  var popovers = null;

  function initializeDomElements() {
    popovers = $("[data-toggle=popover]");
  }

  function wireEvents() {
    popovers.click(function(e) {
      // Prevent a href="#" from doing anything
      e.preventDefault();
    });
  }

  function initializePopovers() {
    // Initializing all Popovers, which will all use an HTML element, rather
    // than inline as the Bootstrap docs suggest.
    // We initialize them here and grab the element the data-popover-content is
    // pointing to and inject it into the content option
    popovers.popover({
      html: true,
      content: function() {
        var contentLink = $(this).data('popover-content');

        return $(contentLink).html();
      }
    });
  }

  function initialize() {
    initializeDomElements();
    wireEvents();
    initializePopovers();
  }

  return {
    initialize: initialize
  };
}();

$(document).ready(function() {
  COIL.Popovers.initialize();
})

var COIL = COIL || {};

COIL.Tooltips = function() {

  function initializeTooltips() {
    $('[data-toggle="tooltip"]').tooltip()
  }

  function initialize() {
    initializeTooltips();
  }

  return {
    initialize: initialize
  };
}();

$(document).ready(function() {
  COIL.Tooltips.initialize();
})

jQuery(document).ready(function($){
	//check if a .cd-tour-wrapper exists in the DOM - if yes, initialize it
	$('.cd-tour-wrapper').exists() && initTour();

	function initTour() {
		var tourWrapper = $('.cd-tour-wrapper'),
			tourSteps = tourWrapper.children('li'),
			stepsNumber = tourSteps.length,
			coverLayer = $('.cd-cover-layer'),
			tourStepInfo = $('.cd-more-info'),
			tourTrigger = $('#cd-tour-trigger');

		//create the navigation for each step of the tour
		createNavigation(tourSteps, stepsNumber);

		tourTrigger.on('click', function(){
			//start tour
			if(!tourWrapper.hasClass('active')) {
				//in that case, the tour has not been started yet
				tourWrapper.addClass('active');
				showStep(tourSteps.eq(0), coverLayer);
			}
		});

		//change visible step
		tourStepInfo.on('click', '.cd-prev', function(event){
			//go to prev step - if available
			( !$(event.target).hasClass('inactive') ) && changeStep(tourSteps, coverLayer, 'prev');
		});
		tourStepInfo.on('click', '.cd-next', function(event){
			//go to next step - if available
			( !$(event.target).hasClass('inactive') ) && changeStep(tourSteps, coverLayer, 'next');
		});

		//close tour
		tourStepInfo.on('click', '.cd-close', function(event){
			closeTour(tourSteps, tourWrapper, coverLayer);
		});

		//detect swipe event on mobile - change visible step
		tourStepInfo.on('swiperight', function(event){
			//go to prev step - if available
			if( !$(this).find('.cd-prev').hasClass('inactive') && viewportSize() == 'mobile' ) changeStep(tourSteps, coverLayer, 'prev');
		});
		tourStepInfo.on('swipeleft', function(event){
			//go to next step - if available
			if( !$(this).find('.cd-next').hasClass('inactive') && viewportSize() == 'mobile' ) changeStep(tourSteps, coverLayer, 'next');
		});

		//keyboard navigation
		$(document).keyup(function(event){
			if( event.which=='37' && !tourSteps.filter('.is-selected').find('.cd-prev').hasClass('inactive') ) {
				changeStep(tourSteps, coverLayer, 'prev');
			} else if( event.which=='39' && !tourSteps.filter('.is-selected').find('.cd-next').hasClass('inactive') ) {
				changeStep(tourSteps, coverLayer, 'next');
			} else if( event.which=='27' ) {
				closeTour(tourSteps, tourWrapper, coverLayer);
			}
		});
	}

	function createNavigation(steps, n) {
		var tourNavigationHtml = '<div class="cd-nav"><span><b class="cd-actual-step">1</b> of '+n+'</span><ul class="cd-tour-nav"><li><a href="#0" class="cd-prev">&#171; Previous</a></li><li><a href="#0" class="cd-next">Next &#187;</a></li></ul></div><a href="#0" class="cd-close">Close</a>';

		steps.each(function(index){
			var step = $(this),
				stepNumber = index + 1,
				nextClass = ( stepNumber < n ) ? '' : 'inactive',
				prevClass = ( stepNumber == 1 ) ? 'inactive' : '';
			var nav = $(tourNavigationHtml).find('.cd-next').addClass(nextClass).end().find('.cd-prev').addClass(prevClass).end().find('.cd-actual-step').html(stepNumber).end().appendTo(step.children('.cd-more-info'));
		});
	}

	function showStep(step, layer) {
		step.addClass('is-selected').removeClass('move-left');
		smoothScroll(step.children('.cd-more-info'));
		showLayer(layer);
	}

	function smoothScroll(element) {
		(element.offset().top < $(window).scrollTop()) && $('body,html').animate({'scrollTop': element.offset().top}, 100);
		(element.offset().top + element.height() > $(window).scrollTop() + $(window).height() ) && $('body,html').animate({'scrollTop': element.offset().top + element.height() - $(window).height()}, 100);
	}

	function showLayer(layer) {
		layer.addClass('is-visible').on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
			layer.removeClass('is-visible');
		});
	}

	function changeStep(steps, layer, bool) {
		var visibleStep = steps.filter('.is-selected'),
			delay = (viewportSize() == 'desktop') ? 300: 0;
		visibleStep.removeClass('is-selected');

		(bool == 'next') && visibleStep.addClass('move-left');

		setTimeout(function(){
			( bool == 'next' )
				? showStep(visibleStep.next(), layer)
				: showStep(visibleStep.prev(), layer);
		}, delay);
	}

	function closeTour(steps, wrapper, layer) {
		steps.removeClass('is-selected move-left');
		wrapper.removeClass('active');
		layer.removeClass('is-visible');
	}

	function viewportSize() {
		/* retrieve the content value of .cd-main::before to check the actua mq */
		return window.getComputedStyle(document.querySelector('.cd-tour-wrapper'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
	}
});

//check if an element exists in the DOM
jQuery.fn.exists = function(){ return this.length > 0; }

var Coil = Coil || {};

Coil.Trowser = function() {
  _trowserToggle = null;
  _closeTrowser = null;

  function initializeDomElements() {
    _trowserToggle = $(".js-toggle-trowser");
    _closeTrowser = $(".js-close-trowser");
  }

  function wireEvents() {
    _trowserToggle.click(toggleTrowser);
    _closeTrowser.click(closeFromWithinTrowser);
  }

  function toggleTrowser() {
    var clickedTrowserToggle = $(this);
    selectedTrowser = $(clickedTrowserToggle.data("trowser"));

    selectedTrowser.toggleClass("is-open");
  }

  function closeFromWithinTrowser() {
    var clickedCloseTrowser = $(this);
    var wrappingTrowser = clickedCloseTrowser.closest(".trowser");

    wrappingTrowser.removeClass("is-open");
  }

  function initialize() {
    initializeDomElements();
    wireEvents();
  }

  return {
    initialize: initialize
  };
}();

$(document).ready(function() {
  Coil.Trowser.initialize();
})

/*eslint-enable */