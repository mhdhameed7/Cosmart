# Contentful CMS Setup Guide

This guide will help you set up Contentful CMS to manage your Cosmart products dynamically.

## Step 1: Create Contentful Account

1. Go to [contentful.com](https://www.contentful.com/)
2. Sign up for a free account
3. Create a new space (e.g., "Cosmart Products")

## Step 2: Create Content Model for Products

1. In your Contentful dashboard, go to **Content Model**
2. Click **Add content type**
3. Name it: `Product`
4. API ID: `product` (this must match the code)

### Add the following fields to your Product content model:

#### 1. Name (Text)
- **Field name**: Name
- **Field ID**: name
- **Type**: Short text, single line
- **Required**: Yes

#### 2. Price (Text)
- **Field name**: Price
- **Field ID**: price
- **Type**: Short text, single line
- **Required**: Yes
- **Default value**: $0.00

#### 3. Tag (Text)
- **Field name**: Tag
- **Field ID**: tag
- **Type**: Short text, single line
- **Required**: No
- **Default value**: New

#### 4. Image (Media)
- **Field name**: Image
- **Field ID**: image
- **Type**: Media
- **Required**: Yes
- **Accept**: Images only

#### 5. Description (Text)
- **Field name**: Description
- **Field ID**: description
- **Type**: Long text, multi-line
- **Required**: No

5. Click **Save** and then **Publish** the content model

## Step 3: Get Your Contentful Credentials

1. In Contentful dashboard, go to **Settings** → **API keys**
2. Click **Add API key**
3. Fill in the form:
   - Name: Cosmart Website
   - Description: Frontend integration
4. Click **Save**

You'll see:
- **Space ID**: Copy this
- **Content Delivery API - access token**: Copy this

## Step 4: Configure Your Website

1. Open `contentful-integration.js`
2. Replace the placeholder values:

```javascript
const CONTENTFUL_CONFIG = {
  spaceId: 'YOUR_SPACE_ID',           // Paste your Space ID here
  accessToken: 'YOUR_DELIVERY_ACCESS_TOKEN', // Paste your Access Token here
  environment: 'master'
};
```

## Step 5: Add Products in Contentful

1. Go to **Content** in Contentful dashboard
2. Click **Add entry** → **Product**
3. Fill in the fields:
   - **Name**: Velvet Matte Lipstick
   - **Price**: $42.00
   - **Tag**: Best Seller
   - **Image**: Upload your product image
   - **Description**: (optional)
4. Click **Publish**

Repeat for all your products.

## Step 6: Test the Integration

1. Start your local server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to the products section
3. You should see products loaded from Contentful

## Step 7: Update Products After Hosting

After hosting your website, you can update products anytime:

1. Log in to Contentful
2. Go to **Content** → **Product**
3. Edit any product or add new ones
4. Click **Publish**
5. Changes will appear on your website automatically (may take a few minutes due to CDN caching)

## Troubleshooting

### Products not loading
- Check browser console for errors
- Verify your Space ID and Access Token are correct
- Make sure content type ID is `product`
- Ensure products are published (not just saved)

### Images not displaying
- Make sure images are uploaded to Contentful
- Check image field is set to required in content model
- Verify image URLs are accessible

### CORS errors
- Contentful CDN should handle CORS automatically
- If issues persist, check Contentful API key settings

## Benefits of Using Contentful

- **Easy updates**: No code changes needed
- **User-friendly**: Non-technical team members can manage products
- **Media management**: Built-in image optimization and CDN
- **Version control**: Track changes and revert if needed
- **Multi-language**: Easy to add translations
- **API-first**: Can use the same content for mobile apps, etc.

## Content Model Reference

Your Product content model should have these exact field IDs:

| Field Name | Field ID | Type | Required |
|------------|----------|------|----------|
| Name | name | Short text | Yes |
| Price | price | Short text | Yes |
| Tag | tag | Short text | No |
| Image | image | Media | Yes |
| Description | description | Long text | No |

## Support

For Contentful documentation: [contentful.com/docs](https://www.contentful.com/docs/)

For issues with this integration, check the browser console for error messages.
