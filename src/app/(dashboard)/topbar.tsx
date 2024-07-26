"use client";

import * as React from "react";
import {
  RiArrowDropDownLine,
  RiLogoutBoxRLine,
  RiNotification3Line,
} from "@remixicon/react";
import { Popover, Transition } from "@headlessui/react";
import { cn } from "@/components";
import { AvatarBadge, MenuLink } from "@/app/(dashboard)/menu";

export default function Component() {
  const initials = "KO";
  return (
    <div className=" h-fit flex  rounded-lg bg-white border border-neutral-200 transition-all  inset-x-0  w-[95%] mx-auto my-6 sticky ">
      <Popover.Group className="w-full flex flex-row justify-end items-center space-x-1 p-2">
        <div className="flex  items-center relative flex-grow-0">
          <Popover className="relative w-full z-50">
            {({ open }) => {
              return (
                <>
                  <Popover.Button className="p-2 rounded-lg hover:bg-accent ui-open:bg-bg-accent outline-primary-400">
                    <RiNotification3Line className="h-5 w-5" />
                  </Popover.Button>
                  <Transition
                    show={open}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel
                      static
                      className="absolute w-[200px] z-[100]  mt-2 right-0 rounded-lg border border-neutral-100 shadow divide-y divide-slate-200 bg-white"
                    >
                      <div className="p-6">Notification body in play here</div>
                    </Popover.Panel>
                  </Transition>
                </>
              );
            }}
          </Popover>
        </div>
        <div className="flex ">
          <Popover className="relative w-full z-50">
            {({ open, close }) => {
              return (
                <>
                  {/*<Popover.Overlay className="fixed inset-0 bg-black opacity-30" />*/}
                  <Popover.Button
                    className={cn(
                      "w-full px-2.5 py-2 rounded-lg hover:bg-accent text-left flex justify-start items-center max-w-full focus:outline-2 focus:outline-black",
                      open && "bg-accent"
                    )}
                  >
                    <div className="flex flex-1 flex-row justify-start items-center space-x-2">
                      {/* Icon / Logo box */}
                      <AvatarBadge
                        alt={"@business.language"}
                        initials={initials}
                      />
                    </div>
                    <RiArrowDropDownLine className="h-6 w-6 ui-open:rotate-180 ui-open:transform ui-open:duration-200" />
                  </Popover.Button>
                  <Transition
                    show={open}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel
                      static
                      className="absolute mt-2 w-[250px] z-[200] right-0 rounded-lg border border-neutral-100 shadow divide-y divide-slate-200 bg-white"
                    >
                      <div className="p-2">
                        <p className="text-xs tracking-wider text-gray-400 p-2.5 uppercase">
                          {"sample.user@account.com"}
                        </p>
                      </div>
                      <div className="p-2">
                        <MenuLink
                          href={""}
                          Icon={RiLogoutBoxRLine}
                          onClick={(e) => {
                            const event = e as unknown as MouseEvent;
                            event.preventDefault();
                            close();
                          }}
                          text="Logout"
                        />
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              );
            }}
          </Popover>
        </div>
      </Popover.Group>
    </div>
  );
}
