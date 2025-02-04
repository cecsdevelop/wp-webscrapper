<?php
/**
 * @package WebScrapper
 * Add CSS an JS Archives
 */

    namespace Inc\Base;

    use \Inc\Base\BaseController;

    class EnqueueController extends BaseController
    {
    public function register(){
        add_action( 'wp_enqueue_scripts', array($this, 'equeue_files') );
    }

    public function equeue_files(){
        $version = '1.0.0';
        //CSS
        wp_enqueue_style('webscrapper-styles-css', $this->plugin_url . 'assets/css/styles.css', [] ,$version, 'all');
        //BASE JS
        wp_enqueue_script('jquery');
        wp_enqueue_script('jquery-ui-sortable');
        wp_enqueue_media();
        //CUSTOM JS
        wp_enqueue_script('webscrapper-scripts-js', $this->plugin_url . 'assets/js/styles.js', ['jquery'], $version, true);

        // Localize the script
        wp_localize_script('webscrapper-scripts-js', 'wpScrapper', array(
            'ajaxurl' => admin_url('admin-ajax.php'),
            'nonce'   => wp_create_nonce('mi-nonce')
        ));
    }
}