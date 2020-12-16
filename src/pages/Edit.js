import { Chrono } from "react-chrono";
import { WindupChildren } from "windups";

import Hero from '../components/Hero.js';

export default function Edit() {
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

  return (
    <div className="flex flex-col bg-white">
      <Hero>
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