import { db } from '@/db-module';

export const useCurrentUser = () => {
    const user = db.user.useFindFirst({
        include: {
            programs: true,
            achievements: true,
            settings: true,
        },
    });

    const currentProgram = db.program.useFindFirst({
        where: {
            userId: user?.id,
            // there can be only one active program so we can safely assume that the first one is the active one
            isActive: true,
        },
    });

    return {
        ...user,
        currentProgram,
    };
};
