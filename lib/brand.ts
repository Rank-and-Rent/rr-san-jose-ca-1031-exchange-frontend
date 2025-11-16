import { COMPANY_NAME, PHONE, PHONE_DIGITS, EMAIL, ADDRESS, CANONICAL_URL } from './config';

export function getBrand() {
  // Using 1031 Exchange San Jose colors
  const COLORS = {
    primary: '#3B82F6', // Blue accent
    secondary: '#1A1A1A', // Dark gray
    dark: '#0F172A', // Very dark background
  };

  return {
    // Email template fields
    subject: "We received your 1031 exchange inquiry",
    preheader: "Thanks for your inquiry, we have received your 1031 exchange request and will contact you within one business day.",
    company_name: COMPANY_NAME,
    logo_url: 'https://www.1031exchangesanjose.com/logo.png',
    city_state: "San Jose, CA",
    brand_accent: COLORS.primary,
    cta_dark_bg: COLORS.dark,
    bg_color: "#0F172A",
    text_dark: "#0F172A",
    text_muted: "#666666",
    text_body: "#333333",
    text_faint: "#999999",
    border_color: "#E5E5E5",
    card_header_bg: "#F5F5F5",

    // Hero content
    hero_title: "Thanks for your inquiry. We received your 1031 exchange request.",
    hero_subtitle: "Our team will review your details and reach out within one business day to discuss your exchange strategy.",
    details_title: "Your project details",

    // CTA buttons
    call_cta_label: "Call Now",
    call_phone: PHONE,
    call_phone_plain: PHONE_DIGITS,
    site_cta_label: "Go To Site",
    site_url: CANONICAL_URL,

    // Address and footer
    address_line: ADDRESS,
    footer_note: "This confirmation is a transactional email related to your request.",

    // Legacy fields for backward compatibility
    brand_title: COMPANY_NAME,
    brand_tagline: '1031 Exchange Property Identification and Coordination Services',
    brand_dark_bg: COLORS.dark,
    brand_gold: COLORS.primary,
    supportPhone: PHONE,
    supportEmail: EMAIL,
    service_area: 'Serving San Jose and Silicon Valley',
    portfolio_url: CANONICAL_URL,
    portfolio_blurb: '1031 exchange property identification and coordination services for San Jose investors.',
    intro_copy: 'Delivering expert 1031 exchange property identification and coordination services to help investors defer capital gains taxes through like-kind property exchanges.',
  };
}



