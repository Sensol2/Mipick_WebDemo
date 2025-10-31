"use client";

import React, { useState, createContext, useContext } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

interface StyleContextType {
  sheet: ServerStyleSheet;
}

const StyleContext = createContext<StyleContextType | null>(null);

export function useStyleContext() {
  const context = useContext(StyleContext);
  if (!context) {
    throw new Error("useStyleContext must be used within StyleProvider");
  }
  return context;
}

export function StyleProvider({ children }: { children: React.ReactNode }) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  const contextValue = {
    sheet: styledComponentsStyleSheet,
  };

  if (typeof window !== "undefined") {
    return <StyleContext.Provider value={contextValue}>{children}</StyleContext.Provider>;
  }

  return (
    <StyleContext.Provider value={contextValue}>
      <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>{children}</StyleSheetManager>
    </StyleContext.Provider>
  );
}

export default StyleProvider;
