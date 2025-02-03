<?php
/*
 * Plugin Name:       Web Scrapper
 * @package           WebScrapper
 * @author            Intelindev Team
 * @copyright         2025 Intelindev
 * @license           GPL-2.0-or-later
 *
 * @wordpress-plugin
 * 
 * Description:       Web Scrapper allows you go to the providers page an catch the data from products.
 * Version:           1.0.0
 * Requires at least: 6.2
 * Requires PHP:      8.2
 * Author:            Intelindev Team
 * Author URI:        https://intelindev.com/our-team/
 * Text Domain:       smart-email
 * License:           GPL v2 or later
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
*/

if ( ! defined( 'ABSPATH' ) ) { die( 'Invalid request.' ); }

if(file_exists(dirname(__FILE__).'/vendor/autoload.php')){
    require_once dirname(__FILE__).'/vendor/autoload.php';
}


use Inc\Base\Activate;
use Inc\Base\Deactivate;

function activate_webscrapper(){
    Activate::activate();
}

function deactivate_webscrapper(){
    Deactivate::deactivate();
}

register_activation_hook(__FILE__, 'activate_webscrapper' );
register_deactivation_hook(__FILE__, 'deactivate_webscrapper' );



if(class_exists('Inc\\Init')){
    Inc\Init::register_services();
}