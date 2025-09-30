import { FavoriteItems } from '@/components/FavoriteItems';
import { PageWrapper } from '@/components/shared';

export const Favorite = () => {
  return (
    <PageWrapper>
      <div className="container mx-auto p-6">
        <FavoriteItems />
      </div>
    </PageWrapper>
  );
};
