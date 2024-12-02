import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ProgramOverviewCalendar } from '~/components/survey/calendar';
import { SurveyLayout } from '~/components/survey/SurveyLayout';
import { WeeklyTaskList } from '~/components/survey/weekly-task-list';
import { Text } from '~/components/ui/text';
import { db } from '~/db-module';
import { useProgramStore } from '~/entities/program/program.store';
import { createTaskProgressesForDay } from '~/entities/task/task.lib';
import { useCurrentUser } from '~/entities/user';

export default function Overview() {
    const [isLoading, setIsLoading] = useState(false);
    const { currentProgram } = useCurrentUser();
    const [selectedWeek, setSelectedWeek] = useState(1);
    const router = useRouter();
    const { setProgram, setCurrentDay } = useProgramStore();

    if (!currentProgram) {
        return null;
    }

    const handleNext = async () => {
        setIsLoading(true);

        const program = await db.program.update({
            where: { id: currentProgram.id },
            data: { startDate: new Date(), isActive: true },
        });

        await createTaskProgressesForDay(1);
        setProgram(program);
        setCurrentDay(1);
        setIsLoading(false);

        router.navigate('/(tabs)/home');
    };

    return (
        <SurveyLayout
            nextButtonDisabled={isLoading}
            nextButtonText={isLoading ? 'Creating program...' : 'Start program'}
            onNext={handleNext}
            title="Your next 10 weeks"
        >
            <Text className="mb-4 text-secondary-foreground">
                The program is personalised on your current lifestyle. Tap on a
                week for detailed routine.
            </Text>
            <ProgramOverviewCalendar onWeekSelect={setSelectedWeek} />
            <WeeklyTaskList week={selectedWeek} />
        </SurveyLayout>
    );
}
