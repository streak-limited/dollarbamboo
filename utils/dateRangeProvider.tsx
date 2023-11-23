"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
// import supabase from "@/lib/supbase";
import { Session } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { DateRange, Range } from "react-date-range";
//Step 1: Create a context
export const DateRangeContext = createContext<any>({
    // dateRange: [
    //     {
    //         startDate: new Date(),
    //         endDate: undefined,
    //         key: "selection",
    //     },
    // ],
    // setDateRange: () => {},
});

//Step 2: Create a provider
export const DateRangeProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    // const [session, setSession] = useState<Session>();
    // const [user, setUser] = useState<any>();

    // const { accessToken, ...rest } = props;

    const [dateRange, setDateRange] = useState<Range[]>([
        {
            startDate: new Date(),
            endDate: undefined,
            key: "selection",
        },
    ]);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const handleToggle = () => {
        setIsDatePickerOpen(!isDatePickerOpen);
    };

    const handleDateSelect = (ranges: any) => {
        setDateRange([ranges.selection]);
        if (ranges.selection?.startDate != ranges.selection?.endDate) {
            setIsDatePickerOpen(!isDatePickerOpen);
        }
    };

    return (
        <DateRangeContext.Provider
            value={{
                dateRange,
                setDateRange,
                isDatePickerOpen,
                setIsDatePickerOpen,
                handleToggle,
                handleDateSelect,
            }}
        >
            {children}
        </DateRangeContext.Provider>
    );
};

// Step 3: Create a hook to use the context
export const useDateRange = () => {
    const context = useContext(DateRangeContext);
    if (context === undefined) {
        throw new Error(
            "useDateRange must be used within an DateRangeProvider"
        );
    }
    return context;
};
