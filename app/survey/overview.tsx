import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Calendar } from '~/components/survey/calendar';
import { SurveyLayout } from '~/components/survey/SurveyLayout';
import { WeeklyTaskList } from '~/components/survey/weekly-task-list';
import { Text } from '~/components/ui/text';
import { db } from '~/db-module';
import { useCurrentUser } from '~/entities/user';

export default function Overview() {
    const { currentProgram } = useCurrentUser();
    const [selectedWeek, setSelectedWeek] = useState(1);
    const router = useRouter();

    if (!currentProgram) {
        return null;
    }

    const handleNext = async () => {
        await db.program.update({
            where: { id: currentProgram.id },
            data: { startDate: new Date(), isActive: true },
        });
        router.navigate('/(tabs)');
    };

    return (
        <SurveyLayout
            nextButtonText="Start program"
            onNext={handleNext}
            title="Your next 10 weeks"
        >
            <Text className="mb-4 text-secondary-foreground">
                The program is personalised on your current lifestyle. Tap on a
                week for detailed routine.
            </Text>
            <Calendar onWeekSelect={setSelectedWeek} />
            <WeeklyTaskList week={selectedWeek} />
        </SurveyLayout>
    );
}
