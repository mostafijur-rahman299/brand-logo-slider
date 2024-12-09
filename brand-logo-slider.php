<?php
/**
 * Plugin Name: Brand Logo Slider
 * Description: You can quickly create sliders with a Gutenberg feel.
 * Version: 1.0.0
 * Author: Mostafijur
 * Author URI: https://github.com/mostafijur-rahman299
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: brand-logo-slider
 */


if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

if (!class_exists('BLS_PH_Brand_Logo_Slider')) {

    class BLS_PH_Brand_Logo_Slider {

        function __construct() {
            // Define constants
            $this->define_constants();

            // Register assets once
            add_action('init', [$this, 'register_assets']);

            // Enqueue for admin
            add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_assets']);

            // Enqueue for frontend
            add_action('wp_enqueue_scripts', [$this, 'enqueue_frontend_assets']);

            add_shortcode('bls-slider', [$this, 'bls_brand_logo_shortcode'], 20);

            // Admin functions
            if (is_admin()) {
                $this->admin_init();
            }
        }

        public function define_constants() {
            define('BLOGOSLIDER_VERSION', '1.0.0');
            define('BLOGOSLIDER_FILE', __FILE__);
            define('BLOGOSLIDER_PATH', __DIR__);
            define('BLOGOSLIDER_URL', plugins_url('', BLOGOSLIDER_FILE));
            define('BLOGOSLIDER_ASSETS', BLOGOSLIDER_URL . '/assets/');
        }

        /**
         * Register all scripts and styles.
         */
        public function register_assets() {
            // Register scripts
            wp_register_script('swipeScript', BLOGOSLIDER_ASSETS . 'js/swiper-min.js', [], '11.1.15', true);
            wp_register_script('adminScript', BLOGOSLIDER_URL . '/dist/admin-script.js', ['react', 'react-dom', 'wp-components', 'wp-i18n', 'swipeScript'], BLOGOSLIDER_VERSION, true);
            wp_register_script('frontEnd', BLOGOSLIDER_URL . '/dist/frontEnd-script.js', ['react', 'react-dom', 'swipeScript'], BLOGOSLIDER_VERSION, true);

            // Register styles
            wp_register_style('swipeStyle', BLOGOSLIDER_ASSETS . 'css/swiper-min.css', [], '11.1.15', 'all');
            wp_register_style('adminStyle', BLOGOSLIDER_URL . '/dist/admin-style.css', ['swipeStyle'], BLOGOSLIDER_VERSION, 'all');
            wp_register_style('font-end', BLOGOSLIDER_URL . '/dist/font-end.css', ['swipeStyle'], BLOGOSLIDER_VERSION, 'all');
        }

        /**
         * Enqueue admin-specific assets.
         */
        public function enqueue_admin_assets() {
            wp_enqueue_script('swipeScript');
            wp_enqueue_script('adminScript');
            wp_enqueue_style('swipeStyle');
            wp_enqueue_style('adminStyle');
            wp_enqueue_style('font-end');
        }

        /**
         * Enqueue frontend-specific assets.
         */
        public function enqueue_frontend_assets() {
            wp_enqueue_script('swipeScript');
            wp_enqueue_script('frontEnd');
            wp_enqueue_style('swipeStyle');
            wp_enqueue_style('font-end');
        }

        // Admin Functions
        public function admin_init() {
            if (!class_exists('BLS_BrandLogoSlider\Brand_Logo_Slider_Admin')) {
                require_once BLOGOSLIDER_PATH . '/Admin.php';
            }
            $admin = BLS_BrandLogoSlider\Brand_Logo_Slider_Admin::init();
        }

        public function bls_brand_logo_shortcode($atts) {
            $attributes = get_option('bls_ph_brand_logo_data') ?: [];
            ob_start();
            ?>
            <div id="bslMainLayout" class="bslMainLayout" data-attributes='<?php echo esc_attr(wp_json_encode($attributes)); ?>'>
            </div>
            <?php
            return ob_get_clean();
        }
    }

    new BLS_PH_Brand_Logo_Slider();
}
