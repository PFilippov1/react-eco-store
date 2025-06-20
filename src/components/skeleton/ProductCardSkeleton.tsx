import React from 'react';
import ContentLoader from 'react-content-loader';

export const ProductCardSkeleton: React.FC<React.ComponentProps<typeof ContentLoader>> = (
  props
) => (
  <ContentLoader
    speed={2}
    width={500}
    height={700}
    viewBox="0 0 500 700"
    backgroundColor="#e3eeeb"
    foregroundColor="#c1e7db"
    {...props}
  >
    <rect x="371" y="100" rx="5" ry="5" width="156" height="20" />
    <rect x="369" y="135" rx="5" ry="5" width="193" height="21" />
    <rect x="369" y="178" rx="5" ry="5" width="64" height="21" />
    <rect x="117" y="101" rx="5" ry="5" width="212" height="251" />
  </ContentLoader>
);
