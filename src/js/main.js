
/* button show more/less */
$(function() { 
    $(".btn-show").on("click", function() {
        let dataValue = $(this).data().value;
        $(this).html($(this).text() == 'VIEW MORE' ? 'SHOW LESS' : 'VIEW MORE');
        $(`.${dataValue}__showMore`).slideToggle('slow');
    });
});


/* bmooth scrolling - https://github.com/kevin-powell */
$(function() { 
    let scrollLink = $('.scroll');
    $('.scroll').click(function(e) {
        e.preventDefault();
        $('body,html').animate({
            scrollTop: $(this.hash).offset().top - 95
        }, 1000 );
    });


    /* active link switching */
    $(window).scroll(function() {
        let scrollbarLocation = $(this).scrollTop();

        scrollLink.each(function() {
            let sectionOffset = $(this.hash).offset().top - 95;
            if ( sectionOffset <= scrollbarLocation ) {
                $(this).parent().addClass('active');
                $(this).parent().siblings().removeClass('active');
            }
        })
    });
});

