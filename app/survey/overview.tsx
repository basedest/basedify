import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ProgramOverviewCalendar } from '~/components/survey/calendar';
import { SurveyLayout } from '~/components/survey/SurveyLayout';
import { WeeklyTaskList } from '~/components/survey/weekly-task-list';
import { Text } from '~/components/ui/text';
import { db } from '~/db-module';
import { useProgramStore } from '~/entities/program/program.store';
import { createTaskProgressesForDay } from '~/entities/task/task.lib';
import { useCurrentUser } from '~/entities/user';

export default function Overview() {
    const { t } = useTranslation();
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
            nextButtonText={
                isLoading
                    ? t('survey.overview.loading')
                    : t('survey.overview.startButton')
            }
            onNext={handleNext}
            title={t('survey.overview.title')}
        >
            <Text className="mb-4 text-secondary-foreground">
                {t('survey.overview.subtitle')}
            </Text>
            <ProgramOverviewCalendar onWeekSelect={setSelectedWeek} />
            <WeeklyTaskList week={selectedWeek} />
        </SurveyLayout>
    );
}
