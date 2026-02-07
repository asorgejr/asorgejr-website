/** @type {import('next').NextConfig} */

// Allow Next/Image to load Strapi media URLs.
function getStrapiRemotePattern() {
  const raw = process.env.NEXT_PUBLIC_STRAPI_IMAGE_BUCKET_URL || 'http://localhost:1337';
  try {
    const u = new URL(raw);
    return [
      {
        protocol: u.protocol.replace(':', ''),
        hostname: u.hostname,
        port: u.port || '',
        pathname: '/**',
      },
      {
        protocol: u.protocol.replace(':', ''),
        hostname: u.hostname.replace('strapiapp.com', 'media.strapiapp.com'),
        port: u.port || '',
        pathname: '/**',
      }
    ];
  } catch {
    return [{ protocol: 'http', hostname: 'localhost', port: '1337', pathname: '/**' }];
  }
}

module.exports = {
  images: {
    remotePatterns: [
      ...getStrapiRemotePattern(),
    ],
  },
  // logging: {
  //   fetches: {
  //     fullUrl: true,
  //   }
  // }
};
