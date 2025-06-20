import React from 'react';
import ContentLoader from 'react-content-loader';

export const ProductSkeleton: React.FC<React.ComponentProps<typeof ContentLoader>> = (props) => (
  <ContentLoader
    speed={2}
    width={180}
    height={470}
    viewBox="0 0 180 470"
    backgroundColor="#e3eeeb"
    foregroundColor="#c1e7db"
    {...props}
  >
    <rect x="1" y="8" rx="10" ry="10" width="173" height="20" />
    <rect x="229" y="425" rx="0" ry="0" width="30" height="26" />
    <rect x="3" y="40" rx="10" ry="10" width="173" height="20" />
    <rect x="5" y="215" rx="10" ry="10" width="92" height="20" />
    <rect x="2" y="77" rx="10" ry="10" width="173" height="120" />
    <rect x="5" y="246" rx="10" ry="10" width="92" height="20" />
    <rect x="144" y="246" rx="5" ry="5" width="20" height="20" />
  </ContentLoader>
);
