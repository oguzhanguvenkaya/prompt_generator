<?php
/**
 * Plugin Name: MGPS PPF Premium
 * Description: MG Polishing PPF premium sayfa bölümleri shortcode koleksiyonu
 * Version: 2.0.0
 * Author: MG Polishing
 * Text Domain: mgps-ppf-premium
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'MGPS_PREMIUM_DIR', plugin_dir_path( __FILE__ ) );
define( 'MGPS_PREMIUM_URL', plugin_dir_url( __FILE__ ) );
define( 'MGPS_PREMIUM_VER', '2.0.0' );

/**
 * Ortak CSS — Google Fonts + CSS değişkenleri
 * Herhangi bir shortcode kullanıldığında yüklenir
 */
function mgps_premium_enqueue_base() {
    static $loaded = false;
    if ( $loaded ) return;
    $loaded = true;

    /* Google Fonts: Space Grotesk (display) + Manrope (body)
       ethnocentric zaten tema tarafından yükleniyor */
    wp_enqueue_style(
        'mgps-premium-fonts',
        'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&display=swap',
        [],
        null
    );

    wp_enqueue_style(
        'mgps-premium-base',
        MGPS_PREMIUM_URL . 'assets/ppf-premium.css',
        [ 'mgps-premium-fonts' ],
        MGPS_PREMIUM_VER
    );
}

/**
 * Shortcode helper — CSS/JS enqueue + template include
 */
function mgps_premium_render( $template, $css = null, $js = null ) {
    mgps_premium_enqueue_base();

    if ( $css ) {
        wp_enqueue_style(
            'mgps-' . $css,
            MGPS_PREMIUM_URL . 'assets/' . $css . '.css',
            [ 'mgps-premium-base' ],
            MGPS_PREMIUM_VER
        );
    }

    if ( $js ) {
        wp_enqueue_script(
            'mgps-' . $js,
            MGPS_PREMIUM_URL . 'assets/' . $js . '.js',
            [],
            MGPS_PREMIUM_VER,
            true
        );
    }

    ob_start();
    include MGPS_PREMIUM_DIR . 'templates/' . $template . '.php';
    return ob_get_clean();
}

// --- Bireysel Shortcode'lar ---

function mgps_ppf_tech_shortcode() {
    return mgps_premium_render( 'tech-section', 'ppf-tech' );
}
add_shortcode( 'mgps_ppf_tech', 'mgps_ppf_tech_shortcode' );

function mgps_ppf_why_shortcode() {
    return mgps_premium_render( 'why-section', 'ppf-why' );
}
add_shortcode( 'mgps_ppf_why', 'mgps_ppf_why_shortcode' );

function mgps_ppf_products_shortcode() {
    return mgps_premium_render( 'products-section', 'ppf-products' );
}
add_shortcode( 'mgps_ppf_products', 'mgps_ppf_products_shortcode' );

function mgps_ppf_compare_shortcode() {
    return mgps_premium_render( 'compare-section', 'ppf-compare' );
}
add_shortcode( 'mgps_ppf_compare', 'mgps_ppf_compare_shortcode' );

function mgps_ppf_gallery_shortcode() {
    return mgps_premium_render( 'gallery-section', 'ppf-gallery' );
}
add_shortcode( 'mgps_ppf_gallery', 'mgps_ppf_gallery_shortcode' );

function mgps_ppf_warranty_shortcode() {
    return mgps_premium_render( 'warranty-section', 'ppf-warranty' );
}
add_shortcode( 'mgps_ppf_warranty', 'mgps_ppf_warranty_shortcode' );

function mgps_ppf_faq_shortcode() {
    return mgps_premium_render( 'faq-section', 'ppf-faq' );
}
add_shortcode( 'mgps_ppf_faq', 'mgps_ppf_faq_shortcode' );

function mgps_ppf_cta_shortcode() {
    return mgps_premium_render( 'cta-section', 'ppf-cta' );
}
add_shortcode( 'mgps_ppf_cta', 'mgps_ppf_cta_shortcode' );

/**
 * Birleşik Shortcode: [mgps_ppf_premium]
 * Tüm bölümleri sırasıyla render eder + JS yükler
 */
function mgps_ppf_premium_shortcode() {
    mgps_premium_enqueue_base();

    // Tüm CSS dosyalarını yükle
    $css_files = [
        'ppf-tech', 'ppf-why', 'ppf-products', 'ppf-compare',
        'ppf-gallery', 'ppf-warranty', 'ppf-faq', 'ppf-cta'
    ];
    foreach ( $css_files as $css ) {
        wp_enqueue_style(
            'mgps-' . $css,
            MGPS_PREMIUM_URL . 'assets/' . $css . '.css',
            [ 'mgps-premium-base' ],
            MGPS_PREMIUM_VER
        );
    }

    // JS dosyasını yükle (FAQ accordion + smooth scroll + form)
    wp_enqueue_script(
        'mgps-ppf-premium-js',
        MGPS_PREMIUM_URL . 'assets/ppf-premium.js',
        [],
        MGPS_PREMIUM_VER,
        true
    );

    // Tüm template'leri sırasıyla render et
    $templates = [
        'tech-section',
        'why-section',
        'products-section',
        'compare-section',
        'gallery-section',
        'warranty-section',
        'faq-section',
        'cta-section'
    ];

    ob_start();
    echo '<div class="mgps-ppf-premium-wrapper">';
    foreach ( $templates as $tpl ) {
        include MGPS_PREMIUM_DIR . 'templates/' . $tpl . '.php';
    }
    echo '</div>';
    return ob_get_clean();
}
add_shortcode( 'mgps_ppf_premium', 'mgps_ppf_premium_shortcode' );
