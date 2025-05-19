import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getUserDetails } from "../apiCalls/user.api";
import { hideLoader, showLoader } from "../redux/loadingSlice";
import { useDispatch } from "react-redux";



function ProtectHomeRoute({ children }) {
    const naviagte = useNavigate();
    const [canRender, setCanRender] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        let timeOutId: ReturnType<typeof setTimeout>;
        if (!localStorage.getItem('user')) {
            naviagte("/signin");
        }
        else {
            (async function () {
                dispatch(showLoader());
                const response = await getUserDetails();
                dispatch(hideLoader());
                if (response.success === false) {
                    naviagte("/signin");
                    localStorage.removeItem('user');
                }
                else {
                    timeOutId = setTimeout(() => {
                        setCanRender(true);
                    })
                }
            })();

        }
        return (() => {
            clearTimeout(timeOutId);
        })
    }, [naviagte, dispatch]);
    return (
        <>
            {
                canRender ? children : null
            }
        </>
    )
}

export default ProtectHomeRoute;