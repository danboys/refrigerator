
(function($) {
	$.extend($.fn, {
		validate: function(alertform) {
			var $el = $(this);
			var $inputs = $el.find('.required');
			var $first = null;
			$inputs.each(function() {
				$(this).off('keyup.validate change.validate blur.validate').on('keyup.validate change.validate blur.validate', function() {
					if ($(this).val() === '') {
						$(this).closest('div').closest('div').addClass('has-error');
					}
					else {
						$(this).closest('div').removeClass('has-error');
						$(alertform).fadeOut('fast');
					}
				});

				if ($(this).val() === '') {
					$(this).closest('div').addClass('has-error');
					if ($first === null) {
						$first = $(this);
						$(alertform).html($(this).data('name') + " Field Should Not Be Empty!").fadeIn('fast');
					}
				}
				else if ($(this).hasClass('required-email')) {
					var email_exp = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
					if (!$(this).val().match(email_exp)) {
						$(this).closest('div').addClass('has-error');
						if ($first === null) {
							$first = $(this);
							$(alertform).html($(this).data('name') + " Is Not A Valid Email!").fadeIn('fast');
						}
					}
				}
				else {
					$(this).closest('div').removeClass('has-error');
				}
			});

			if ($first !== null) {
				$first.focus();
				return false;
			}
			else {
				$(alertform).fadeOut('fast');
				return true;
			}
		}
	});
})(jQuery);