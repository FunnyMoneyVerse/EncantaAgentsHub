# Image Guidelines for Encanta

This document provides detailed specifications for all images required in the Encanta project.

## Required Images

### Social Media Card
- **Path**: `/public/images/social-card.png`
- **Dimensions**: 1200x630 pixels
- **Format**: PNG (preferred) or JPG
- **Purpose**: Used for social media sharing previews and OpenGraph metadata
- **Guidelines**:
  - Include the Encanta logo and tagline
  - Use a clean, professional design with ample whitespace
  - Ensure text is readable at small sizes
  - Use brand colors (purple and white)

### Founder Photo
- **Path**: `/public/images/team/naeem.jpg`
- **Dimensions**: 800x800 pixels (1:1 square aspect ratio)
- **Format**: JPG or PNG
- **Purpose**: Displayed on the About page in the team section
- **Guidelines**:
  - Professional headshot with neutral background
  - Good lighting and clear focus
  - Shoulders and face visible
  - Professional attire

### Founding Story Image
- **Path**: `/public/images/about/founding-story.jpg`
- **Dimensions**: 1200x900 pixels (4:3 aspect ratio)
- **Format**: JPG
- **Purpose**: Visual representation of Encanta's founding story on the About page
- **Guidelines**:
  - Relevant to AI, content creation, or startup journey
  - High-quality, professional image
  - Aligns with brand aesthetics
  - Avoid overly busy or distracting backgrounds

## Additional Images (Future)

### Feature Icons
- **Path**: `/public/images/features/[feature-name].svg`
- **Dimensions**: 64x64 pixels
- **Format**: SVG (preferred) or PNG
- **Purpose**: Icons for feature highlights on the Features page
- **Guidelines**:
  - Simple, clean designs
  - Consistent style across all icons
  - Use brand colors

### Testimonial Avatars
- **Path**: `/public/images/testimonials/[name].jpg`
- **Dimensions**: 100x100 pixels (1:1 square aspect ratio)
- **Format**: JPG
- **Purpose**: Photos of customers providing testimonials
- **Guidelines**:
  - Professional headshots
  - Consistent style and cropping
  - Good lighting and clear focus

## Image Optimization

All images should be optimized for web use:
1. Compress images to reduce file size without significant quality loss
2. Use appropriate formats (SVG for icons, JPG for photos, PNG for images with transparency)
3. Consider providing multiple sizes for responsive design (future implementation)

## Placeholder Images

During development, you can use placeholder image services:
- [Placeholder.com](https://placeholder.com/)
- [Lorem Picsum](https://picsum.photos/)

Example usage:
```html
<!-- Temporary placeholder during development -->
<img src="https://picsum.photos/800/800" alt="Placeholder" />
```

## Brand Guidelines

All images should adhere to Encanta's brand guidelines:
- Primary color: Purple (#6B21A8)
- Secondary colors: White (#FFFFFF), Light Purple (#F3E8FF)
- Modern, clean aesthetic
- Professional and approachable tone 