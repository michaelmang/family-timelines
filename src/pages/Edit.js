import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Chrono } from "react-chrono";
import { WindupChildren } from "windups";

import Hero from '../components/Hero.js';
import { useState } from "react";

const items = [
  {
    title: "September 19, 2020",
    cardTitle: "Wedding Day",
    cardSubtitle: "Smithfield Plantation | Blacksburg, Virginia",
    media: {
      type: "IMAGE",
      source: {
        url:
          "https://media.xogrp.com/images/c1828257-8afc-4246-92cf-e0f8f9784c6c~rt_auto-cr_0.489.4887.2933-rs_1024.h?ordering=explicit",
      },
    },
  },
];

export default function Edit() {
  const { logout } = useAuth0();

  function handleLogout() {
    logout({ returnTo: window.location.origin });
  }

  const [isMenuExpanded, setMenuExpanded] = useState(false);

  function updateMenuExpanded() {
    setMenuExpanded(!isMenuExpanded);
  }

  return (
    <div className="flex flex-col bg-white">
      <Hero className="flex-col pt-8">
        <div className="flex w-full justify-start px-6">
          <div className="flex flex-col text-white">
            <div className="text-white text-base cursor-pointer" onClick={updateMenuExpanded}>
              {isMenuExpanded && <FontAwesomeIcon className="mr-2" icon={faChevronUp} />}
              {!isMenuExpanded && <FontAwesomeIcon className="mr-2" icon={faChevronDown} />}
              Hi, Mangialardis 👋
            </div>
            {isMenuExpanded && (
              <WindupChildren>
                <button
                  onClick={handleLogout}
                  className="text-pink-500 rounded font-bold text-xs lg:text-sm text-left ml-6 mt-3 p-0"
                >
                  Log Out
                </button>
              </WindupChildren>
            )}
          </div>
        </div>
        <div className="flex flex-col h-full justify-end px-6 lg:px-10 pb-10">
          <WindupChildren>
            <div className="text-white font-bold text-3xl mb-2">
              The Mangialardis
            </div>
            <div className="text-white font-light text-lg">
              Kelly & Michael
            </div>
            <div className="text-white font-light text-lg">
              Living in Radford, Virginia
            </div>
            <div className="text-white font-light text-lg">
              Started on September 19, 2020 in Blacksburg, Virginia
            </div>
          </WindupChildren>
        </div>
      </Hero>
      <div className="flex flex-col my-8 w-1/2">
        <Chrono
          items={items}
          mode="VERTICAL_ALTERNATING"
          scrollable={{ scrollbar: true }}
        />
      </div>
    </div>
  );
}