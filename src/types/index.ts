import { ReactNode } from "react";

export type SidebarLinkType = {
  key: string;
  label: string;
  path: string;
  icon: ReactNode;
};

export type DeviceOption = {
  value: string;
  label: string;
};

export type DeviceMap = Record<string, DeviceOption[]>;

export type DraftSelector = {
  deviceType: DeviceOption | null;
  device: DeviceOption | null;
  nombreVideo: File | null; // Cambiamos el tipo a File
  colorRGB: string | null;
};

