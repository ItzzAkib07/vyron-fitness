export const scheduleDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export const scheduleClasses = {
  MON: [
    { id: "mon-1", time: "06:00 AM", title: "Tactical CrossFit Alpha", trainer: "Jaxson Reed", category: "CrossFit", duration: "60 min", room: "Arena Rig A", spotsLeft: 4, difficulty: "Advanced", intensity: "High" },
    { id: "mon-2", time: "07:30 AM", title: "Hypertrophy Wave Squats", trainer: "Marcus Vance", category: "Strength", duration: "75 min", room: "Barbell Lab", spotsLeft: 2, difficulty: "Intermediate", intensity: "High" },
    { id: "mon-3", time: "09:00 AM", title: "Metabolic Ignite 900", trainer: "Elena Rostova", category: "HIIT", duration: "45 min", room: "Ignite Studio", spotsLeft: 6, difficulty: "All Levels", intensity: "Extreme" },
    { id: "mon-4", time: "11:00 AM", title: "Spine & Hip Decompression", trainer: "Kai Chen", category: "Mobility", duration: "50 min", room: "Zen Studio", spotsLeft: 8, difficulty: "All Levels", intensity: "Low" },
    { id: "mon-5", time: "05:30 PM", title: "Apex Heavy Bag Striking", trainer: "Tyson Morales", category: "Boxing", duration: "60 min", room: "Combat Ring", spotsLeft: 3, difficulty: "Intermediate", intensity: "High" },
    { id: "mon-6", time: "07:00 PM", title: "Neuro-Flow Vinyasa", trainer: "Maya Lin", category: "Yoga", duration: "60 min", room: "Zen Studio", spotsLeft: 7, difficulty: "All Levels", intensity: "Medium" }
  ],
  TUE: [
    { id: "tue-1", time: "06:30 AM", title: "Metabolic Ignite 900", trainer: "Elena Rostova", category: "HIIT", duration: "45 min", room: "Ignite Studio", spotsLeft: 5, difficulty: "All Levels", intensity: "Extreme" },
    { id: "tue-2", time: "08:00 AM", title: "Neuro-Flow Vinyasa", trainer: "Maya Lin", category: "Yoga", duration: "60 min", room: "Zen Studio", spotsLeft: 6, difficulty: "All Levels", intensity: "Medium" },
    { id: "tue-3", time: "12:00 PM", title: "Core & Rotational Power", trainer: "Kai Chen", category: "Functional", duration: "45 min", room: "Turf Zone", spotsLeft: 9, difficulty: "All Levels", intensity: "Medium" },
    { id: "tue-4", time: "05:30 PM", title: "Olympic Snatch Workshop", trainer: "Jaxson Reed", category: "CrossFit", duration: "60 min", room: "Barbell Lab", spotsLeft: 1, difficulty: "Advanced", intensity: "High" },
    { id: "tue-5", time: "07:00 PM", title: "Heavy Bag Strike Rounds", trainer: "Tyson Morales", category: "Boxing", duration: "60 min", room: "Combat Ring", spotsLeft: 4, difficulty: "Intermediate", intensity: "High" }
  ],
  WED: [
    { id: "wed-1", time: "06:00 AM", title: "CrossFit Endurance Grind", trainer: "Jaxson Reed", category: "CrossFit", duration: "60 min", room: "Arena Rig A", spotsLeft: 5, difficulty: "Advanced", intensity: "High" },
    { id: "wed-2", time: "07:30 AM", title: "Cardio Sled & Plyo Circuit", trainer: "Elena Rostova", category: "HIIT", duration: "50 min", room: "Turf Zone", spotsLeft: 7, difficulty: "All Levels", intensity: "Extreme" },
    { id: "wed-3", time: "11:00 AM", title: "Functional Multi-Planar Flow", trainer: "Kai Chen", category: "Mobility", duration: "50 min", room: "Zen Studio", spotsLeft: 10, difficulty: "All Levels", intensity: "Low" },
    { id: "wed-4", time: "06:00 PM", title: "Max Effort Bench & Press", trainer: "Marcus Vance", category: "Strength", duration: "75 min", room: "Barbell Lab", spotsLeft: 2, difficulty: "Intermediate", intensity: "High" },
    { id: "wed-5", time: "07:30 PM", title: "Restorative Yin & Breath", trainer: "Maya Lin", category: "Yoga", duration: "60 min", room: "Zen Studio", spotsLeft: 8, difficulty: "All Levels", intensity: "Low" }
  ],
  THU: [
    { id: "thu-1", time: "07:00 AM", title: "Cardio Sled & Plyo Circuit", trainer: "Elena Rostova", category: "HIIT", duration: "45 min", room: "Turf Zone", spotsLeft: 4, difficulty: "All Levels", intensity: "High" },
    { id: "thu-2", time: "08:00 AM", title: "Deep Fascial Release & Yin", trainer: "Maya Lin", category: "Yoga", duration: "60 min", room: "Zen Studio", spotsLeft: 7, difficulty: "All Levels", intensity: "Low" },
    { id: "thu-3", time: "05:00 PM", title: "Athletic Speed & Acceleration", trainer: "Marcus Vance", category: "Strength", duration: "60 min", room: "Turf Zone", spotsLeft: 3, difficulty: "Advanced", intensity: "Extreme" },
    { id: "thu-4", time: "06:00 PM", title: "Gymnastics Kip & Ring Flow", trainer: "Jaxson Reed", category: "CrossFit", duration: "60 min", room: "Arena Rig A", spotsLeft: 2, difficulty: "Advanced", intensity: "High" },
    { id: "thu-5", time: "07:30 PM", title: "Pugilism Footwork & Mitts", trainer: "Tyson Morales", category: "Boxing", duration: "60 min", room: "Combat Ring", spotsLeft: 5, difficulty: "All Levels", intensity: "Medium" }
  ],
  FRI: [
    { id: "fri-1", time: "06:00 AM", title: "Friday Barbell Club", trainer: "Jaxson Reed", category: "CrossFit", duration: "60 min", room: "Barbell Lab", spotsLeft: 3, difficulty: "Intermediate", intensity: "High" },
    { id: "fri-2", time: "08:00 AM", title: "Deadlift Mechanics & Chains", trainer: "Marcus Vance", category: "Strength", duration: "75 min", room: "Barbell Lab", spotsLeft: 1, difficulty: "Advanced", intensity: "High" },
    { id: "fri-3", time: "04:30 PM", title: "Rotational Power & Macebell", trainer: "Kai Chen", category: "Functional", duration: "50 min", room: "Turf Zone", spotsLeft: 6, difficulty: "All Levels", intensity: "Medium" },
    { id: "fri-4", time: "06:00 PM", title: "Weekend Kickoff HIIT Beat", trainer: "Elena Rostova", category: "HIIT", duration: "50 min", room: "Ignite Studio", spotsLeft: 2, difficulty: "All Levels", intensity: "Extreme" }
  ],
  SAT: [
    { id: "sat-1", time: "09:00 AM", title: "Community Team WOD", trainer: "Jaxson Reed", category: "CrossFit", duration: "75 min", room: "Arena Main Floor", spotsLeft: 12, difficulty: "All Levels", intensity: "High" },
    { id: "sat-2", time: "10:00 AM", title: "Open Barbell & Biomechanics Clinic", trainer: "Marcus Vance", category: "Strength", duration: "90 min", room: "Barbell Lab", spotsLeft: 4, difficulty: "All Levels", intensity: "Medium" },
    { id: "sat-3", time: "11:30 AM", title: "Fight Conditioning Championship", trainer: "Tyson Morales", category: "Boxing", duration: "60 min", room: "Combat Ring", spotsLeft: 5, difficulty: "Intermediate", intensity: "Extreme" },
    { id: "sat-4", time: "04:00 PM", title: "Infrared Sauna & Breath Reset", trainer: "Maya Lin", category: "Yoga", duration: "60 min", room: "Recovery Suite", spotsLeft: 6, difficulty: "All Levels", intensity: "Low" }
  ],
  SUN: [
    { id: "sun-1", time: "09:00 AM", title: "Sunday Calorie Crusher", trainer: "Elena Rostova", category: "HIIT", duration: "50 min", room: "Ignite Studio", spotsLeft: 8, difficulty: "All Levels", intensity: "High" },
    { id: "sun-2", time: "10:30 AM", title: "Breathwork & Sound Immersion", trainer: "Maya Lin", category: "Yoga", duration: "75 min", room: "Zen Studio", spotsLeft: 9, difficulty: "All Levels", intensity: "Low" },
    { id: "sun-3", time: "12:00 PM", title: "Joint Longevity & Recovery CARs", trainer: "Kai Chen", category: "Mobility", duration: "60 min", room: "Zen Studio", spotsLeft: 7, difficulty: "All Levels", intensity: "Low" },
    { id: "sun-4", time: "05:00 PM", title: "Open Lifting & Form Audits", trainer: "Marcus Vance", category: "Strength", duration: "90 min", room: "Barbell Lab", spotsLeft: 6, difficulty: "All Levels", intensity: "Medium" }
  ]
};
