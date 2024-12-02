import { db } from '~/db-module';

export async function resetProgram(programId: number) {
    await db.program.delete({ where: { id: programId } });
    await db.task.deleteMany();
    await db.taskProgress.deleteMany();
}
