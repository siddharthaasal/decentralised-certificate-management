import { HttpAgent, Actor } from "@dfinity/agent";

// Function to create an actor with authentication
export const createActor = (canisterId, idlFactory, identity) => {
    const agent = new HttpAgent({ identity });

    // Only fetch the root key in local development
    if (process.env.NODE_ENV === "development" || "development") {
        agent.fetchRootKey();
    }

    return Actor.createActor(idlFactory, { agent, canisterId });
};
