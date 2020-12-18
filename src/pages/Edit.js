import { useMutation } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSearchFieldState as useInputState } from "@react-stately/searchfield";
import { useToggleState } from "@react-stately/toggle";
import { useEffect, useState } from "react";
import getUuid from "uuid-by-string";

import { INSERT_FAMILY_MEMBER, UPDATE_FAMILY } from "../gql.js";
import EditButton from "../components/EditButton.js";
import Hero from "../components/Hero.js";
import Input from "../components/Input.js";
import Loader from "../components/Loader.js";
import SubmitButton from "../components/SubmitButton.js";
import TextArea from "../components/TextArea.js";
import UserMenu from "../components/UserMenu.js";
import diff from "../utils/diff.js";
import useFetchFamily from "../hooks/useFetchFamily.js";

const printFamilyMember = (family_members) => (
  { given_name },
  idx
) => {
  const isLast = idx === family_members.length - 1;

  return `${given_name}${isLast ? "" : " & "}`;
};

export default function Edit() {
  const { user } = useAuth0();

  const user_id = getUuid(user.email, 3);
  
  const { loading, data, refetch } = useFetchFamily({ user_id });
  const [insertFamilyMember] = useMutation(INSERT_FAMILY_MEMBER);
  const [updateFamily] = useMutation(UPDATE_FAMILY);

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
    return (
      <Loader>
        <div className="flex flex-col bg-white">
          <Hero className="flex-col py-8 min-h-screen"></Hero>
        </div>
      </Loader>
    );
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
  
  const { id: family_id, family_members, family_name, short_bio } = family;

  function resetEditForm() {
    updateEditingInfo();
    setTypedFamilyName(family_name);
    setTypedFamilyMember("");
    setFamilyMembers(family_members);
    setTypedShortBio(short_bio);
  }

  function insertNewFamilyMembers() {
    const newFamilyMembers = diff(new Set(family_members), new Set(familyMembers));
    for (const newFamilyMember of newFamilyMembers) {
      const { given_name } = newFamilyMember;

      insertFamilyMember({
        variables: {
          id: getUuid(given_name, 3),
          family_id,
          given_name,
        },
      });
    }
  }

  function updateFamilyInfo(e) {
    e.preventDefault();
    
    insertNewFamilyMembers();
    updateFamily({
      variables: {
        family_name: typedFamilyName,
        user_id,
        short_bio: typedShortBio,
        user_email: user.email,
      },
    });

    refetch();
    
    resetEditForm();
  }

  return (
    <div className="flex flex-col bg-white">
      <div className="flex justify-center items-center fixed w-full p-4 bg-white text-pink-500 font-bold text-lg">
        You are in Edit Mode. All saved changes will be published automatically.
      </div>
      <Hero className="flex-col py-8 min-h-screen">
        <UserMenu name={family_name} />
        <FamilyInfo
          {...family}
          familyMembers={familyMembers}
          isEditingInfo={isEditingInfo}
          resetEditForm={resetEditForm}
          typedFamilyMember={typedFamilyMember}
          typedFamilyName={typedFamilyName}
          typedShortBio={typedShortBio}
          updateEditingInfo={updateEditingInfo}
          updateFamilyInfo={updateFamilyInfo}
          updateFamilyMembers={updateFamilyMembers}
          updateTypedFamilyMember={updateTypedFamilyMember}
          updateTypedFamilyName={updateTypedFamilyName}
          updateTypedShortBio={updateTypedShortBio}
        >

        </FamilyInfo>
      </Hero>
    </div>
  );
}

function FamilyInfo({
  family_name,
  family_members,
  familyMembers,
  isEditingInfo,
  resetEditForm,
  short_bio,
  typedFamilyMember,
  typedFamilyName,
  typedShortBio,
  updateEditingInfo,
  updateFamilyInfo,
  updateFamilyMembers,
  updateTypedFamilyMember,
  updateTypedFamilyName,
  updateTypedShortBio,
}) {
  return (
    <div className="flex flex-col h-full justify-end px-6 lg:px-10">
      <form onSubmit={updateFamilyInfo}>
        {!isEditingInfo && <EditButton text="Update Family Info" onClick={updateEditingInfo} />}
        {isEditingInfo && (
          <button className="w-0">
            <FontAwesomeIcon className="cursor-pointer text-white" icon={faTimes} onClick={resetEditForm} /> 
          </button>
        )}
        {!isEditingInfo && (
          <div className="text-white font-bold text-3xl my-2">
            {family_name}
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
                <FontAwesomeIcon className="cursor-pointer mr-2 -mt-1" icon={faPlus} onClick={updateFamilyMembers} />
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
        {isEditingInfo && <SubmitButton> Save Changes</SubmitButton>}
      </form>
    </div>
  );
}
