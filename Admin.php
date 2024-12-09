<?php
namespace BLS_BrandLogoSlider;
if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

if(!class_exists('Brand_Logo_Slider_Admin')) {

    class Brand_Logo_Slider_Admin {

        public static function init() {
            // Create an instance of the Admin class and register hooks
            $instance = new self();
            add_action('admin_menu', [$instance, 'bls_add_admin_menu']);
            add_action('wp_ajax_bls_ph_brand_logo_data', [$instance, 'bls_ph_brand_logo_data']);
            add_action( 'admin_enqueue_scripts', [$instance, 'bls_add_media_script'] );
            return $instance;
        }

        public function bls_ph_brand_logo_data(){
            
            if(!wp_verify_nonce(sanitize_text_field($_POST['nonce']), 'wp_rest')){
                wp_send_json_error('invalid request');
            }
    
            $data = json_decode(wp_kses_stripslashes(sanitize_text_field($_POST['data'])), true);
            $db_data = get_option('bls_ph_brand_logo_data', []);
            if(!$data && $db_data){
                wp_send_json_success($db_data);
            }
    
            update_option('bls_ph_brand_logo_data', $data);
    
            wp_send_json_success($data);
        }

        function bls_add_media_script( $hook_suffix ) {
            wp_register_style('customStyle', BLOGOSLIDER_ASSETS . 'css/custom.css', [], BLOGOSLIDER_VERSION, 'all');
            wp_enqueue_style('customStyle');
            wp_enqueue_media();
          
        }
          

        // Register admin menu
        public function bls_add_admin_menu() {
            add_menu_page(
                'Brand Logo Slider Page', // Page title
                'Brand Logo Slider',      // Menu title
                'manage_options',         // Capability
                'brand-logo-slider',      // Menu slug
                [$this, 'bls_twoSideRegister'],  // Callback function
                'data:image/svg+xml;base64,' . base64_encode('<svg width="30px" height="30px" viewBox="0 0 76 76" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 76.00 76.00"><path fill="#000000" fill-opacity="1" stroke-width="0.2" stroke-linejoin="round" d="M 27.2492,53.8333L 27.2492,21.3222L 39.136,21.3222C 42.779,21.3222 45.579,21.985 47.536,23.3106C 49.4929,24.6362 50.4714,26.5037 50.4714,28.913C 50.4714,30.6595 49.8763,32.1871 48.6862,33.4957C 47.496,34.8044 45.9745,35.7152 44.1216,36.228L 44.1216,36.3223C 46.4728,36.6078 48.3512,37.4629 49.7566,38.8877C 51.162,40.3124 51.8647,42.0481 51.8647,44.0945C 51.8647,47.0844 50.7907,49.455 48.6426,51.2063C 46.4946,52.9577 43.5604,53.8333 39.84,53.8333L 27.2492,53.8333 Z M 34.6803,26.896L 34.6803,34.3262L 37.8225,34.3262C 39.2981,34.3262 40.4592,33.9735 41.3059,33.2672C 42.1525,32.5608 42.5758,31.5884 42.5758,30.3499C 42.5758,28.047 40.8366,26.896 37.3581,26.896L 34.6803,26.896 Z M 34.6803,39.9L 34.6803,48.26L 38.6063,48.26C 40.2802,48.26 41.5925,47.8766 42.5432,47.1098C 43.4938,46.343 43.9692,45.2967 43.9692,43.9711C 43.9692,42.7036 43.5023,41.7082 42.5686,40.9849C 41.6348,40.2616 40.3286,39.9 38.6498,39.9L 34.6803,39.9 Z "/></svg>'),
                6,
                null,
                'my-custom-menu-icon'
            );
        }
        

        public function bls_twoSideRegister() {
            wp_enqueue_script('adminScript');
            wp_enqueue_style('adminStyle');
            
            ?>
            <div class="mainArea">
                
            </div>
            <?php
        }  
    }
}

?>
