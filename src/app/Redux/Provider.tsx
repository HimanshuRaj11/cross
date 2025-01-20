"use client"
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import { ReactNode } from "react";

interface ProvidersProps {
    children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    return <ReduxProvider store={store}> {children} </ReduxProvider>;
}