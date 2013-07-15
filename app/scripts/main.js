prettyPrint();


$(function() {
	$('.codeblock').each(function(){
		var total = 0, curr = 0, showprocessed = false, $block, $prev, $next, $curr, $total;

		if ( $(this).hasClass('showprocessed') )
			showprocessed = true;
		
		$block = $(this).find('pre');

		if ( $block.length == 0 )	// there is no code to work with
			return false;

		$prev = $(this).find('.prev');
		$next = $(this).find('.next');

		total = $block.find('ol > li').length;

		$total = $(this).find('.total');
		$total.text(total);

		$curr = $(this).find('.curr');

		$prev.add($next).click(function(event){
			event.preventDefault();

			if ( $(this).hasClass('prev') && curr > 0 )
				curr--;
			else if ( $(this).hasClass('next') && curr < total )
				curr++;
			else if ( $(this).hasClass('next') && curr == total && showprocessed )
				alert('akce!'); // something to happen when the end is now

			$curr.text(curr);

			$block.find('.active-line').removeClass('active-line');

			$block.find('li:nth-child(' + curr + ')').addClass('active-line');

			return false;
		});
	});
});


function htmlForTextWithEmbeddedNewlines(text) {
    var htmls = [];
    var lines = text.split(/\n/);
    // The temporary <div/> is to perform HTML entity encoding reliably.
    //
    // document.createElement() is *much* faster than jQuery('<div/>')
    // http://stackoverflow.com/questions/268490/
    //
    // You don't need jQuery but then you need to struggle with browser
    // differences in innerText/textContent yourself
    var tmpDiv = jQuery(document.createElement('div'));
    for (var i = 0 ; i < lines.length ; i++) {
        htmls.push(tmpDiv.text(lines[i]).html());
    }
    return htmls.join("<br>");
}