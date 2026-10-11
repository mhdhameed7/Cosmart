const contentful = require('contentful');
const fs = require('fs');

try {
  const envContent = fs.readFileSync('.env.local', 'utf8');
  
  const spaceId = envContent.match(/NEXT_PUBLIC_CONTENTFUL_SPACE_ID=(.*)/)[1].trim();
  const accessToken = envContent.match(/NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=(.*)/)[1].trim();

  console.log('Connecting to Contentful...');
  console.log('Space ID:', spaceId);
  console.log('Access Token:', accessToken.substring(0, 10) + '...');

  const client = contentful.createClient({
    space: spaceId,
    accessToken: accessToken
  });

  client.getEntries()
    .then(response => {
      console.log('\n--- API CONNECTED SUCCESSFULLY ---');
      console.log('Total entries found in space:', response.items.length);
      
      const contentTypes = new Set();
      response.items.forEach(item => {
        if (item.sys.contentType) {
          contentTypes.add(item.sys.contentType.sys.id);
        }
      });
      console.log('Available Content Types in this space:', Array.from(contentTypes));

      const products = response.items.filter(item => item.sys.contentType && item.sys.contentType.sys.id === 'product');
      console.log(`\nFound ${products.length} entries of type 'product':`);
      products.forEach(product => {
        console.log(`- [${product.sys.id}] Name: ${product.fields.name}, Price: ${product.fields.price}`);
      });
    })
    .catch(err => {
      console.error('\n--- API ERROR ---');
      console.error(err.message || err);
    });
} catch (e) {
  console.error('Error reading environment config:', e.message);
}
