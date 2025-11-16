export const PRIMARY_CITY = "San Jose";
export const PRIMARY_STATE_ABBR = "CA";
export const COMPANY_NAME = "1031 Exchange San Jose";
export const PHONE = "(408) 539-2254";
export const PHONE_DIGITS = "4085392254";
export const EMAIL = "hello@1031exchangesanjose.com";
export const ADDRESS = "84 West Santa Clara St, San Jose, CA 95113";
export const CANONICAL_URL = "https://www.1031exchangesanjose.com";

// Randomly choose between /locations and /service-areas (consistent across build)
// Using a hash of the site name to ensure consistency
export const USE_SERVICE_AREAS = "rr-san-jose-ca-1031-exchange".split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % 2 === 0;
export const LOCATIONS_ROUTE = USE_SERVICE_AREAS ? "/service-areas" : "/locations";

