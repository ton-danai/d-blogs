import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Outlet, useLocation, Link } from "react-router-dom";
import { useUser, useUserDispatch } from "../context/UserContext";
import Cookies from "universal-cookie";
import userService from "../services/userService";
import { useNavigate } from "react-router-dom";
import IUserProfile from "../interfaces/IUserProfile";

const navigation = [
  { name: "Activities", href: "/", needLogin: false },
  { name: "My Posts", href: "/myposts", needLogin: true },
];
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Root() {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);
  const user = useUser();
  const dispatchUser = useUserDispatch();
  const location = useLocation();
  const checkMatchRouter = (href: string) => {
    if (location.pathname === href) return true;
    if (location.pathname.length > 1 && href.length === 1) return false;

    return location.pathname.startsWith(href);
  };

  useEffect(() => {
    const cookies = new Cookies(null, { path: "/" });
    const access_token = cookies.get("profile");

    if (access_token) {
      const getProfile = async () => {
        const data = await userService.getProfile();
        dispatchUser({
          type: "set",
          payload: data,
        });
        setIsChecking(false);
      };

      getProfile();
    } else {
      setIsChecking(false);
    }
  }, []);

  const signout = () => {
    const cookies = new Cookies(null, { path: "/" });
    cookies.remove("profile");
    dispatchUser({
      type: "set",
      payload: { email: "", liked_posts: [] } as IUserProfile,
    });
    navigate("/");
  };

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-indigo-800 sticky top-0 z-50">
          {({ open }) => (
            <>
              <div className="mx-auto  px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 text-4xl text-white ">
                      D-Blogs
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => {
                          if (item.needLogin && !user.email) return null;

                          return (
                            <Link
                              key={item.name}
                              to={item.href}
                              className={classNames(
                                checkMatchRouter(item.href)
                                  ? "bg-indigo-900 text-white"
                                  : "text-indigo-300 hover:bg-indigo-700 hover:text-white",
                                "rounded-md px-3 py-2 text-sm font-medium"
                              )}
                              aria-current={
                                checkMatchRouter(item.href) ? "page" : undefined
                              }
                            >
                              {item.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Profile dropdown */}

                      {user.email ? (
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-indigo-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">Open user menu</span>
                              <div className="h-8 w-8 rounded-full bg-gray-700 flex justify-center items-center text-white">
                                {user.email[0].toUpperCase()}
                              </div>
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <Menu.Item>
                                <div
                                  className="px-3 cursor-pointer"
                                  onClick={signout}
                                >
                                  Sign out
                                </div>
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      ) : (
                        <div className="flex gap-2 justify-center items-center">
                          <Link className="text-white" to={"/register"}>
                            Sign up
                          </Link>
                          <span className="text-white text-xl">|</span>
                          <Link className="text-white" to={"/signin"}>
                            Sign in
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-indigo-800 p-2 text-indigo-400 hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => {
                    if (item.needLogin && !user.email) return null;

                    return (
                      <Disclosure.Button
                        key={item.name}
                        as={Link}
                        to={item.href}
                        className={classNames(
                          checkMatchRouter(item.href)
                            ? "bg-indigo-900 text-white"
                            : "text-indigo-300 hover:bg-indigo-700 hover:text-white",
                          "block rounded-md px-3 py-2 text-base font-medium"
                        )}
                        aria-current={
                          checkMatchRouter(item.href) ? "page" : undefined
                        }
                      >
                        {item.name}
                      </Disclosure.Button>
                    );
                  })}
                </div>
                <div className="border-t border-gray-100 pb-3 pt-4">
                  {user.email ? (
                    <>
                      <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gray-700 flex justify-center items-center text-white">
                            {user.email[0].toUpperCase()}
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-base font-medium leading-none text-white ">
                            {user.email}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 space-y-1 px-2">
                        <Disclosure.Button
                          as="div"
                          className="block rounded-md px-3 py-2 text-base font-medium text-indigo-400 hover:bg-indigo-700 hover:text-white"
                          onClick={signout}
                        >
                          Sign out
                        </Disclosure.Button>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                      <Disclosure.Button
                        as={Link}
                        to={"/register"}
                        className={classNames(
                          "text-indigo-300 hover:bg-indigo-700 hover:text-white",
                          "block rounded-md px-3 py-2 text-base font-medium"
                        )}
                      >
                        Sign up
                      </Disclosure.Button>
                      <Disclosure.Button
                        as={Link}
                        to={"/signin"}
                        className={classNames(
                          "text-indigo-300 hover:bg-indigo-700 hover:text-white",
                          "block rounded-md px-3 py-2 text-base font-medium"
                        )}
                      >
                        Sign in
                      </Disclosure.Button>
                    </div>
                  )}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <main>
          <div className="mx-auto px-2 pm-6 pt-0 sm:px-6 lg:px-8 max-md:pt-0">
            {isChecking ? null : <Outlet />}
          </div>
        </main>
      </div>
    </>
  );
}
