$(document).ready(function () {
	// Всплывающие формы
	$('.pop-up').click(function(e){
		var btn = $(this),
			btn_name = $(this).data('btn'),
			title = $(this).data('title'),
			desc = $(this).data('desc'),
			ordername = $(this).data('ordername');
			
		$('#pop-up').bPopup({
			positionStyle: 'fixed',
			onOpen:  function(){ 
				$('#pop-up h3').html(title);
				$('#pop-up p').html(desc);
				$('#pop-up .btn').val(btn_name);
				$('#pop-up .ordername').val(ordername);	
				if(btn.hasClass('select')) {
					$('#pop-up .s_type').val(btn.closest('.form').find('.s_type').val());
					$('#pop-up .s_area').val(btn.closest('.form').find('.s-area').slider('value'));
					$('#pop-up .s_height').val(btn.closest('.form').find('.s-height').slider('value'));
					$('#pop-up .s_quantity').val(btn.closest('.form').find('.s-quantity').slider('value'));
					$('#pop-up .s_price').val(btn.closest('.form').find('.s_price').val());
				}
			},
			onClose: function() {
			   $(this).find('.required').each( function(){
				   $(this).removeClass('error');
				   $(this).next('.error-text').hide();
			   });
			   $('#pop-up h3').html('');
				$('#pop-up p').html('');
			   $(this).find('input').val('');
			}			
		});	
		e.preventDefault();
	}); //end forms
	
	// Отправка письма с помощью AJAX
    $('form').submit(function(e){
        e.preventDefault();
		var errors = false;		
		var id = $(this).parent().attr('id');
		
		$(this).find('.required').each(function(){
			if($(this).val() == '' && $(this).is(":visible")) { 
				errors = true; 
				$(this).addClass('error');
				$(this).next('.error-text').show();
			} else {
				$(this).removeClass('error');
				$(this).next('.error-text').hide();
			}	
		});	
		
		if(errors == false) {
			$.ajax({
				url: 'php/send.php',
                type: 'post',
                context: this,
                data: $(this).serialize(),
				success: function(response){				
					if(!$(this).hasClass('download')) {
						$('#pop-up').bPopup().close();
						window.location.replace('thank-you.html');
					} else {
						location.href = 'download.php@file=catalog.pdf';
					}
					//yaCounter.reachGoal('ORDER'); return true;
				}
            });
		}
	}); // end submit()
	
	$('.required').click(function(){
		$(this).removeClass('error');
		$(this).next('.error-text').hide();
	});
	
	// Selection
	$('.s-area').slider({
		range: "min",
		min: 1,
		max: 500,
		value: 30,
		slide: function( event, ui ) {
			$(this).find('.ui-slider-handle').attr('data-value', ui.value + ' м2');
			$(this).closest('.slider').find('input').val(ui.value);
		},
		create: function( event, ui ) {
			$(this).find('.ui-slider-handle').attr('data-value', '30 м2');
			$(this).closest('.slider').find('input').val('4');
		}
    });
	
	$('.s-height').slider({
		range: "min",
		min: 1,
		max: 5,
		value: 2,
		step: 1,
		slide: function( event, ui ) {
			$(this).find('.ui-slider-handle').attr('data-value', ui.value + ' м');
			$(this).closest('.slider').find('input').val(ui.value);
		},
		create: function( event, ui ) {
			$(this).find('.ui-slider-handle').attr('data-value', '2 м');
			$(this).closest('.slider').find('input').val('4');
		}
    });
	
	$('.s-quantity').slider({
		range: "min",
		min: 1,
		max: 100,
		value: 3,
		slide: function( event, ui ) {
			$(this).find('.ui-slider-handle').attr('data-value', ui.value + ' чел');
			$(this).closest('.slider').find('input').val(ui.value);
		},
		create: function( event, ui ) {
			$(this).find('.ui-slider-handle').attr('data-value', '3 чел');
			$(this).closest('.slider').find('input').val('4');
		}
    });
	
	// сохраняем высоту шапки
	var headerHeight = $('header').height();
  
	// Прокрутка при клике по пункту меню 
	$("a.header-nav-link, a.firstpage-link").click(function(e) {
		e.preventDefault();
		var offsetTop = $("#"+$(this).data("target")).offset().top - headerHeight;
		$('html, body').animate({scrollTop: offsetTop}, 1000);
	}); // end
	
	// обработка скроллинга (изменение активного элемента меню)
	$(document).scroll(function(){
		var offsets = [];
		$('nav a.header-nav-link').each(function(index, element){
		offsets.push($("#" + $(element).data('target')).offset().top);
	});
    offsets.push($(document).height());
    var docScroll = $(document).scrollTop() + headerHeight + $(window).height() / 2;
    for (var i = 0; i < offsets.length - 1; i++) {
      if (docScroll >= offsets[i] && docScroll < offsets[i+1]) {
        $('nav li.active').removeClass('active');
        $('nav li').eq(i).addClass('active');
        break;
      };
    };
	}); // end
});