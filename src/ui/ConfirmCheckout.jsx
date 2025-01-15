import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmCheckout = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmCheckout({ resource, onConfirm, disabled, onCloseModal }) {
  // function handleConfirmClick() {}

  return (
    <StyledConfirmCheckout>
      <Heading as="h3">Check out {resource}</Heading>
      <p>
        Are you sure you want to check out this {resource} permanently? This action
        cannot be undone.
      </p>

      <div>
        <Button 
					variation="secondary"
					disabled={disabled}
					onClick={onCloseModal}
				>
          Cancel
        </Button>
        <Button
          variation="danger"
          onClick={onConfirm}
          disabled={disabled}
        >
          Check out
        </Button>
      </div>
    </StyledConfirmCheckout>
  );
}

export default ConfirmCheckout;