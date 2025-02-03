<?php
/**
 * @package WebScrapper
 * 
 * 
 * ACTIVATION HOOKS
 */

namespace Inc\Webscrapper;

use \Inc\Base\BaseController;
use WP_Query;

class WebscrapperController extends BaseController
{    

    public function register()
    {
        add_shortcode('start_button', [$this, 'test_button']); 
        add_action('wp_enqueue_scripts', [$this, 'enqueue_scrapper_scripts']);
    }

    public function enqueue_scrapper_scripts()
    {
        wp_enqueue_script(
            'wp-scrapper-script',
            plugins_url('/assets/js/styles.js', dirname(dirname(__FILE__))),
            array('jquery'),
            '1.0.0',
            true
        );

        wp_localize_script('wp-scrapper-script', 'wp_scrapper', array(
            'nonce' => wp_create_nonce('mi-nonce')
        ));
    }

    public function test_button()
    {
        $button = '<button class="btn" id="start-puppeteer" name="start-puppeteer">Start Puppeteer</button>';
        return $button;
    }
}