"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "../../../../../assets/images/logo-white.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CirclePerson,
  DownArrow,
  HomeIcon,
  NavFavourite,
  Notification,
} from "@/assets/icons/icons";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user.provider";
import { logout } from "@/services/AuthServices";

const Navbar = () => {
  const { user, setIsLoading: userLoading } = useUser();
  // console.log("User from navbar", user);
  // console.log("User photo", user?.landlord.profilePhoto);

  const router = useRouter();

  // handle logout and reload after logout
  const handleLogout = () => {
    logout();
    userLoading(true);

    // if (protectedRoutes.some((route) => pathName.match(route))) {
    //   router.push("/");
    // }
  };

  const handleProfile = (userId: string) => {
    console.log("user ID", userId);
    if (!user?.isProfileUpdated) {
      if (user?.role === "USER") {
        router.push("/profile/complete-profile");
      } else if (user?.role === "LANDLORD") {
        router.push("/profile/complete-profile/landlord");
      } else if (user?.role === "TENANT") {
        router.push("/profile/complete-profile/tenant");
      }
    } else {
      if (user?.role === "LANDLORD") {
        router.push(`/profile/landlord/${userId}`);
      } else if (user?.role === "TENANT") {
        router.push(`/profile/tenant/${userId}`);
      }
    }
  };

  const handleAddListing = () => {
    if (!user) {
      router.push("/login");
    } else if (!user.isProfileUpdated) {
      router.push("/profile/complete-profile/landlord");
    } else {
      router.push("/listing/add-property");
    }
  };

  return (
    <nav className="px-10 py-6 bg-colorButton hidden md:block sticky top-0 z-20">
      <div className="m-auto flex justify-between items-center text-white">
        <div className="flex items-center gap-20">
          <Link href="/">
            <Image src={logo} width={137.951} alt="verv logo" />
          </Link>
          <div className="font-medium flex items-center gap-6">
            <ul className="flex justify-between items-center gap-6">
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-lg p-0 m-0">
                      About
                      <DownArrow />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-36">
                    <DropdownMenuGroup>
                      <Link href="/about/verv">
                        <DropdownMenuItem>Verv</DropdownMenuItem>
                      </Link>
                      <Link href="/about/landlords">
                        <DropdownMenuItem>Landlords</DropdownMenuItem>
                      </Link>
                      <Link href="/about/tenants">
                        <DropdownMenuItem>Tenants</DropdownMenuItem>
                      </Link>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
              <li className="flex justify-center items-center">
                {/* <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-lg p-0 m-0">
                      Pricing
                      <DownArrow />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-36">
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <span>Pricing I</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span>Pricing II</span>
                      </DropdownMenuItem> 
                      <DropdownMenuItem>
                        <span>Pricing III</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu> */}
                <Link href="/pricing">Pricing</Link>
              </li>
              <li className="flex justify-center items-center">Agent Finder</li>
            </ul>
            {/* <Button
              className="text-lg text-colorButton font-semibold bg-white rounded-[32px] w-[180px] h-[56px] py-2 px-4"
              onClick={handleAddListing}
            >
              <HomeIcon width={25} height={24} />
              Add Listing
            </Button> */}
          </div>
        </div>
        <div className="text-lg flex justify-end items-center gap-14">
          {/* signin/register */}
          <div className="flex justify-end items-center gap-6 font-medium">
            {(!user || user?.role === "LANDLORD" || user?.role === "USER") && (
              <Button
                className="text-lg text-colorButton font-semibold bg-white rounded-[32px] w-[180px] h-[56px] py-2 px-4"
                onClick={handleAddListing}
              >
                <HomeIcon width={25} height={24} />
                Add Listing
              </Button>
            )}

            <ul className="flex items-center justify-center gap-2">
              {!user ? (
                <li>
                  <Link
                    href="/login"
                    className="flex justify-center items-center gap-2"
                  >
                    <CirclePerson width={24} height={24} />
                    Sign In/Register
                  </Link>
                </li>
              ) : (
                <div className="flex items-center gap-6">
                  <li>
                    <NavFavourite height={28} width={28} stroke="white" />
                  </li>
                  <li>
                    <Notification height={28} width={28} fill="white" />
                  </li>
                  <li>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Avatar className="cursor-pointer w-12 h-12">
                          <AvatarImage
                            src={
                              user?.profilePhoto ??
                              "https://avatar.iran.liara.run/public"
                            }
                            alt="avatar"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-36">
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={() => handleProfile(user.id)}
                          >
                            Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>Setting</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleLogout()}>
                            Logout
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
