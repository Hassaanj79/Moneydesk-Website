# Image Usage Guide for MoneyDesk Website

## How to Use Images in Next.js Website

### 1. **Place Images in `public/` Folder**

All images should be placed in the `website/public/` directory. They will be accessible from the root URL.

**Example:**
- File: `website/public/hero-image.jpg`
- URL: `/hero-image.jpg`

### 2. **Using Next.js Image Component (Recommended)**

The `next/image` component provides automatic optimization, lazy loading, and responsive images.

#### Basic Usage:
```tsx
import Image from "next/image";

<Image
  src="/hero-image.jpg"
  alt="Hero Image Description"
  width={1200}
  height={600}
  className="rounded-lg"
/>
```

#### With Fill (for responsive containers):
```tsx
<div className="relative w-full h-[500px]">
  <Image
    src="/hero-image.jpg"
    alt="Hero Image"
    fill
    className="object-cover rounded-lg"
    priority  // Load immediately (for above-fold images)
  />
</div>
```

#### Image Props:
- `src` (required): Path to image relative to `public/` folder
- `alt` (required): Alternative text for accessibility
- `width` & `height` (required): Original dimensions in pixels (or use `fill`)
- `fill`: Makes image fill its parent container (requires parent to be `relative`)
- `priority`: Load immediately (use for above-fold images)
- `className`: CSS classes for styling
- `quality`: Image quality (1-100, default: 75)
- `sizes`: Responsive sizes for different breakpoints

### 3. **Using Regular img Tag (Simple)**

For simple static images without optimization:

```tsx
<img 
  src="/logo.png" 
  alt="Logo" 
  className="w-32 h-32" 
/>
```

### 4. **External Images**

To use images from external domains, configure `next.config.js`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/images/**',
      },
    ],
  },
}

module.exports = nextConfig
```

Then use:
```tsx
<Image
  src="https://example.com/images/hero.jpg"
  alt="External Image"
  width={1200}
  height={600}
/>
```

### 5. **Image Optimization Tips**

1. **Use appropriate formats:**
   - `.jpg` for photos
   - `.png` for graphics with transparency
   - `.webp` for modern browsers (Next.js converts automatically)

2. **Optimize before uploading:**
   - Compress images using tools like TinyPNG or ImageOptim
   - Use appropriate dimensions (don't upload 4000px images if displaying at 800px)

3. **Use `priority` for above-fold images:**
   ```tsx
   <Image src="/hero.jpg" priority width={1200} height={600} alt="Hero" />
   ```

4. **Use `sizes` for responsive images:**
   ```tsx
   <Image
     src="/responsive-image.jpg"
     width={1200}
     height={600}
     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
     alt="Responsive Image"
   />
   ```

### 6. **Examples in Website**

#### Hero Section (Home Page):
```tsx
<div className="relative w-full h-[500px]">
  <Image
    src="/hero-image.jpg"
    alt="MoneyDesk Dashboard"
    fill
    className="object-cover rounded-2xl"
    priority
  />
</div>
```

#### Logo in Header:
```tsx
<Image
  src="/header-logo.png"
  alt="MoneyDesk Logo"
  width={32}
  height={32}
  className="w-full h-full object-cover"
/>
```

#### Feature Images:
```tsx
<Image
  src="/feature-expense-tracking.jpg"
  alt="Expense Tracking Feature"
  width={400}
  height={300}
  className="rounded-lg shadow-lg"
/>
```

### 7. **Common Image Sizes**

- **Hero Images**: 1200x600px or 1920x1080px
- **Feature Images**: 400x300px or 800x600px
- **Logos**: 32x32px, 64x64px, or 128x128px
- **Icons**: 24x24px, 32x32px, or 48x48px
- **Screenshots**: 1200x800px or 1920x1080px

### 8. **Accessibility**

Always include descriptive `alt` text:
- ✅ Good: `alt="MoneyDesk dashboard showing expense tracking"`
- ❌ Bad: `alt="image"` or `alt=""`

### 9. **Current Images in Website**

The following images are already in `public/`:
- `/header-logo.png` - Used in Header and Footer
- `/logo.png` - Main logo
- `/logo-light.png` - Light version logo
- `/logo-dark.png` - Dark version logo

### 10. **Adding New Images**

1. Add image file to `website/public/` folder
2. Import `Image` component: `import Image from "next/image"`
3. Use the component with proper `src`, `alt`, `width`, and `height` props
4. Test on different screen sizes to ensure responsiveness

