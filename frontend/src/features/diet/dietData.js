const dietData = {
  vegetarian: {
    breakfast: [
      {
        id: "veg-breakfast-1",
        name: "Oats with Milk and Banana",
        calories: 380,
        protein: 15,
        carbs: 58,
        fat: 10,
        ingredients:
          "Oats, milk, banana, almonds",
        preparationTime: 10,
      },

      {
        id: "veg-breakfast-2",
        name: "Paneer Sandwich",
        calories: 420,
        protein: 22,
        carbs: 42,
        fat: 18,
        ingredients:
          "Paneer, whole wheat bread, vegetables",
        preparationTime: 15,
      },

      {
        id: "veg-breakfast-3",
        name: "Vegetable Poha",
        calories: 320,
        protein: 8,
        carbs: 52,
        fat: 9,
        ingredients:
          "Poha, onion, peas, peanuts, vegetables",
        preparationTime: 15,
      },

      {
        id: "veg-breakfast-4",
        name: "Moong Dal Chilla",
        calories: 350,
        protein: 18,
        carbs: 45,
        fat: 10,
        ingredients:
          "Moong dal, vegetables, spices",
        preparationTime: 20,
      },
    ],


    lunch: [
      {
        id: "veg-lunch-1",
        name: "Dal, Rice and Mixed Vegetables",
        calories: 550,
        protein: 20,
        carbs: 82,
        fat: 14,
        ingredients:
          "Dal, rice, mixed vegetables, salad",
        preparationTime: 30,
      },

      {
        id: "veg-lunch-2",
        name: "Paneer Roti Bowl",
        calories: 600,
        protein: 28,
        carbs: 68,
        fat: 22,
        ingredients:
          "Paneer, roti, vegetables, curd",
        preparationTime: 25,
      },

      {
        id: "veg-lunch-3",
        name: "Rajma Rice",
        calories: 570,
        protein: 22,
        carbs: 88,
        fat: 11,
        ingredients:
          "Rajma, rice, onion, tomato, spices",
        preparationTime: 35,
      },

      {
        id: "veg-lunch-4",
        name: "Chickpea Roti Bowl",
        calories: 520,
        protein: 20,
        carbs: 75,
        fat: 13,
        ingredients:
          "Chickpeas, roti, vegetables, curd",
        preparationTime: 25,
      },
    ],


    snack: [
      {
        id: "veg-snack-1",
        name: "Greek Yogurt with Fruit",
        calories: 220,
        protein: 15,
        carbs: 28,
        fat: 5,
        ingredients:
          "Greek yogurt, seasonal fruit",
        preparationTime: 5,
      },

      {
        id: "veg-snack-2",
        name: "Roasted Chana",
        calories: 180,
        protein: 9,
        carbs: 27,
        fat: 4,
        ingredients:
          "Roasted chickpeas, spices",
        preparationTime: 2,
      },

      {
        id: "veg-snack-3",
        name: "Peanut Banana Smoothie",
        calories: 300,
        protein: 12,
        carbs: 40,
        fat: 11,
        ingredients:
          "Banana, milk, peanut butter",
        preparationTime: 5,
      },

      {
        id: "veg-snack-4",
        name: "Fruit and Nuts",
        calories: 250,
        protein: 6,
        carbs: 30,
        fat: 12,
        ingredients:
          "Apple, banana, almonds, walnuts",
        preparationTime: 5,
      },
    ],


    dinner: [
      {
        id: "veg-dinner-1",
        name: "Paneer with Roti and Vegetables",
        calories: 520,
        protein: 28,
        carbs: 55,
        fat: 20,
        ingredients:
          "Paneer, roti, mixed vegetables",
        preparationTime: 25,
      },

      {
        id: "veg-dinner-2",
        name: "Dal Khichdi with Curd",
        calories: 480,
        protein: 18,
        carbs: 72,
        fat: 10,
        ingredients:
          "Rice, dal, vegetables, curd",
        preparationTime: 30,
      },

      {
        id: "veg-dinner-3",
        name: "Tofu Stir Fry with Rice",
        calories: 540,
        protein: 25,
        carbs: 65,
        fat: 17,
        ingredients:
          "Tofu, rice, vegetables, soy sauce",
        preparationTime: 25,
      },

      {
        id: "veg-dinner-4",
        name: "Vegetable Pulao with Paneer",
        calories: 560,
        protein: 24,
        carbs: 70,
        fat: 18,
        ingredients:
          "Rice, paneer, vegetables, spices",
        preparationTime: 30,
      },
    ],
  },


  nonVegetarian: {
    breakfast: [
      {
        id: "nonveg-breakfast-1",
        name: "Egg Omelette with Toast",
        calories: 400,
        protein: 27,
        carbs: 35,
        fat: 17,
        ingredients:
          "Eggs, whole wheat bread, vegetables",
        preparationTime: 15,
      },

      {
        id: "nonveg-breakfast-2",
        name: "Egg and Oats Bowl",
        calories: 430,
        protein: 30,
        carbs: 45,
        fat: 14,
        ingredients:
          "Eggs, oats, vegetables, milk",
        preparationTime: 15,
      },

      {
        id: "nonveg-breakfast-3",
        name: "Chicken Sandwich",
        calories: 450,
        protein: 32,
        carbs: 42,
        fat: 16,
        ingredients:
          "Chicken, whole wheat bread, vegetables",
        preparationTime: 20,
      },

      {
        id: "nonveg-breakfast-4",
        name: "Egg Bhurji with Roti",
        calories: 420,
        protein: 25,
        carbs: 45,
        fat: 15,
        ingredients:
          "Eggs, roti, onion, tomato, spices",
        preparationTime: 20,
      },
    ],


    lunch: [
      {
        id: "nonveg-lunch-1",
        name: "Chicken Rice Bowl",
        calories: 600,
        protein: 42,
        carbs: 72,
        fat: 16,
        ingredients:
          "Chicken breast, rice, vegetables",
        preparationTime: 30,
      },

      {
        id: "nonveg-lunch-2",
        name: "Chicken Roti with Vegetables",
        calories: 580,
        protein: 40,
        carbs: 58,
        fat: 18,
        ingredients:
          "Chicken, roti, vegetables, curd",
        preparationTime: 30,
      },

      {
        id: "nonveg-lunch-3",
        name: "Chicken Pulao",
        calories: 620,
        protein: 40,
        carbs: 78,
        fat: 17,
        ingredients:
          "Chicken, rice, vegetables, spices",
        preparationTime: 35,
      },

      {
        id: "nonveg-lunch-4",
        name: "Chicken Wrap",
        calories: 540,
        protein: 38,
        carbs: 52,
        fat: 17,
        ingredients:
          "Chicken, whole wheat wrap, vegetables",
        preparationTime: 20,
      },
    ],


    snack: [
      {
        id: "nonveg-snack-1",
        name: "Boiled Eggs with Fruit",
        calories: 220,
        protein: 14,
        carbs: 18,
        fat: 9,
        ingredients:
          "Boiled eggs, seasonal fruit",
        preparationTime: 10,
      },

      {
        id: "nonveg-snack-2",
        name: "Greek Yogurt with Fruit",
        calories: 220,
        protein: 15,
        carbs: 28,
        fat: 5,
        ingredients:
          "Greek yogurt, seasonal fruit",
        preparationTime: 5,
      },

      {
        id: "nonveg-snack-3",
        name: "Chicken Salad",
        calories: 280,
        protein: 30,
        carbs: 15,
        fat: 10,
        ingredients:
          "Chicken, lettuce, cucumber, tomato",
        preparationTime: 10,
      },

      {
        id: "nonveg-snack-4",
        name: "Egg and Fruit Snack",
        calories: 250,
        protein: 14,
        carbs: 25,
        fat: 10,
        ingredients:
          "Boiled eggs, apple, banana",
        preparationTime: 10,
      },
    ],


    dinner: [
      {
        id: "nonveg-dinner-1",
        name: "Grilled Chicken with Roti",
        calories: 550,
        protein: 45,
        carbs: 48,
        fat: 18,
        ingredients:
          "Grilled chicken, roti, vegetables",
        preparationTime: 30,
      },

      {
        id: "nonveg-dinner-2",
        name: "Chicken and Vegetable Rice",
        calories: 580,
        protein: 40,
        carbs: 65,
        fat: 16,
        ingredients:
          "Chicken, rice, mixed vegetables",
        preparationTime: 30,
      },

      {
        id: "nonveg-dinner-3",
        name: "Chicken Curry with Roti",
        calories: 600,
        protein: 42,
        carbs: 55,
        fat: 22,
        ingredients:
          "Chicken, roti, tomato, onion, spices",
        preparationTime: 35,
      },

      {
        id: "nonveg-dinner-4",
        name: "Chicken Stir Fry with Rice",
        calories: 590,
        protein: 43,
        carbs: 62,
        fat: 17,
        ingredients:
          "Chicken, rice, vegetables, spices",
        preparationTime: 25,
      },
    ],
  },
};

export default dietData;