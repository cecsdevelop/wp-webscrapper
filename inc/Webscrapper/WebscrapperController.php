<?php
/**
 * @package WebScrapper
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

        // Manejar la solicitud AJAX
        add_action('wp_ajax_wp_scrapper_ajax', [$this, 'wp_scrapper_run_puppeteer']);
        add_action('wp_ajax_nopriv_wp_scrapper_ajax', [$this, 'wp_scrapper_run_puppeteer']);
    }

    public function test_button()
    {
        $button = '<button class="btn" id="start-puppeteer" name="start-puppeteer">Start Puppeteer 2</button>';
        return $button;
    }

    public function wp_scrapper_run_puppeteer() {
        // Verificar el nonce de seguridad
        check_ajax_referer('mi-nonce', 'nonce');

        // Construir la ruta absoluta al script de Puppeteer
        $nodeScript = plugin_dir_path(__FILE__) . '../../node-scripts/puppeteer-script.js';

        // Comando para ejecutar Puppeteer con Node.js
        // Se usa 2>&1 para capturar errores también
        $command = "node " . escapeshellarg($nodeScript) . " 2>&1";

        // Ejecutar el comando y capturar la salida
        $output = shell_exec($command);

        // Si no se obtuvo salida, enviar error
        if ($output === null) {
            wp_send_json_error(['message' => 'No se obtuvo salida del script.']);
        }

        // Intentar decodificar la salida JSON
        $data = json_decode($output, true);
        if ($data === null) {
            // En caso de error, puedes retornar la salida completa para depuración
            wp_send_json_error(['message' => 'Error al decodificar JSON. Salida: ' . $output]);
        } else {
            // Opcional: Guardar la información en un archivo "prices.json" en la raíz del plugin (o proyecto)
            $jsonFilePath = plugin_dir_path(__FILE__) . '../../prices.json';
            file_put_contents($jsonFilePath, json_encode($data, JSON_PRETTY_PRINT));

            // Devolver la información extraída en la respuesta AJAX
            wp_send_json_success(['message' => 'Información extraída correctamente.', 'data' => $data]);
        }
    }

}
