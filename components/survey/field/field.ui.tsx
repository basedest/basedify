import { useState } from 'react';
import { View } from 'react-native';
import { cn } from '~/lib/utils';
import { Text } from '~/components/ui/text';
import { minutesToDate } from '~/lib/utils/time';

type CommonFieldProps = {
    label: string;
    value?: number;
    onChange: (value: number) => void;
    className?: string;
};
