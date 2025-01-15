import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

import BookingDataBox from './BookingDataBox';
import {useBooking} from './useBooking';
import {useDeleteBooking} from './useDeleteBooking';
import {useMoveBack} from '../../hooks/useMoveBack';
import {useCheckout} from '../check-in-out/useCheckout';

import ButtonText from '../../ui/ButtonText';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import ConfirmCheckout from '../../ui/ConfirmCheckout';
import Spinner from '../../ui/Spinner';
import Empty from '../../ui/Empty';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const {booking, isLoading} = useBooking();
  const {deleteBooking, isDeleting} = useDeleteBooking();
  const {checkout, isCheckingOut} = useCheckout();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resource="booking" />;

  const {id: bookingId, status} = booking;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  // We return a fragment so that these elements fit into the page's layout
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>Check in</Button>
        )}

        <Modal>
          {status === 'checked-in' && (
            <Modal.Open opens="checkout">
              <Button variation="primary">Check out</Button>
            </Modal.Open>
          )}
					<Modal.Window name="checkout">
						<ConfirmCheckout
							booking={booking}
							onConfirm={() => checkout(bookingId)}
							disabled={isCheckingOut}
						/>
					</Modal.Window>
					
          <Modal.Open opens="delete">
            <Button variation="danger">Delete booking</Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resource="booking"
              onConfirm={() => deleteBooking(bookingId)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
