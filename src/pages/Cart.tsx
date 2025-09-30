import { PageWrapper } from '@/components/shared';
import { CartItems } from '../components/CartItems';

export const Cart = () => {
  return (
    <PageWrapper>
      <div className="container mx-auto p-6">
        <CartItems />
      </div>
    </PageWrapper>
  );
};
