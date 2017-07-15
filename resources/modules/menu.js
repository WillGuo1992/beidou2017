define(["jquery"], function($) {
	var Accordion = function(el, multiple) {
		this.el = el || {};
		this.multiple = multiple || false;

		// Variables privadas
		var links = this.el.find('.link');
		var hrefs = this.el.find("a");
		// Evento
		links.on('click', {
			el: this.el,
			multiple: this.multiple
		}, this.dropdown);
		hrefs.click(function() {
			hrefs.removeClass("active");
			$(this).addClass('active');
		});

	}
	Accordion.prototype.dropdown = function(e) {
		var $el = e.data.el;
		$this = $(this),
			$next = $this.next();

		$next.slideToggle();
		$this.parent().toggleClass('open');

		if (!e.data.multiple) {
			$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
		};
	}
	return {
		init: function(dom) {
			return new Accordion(dom, false);
		}
	}
})