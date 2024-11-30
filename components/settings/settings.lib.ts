import { db } from '~/db-module';

export async function resetProgram(programId: number) {
    return db.program.delete({ where: { id: programId } });
}
