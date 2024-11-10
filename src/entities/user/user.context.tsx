import { createContext, useContext, useEffect, useState } from 'react';
import { useCurrentUser } from './user.hook';
import { UserExtended } from './user.type';

type UserContextType = {
    currentUser: UserExtended | null;
};

const UserContext = createContext<UserContextType>({
    currentUser: null,
});

export function UserProvider({ children }: { children: React.ReactNode }) {
    const currentUser = useCurrentUser();

    return (
        <UserContext.Provider value={{ currentUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => useContext(UserContext);
