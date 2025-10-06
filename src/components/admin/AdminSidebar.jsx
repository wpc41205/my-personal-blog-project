"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "sonner";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  FileText,
  Folder,
  User,
  Bell,
  Key,
  ExternalLink,
  LogOut,
} from "lucide-react";

const AdminSidebar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    toast.success('Logged out successfully');
    router.push('/admin/login');
  };

  return (
    <Sidebar className="w-[280px] !bg-[#EFEEEB] border-r border-gray-200" collapsible="offcanvas">
      <SidebarHeader className="pt-6 pb-6 px-6">
        <div className="mb-4">
          <div className="w-[120px] h-[60px] mb-2 flex items-center">
            <span className="font-bold text-[#26231E] text-3xl">WaveMashare</span>
            <div className="font-bold text-[#12B279] text-3xl">.</div>
          </div>
          <p className="font-['Poppins'] font-semibold text-xl leading-7 text-[#F2B68C]">Admin panel</p>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-0">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={router.pathname === '/admin/article-management'}
                  tooltip="Article management"
                  className={`w-full h-[64px] pt-5 pr-6 pb-5 pl-6 gap-3 font-['Poppins'] font-medium text-base leading-6 ${
                    router.pathname === '/admin/article-management' 
                      ? 'bg-[#DAD6D1] text-[#43403B]' 
                      : 'text-[#75716B]'
                  }`}
                >
                  <Link href="/admin/article-management">
                    <FileText className="h-4 w-4" />
                    <span>Article management</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={router.pathname === '/admin/category-management'}
                  tooltip="Category management"
                  className={`w-full h-[64px] pt-5 pr-6 pb-5 pl-6 gap-3 font-['Poppins'] font-medium text-base leading-6 ${
                    router.pathname === '/admin/category-management' 
                      ? 'bg-[#DAD6D1] text-[#43403B]' 
                      : 'text-[#75716B]'
                  }`}
                >
                  <Link href="/admin/category-management">
                    <Folder className="h-4 w-4" />
                    <span>Category management</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={router.pathname === '/admin/profile'}
                  tooltip="Profile"
                  className={`w-full h-[64px] pt-5 pr-6 pb-5 pl-6 gap-3 font-['Poppins'] font-medium text-base leading-6 ${
                    router.pathname === '/admin/profile' 
                      ? 'bg-[#DAD6D1] text-[#43403B]' 
                      : 'text-[#75716B]'
                  }`}
                >
                  <Link href="/admin/profile">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={router.pathname === '/admin/notifications'}
                  tooltip="Notifications"
                  className={`w-full h-[64px] pt-5 pr-6 pb-5 pl-6 gap-3 font-['Poppins'] font-medium text-base leading-6 ${
                    router.pathname === '/admin/notifications' 
                      ? 'bg-[#DAD6D1] text-[#43403B]' 
                      : 'text-[#75716B]'
                  }`}
                >
                  <Link href="/admin/notifications">
                    <Bell className="h-4 w-4" />
                    <span>Notification</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={router.pathname === '/admin/reset-password'}
                  tooltip="Reset password"
                  className={`w-full h-[64px] pt-5 pr-6 pb-5 pl-6 gap-3 font-['Poppins'] font-medium text-base leading-6 ${
                    router.pathname === '/admin/reset-password' 
                      ? 'bg-[#DAD6D1] text-[#43403B]' 
                      : 'text-[#75716B]'
                  }`}
                >
                  <Link href="/admin/reset-password">
                    <Key className="h-4 w-4" />
                    <span>Reset password</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="px-6 pb-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              tooltip="WaveMashare. website"
            >
              <Link href="/">
                <ExternalLink className="h-4 w-4" />
                <span>WaveMashare. website</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarSeparator />
          
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={handleLogout}
              tooltip="Log out"
            >
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
