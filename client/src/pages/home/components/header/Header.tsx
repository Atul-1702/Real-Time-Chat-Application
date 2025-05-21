import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import "./Header.scss";
import { useSelector } from "react-redux";
import { useMemo } from "react";

function Header() {
    const user = useSelector((userData: unknown) => {
        return userData?.userReducer?.user;
    });

    const [getUserInitial, getUserFullName] = useMemo(() => {
        function convertIntoTitleCase(str: string) {
            return str
                .toLowerCase()
                .split(" ")
                .map((data: string) => data.charAt(0).toUpperCase() + data.slice(1))
                .join(" ");
        }
        return [
            user.firstname.charAt(0).toUpperCase() +
            user.lastname.charAt(0).toUpperCase(),
            convertIntoTitleCase(user.firstname) + " " +
            convertIntoTitleCase(user.lastname),
        ];
    }, [user]);
    return (
        <header className="home-page-header-component">
            <section className="home-page-header-inner-section">
                <div className="home-page-header-left-side-wrapper">
                    <FontAwesomeIcon icon={faComments}></FontAwesomeIcon>
                    <h2>Quick Chat</h2>
                </div>
                <div className="home-page-header-right-side-wrapper">
                    <span>{getUserFullName}</span>
                    <span>{getUserInitial}</span>
                </div>
            </section>
            <hr></hr>
        </header>
    );
}

export default Header;
