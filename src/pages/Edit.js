import { useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faChevronDown, faChevronUp, faPencilAlt, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSearchFieldState as useInputState } from "@react-stately/searchfield";
import { useToggleState } from "@react-stately/toggle";
import { useEffect, useState } from "react";
import getUuid from "uuid-by-string";
import { WindupChildren } from "windups";

import { GET_FAMILY_BY_USER_ID } from "../gql.js";
import Hero from "../components/Hero.js";
import Loader from "../components/Loader.js";

const printFamilyMember = (family_members) => (
  { given_name },
  idx
) => {
  const isLast = idx === family_members.length - 1;

  return `${given_name}${isLast ? "" : " & "}`;
};

export default function Edit() {
  const { logout, user } = useAuth0();

  const user_id = getUuid(user.email, 3);
  const { loading, data } = useQuery(GET_FAMILY_BY_USER_ID, {
    variables: { user_id },
  });

  const {
    isSelected: isNavExpanded,
    toggle: updateNavExpanded,
  } = useToggleState(false);
  const {
    isSelected: isEditingInfo,
    toggle: updateEditingInfo,
  } = useToggleState(false);
  
  const { value: typedFamilyName, setValue: setTypedFamilyName } = useInputState("");
  const { value: typedFamilyMember, setValue: setTypedFamilyMember } = useInputState("");
  const { value: typedShortBio, setValue: setTypedShortBio } = useInputState("");
  const [familyMembers, setFamilyMembers] = useState([]);

  useEffect(() => {
    if (data) {
      const { family_members, family_name, short_bio } = data.families[0];
      setTypedFamilyName(family_name);
      setFamilyMembers(family_members);
      setTypedShortBio(short_bio);
    }
  }, [data, setTypedFamilyName, setFamilyMembers, setTypedShortBio]);

  if (loading) {
    return <Loader />;
  }

  function handleLogout() {
    logout({ returnTo: window.location.origin });
  }

  function updateTypedFamilyName(e) {
    setTypedFamilyName(e.target.value);
  }
  
  function updateTypedFamilyMember(e) {
    setTypedFamilyMember(e.target.value);
  }

  function updateTypedShortBio(e) {
    setTypedShortBio(e.target.value);
  }

  function updateFamilyMembers() {
    setFamilyMembers([...familyMembers, { given_name: typedFamilyMember }]);
    setTypedFamilyMember("");
  }

  const family = data.families[0];
  
  const { family_members, family_name, short_bio } = family;

  function resetEditForm() {
    updateEditingInfo();
    setTypedFamilyName(family_name);
    setTypedFamilyMember("");
    setFamilyMembers(family_members);
    setTypedShortBio(short_bio);
  }

  function updateFamilyInfo(e) {
    e.preventDefault();
    alert('submitted');
    resetEditForm();
  }

  return (
    <div className="flex flex-col bg-white">
      <Hero className="flex-col py-8 min-h-screen">
        <div className="flex w-full justify-start px-6">
          <div className="flex flex-col text-white">
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
              Hey, {`${family_name}s`} 👋
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
        <div className="flex flex-col h-full justify-end px-6 lg:px-10">
          <form onSubmit={updateFamilyInfo}>
            {!isEditingInfo && (
              <button className="w-0">
                <FontAwesomeIcon className="cursor-pointer text-white" icon={faPencilAlt} onClick={updateEditingInfo} /> 
              </button>
            )}
            {isEditingInfo && (
              <button className="w-0">
                <FontAwesomeIcon className="cursor-pointer text-white" icon={faTimes} onClick={resetEditForm} /> 
              </button>
            )}
            {!isEditingInfo && (
              <div className="text-white font-bold text-3xl my-2">
                The {`${family_name}s`}
              </div>
            )}
            {isEditingInfo && (
              <div className="text-white font-bold text-3xl my-2">
                Update Your Family Info
              </div>
            )}
            {isEditingInfo && (
              <Input
                autoFocus
                label="Family Name (e.g. The Clarksons)"
                onChange={updateTypedFamilyName}
                required
                value={typedFamilyName}
              />
            )}
            {!isEditingInfo && (
              <div className="text-white font-light text-lg">
                {family_members.map(printFamilyMember(family_members))}
              </div>
            )}
            {isEditingInfo && (
              <div className="flex flex-col text-white text-base font-bold my-2">
                <div>Family Members (e.g. Jane Isabella)</div>
                <ul className="pl-4 font-light">
                  {familyMembers.map(({ given_name }) => (
                    <li key={given_name}>{given_name}</li>
                  ))}
                  <li className="flex items-center">
                    <FontAwesomeIcon className="mr-2 -mt-1" icon={faPlus} onClick={updateFamilyMembers} />
                    <Input
                      onChange={updateTypedFamilyMember}
                      value={typedFamilyMember}
                    />
                  </li>
                </ul>
              </div>
            )}
            {!isEditingInfo && <div className="text-white font-light text-lg">{short_bio}</div>}
            {isEditingInfo && (
              <TextArea
                label="Short Bio (e.g. We got married in...)"
                onChange={updateTypedShortBio}
                value={typedShortBio}
              />
            )}
            {!isEditingInfo && (
              <FontAwesomeIcon className="text-white mt-8 animate-bounce" icon={faArrowDown} />
            )}
            {isEditingInfo && (
              <button className="bg-pink-500 rounded text-white px-4 py-2 font-bold w-max" type="submit">
                Save Changes
              </button>
            )}
          </form>
        </div>
      </Hero>
    </div>
  );
}

function Input({ label, ...rest }) {
  return (
    <label className="flex flex-col text-white text-base font-bold my-2">
      {label}
      <input
        className="cursor-pointer rounded border-solid px-2 py-1 border-2 border-white text-white font-normal text-base mb-2 w-max bg-transparent"
        type="text"
        {...rest}
      />
    </label>
  );
}

function TextArea({ label, ...rest }) {
  return (
    <label className="flex flex-col text-white text-base font-bold my-2">
      {label}
      <textarea
        className="cursor-pointer rounded border-solid px-2 py-1 border-2 border-white text-white font-normal text-base mb-2 w-1/2 bg-transparent"
        {...rest}
      />
    </label>
  );
}