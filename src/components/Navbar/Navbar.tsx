import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import CustomLink from "../CustomLink/CustomLink";
import { useAppContext } from "../../context/AppContext";

interface NavigationItem {
  name: string;
  href: string;
}

const navigation: NavigationItem[] = [
  { name: "My Posts", href: "/my-posts" },
  { name: "Saved Posts", href: "/saved-posts" },
];

const Navbar = () => {
  const { user, userData, isAuthenticated, logoutToUser } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      const success = await logoutToUser(); // Perform the logout
      // Navigate to login page after logout
      if (success) {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
          </a>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {isAuthenticated
            ? navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm/6 font-semibold text-gray-900"
                >
                  {item.name}
                </a>
              ))
            : ""}
        </div>
        <div className="flex flex-1 items-center justify-end gap-x-6">
          {!isAuthenticated && (
            <>
              <CustomLink
                to="/login"
                className="hidden text-sm/6 font-semibold text-gray-900 lg:block"
                label="Login"
              />
              <CustomLink to="/register" label="Register" />
            </>
          )}
          {isAuthenticated && (
            <div>{user?.displayName ? user?.displayName : userData?.name}</div>
          )}
          {isAuthenticated && (
            <CustomLink
              to="/login"
              label="Logout"
              className="rounded-md bg-green-600 px-3 py-3 text-sm font-bold text-white shadow-lg hover:bg-green-500"
              onClick={() => handleLogout()} // Call the handleLogout function
            />
          )}
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center gap-x-6">
            {/* <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a> */}
            <CustomLink to="/register" label="Register" />

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {isAuthenticated
                  ? navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    ))
                  : ""}
              </div>
              <div className="py-6">
                {!isAuthenticated && (
                  <>
                    <CustomLink
                      to="/login"
                      className="hidden text-sm/6 font-semibold text-gray-900 lg:block"
                      label="Login"
                    />
                  </>
                )}
                {isAuthenticated && (
                  <CustomLink
                    to="/login"
                    label="Logout"
                    className="rounded-md bg-green-600 px-3 py-3 text-sm font-bold text-white shadow-lg hover:bg-green-500"
                    onClick={() => handleLogout()}
                  />
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Navbar;
