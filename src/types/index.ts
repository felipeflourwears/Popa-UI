import { ReactNode } from "react";

export type SidebarLinkType = {
  key: string;
  label: string;
  path: string;
  icon: ReactNode;
};

export type Selector = {
  id: string
  deviceType: { value: string; label: string };
}

export type DraftSelector = Omit<Selector, 'id'>
