"use client";
import React, { PropsWithChildren } from "react";
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";

const queryCleint = new QueryClient();
const QuerClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryClientProvider client={queryCleint}>
      {children}
    </ReactQueryClientProvider>
  );
};

export default QuerClientProvider;
