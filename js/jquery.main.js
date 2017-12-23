/* script by ProVerstka */
$(document).ready(function(){
	/* инициализация функций */
	nextBlock();
	/* описание функций */
	function nextBlock(){
		$('.btn_next').click(function(){
			var parentBlock = $(this).closest('.content_block'),
				arrClass = parentBlock.attr("class").split(' ');
			for(var i = 0; i < arrClass.length; i++){
				var classBlock = arrClass[i].split('-');

				var countBlockNumber = classBlock[1],
					classBlock = classBlock[0];
					console.log(classBlock)
				if(classBlock == 'block'){
					console.log('1');
					parentBlock.removeClass('active')
					countBlockNumber++;
					$('.content_block').each(function(){
						console.log(classBlock+"-"+ (countBlockNumber))
						if($(this).hasClass(classBlock+"-"+(countBlockNumber))){
							$(this).addClass('active');
						}
					})
					break;
				}
			}

		});
	};
	$('.question_block input').click(function(){
		$(this).closest('.question_block').find('.btn_next').addClass('active');
	});
});

/* подключение плагинов */