import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {
  HiPencil,
  HiTrash,
  HiEye,
  HiArrowUpOnSquare,
  HiArrowDownOnSquare,
} from 'react-icons/hi2';

import Tag from '../../ui/Tag';
import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import ConfirmCheckout from '../../ui/ConfirmCheckout';
import Table from '../../ui/Table';

import {useDeleteBooking} from './useDeleteBooking';
import {formatCurrency} from '../../utils/helpers';
import {formatDistanceFromNow} from '../../utils/helpers';
import {useCheckout} from '../check-in-out/useCheckout';
import {format, isToday} from 'date-fns';

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
`;

const BookingRow = ({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    amountNights,
    numberGuests,
    totalPrice,
    status,
    guests: {fullName: guestName, email},
    cabins: {nameCabin: cabinName},
  },
}) => {
  const {deleteBooking, isDeleting} = useDeleteBooking();
  const {checkout, isCheckingOut} = useCheckout();

  const navigate = useNavigate();

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <Table.Row role="row">
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate)) ? 'Today' : formatDistanceFromNow(startDate)}{' '}
          &rarr; {amountNights} night stay
        </span>
        <span>
          {format(new Date(startDate), 'MMM dd yyyy')} &mdash;{' '}
          {format(new Date(endDate), 'MMM dd yyyy')}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              onClick={() => navigate(`/bookings/${bookingId}`)}
              icon={<HiEye />}
            >
              Details
            </Menus.Button>

            {status === 'unconfirmed' && (
              <Menus.Button
                onClick={() => navigate(`/checkin/${bookingId}`)}
                icon={<HiArrowDownOnSquare />}
              >
                Check in
              </Menus.Button>
            )}

            {status === 'checked-in' && (
							<Modal.Open opens="checkout">
								<Menus.Button icon={<HiArrowUpOnSquare />} >
									Check out
								</Menus.Button>
							</Modal.Open>
            )}

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>

            {/* <Menus.Button icon={<HiPencil />}>Edit booking</Menus.Button> */}
            {/* <Menus.Button>Delete</Menus.Button> */}

            {/* Now it gets a bit confusing... */}
            {/* <Modal.Toggle opens='delete'>
              <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
            </Modal.Toggle> */}
          </Menus.List>
        </Menus.Menu>

				<Modal.Window name="checkout">
					<ConfirmCheckout 
						resource="booking"
						onConfirm={() => checkout(bookingId)}
						disabled={isCheckingOut}
					/>
				</Modal.Window>

        <Modal.Window name="delete">
          <ConfirmDelete
            resource="booking"
            onConfirm={() => deleteBooking(bookingId)}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>

      {/* <div>
        <ButtonWithConfirm
          title='Delete booking'
          description='Are you sure you want to delete this booking? This action can NOT be undone.'
          confirmBtnLabel='Delete'
          onConfirm={() => deleteBooking(bookingId)}
          disabled={isDeleting}
        >
          Delete
        </ButtonWithConfirm>

        <Link to={`/bookings/${bookingId}`}>Details &rarr;</Link>
      </div> */}
    </Table.Row>
  );
};

export default BookingRow;
