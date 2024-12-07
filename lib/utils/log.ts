type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const COLORS = {
    debug: '\x1b[36m', // cyan
    info: '\x1b[32m', // green
    warn: '\x1b[33m', // yellow
    error: '\x1b[31m', // red
    reset: '\x1b[0m',
} as const;

const formatValue = (value: unknown): string => {
    if (typeof value === 'object' && value !== null) {
        return '\n' + JSON.stringify(value, null, 2);
    }
    return String(value);
};

class Logger {
    private log(level: LogLevel, ...args: unknown[]) {
        const color = COLORS[level];
        const timestamp = new Date().toISOString();
        const prefix = `${color}[${level.toUpperCase()}]${COLORS.reset} ${timestamp}:`;

        const formattedArgs = args.map(formatValue).join(' ');
        console[level](prefix, formattedArgs);
    }

    debug(...args: unknown[]) {
        this.log('debug', ...args);
    }

    info(...args: unknown[]) {
        this.log('info', ...args);
    }

    warn(...args: unknown[]) {
        this.log('warn', ...args);
    }

    error(...args: unknown[]) {
        this.log('error', ...args);
    }
}

export const logger = new Logger();
