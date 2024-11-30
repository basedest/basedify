import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data
const totalDays = 70; // 10 weeks * 7 days
const mockTasks: Task[] = [
    {
        id: '1',
        name: 'Morning Meditation',
        description: 'Start your day with a 10-minute meditation',
        streak: 5,
        repeatSchedule: 'every day',
        status: 'todo',
    },
    {
        id: '2',
        name: 'Read a Book',
        description: 'Read for 30 minutes',
        streak: 3,
        repeatSchedule: '5 times a week',
        status: 'done',
    },
    {
        id: '3',
        name: 'Evening Workout',
        description: '30-minute strength training',
        streak: 0,
        repeatSchedule: 'every 2 days',
        status: 'skipped',
    },
];

type Task = {
    id: string;
    name: string;
    description: string;
    streak: number;
    repeatSchedule: string;
    status: 'todo' | 'done' | 'skipped';
};

type DayNavigationProps = {
    currentDay: number;
    setCurrentDay: React.Dispatch<React.SetStateAction<number>>;
};

const DayNavigation: React.FC<DayNavigationProps> = ({
    currentDay,
    setCurrentDay,
}) => (
    <View className="mb-4 flex-row items-center justify-between">
        <TouchableOpacity
            onPress={() => setCurrentDay((prev) => Math.max(1, prev - 1))}
        >
            <ChevronLeftIcon color="black" size={24} />
        </TouchableOpacity>
        <Text className="text-lg font-bold">
            Day {currentDay}/{totalDays}
        </Text>
        <TouchableOpacity
            onPress={() =>
                setCurrentDay((prev) => Math.min(totalDays, prev + 1))
            }
        >
            <ChevronRightIcon color="black" size={24} />
        </TouchableOpacity>
    </View>
);

type SegmentedControlProps = {
    activeFilter: string;
    setActiveFilter: React.Dispatch<React.SetStateAction<string>>;
};

const SegmentedControl: React.FC<SegmentedControlProps> = ({
    activeFilter,
    setActiveFilter,
}) => (
    <View className="mb-4 flex-row justify-around">
        {['To-dos', 'Done', 'Skipped'].map((filter) => (
            <TouchableOpacity
                key={filter}
                onPress={() => setActiveFilter(filter.toLowerCase())}
                className={`rounded-full px-4 py-2 ${activeFilter === filter.toLowerCase() ? 'bg-blue-500' : 'bg-gray-200'}`}
            >
                <Text
                    className={`${activeFilter === filter.toLowerCase() ? 'text-white' : 'text-black'}`}
                >
                    {filter}
                </Text>
            </TouchableOpacity>
        ))}
    </View>
);

type TaskItemProps = {
    task: Task;
};

const TaskItem: React.FC<TaskItemProps> = ({ task }) => (
    <View className="mb-2 rounded-lg bg-white p-4 shadow">
        <Text className="text-lg font-bold">{task.name}</Text>
        <Text className="mb-2 text-gray-600">{task.description}</Text>
        <View className="flex-row justify-between">
            <Text>Streak: {task.streak}</Text>
            <Text>{task.repeatSchedule}</Text>
        </View>
        <View className="mt-2 flex-row justify-end">
            <TouchableOpacity className="mr-2 rounded bg-yellow-500 px-4 py-2">
                <Text className="text-white">Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity className="rounded bg-green-500 px-4 py-2">
                <Text className="text-white">Complete</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const HomeScreen: React.FC = () => {
    const [currentDay, setCurrentDay] = useState<number>(1);
    const [activeFilter, setActiveFilter] = useState<string>('todo');

    const filteredTasks = mockTasks.filter(
        (task) => task.status === activeFilter,
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            <View className="p-4">
                <DayNavigation
                    currentDay={currentDay}
                    setCurrentDay={setCurrentDay}
                />
                <SegmentedControl
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                />
                <FlatList
                    data={filteredTasks}
                    renderItem={({ item }) => <TaskItem task={item} />}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
