jQuery(document).on('click', '#start-puppeteer', function(e) {
    e.preventDefault();
    
    jQuery(this).prop('disabled', true);
    jQuery(this).text('Processing...');

    jQuery.ajax({
        url: wpScrapper.ajaxurl,
        type: 'POST',
        data: {
            action: 'wp_scrapper_ajax',
            nonce: wpScrapper.nonce
        },
        success: function(response) {
            console.log('Scraping completed:', response);
            jQuery('#start-puppeteer').text('Start Puppeteer');
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
            jQuery('#start-puppeteer').text('Error occurred');
        },
        complete: function() {
            jQuery('#start-puppeteer').prop('disabled', false);
        }
    });
});
