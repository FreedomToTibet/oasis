import { useCheckout } from './useCheckout';
import Button from '../../ui/Button';

const CheckoutButton = ({ bookingId }) => {
  const { isLoading, checkout } = useCheckout();

  return (
    <Button
      variation='primary'
      size='small'
      onClick={() => checkout(bookingId)}
      disabled={isLoading}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
