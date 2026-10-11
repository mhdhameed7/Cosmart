import { createClient } from 'contentful';

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
const environment = process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || 'master';

// Initialize the Contentful Client
export const client = createClient({
  space: space || 'dummy_space_id',
  accessToken: accessToken || 'dummy_token',
  environment: environment,
});

/**
 * Fetch all products from Contentful CMS
 * Falls back to empty list if credentials are not configured, which triggers local fallbacks in the UI.
 */
export async function fetchProducts() {
  if (
    !space || 
    !accessToken || 
    space === 'YOUR_SPACE_ID' || 
    accessToken === 'YOUR_DELIVERY_ACCESS_TOKEN'
  ) {
    console.warn('Contentful credentials not configured. Using fallback products.');
    return [];
  }

  try {
    const response = await client.getEntries({
      content_type: 'product',
    });

    return response.items.map(item => {
      let rawImage = item.fields.image?.fields?.file?.url || '';
      // Support protocol-relative URLs from Contentful
      if (rawImage.startsWith('//')) {
        rawImage = `https:${rawImage}`;
      }

      return {
        id: item.sys.id,
        name: item.fields.name,
        price: item.fields.price,
        tag: item.fields.tag || 'New',
        image: rawImage,
        description: item.fields.description || '',
      };
    });
  } catch (error) {
    console.error('Error fetching products from Contentful:', error);
    return [];
  }
}
