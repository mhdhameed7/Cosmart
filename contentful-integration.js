/* ═══════════════════════════════════════════════════════════════
   CONTENTFUL CMS INTEGRATION (Browser Version)
   ═══════════════════════════════════════════════════════════════
   Fetches products from Contentful CMS using CDN
   ═══════════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  // Contentful Configuration - UPDATE THESE WITH YOUR CREDENTIALS
  const CONTENTFUL_CONFIG = {
    spaceId: 'YOUR_SPACE_ID',           // Get from Contentful dashboard
    accessToken: 'YOUR_DELIVERY_ACCESS_TOKEN', // Get from Contentful dashboard
    environment: 'master'
  };

  let client = null;

  /**
   * Initialize Contentful client
   */
  function initClient() {
    if (typeof contentful === 'undefined') {
      console.error('Contentful CDN not loaded');
      return null;
    }

    try {
      client = contentful.createClient({
        space: CONTENTFUL_CONFIG.spaceId,
        accessToken: CONTENTFUL_CONFIG.accessToken,
        environment: CONTENTFUL_CONFIG.environment
      });
      return client;
    } catch (error) {
      console.error('Error creating Contentful client:', error);
      return null;
    }
  }

  /**
   * Fetch all products from Contentful
   * @returns {Promise<Array>} Array of product objects
   */
  async function fetchProducts() {
    if (!client) {
      client = initClient();
      if (!client) {
        throw new Error('Contentful client not initialized');
      }
    }

    try {
      const response = await client.getEntries({
        content_type: 'product' // Make sure this matches your Contentful content type ID
      });
      
      return response.items.map(item => ({
        id: item.sys.id,
        name: item.fields.name,
        price: item.fields.price,
        tag: item.fields.tag || 'New',
        image: item.fields.image?.fields?.file?.url || '',
        description: item.fields.description || ''
      }));
    } catch (error) {
      console.error('Error fetching products from Contentful:', error);
      throw error;
    }
  }

  /**
   * Render products to the DOM
   * @param {Array} products - Array of product objects
   */
  function renderProducts(products) {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    // Clear existing products
    productsGrid.innerHTML = '';

    // Render each product
    products.forEach(product => {
      const productCard = document.createElement('article');
      productCard.className = 'product-card';
      productCard.id = `card-${product.id}`;
      
      productCard.innerHTML = `
        <div class="product-card__image-wrap">
          <img src="${product.image}" alt="${product.name}" class="product-card__image" loading="lazy" />
        </div>
        <div class="product-card__info">
          <span class="product-card__tag">${product.tag}</span>
          <h3 class="product-card__name">${product.name}</h3>
          <p class="product-card__price">${product.price}</p>
        </div>
      `;
      
      productsGrid.appendChild(productCard);
    });

    // Re-initialize GSAP animations for new products
    if (typeof window.initProductAnimations === 'function') {
      window.initProductAnimations();
    }
  }

  /**
   * Initialize Contentful integration
   */
  async function initContentful() {
    // Check if credentials are configured
    if (CONTENTFUL_CONFIG.spaceId === 'YOUR_SPACE_ID' || 
        CONTENTFUL_CONFIG.accessToken === 'YOUR_DELIVERY_ACCESS_TOKEN') {
      console.warn('Contentful credentials not configured. Using fallback products.');
      // Keep existing hardcoded products
      return;
    }

    try {
      const products = await fetchProducts();
      if (products.length > 0) {
        renderProducts(products);
        console.log(`Successfully loaded ${products.length} products from Contentful`);
      } else {
        console.log('No products found in Contentful, using fallback');
      }
    } catch (error) {
      console.error('Failed to initialize Contentful:', error);
      // Show error message to user
      const productsGrid = document.getElementById('products-grid');
      if (productsGrid) {
        productsGrid.innerHTML = `
          <div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-muted);">
            <p>Unable to load products. Please check your Contentful configuration.</p>
            <p style="font-size: 0.85rem; margin-top: 0.5rem;">Error: ${error.message}</p>
          </div>
        `;
      }
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContentful);
  } else {
    initContentful();
  }

  // Expose functions globally for debugging
  window.ContentfulIntegration = {
    init: initContentful,
    fetch: fetchProducts,
    render: renderProducts
  };
})();
