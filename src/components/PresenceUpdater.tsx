// components/PresenceUpdater.tsx
"use client";

import { useEffect } from "react";
import axios from "axios";

const PresenceUpdater = ({ userId }: { userId: string }) => {

    useEffect(() => {
        const updateStatus = async (status: string) => {
            try {
                await axios.post("/api/status/update", { status,userId });
            } catch (error) {
                console.error("Failed to update status:", error);
            }
        };

        // Set user status to 'online' when component mounts
        updateStatus("online");

        // Set user status to 'offline' when component unmounts
        return () => {
            updateStatus("offline");
        };
    }, [userId]);

    return null; // This component doesn't render anything
};

export default PresenceUpdater;
