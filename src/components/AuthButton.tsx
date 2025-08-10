"use client";

import { Fragment, useMemo } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";

function cx(...xs: (string | false | null | undefined)[]) {
  return xs.filter(Boolean).join(" ");
}

export function AuthButton() {
  const { data: session, status } = useSession();
  const user = session?.user;

  const initial = useMemo(() => {
    const n = (user?.name || user?.email || "?").trim();
    return n ? n[0]?.toUpperCase() : "U";
  }, [user?.name, user?.email]);

  if (status === "loading") {
    return (
      <div className="absolute top-4 right-4 z-50">
        <div className="h-11 w-11 rounded-full bg-[#435b87]/40 animate-pulse border-[3px] border-[#aea693]" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => signIn("google")}
          className="font-pixel bg-[#435b87] text-white border-[3px] border-[#aea693] px-6 py-2 rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,0.5)] whitespace-nowrap text-sm hover:brightness-110 transition"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="absolute top-4 right-4 z-50">
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button
          className="h-11 w-11 rounded-full overflow-hidden flex items-center justify-center
                     bg-[#435b87] border-[3px] border-[#aea693] shadow-[2px_2px_0px_rgba(0,0,0,0.5)]
                     hover:brightness-110 transition"
          aria-label="Account menu"
        >
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            <span className="font-pixel text-lg text-white">{initial}</span>
          )}
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className="absolute right-0 mt-2 w-72 origin-top-right rounded-sm
                       bg-[#0e0e12] text-white border-[3px] border-[#aea693]
                       shadow-[4px_4px_0px_rgba(0,0,0,0.6)] p-3"
          >
            <div className="px-3 py-3">
              <p className="text-xs text-gray-400">Signed in as</p>
              <p className="text-base font-pixel truncate">{user.name ?? user.email}</p>
              {user.email && (
                <p className="text-sm text-gray-400 truncate">{user.email}</p>
              )}
            </div>

            <div className="my-3 h-0.5 bg-[#aea693]" />

            <Menu.Item>
              {({ active }) => (
                <a
                  href="/account"
                  className={cx(
                    "block w-full text-left px-3 py-3 rounded-sm text-base font-pixel",
                    active ? "bg-[#fed035] text-black" : "hover:bg-white/10"
                  )}
                >
                  Account
                </a>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <a
                  href="/account?tab=avatar"
                  className={cx(
                    "block w-full text-left px-3 py-3 rounded-sm text-base font-pixel",
                    active ? "bg-[#fed035] text-black" : "hover:bg-white/10"
                  )}
                >
                  Edit Avatar
                </a>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => signOut()}
                  className={cx(
                    "block w-full text-left px-3 py-3 rounded-sm text-base font-pixel",
                    active ? "bg-[#fed035] text-black" : "hover:bg-white/10"
                  )}
                >
                  Sign Out
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

