
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Search.scss';
import { ChangeEvent } from 'react';

type Props = { setSearchedUser: React.Dispatch<React.SetStateAction<string>> }

function SearchUser({ setSearchedUser }: Props) {
    let clearTimeOut: ReturnType<typeof setTimeout>;

    function debounceSearch(event: ChangeEvent<HTMLInputElement>) {
        if (clearTimeOut !== undefined) {
            clearTimeout(clearTimeOut);
        }
        clearTimeOut = setTimeout(() => {
            setSearchedUser(event.target.value);
        }, 500);
    }
    return (<div className='search-bar'>
        <input className='search-bar-input-field' type="text" onChange={debounceSearch} placeholder="search user..." />
        <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
    </div>)
}

export default SearchUser;