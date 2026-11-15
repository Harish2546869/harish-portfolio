# Updating portfolio images

The site is a static portfolio. You can change a picture without changing the layout or page code by replacing the image file in `assets/` with a new image that uses the same filename.

## Replace a gallery image

1. Open `outputs/assets/archive/` and then the project or client folder, such as `pr-waale-janta-sweets/` or `dermatouch-meta-ads/`.
2. Replace the image you want to change, keeping its filename and extension exactly the same.
3. Refresh `work.html` in your browser.

Each gallery image opens at full size when clicked. Its small caption is in `work.html`; edit the matching caption if the new image needs a different name.

## Change the featured project images

The homepage and Work page use these files in their featured cards:

- Dermatouch: `assets/archive/dermatouch-banners-desktop-view/03-untitled-1-03-jpg.jpg` (shown as a cropped banner preview)
- Splitkart: `assets/profile/splitkart-logo.png`
- Dukandar: `assets/profile/dukandar-logo.png`

Replace one of those files with the same filename to update its featured image. The Dermatouch crop is controlled by `.dermatouch-thumbnail` in `enhancements.css`.

## Change the portrait

- Homepage portrait: `assets/profile/harish-banner.png`
- “Clarity first” portrait: `assets/profile/clarity-portrait.png`

Keep a backup of the original image before replacing it. If the replacement has a different shape, adjust its crop in `enhancements.css`.
