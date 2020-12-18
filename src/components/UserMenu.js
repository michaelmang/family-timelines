import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useToggleState } from "@react-stately/toggle";
import { WindupChildren } from "windups";

export default function UserMenu({ name }) {
  const { logout } = useAuth0();
  
  const {
    isSelected: isNavExpanded,
    toggle: updateNavExpanded,
  } = useToggleState(false);

  function handleLogout() {
    logout({ returnTo: window.location.origin });
  }
  
  return (
    <div className="flex w-full justify-start px-6">
      <div className="flex flex-col text-white mt-16">
        <div
          className="text-white text-base cursor-pointer"
          onClick={updateNavExpanded}
        >
          {isNavExpanded && (
            <FontAwesomeIcon className="mr-2" icon={faChevronUp} />
          )}
          {!isNavExpanded && (
            <FontAwesomeIcon className="mr-2" icon={faChevronDown} />
          )}
          Hey, {name} 👋
        </div>
        {isNavExpanded && (
          <WindupChildren>
            <button
              onClick={handleLogout}
              className="w-max text-pink-500 rounded font-bold text-xs lg:text-sm text-left ml-6 mt-3 p-0"
            >
              Log Out
            </button>
          </WindupChildren>
        )}
      </div>
    </div>
  );
}