import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { useGoodHabits } from '~/entities/task/task.hooks';
import { useSurveyStore } from '~/entities/survey';
import { SurveyLayout } from '~/components/survey/SurveyLayout';
import { HabitCard } from '~/components/survey/HabitCard';
import { useTranslation } from 'react-i18next';

export default function GoodHabits() {
    const { t } = useTranslation();
    const { goodHabits: chosenGoodHabits, setGoodHabits } = useSurveyStore();
    const [selectedHabits, setSelectedHabits] =
        useState<number[]>(chosenGoodHabits);
    const router = useRouter();
    const goodHabits = useGoodHabits();

    const toggleHabit = (id: number) => {
        setSelectedHabits((prev) =>
            prev.includes(id)
                ? prev.filter((habitId) => habitId !== id)
                : [...prev, id],
        );
    };

    const handleNextStep = () => {
        setGoodHabits(selectedHabits);
        router.push('/survey/bad-habits');
    };

    return (
        <SurveyLayout
            title={t('survey.goodHabits.stepTitle')}
            onNext={handleNextStep}
        >
            {goodHabits.map((habit) => (
                <HabitCard
                    key={habit.id}
                    title={habit.name}
                    description={habit.description}
                    isSelected={selectedHabits.includes(habit.id)}
                    onPress={() => toggleHabit(habit.id)}
                />
            ))}
        </SurveyLayout>
    );
}
