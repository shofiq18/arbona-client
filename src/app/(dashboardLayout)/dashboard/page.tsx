"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";

import { FaArrowRightFromBracket } from "react-icons/fa6";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLogoutMutation } from "@/redux/api/auth/admin/adminApi";
import Cookies from "js-cookie";
import store from "@/redux/store";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/types";

export default function AppSidebar() {
  const pathname = usePathname();

  // Logout function start
  const router = useRouter();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  // Show dynamic user data
  const [userInfo, setUserInfo] = useState<{
    name?: string;
    email: string;
    role: string;
  } | null>(null);
  
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        setUserInfo({
          // name: decodedToken.name || "User",
          email: decodedToken.email || "user@example.com",
          role: decodedToken.role || "admin"
        });
      } catch (error) {
        console.error("Error decoding token:", error);
        setUserInfo({
          // name: "User",
          email: "user@example.com",
          role: "admin"
        });
      }
    }
  }, []);



  
// Handle logout
  const handleLogout = async () => {
    try {
      // Call the logout API
      await logout().unwrap();

      // Clear the token from cookies
      Cookies.remove("token");

      // Clear any cached data
      store.dispatch({ type: "baseApi/reset" });

      // Redirect to login page
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Even if API call fails, clear local token and redirect
      Cookies.remove("token");
      store.dispatch({ type: "baseApi/reset" });
      router.push("/login");
    }
  };
  // Logout function end

  return (
    <Sidebar>
      <SidebarContent className="bg-[#282828] flex flex-col justify-between p-2 max-w-[260px] h-screen">
        {/* Top Section */}
        <div>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {/* Profile */}
                <div className="flex justify-between items-center  mb-3">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/dashboardIcons/logo.png"
                      width={225}
                      height={80}
                      alt="Profile"
                      className="rounded-full"
                    />
                  </div>
                </div>

                {/* Main menu */}
                <p className="text-white mt-4 mb-2 text-sm font-medium">
                  Main Menu
                </p>
                <div className="flex flex-col gap-2">
                  {/* Dashboard */}
                  <button
                    className={`flex w-full items-center gap-2 rounded-sm px-4 py-2.5 transition-colors ${
                      pathname === "/dashboard/dashboard"
                        ? "bg-green-700 text-white text-lg"
                        : "hover:bg-[#F7F7F81A] text-white   focus:bg-[#F7F7F81A] "
                    }`}
                  >
                    <Link
                      href="/dashboard/dashboard"
                      className="flex items-center gap-2 w-full"
                    >
                      <Image
                        src="/dashboardIcons/Group.png"
                        width={20}
                        height={20}
                        alt="Profile"
                        className="rounded-full"
                      />
                      <span className="text-[16px]">Dashboard</span>
                    </Link>
                  </button>
                  {/* Order management */}
                  <button
                    className={`flex w-full items-center gap-2 rounded-sm px-4 py-2.5 transition-colors ${
                      pathname === "/dashboard/order-management"
                        ? "bg-green-700 text-white text-lg"
                        : "text-[#D5D6E2] hover:bg-[#F7F7F81A] hover:text-white focus:bg-[#F7F7F81A] focus:text-white"
                    }`}
                  >
                    <Link
                      href="/dashboard/order-management"
                      className="flex items-center gap-2 w-full"
                    >
                      <Image
                        src="/dashboardIcons/Vector.png"
                        width={20}
                        height={20}
                        alt="Profile"
                        className="rounded-full"
                      />
                      <span className="text-[16px]">Order Management</span>
                    </Link>
                  </button>
                  {/* Customer */}
                  <button
                    className={`flex w-full items-center gap-2 rounded-sm px-4 py-2.5 transition-colors ${
                      pathname === "/dashboard/customers"
                        ? "bg-green-700 text-white text-lg"
                        : "text-[#D5D6E2] hover:bg-[#F7F7F81A] hover:text-white focus:bg-[#F7F7F81A] focus:text-white"
                    }`}
                  >
                    <Link
                      href="/dashboard/customers"
                      className="flex items-center gap-2 w-full"
                    >
                      <Image
                        src="/dashboardIcons/users.png"
                        width={20}
                        height={20}
                        alt="Profile"
                        className="rounded-full"
                      />
                      <span className="text-[16px]">Customers</span>
                    </Link>
                  </button>
                  {/* Categories */}
                  <button
                    className={`flex w-full items-center gap-2 rounded-sm px-4 py-2.5 transition-colors ${
                      pathname === "/dashboard/categories"
                        ? "bg-green-700 text-white text-lg"
                        : "text-[#D5D6E2] hover:bg-[#F7F7F81A] hover:text-white focus:bg-[#F7F7F81A] focus:text-white"
                    }`}
                  >
                    <Link
                      href="/dashboard/categories"
                      className="flex items-center gap-2 w-full"
                    >
                      <Image
                        src="/dashboardIcons/circle-square.png"
                        width={20}
                        height={20}
                        alt="Profile"
                        className="rounded-full"
                      />
                      <span className="text-[16px]">Categories</span>
                    </Link>
                  </button>
                  {/* Inventory */}
                  <button
                    className={`flex w-full items-center gap-2 rounded-sm px-4 py-2.5 transition-colors ${
                      pathname === "/dashboard/inventory"
                        ? "bg-green-700 text-white text-lg"
                        : "text-[#D5D6E2] hover:bg-[#F7F7F81A] hover:text-white focus:bg-[#F7F7F81A] focus:text-white"
                    }`}
                  >
                    <Link
                      href="/dashboard/inventory"
                      className="flex items-center gap-2 w-full"
                    >
                      <Image
                        src="/dashboardIcons/fluent-mdl2_product-list.png"
                        width={20}
                        height={20}
                        alt="Profile"
                        className="rounded-full"
                      />
                      <span className="text-[16px]">Inventory</span>
                    </Link>
                  </button>
                  {/* Container */}
                  <button
                    className={`flex w-full items-center gap-2 rounded-sm px-4 py-2.5 transition-colors ${
                      pathname === "/dashboard/container"
                        ? "bg-green-700 text-white text-lg"
                        : "text-[#D5D6E2] hover:bg-[#F7F7F81A] hover:text-white focus:bg-[#F7F7F81A] focus:text-white"
                    }`}
                  >
                    <Link
                      href="/dashboard/container"
                      className="flex items-center gap-2 w-full"
                    >
                      <Image
                        src="/dashboardIcons/Vector 61.png"
                        width={20}
                        height={20}
                        alt="Profile"
                        className="rounded-full"
                      />
                      <span className="text-[16px] ">Container</span>
                    </Link>
                  </button>
                </div>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* Bottom Section */}
        <div className="pt-4">
          <Separator className="bg-[#242432] mb-4" />
          <SidebarMenu>
            {/* user logout */}

            {/* <p className="text-white ml-4">Admin</p> */}

            <div className="flex items-center gap-2 w-full mb-12 px-4 py-1 bg-white rounded-lg">
              <Image
                src="/dashboardIcons/man.png"
                width={40}
                height={40}
                alt="Profile"
                className="rounded-full"
              />

              <div className="flex flex-col px-3">
                <h3 className="text-lg font-semibold text-gray-700 capitalize">{userInfo?.role}</h3>
                <p className="text-xs text-gray-500">{userInfo?.email}</p>
              </div>

              {/* Logout button */}
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                title="Click to logout"
                className="ml-auto p-2 rounded transition-colors cursor-pointer"
              >
                {isLoggingOut ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
                ) : (
                  <FaArrowRightFromBracket className="text-gray-500" />
                )}
              </button>
            </div>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
