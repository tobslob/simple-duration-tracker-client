import Link from "next/link";

const links = [
  {
    href: "/apps",
    text: "Download on iOS",
  },
  {
    href: "/apps",
    text: "Download on Android",
  },
  {
    href: "https://google.com/privacy",
    text: "Privacy Policy",
  },
  {
    href: "/terms",
    text: "Terms of Service",
  },
];

export default function Component() {
  return (
    <div className="w-full py-4 flex flex-col justify-center items-center">
      <div className="flex flex-wrap justify-center items-center gap-2 text-xs text-muted-foreground">
        <div className="space-x-2">
          <span>&copy; 2024</span>
          <span className="text-gray-300">&bull;</span>
        </div>
        {links.map((link, idx) => {
          return (
            <div className="space-x-2" key={idx}>
              <Link
                className="hover:underline whitespace-nowrap"
                href={link.href}
              >
                {link.text}
              </Link>
              {idx < links.length - 1 && (
                <span className="text-gray-300">&bull;</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
