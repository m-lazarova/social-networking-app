import React, { useState, useEffect, Fragment } from 'react';

import Backdrop from '../../Backdrop/Backdrop';
import Modal from '../../Modal/Modal';
import Input from '../../Form/Input/Input';
import FilePicker from '../../Form/Input/FilePicker';
import Image from '../../Image/Image';
import { required, length } from '../../../util/validators';
import { generateBase64FromImage } from '../../../util/image';

type ValidatorFn = (value: string) => boolean;

type FieldProps = {
  value: string;
  valid: boolean;
  touched: boolean;
  validators: ValidatorFn[]
}

type PostFormProps = {
  title: FieldProps;
  image: FieldProps;
  content: FieldProps;
}

type PostData = {
  _id: string;
  title: string;
  creator: {
    name: string;
  };
  createdAt: string;
  content: string;
  imageUrl: string;
};

type FeedEditProps = {
  editing: boolean;
  selectedPost: PostData | null; 
  loading: boolean;
  onCancelEdit: () => void;
  onFinishEdit: (postData: PostData) => void;
};

const POST_FORM: PostFormProps = {
  title: {
    value: '',
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })]
  },
  image: {
    value: '',
    valid: false,
    touched: false,
    validators: [required]
  },
  content: {
    value: '',
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })]
  }
};

const FeedEdit: React.FC<FeedEditProps> = (props) => {
  const [postForm, setPostForm] = useState(POST_FORM);
  const [formIsValid, setFormIsValid] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (
      props.editing &&
      props.selectedPost &&
      (props.selectedPost.title !== postForm.title.value ||
        props.selectedPost.imageUrl !== postForm.image.value ||
        props.selectedPost.content !== postForm.content.value)
    ) {
      const updatedPostForm = {
        title: {
          ...postForm.title,
          value: props.selectedPost.title,
          valid: true
        },
        image: {
          ...postForm.image,
          value: props.selectedPost.imageUrl,
          valid: true
        },
        content: {
          ...postForm.content,
          value: props.selectedPost.content,
          valid: true
        }
      };
      setPostForm(updatedPostForm);
      setFormIsValid(true);
    }
  }, [props.editing, props.selectedPost]);

  const postInputChangeHandler = (
    input: keyof PostFormProps, 
    value: string,
    files?: FileList | null
  ) => {
    if (files) {
      generateBase64FromImage(files[0])
        .then(b64 => {
          setImagePreview(b64 as unknown as any);
        })
        .catch(e => {
          setImagePreview(null);
        });
    }

    setPostForm(prevPostForm => {
      let isValid = true;
      for (const validator of prevPostForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm: PostFormProps = {
        ...prevPostForm,
        [input]: {
          ...prevPostForm[input],
          valid: isValid,
          value: files ? files[0] : value
        }
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName as keyof PostFormProps].valid;
      }
      return {
        ...updatedForm
      };
    });

    setFormIsValid(Object.values(postForm).every(field => field.valid));
  };

  const inputBlurHandler = (input: keyof PostFormProps) => {
    setPostForm(prevPostForm => ({
      ...prevPostForm,
      [input]: {
        ...prevPostForm[input],
        touched: true
      }
    }));
  };

  const cancelPostChangeHandler = () => {
    setPostForm(POST_FORM);
    setFormIsValid(false);
    props.onCancelEdit();
  };

  const acceptPostChangeHandler = () => {
    const post: PostData = {
      _id: props.selectedPost ? props.selectedPost._id : '',
      title: postForm.title.value,
      imageUrl: postForm.image.value,
      content: postForm.content.value,
      creator: { name: '' },
      createdAt: ''
    };
    props.onFinishEdit(post);
    setPostForm(POST_FORM);
    setFormIsValid(false);
    setImagePreview(null);
  };

  return props.editing ? (
    <Fragment>
      <Backdrop onClick={cancelPostChangeHandler} />
      <Modal
        title="New Post"
        acceptEnabled={formIsValid}
        onCancelModal={cancelPostChangeHandler}
        onAcceptModal={acceptPostChangeHandler}
        isLoading={props.loading}
      >
        <form>
          <Input
            id="title"
            label="Title"
            control="input"
            onChange={postInputChangeHandler}
            onBlur={() => inputBlurHandler('title')}
            valid={postForm.title.valid}
            touched={postForm.title.touched}
            value={postForm.title.value}
          />
          <FilePicker
            id="image"
            label="Image"
            control="input"
            onChange={postInputChangeHandler}
            onBlur={() => inputBlurHandler('image')}
            valid={postForm.image.valid}
            touched={postForm.image.touched}
          />
          <div className="new-post__preview-image">
            {!imagePreview && <p>Please choose an image.</p>}
            {imagePreview && (
              <Image imageUrl={imagePreview} contain left />
            )}
          </div>
          <Input
            id="content"
            label="Content"
            control="textarea"
            rows="5"
            onChange={postInputChangeHandler}
            onBlur={() => inputBlurHandler('content')}
            valid={postForm.content.valid}
            touched={postForm.content.touched}
            value={postForm.content.value}
          />
        </form>
      </Modal>
    </Fragment>
  ) : null;
};

export default FeedEdit;
