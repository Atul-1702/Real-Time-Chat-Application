import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getUserDetails } from "../apiCalls/user.api";



function ProtectHomeRoute({ children }) {
    const naviagte = useNavigate();
    const [canRender, setCanRender] = useState(false);
    useEffect(() => {
        let timeOutId: ReturnType<typeof setTimeout>;
        if (!localStorage.getItem('user')) {
            naviagte("/signin");
        }
        else {
            (async function () {
                const response = await getUserDetails();
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
    }, []);
    return (
        <>
            {
                canRender ? children : null
            }
        </>
    )
}

export default ProtectHomeRoute;