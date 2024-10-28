import {useForm} from 'react-hook-form';

import toast from 'react-hot-toast';

import {useCreateCabin} from './useCreateCabin';
import {useEditCabin} from './useEditCabin';

import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';

import {Textarea} from '../../ui/Textarea';

// Receives closeModal directly from Modal
// function CreateCabinForm({ cabinToEdit, closeModal }) {

//   // For an editing session

//   delete editValues.created_at;

//   const { register, handleSubmit, formState, reset, getValues } = useForm({

//   });
//   const { errors } = formState;

// Invoked in ALL validation passes. Here we get access to the form data
//   const onSubmit = function (data) {
//     // No need to validate here, because it's already been done. This is REALLY nice!

//   };

//   // By default, validation happens the moment we submit the form, so when we call handleSubmit. From them on, validation happens on the onChange event [demonstrate]. We cah change that by passing options into useForm ('mode' and 'reValidateMode')
//   // https://react-hook-form.com/api/useform

//   // The registered names need to be the same as in the Supabase table. This makes it easier to send the request
//   // "handleSubmit" will validate your inputs before invoking "onSubmit"

//   return (

//         <FileInput
//           id='image'
//           accept='image/*'
//           {...register('image', {
//             // required: 'This field is required',
//             required: isEditSession ? false : 'This field is required',

//             // VIDEO this doesn't work, so never mind about this, it's too much
//             // validate: (value) =>
//             //   value[0]?.type.startsWith('image/') || 'Needs to be an image',
//           })}
//         />
//       </FormRow>

//       <FormRow>

//       </FormRow>
//     </Form>
//   );
// }

const CreateCabinForm = ({cabinToEdit = {}, onCloseModal}) => {
  const {isCreating, createCabin, } = useCreateCabin();
  const {isEditing, editCabin} = useEditCabin();

  const isWorking = isCreating || isEditing;

  const {id: editId, ...editValues} = cabinToEdit;
  const isEditSession = Boolean(editId);

  const {register, handleSubmit, reset, getValues, formState} = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const {errors} = formState;

  // options for function where the mutation happens, we do it here because of custom hook (doesn't contain useForm)
  const options = {
    onSuccess: (data) => {
			onCloseModal?.()
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  };

  const onSubmit = function (data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditSession)
      editCabin(
        {
          newCabinData: {...data, image},
          id: editId,
        },
        options,
      );
    else {
      createCabin({...data, image}, options);
    }

    // const options = {
    //   onSuccess: (data) => {
    //     // If this component is used OUTSIDE the Modal Context, this will return undefined, so we need to test for this
    //     closeModal?.();
    //     reset();
    //   },
    // };

    // const image = typeof data.image === 'object' ? data.image[0] : data.image;

    // if (isEditSession)
    //   editCabin(
    //     {
    //       newCabinData: { ...data, image },
    //       id: editId,
    //     },
    //     options
    //   );
    // else createCabin({ ...data, image }, options);
  };

  const onError = function (errors) {
    console.log('Failed validation!', errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type="modal">
      <FormRow label="Cabin name" error={errors?.nameCabin?.message}>
        <Input
          type="text"
          id="nameCabin"
          disabled={isWorking}
          {...register('nameCabin', {required: 'This field is required'})}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>
      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 100,
              message: 'Price should be at least 100',
            },
          })}
        />
      </FormRow>
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          // defaultValue={0}
          {...register('discount', {
            required: "Can't be empty, make it at least 0",
            validate: (value) =>
              getValues().regularPrice > value ||
              'Discount should be less than regular price',
          })}
        />
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea
          type="text"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register('description', {required: 'This field is required'})}
        />
      </FormRow>
      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          disabled={isWorking}
          accept="image/*"
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
            // VIDEO this doesn't work, so never mind about this, it's too much
            // validate: (value) =>
            //   value[0]?.type.startsWith('image/') || 'Needs to be an image',
          })}
        />
      </FormRow>
      <FormRow>
        <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? 'Edit cabin' : 'Create cabin'}
        </Button>
      </FormRow>
    </Form>
  );
};

export default CreateCabinForm;
