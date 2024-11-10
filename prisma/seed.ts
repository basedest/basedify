import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const taskOptions = [
    {
      name: 'Wake up early',
      goalType: 'time',
      defaultDays: 7,
      defaultGoal: 420, // 7:00 AM
      description: 'Start your day early to boost productivity',
      category: 'lifestyle'
    },
    {
      name: 'Hit the gym',
      goalType: 'do',
      defaultDays: 3,
      description: 'Regular exercise for better health',
      category: 'fitness'
    },
    {
      name: 'Limit social media',
      goalType: 'duration',
      defaultDays: 7,
      defaultGoal: 60, // 60 minutes per day
      description: 'Reduce time spent on social media',
      category: 'digital wellness'
    },
    {
      name: 'Quit smoking',
      goalType: 'dont',
      defaultDays: 7,
      description: 'Stop smoking for better health',
      category: 'health'
    },
    {
      name: 'Drink water',
      goalType: 'measurable',
      defaultDays: 7,
      defaultGoal: 2.0, // 2 liters per day
      description: 'Stay hydrated throughout the day',
      category: 'health'
    },
    {
      name: 'Take cold shower',
      goalType: 'do',
      defaultDays: 5,
      description: 'Build mental strength with cold exposure',
      category: 'lifestyle'
    }
  ];

  for (const taskOption of taskOptions) {
    await prisma.taskOption.create({
      data: taskOption
    });
  }

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
