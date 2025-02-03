jQuery(document).ready(function($) {
    $('#start-puppeteer').on('click', function(e) {
        e.preventDefault();
        
        // Disable button while processing
        $(this).prop('disabled', true);
        $(this).text('Processing...');

        // Make the AJAX call
        $.ajax({
            url: ajaxurl,
            type: 'POST',
            data: {
                action: 'wp_scrapper_ajax',
                nonce: wp_scrapper.nonce
            },
            success: function(response) {
                console.log('Scraping completed:', response);
                $('#start-puppeteer').text('Start Puppeteer');
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
                $('#start-puppeteer').text('Error occurred');
            },
            complete: function() {
                // Re-enable button
                $('#start-puppeteer').prop('disabled', false);
            }
        });
    });
});