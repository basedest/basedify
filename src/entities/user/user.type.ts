import { useCurrentUser } from './user.hook';

export type UserExtended = ReturnType<typeof useCurrentUser>;
