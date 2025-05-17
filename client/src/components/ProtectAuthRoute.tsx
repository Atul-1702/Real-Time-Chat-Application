
import { useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router';
function ProtectAuthRoute({ children }) {

    const navigate: NavigateFunction = useNavigate();
    const [canRender, canSetRender] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('user')) {
            canSetRender(false);
            navigate("/");
        }
        else {
            canSetRender(true);
        }

    }, [navigate])

    return (<>
        {canRender ? children : null}
    </>)
}

export default ProtectAuthRoute;