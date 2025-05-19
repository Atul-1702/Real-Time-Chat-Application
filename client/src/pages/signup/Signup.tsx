import { RefObject, useRef, useState } from "react";
import styles from "./signup.module.scss";
import { FieldError, useForm } from "react-hook-form";
import SignupModel from "../../models/signup.model";
import { signupApiCall } from "../../apiCalls/auth.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { showLoader } from "../../redux/loadingSlice";


function Signup() {

  const buttonRef: RefObject<HTMLButtonElement | null> = useRef(null);
  const [isMouseEnter, setIsMouseEnter] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState, watch } = useForm();

  function onMouseEnterButton() {
    buttonRef.current?.classList.add(styles.buttonSignup);
    setIsMouseEnter(false);
  }

  async function onFormSubmit(formData: SignupModel) {
    delete formData['confirm_password'];

    try {
      dispatch(showLoader());
      const response = await signupApiCall(formData);
      dispatch(hideLoader());
      if (response.success == true) {
        toast.success("Account created Successfully.");
        navigate("/signin");
      }
      else {
        toast.error(response.message);
      }
    }
    catch (err: unknown) {
      toast.error("Something went wrong.");
    }


  }
  function FormStatus() {
    return (
      <button
        disabled={formState.isSubmitting}
        ref={buttonRef}
        onMouseEnter={() => (!isMouseEnter ? onMouseEnterButton() : null)}
        id={styles["signup-button"]}
      >
        <span>Signup</span>
      </button>
    );
  }

  return (
    <>
      <main id={styles["signup-form-outer-container"]}>
        <form onSubmit={handleSubmit((data) => {
          onFormSubmit((data as SignupModel))
        })} id={styles["signup-form-container"]}>
          <h3>Create Account</h3>
          <div className={styles['input-field-wrapper']}>
            <input
              className={styles["input-field"]}
              type="text"
              placeholder="first name..."
              {...register('firstname',
                {
                  required: 'firstname is required.',
                  pattern: {
                    value: /^[a-zA-z]+$/,
                    message: 'Invalid firstname'
                  }
                }

              )}
            />
            {formState.errors?.firstname && <p>{(formState.errors.firstname as FieldError).message}</p>}
          </div>
          <div className={styles['input-field-wrapper']}>
            <input
              className={styles["input-field"]}
              type="text"
              placeholder="last name..."
              {...register('lastname', {
                pattern: {
                  value: /^[a-zA-z]*$/,
                  message: 'Invalid lastname.'
                }
              })}
            />
          </div>

          <div className={styles['input-field-wrapper']}>
            <input
              className={styles["input-field"]}
              type="email"
              placeholder="email..."
              {...register('email', {
                required: 'email is required.',
                pattern: {
                  value: /^[a-zA-Z0-9._ % +-]+@[a-zA-Z0-9. -]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email.',
                }
              })}
            />
            {formState.errors.email && <p>{(formState.errors.email as FieldError).message}</p>}
          </div>
          <div className={styles['input-field-wrapper']}>
            <input
              className={styles["input-field"]}
              type="password"
              placeholder="password..."
              {...register('password', {
                required: 'password is required.',
                minLength: {
                  value: 6,
                  message: 'Password should contain minimum 6 characters.'
                },
                maxLength: {
                  value: 10,
                  message: 'Password should contain maximum 10 characters.'
                }

              })}
            />
            {formState.errors.password && <p>{(formState.errors.password as FieldError).message}</p>}
          </div>

          <div className={styles['input-field-wrapper']}>
            <input
              className={styles["input-field"]}
              type="password"
              placeholder="confirm password..."
              {...register('confirm_password', {
                required: 'confrim password is required.',
                validate: (confirm) => confirm === watch('password') || 'Passwords do not match.'
              })}
            />
            {formState.errors['confirm-password'] && <p>{(formState.errors['confirm-password'] as FieldError).message}</p>}

          </div>
          <FormStatus></FormStatus>
        </form>
      </main>
    </>
  );
}

export default Signup;
function hideLoader(): any {
  throw new Error("Function not implemented.");
}

