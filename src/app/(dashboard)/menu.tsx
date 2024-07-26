"use client";

// import { signOut, useSession } from "next-auth/react";
import type { MutableRefObject } from "react";
import * as React from "react";
import type { RemixiconComponentType } from "@remixicon/react";
import { Avatar, AvatarFallback, AvatarImage, cn } from "@/components";
import Link from "next/link";

export const AvatarBadge = ({
  initials,
  alt,
  src,
  className,
}: {
  initials: string;
  src?: string;
  alt?: string;
  className?: string;
}) => {
  return (
    <Avatar className={"w-6 h-6 rounded-lg"}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback
        className={cn(
          "text-sm text-white bg-primary font-bold rounded-lg",
          className
        )}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};

interface MenuLinkProps {
  Icon?: RemixiconComponentType | undefined;
  text: string;
  href: string;
  subText?: string;
  extraClasses?: string;
  target?: string;
  initials?: string;
  onClick?: (
    focusableElement?:
      | HTMLElement
      | MutableRefObject<HTMLElement | null>
      | React.MouseEvent<HTMLElement>
  ) => void;
}

export function MenuLink({
  Icon,
  text,
  subText,
  initials,
  href,
  onClick,
  extraClasses = "",

  target = "_self",
}: MenuLinkProps) {
  return (
    <Link
      className={cn(
        "p-2 text-gray-800 flex justify-start items-center space-x-2.5 w-full hover:bg-accent rounded-lg font-medium",
        extraClasses
      )}
      href={href}
      onClick={onClick}
      target={target}
    >
      {Icon ? <Icon className="w-5 h-5" /> : null}
      {initials ? <AvatarBadge initials={initials} /> : null}
      <div className="flex flex-col justify-start items-start">
        <span>{text}</span>
        {subText ? (
          <span className="text-xs text-gray-500">{subText}</span>
        ) : null}
      </div>
    </Link>
  );
}

export default function Component() {
  const businessName = "Cynomi";
  const imageSrc = "/cynomi.png";
  const initials = "CY";
  return (
    <div className="w-full flex flex-row justify-between items-center space-x-1 py-2.5">
      <div
        className={cn(
          "w-full px-2.5 py-2 rounded-lg hover:bg-accent text-left flex justify-start items-center max-w-full focus:outline-2 focus:outline-black"
        )}
      >
        <div className="flex flex-1 flex-row justify-start items-center space-x-2">
          {/* Icon / Logo box */}
          <AvatarBadge
            alt={"logged in user's name"}
            initials={initials}
            src={imageSrc}
          />
          <p className="font-semibold line-clamp-1">{businessName}</p>
        </div>
      </div>
    </div>
  );
}
