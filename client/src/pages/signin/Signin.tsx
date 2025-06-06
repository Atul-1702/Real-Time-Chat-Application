import { RefObject, useRef, useState } from "react";
import styles from "./signin.module.scss";
import { FieldError, useForm } from "react-hook-form";
import SigninModel from "../../models/signin.model";
import { signinApicall } from "../../apiCalls/auth.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../redux/loadingSlice";



function Signin() {

    const buttonRef: RefObject<HTMLButtonElement | null> = useRef(null);
    const [isMouseEnter, setIsMouseEnter] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { register, handleSubmit, formState } = useForm();

    function onMouseEnterButton() {
        buttonRef.current?.classList.add(styles.buttonSignup);
        setIsMouseEnter(false);
    }

    async function onFormSubmit(formData: SigninModel) {
        try {
            dispatch(showLoader());
            const response = await signinApicall(formData);
            dispatch(hideLoader());
            if (response.success === true) {
                toast.success("User logged in successfully");
                localStorage.setItem("user", response.token);
                navigate("/");
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
                    onFormSubmit((data as SigninModel))
                })} id={styles["signup-form-container"]}>
                    <h3>Login</h3>


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
                                required: 'Password is required.',
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


                    <FormStatus></FormStatus>
                </form>
            </main>
        </>
    );
}

export default Signin;
