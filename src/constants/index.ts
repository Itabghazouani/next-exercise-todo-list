// bg-green-700
// bg-yellow-500
// bg-blue-500
// bg-orange-500
// bg-purple-500
// bg-pink-500
// bg-gray-500
// bg-red-800
// bg-red-700
// bg-red-600
// bg-red-400

export const CATEGORIES = [
  "Sport",
  "Travail",
  "Administratif",
  "Maison",
  "Hobbies",
  "Shopping",
  "Autre",
];


export const CATEGORY_COLORS: Record<string, string> = {
  Sport: "bg-green-700",
  Travail: "bg-yellow-500",
  Administratif: "bg-blue-500",
  Maison: "bg-orange-500",
  Hobbies: "bg-purple-500",
  Shopping: "bg-pink-500",
  Autre: "bg-gray-500",
};

export const PRIORITIES = [
  "Important - Urgent",
  "Important - Not Urgent",
  "Not Important - Urgent",
  "Not Important - Not Urgent",
]

export const PRIORITY_COLORS: Record<string, string> = {
  "Important - Urgent": "bg-red-800",
  "Important - Not Urgent": "bg-red-700",
  "Not Important - Urgent": "bg-red-600",
  "Not Important - Not Urgent": "bg-red-400",
}
