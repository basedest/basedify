import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { useBadHabits } from '~/entities/task/task.hooks';
import { useSurveyStore } from '~/entities/survey';
import { SurveyLayout } from '~/components/survey/SurveyLayout';
import { HabitCard } from '~/components/survey/HabitCard';
import { useTranslation } from 'react-i18next';

export default function BadHabits() {
    const router = useRouter();
    const { badHabits: chosenBadHabits, setBadHabits } = useSurveyStore();
    const [selectedHabits, setSelectedHabits] =
        useState<number[]>(chosenBadHabits);
    const badHabits = useBadHabits();
    const { t } = useTranslation();

    const toggleHabit = (id: number) => {
        setSelectedHabits((prev) =>
            prev.includes(id)
                ? prev.filter((habitId) => habitId !== id)
                : [...prev, id],
        );
    };

    const handleNextStep = () => {
        setBadHabits(selectedHabits);
        router.push('/survey/customize');
    };

    return (
        <SurveyLayout
            title={t('survey.badHabits.stepTitle')}
            onNext={handleNextStep}
        >
            {badHabits.map((habit) => (
                <HabitCard
                    key={habit.id}
                    title={habit.name}
                    description={habit.description!}
                    isSelected={selectedHabits.includes(habit.id)}
                    onPress={() => toggleHabit(habit.id)}
                />
            ))}
        </SurveyLayout>
    );
}
