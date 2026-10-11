// Contentful Configuration
// Replace these with your actual Contentful credentials
const CONTENTFUL_CONFIG = {
  spaceId: 'YOUR_SPACE_ID', // Get from Contentful dashboard
  accessToken: 'YOUR_DELIVERY_ACCESS_TOKEN', // Get from Contentful dashboard
  environment: 'master'
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONTENTFUL_CONFIG;
}
