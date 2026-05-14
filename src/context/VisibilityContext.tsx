"use client";

import { createContext, useContext } from "react";

export const VisibilityContext = createContext({ isVisible: false });
export const useVisibility = () => useContext(VisibilityContext);
