$(document).ready(function(){
	/* инициализация функций */
	nextBlock();
	initSendForm();
	/* описание функций */
	function nextBlock(){
		$('.btn_next').click(function(){
			removeAnswerInfo();
			var parentBlock = $(this).closest('.content_block');
				
			parentBlock.removeClass('active').next('.content_block').addClass('active');

			changeColorType();
			if($(this).hasClass('start_btn')){
				$('main').removeClass('half_width');
			}
		});
	};


	var arrColorTypeClassFull = $('#wrapper').attr("class").split(' ');
	var arrColorTypeClass = arrColorTypeClassFull.slice();

	function changeColorType(){
		arrColorTypeClass.splice(0, 1);
		$('#wrapper').attr("class", arrColorTypeClass.join(' '));

		if(!$('#wrapper').attr("class").length){
			$('#wrapper').attr("class", arrColorTypeClassFull.join(' '));
		}
	};

	$('.content_block:not(.block-signup) input').click(function(){
		$(this).closest('.content_block').find('.btn_next').addClass('active');
		if($(this).is('[data-statistic-count]') && $(this).is('[data-statistic-text]')){
			answerInfo($(this));
		}
	});

	function answerInfo(elem){
		counterAnimate(elem.data('statistic-count'));
		typeTextAnimate(elem.data('statistic-text'));
		$('.info_block .info_count span').html(elem.data('statistic-count'));
		$('.info_block p').html(elem.data('statistic-text'));
		$('.info_block').addClass('active');

	};
	function removeAnswerInfo(){
		$('.info_block').removeClass('active');
	};

	function counterAnimate(val) {
		var parseVal = parseFloat(val),
			count = 0;
		var _t = setInterval(function() {
			if(count >= parseVal){
				$('.info_block .info_count span').html(val);
				clearInterval(_t);
			}else{
				count += 1;
				$('.info_block .info_count span').html(count);
			}
		}, 10);
	};

	function typeTextAnimate(text) {
		var i = 0,
			temporaryText = [];
		var _t = setInterval(function() {
			if(i == text.length){
				clearInterval(_t);
			}else{
				temporaryText[temporaryText.length] = text[i];
				$('.info_block p').html(temporaryText);
				i++;
			}

		}, 20);
	};


	function initSendForm() {
		$('.main_form').each(function() {
			var form = $(this),
				input = form.find('input');

			form.find('.name').blur(function() {
				var val = $(this).val();
				if ((/^[a-zA-Z0-9а-яА-Я\s-]{1,40}$/ig).test(val)) {
					$(this).closest('.input_wrapper').removeClass('incorrect');
					$(this).closest('.input_wrapper').addClass('correct');
				} else {
					$(this).closest('.input_wrapper').addClass('incorrect');
					$(this).closest('.input_wrapper').removeClass('correct');
				}
			});
			form.on('keyup keydown', '.name', function() {
				var val = $(this).val();
				if ((/^[a-zA-Z0-9а-яА-Я\s-]{1,40}$/ig).test(val)) {
					$(this).closest('.input_wrapper').removeClass('incorrect');
					$(this).closest('.input_wrapper').addClass('correct');
				} else {
					$(this).closest('.input_wrapper').addClass('incorrect');
					$(this).closest('.input_wrapper').removeClass('correct');
				}
			});
			form.find('.password').blur(function() {
				var val = $(this).val();
				if ((/^[a-zA-Z0-9а-яА-Я\s-]{1,40}$/ig).test(val)) {
					$(this).closest('.input_wrapper').removeClass('incorrect');
					$(this).closest('.input_wrapper').addClass('correct');
				} else {
					$(this).closest('.input_wrapper').addClass('incorrect');
					$(this).closest('.input_wrapper').removeClass('correct');
				}
			});
			form.on('keyup keydown', '.password', function() {
				var val = $(this).val();
				if ((/^[a-zA-Z0-9а-яА-Я\s-]{1,40}$/ig).test(val)) {
					$(this).closest('.input_wrapper').removeClass('incorrect');
					$(this).closest('.input_wrapper').addClass('correct');
				} else {
					$(this).closest('.input_wrapper').addClass('incorrect');
					$(this).closest('.input_wrapper').removeClass('correct');
				}
			});
			form.find('.email').blur(function() {
				var val = $(this).val();
				if((/^[-\._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/ig).test(val) && val.length<=30){ 
					$(this).closest('.input_wrapper').removeClass('incorrect');
					$(this).closest('.input_wrapper').addClass('correct');
				} else {
					$(this).closest('.input_wrapper').addClass('incorrect');
					$(this).closest('.input_wrapper').removeClass('correct');
				}
			});
			form.on('keyup keydown', '.email', function() {
				var val = $(this).val();
				if((/^[-\._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/ig).test(val) && val.length<=30){
					$(this).closest('.input_wrapper').removeClass('incorrect');
					$(this).closest('.input_wrapper').addClass('correct');
				} else {
					$(this).closest('.input_wrapper').addClass('incorrect');
					$(this).closest('.input_wrapper').removeClass('correct');
				}
			});


			//Проверяем чтобы все радиобатоны были выбраны в форме регистрации
			var inputRadioArr = [];
			$('.block-signup input[type="radio"]').each(function(){
				inputRadioArr[inputRadioArr.length] = $(this).attr("name");
			});
			var arrUniqueNameRadio = unique(inputRadioArr);

			form.on('click', function() {
				for(var i = 0; i < arrUniqueNameRadio.length; i++){
					if (!$("input[name='"+arrUniqueNameRadio[i]+"']:checked").val()) {
						$("input[name='"+arrUniqueNameRadio[i]+"']").closest('.input_wrapper').addClass('incorrect');
					}else{
						$("input[name='"+arrUniqueNameRadio[i]+"']").closest('.input_wrapper').removeClass('incorrect');
					}
				}
			});
			$('.signup_holder .input_wrapper.list_variants').click(function(){
				input.trigger('blur');
			})

			form.on('click keyup keydown', function() {
				if (!form.find('.incorrect').length) {
					form.addClass('correct');
				}else{
					form.removeClass('correct');
				}
			});

			form.submit(function(e) {
				input.trigger('blur');
				if (form.find('.incorrect').length) {
					return false;
				} else {
					_url = 'path/to/phpfile';
					values = $(this).serialize();
					$.ajax({
						url: _url,
						type: 'post',
						data: values,
						success: function() {
							alert('success');
						},
						error: function() {
							alert('Server error');
						}
					});
					return false;
				}
			});
		});
	};

	function unique(arr) {
		var obj = {};
		for (var i = 0; i < arr.length; i++) {
			var str = arr[i];
			obj[str] = true; // запомнить строку в виде свойства объекта
		}
		return Object.keys(obj);
	};

});