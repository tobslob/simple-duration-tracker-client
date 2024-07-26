"use client";

import * as React from "react";
import { Disclosure, Transition } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib";
import {
  RemixiconComponentType,
  RiArrowDropRightFill,
  RiDashboardLine,
} from "@remixicon/react";

const basePath = "";

const sections = [
  {
    name: "",
    links: [
      {
        text: "Users",
        Icon: RiDashboardLine,
        href: "/",
      },
      // {
      //   text: "Users",
      //   Icon: RiFundsLine,
      //   href: "/users",
      // },
    ],
  },
];

interface NavLinkProps {
  Icon?: RemixiconComponentType;
  text: string;
  pathname?: string;
  href?: string;
  subNav?: boolean;
  links?: NavLinkProps[];
}

function NavLink({
  Icon,
  text,
  href = undefined,
  subNav = false,
  pathname,
}: NavLinkProps) {
  const path = [basePath, href].join("");
  return (
    <Link
      className={cn(
        "pl-6 pt-2 pb-2 flex justify-start items-center space-x-2 w-full rounded-br-full rounded-tr-full hover:bg-accent font-medium text-gray-800",
        subNav && "!pl-16",
        pathname === path &&
          "bg-blue-700 hover:bg-blue-400 text-white font-medium"
      )}
      href={path}
    >
      <div className="flex flex-row justify-start items-center space-x-4">
        {Icon ? <Icon className="w-6 h-6" /> : null}
        <span>{text}</span>
      </div>
    </Link>
  );
}

function SectionDropdown({
  Icon,
  text,
  links = [],
  pathname = "",
}: NavLinkProps) {
  const path = pathname.replace(basePath, "");
  const paths = links.map((l) => l.href);
  const defaultOpen = paths.includes(path);

  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => {
        return (
          <>
            <Disclosure.Button
              className={cn(
                "pl-6 pt-2 pb-2 flex justify-start items-center w-full rounded-br-full rounded-tr-full hover:bg-slate font-medium text-slate relative",
                open && "text-primary"
              )}
            >
              {links.length > 0 && (
                <span
                  className={cn(
                    "absolute transition-transform -left-1",
                    open && "rotate-45"
                  )}
                >
                  <RiArrowDropRightFill className="w-6 h-6" />
                </span>
              )}
              <div className="flex flex-row justify-start items-center space-x-4">
                {Icon ? <Icon className="w-6 h-6" /> : null}
                <span>{text}</span>
              </div>
            </Disclosure.Button>

            <Transition
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Disclosure.Panel className="disclosed space-y-1">
                {links.map((link, idy) => {
                  const {
                    text: innerText,
                    Icon: InnerIcon,
                    href,
                    links: innerLinks,
                  } = link;
                  return (
                    <NavLink
                      Icon={InnerIcon}
                      href={href}
                      key={idy}
                      links={innerLinks}
                      pathname={pathname}
                      subNav
                      text={innerText}
                    />
                  );
                })}
              </Disclosure.Panel>
            </Transition>
          </>
        );
      }}
    </Disclosure>
  );
}

export default function Component() {
  const pathname = usePathname();

  return (
    <nav className="w-full divide-y divide-border">
      {sections.map((section, idx) => {
        const { name, links = [] } = section;

        return (
          <div className="py-4 pr-4 space-y-1" key={idx}>
            {name ? (
              <p className="pl-6 py-2 text-xs tracking-wider text-muted-foreground/70 font-semibold uppercase">
                {name}
              </p>
            ) : null}
            {links.map((link, idy) => {
              const { text, Icon, href, links: pageLinks } = link;
              const Element =
                pageLinks && pageLinks.length > 0 ? SectionDropdown : NavLink;
              // const subNav = pageLinks && pageLinks.length > 0;
              return (
                <Element
                  Icon={Icon}
                  href={href}
                  key={idy}
                  links={pageLinks}
                  pathname={pathname}
                  text={text}
                />
              );
            })}
          </div>
        );
      })}
    </nav>
  );
}
