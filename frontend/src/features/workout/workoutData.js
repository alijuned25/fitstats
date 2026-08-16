const workoutPlans = {
  3: [
    {
      day: 1,
      name: "Push",
      muscles: "Chest, Shoulders, Triceps",
      exercises: [
        {
          name: "Bench Press",
          sets: 4,
          reps: 8,
          rest: 90,
        },
        {
          name: "Incline Dumbbell Press",
          sets: 3,
          reps: 10,
          rest: 90,
        },
        {
          name: "Shoulder Press",
          sets: 3,
          reps: 10,
          rest: 90,
        },
        {
          name: "Tricep Pushdown",
          sets: 3,
          reps: 12,
          rest: 60,
        },
      ],
    },

    {
      day: 2,
      name: "Pull",
      muscles: "Back, Biceps",
      exercises: [
        {
          name: "Lat Pulldown",
          sets: 4,
          reps: 10,
          rest: 90,
        },
        {
          name: "Barbell Row",
          sets: 3,
          reps: 8,
          rest: 90,
        },
        {
          name: "Seated Cable Row",
          sets: 3,
          reps: 10,
          rest: 90,
        },
        {
          name: "Bicep Curl",
          sets: 3,
          reps: 12,
          rest: 60,
        },
      ],
    },

    {
      day: 3,
      name: "Legs",
      muscles: "Quadriceps, Hamstrings, Calves",
      exercises: [
        {
          name: "Squat",
          sets: 4,
          reps: 8,
          rest: 120,
        },
        {
          name: "Romanian Deadlift",
          sets: 3,
          reps: 10,
          rest: 120,
        },
        {
          name: "Leg Press",
          sets: 3,
          reps: 12,
          rest: 90,
        },
        {
          name: "Calf Raises",
          sets: 4,
          reps: 15,
          rest: 60,
        },
      ],
    },
  ],

  4: [
    {
      day: 1,
      name: "Upper Body",
      muscles: "Chest, Back, Shoulders, Arms",
      exercises: [
        {
          name: "Bench Press",
          sets: 4,
          reps: 8,
          rest: 90,
        },
        {
          name: "Lat Pulldown",
          sets: 4,
          reps: 10,
          rest: 90,
        },
        {
          name: "Shoulder Press",
          sets: 3,
          reps: 10,
          rest: 90,
        },
        {
          name: "Bicep Curl",
          sets: 3,
          reps: 12,
          rest: 60,
        },
      ],
    },

    {
      day: 2,
      name: "Lower Body",
      muscles: "Quadriceps, Hamstrings, Calves",
      exercises: [
        {
          name: "Squat",
          sets: 4,
          reps: 8,
          rest: 120,
        },
        {
          name: "Romanian Deadlift",
          sets: 3,
          reps: 10,
          rest: 120,
        },
        {
          name: "Leg Press",
          sets: 3,
          reps: 12,
          rest: 90,
        },
        {
          name: "Calf Raises",
          sets: 4,
          reps: 15,
          rest: 60,
        },
      ],
    },

    {
      day: 3,
      name: "Upper Body",
      muscles: "Chest, Back, Shoulders, Arms",
      exercises: [
        {
          name: "Incline Dumbbell Press",
          sets: 3,
          reps: 10,
          rest: 90,
        },
        {
          name: "Seated Cable Row",
          sets: 3,
          reps: 10,
          rest: 90,
        },
        {
          name: "Lateral Raises",
          sets: 3,
          reps: 15,
          rest: 60,
        },
        {
          name: "Tricep Pushdown",
          sets: 3,
          reps: 12,
          rest: 60,
        },
      ],
    },

    {
      day: 4,
      name: "Lower Body",
      muscles: "Legs, Glutes, Calves",
      exercises: [
        {
          name: "Front Squat",
          sets: 3,
          reps: 8,
          rest: 120,
        },
        {
          name: "Leg Curl",
          sets: 3,
          reps: 12,
          rest: 90,
        },
        {
          name: "Walking Lunges",
          sets: 3,
          reps: 12,
          rest: 90,
        },
        {
          name: "Calf Raises",
          sets: 4,
          reps: 15,
          rest: 60,
        },
      ],
    },
  ],

  5: [
    {
      day: 1,
      name: "Chest",
      muscles: "Chest, Triceps",
      exercises: [
        {
          name: "Bench Press",
          sets: 4,
          reps: 8,
          rest: 90,
        },
        {
          name: "Incline Dumbbell Press",
          sets: 3,
          reps: 10,
          rest: 90,
        },
        {
          name: "Cable Fly",
          sets: 3,
          reps: 12,
          rest: 60,
        },
      ],
    },

    {
      day: 2,
      name: "Back",
      muscles: "Back, Biceps",
      exercises: [
        {
          name: "Deadlift",
          sets: 3,
          reps: 5,
          rest: 180,
        },
        {
          name: "Lat Pulldown",
          sets: 3,
          reps: 10,
          rest: 90,
        },
        {
          name: "Barbell Row",
          sets: 3,
          reps: 8,
          rest: 120,
        },
      ],
    },

    {
      day: 3,
      name: "Legs",
      muscles: "Quadriceps, Hamstrings, Calves",
      exercises: [
        {
          name: "Squat",
          sets: 4,
          reps: 8,
          rest: 120,
        },
        {
          name: "Romanian Deadlift",
          sets: 3,
          reps: 10,
          rest: 120,
        },
        {
          name: "Leg Press",
          sets: 3,
          reps: 12,
          rest: 90,
        },
      ],
    },

    {
      day: 4,
      name: "Shoulders",
      muscles: "Shoulders, Traps",
      exercises: [
        {
          name: "Overhead Press",
          sets: 4,
          reps: 8,
          rest: 120,
        },
        {
          name: "Lateral Raises",
          sets: 3,
          reps: 15,
          rest: 60,
        },
        {
          name: "Rear Delt Fly",
          sets: 3,
          reps: 15,
          rest: 60,
        },
      ],
    },

    {
      day: 5,
      name: "Arms",
      muscles: "Biceps, Triceps",
      exercises: [
        {
          name: "Bicep Curl",
          sets: 3,
          reps: 12,
          rest: 60,
        },
        {
          name: "Hammer Curl",
          sets: 3,
          reps: 12,
          rest: 60,
        },
        {
          name: "Tricep Pushdown",
          sets: 3,
          reps: 12,
          rest: 60,
        },
      ],
    },
  ],

  6: [
    {
      day: 1,
      name: "Push",
      muscles: "Chest, Shoulders, Triceps",
      exercises: [
        {
          name: "Bench Press",
          sets: 4,
          reps: 8,
          rest: 90,
        },
        {
          name: "Shoulder Press",
          sets: 3,
          reps: 10,
          rest: 90,
        },
        {
          name: "Tricep Pushdown",
          sets: 3,
          reps: 12,
          rest: 60,
        },
      ],
    },

    {
      day: 2,
      name: "Pull",
      muscles: "Back, Biceps",
      exercises: [
        {
          name: "Deadlift",
          sets: 3,
          reps: 5,
          rest: 180,
        },
        {
          name: "Lat Pulldown",
          sets: 3,
          reps: 10,
          rest: 90,
        },
        {
          name: "Bicep Curl",
          sets: 3,
          reps: 12,
          rest: 60,
        },
      ],
    },

    {
      day: 3,
      name: "Legs",
      muscles: "Quadriceps, Hamstrings, Calves",
      exercises: [
        {
          name: "Squat",
          sets: 4,
          reps: 8,
          rest: 120,
        },
        {
          name: "Leg Press",
          sets: 3,
          reps: 12,
          rest: 90,
        },
        {
          name: "Calf Raises",
          sets: 4,
          reps: 15,
          rest: 60,
        },
      ],
    },

    {
      day: 4,
      name: "Push",
      muscles: "Chest, Shoulders, Triceps",
      exercises: [
        {
          name: "Incline Dumbbell Press",
          sets: 3,
          reps: 10,
          rest: 90,
        },
        {
          name: "Lateral Raises",
          sets: 3,
          reps: 15,
          rest: 60,
        },
        {
          name: "Tricep Extension",
          sets: 3,
          reps: 12,
          rest: 60,
        },
      ],
    },

    {
      day: 5,
      name: "Pull",
      muscles: "Back, Biceps",
      exercises: [
        {
          name: "Barbell Row",
          sets: 3,
          reps: 8,
          rest: 120,
        },
        {
          name: "Seated Cable Row",
          sets: 3,
          reps: 10,
          rest: 90,
        },
        {
          name: "Hammer Curl",
          sets: 3,
          reps: 12,
          rest: 60,
        },
      ],
    },

    {
      day: 6,
      name: "Legs",
      muscles: "Quadriceps, Hamstrings, Calves",
      exercises: [
        {
          name: "Front Squat",
          sets: 3,
          reps: 8,
          rest: 120,
        },
        {
          name: "Leg Curl",
          sets: 3,
          reps: 12,
          rest: 90,
        },
        {
          name: "Calf Raises",
          sets: 4,
          reps: 15,
          rest: 60,
        },
      ],
    },
  ],
};

export default workoutPlans;