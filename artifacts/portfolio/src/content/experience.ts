export interface Company {
  id: string;
  name: string;
  logo: string;
  position?: string;
  startDate?: string;
  endDate?: string;
}

export const companies: Company[] = [
  {
    id: "1",
    name: "Studio XYZ",
    logo: "https://via.placeholder.com/120x60/6366f1/ffffff?text=Studio+XYZ",
    position: "Senior 3D Designer",
    startDate: "2022",
    endDate: "Present",
  },
  {
    id: "2",
    name: "Creative Labs",
    logo: "https://via.placeholder.com/120x60/8b5cf6/ffffff?text=Creative+Labs",
    position: "3D Artist",
    startDate: "2021",
    endDate: "2022",
  },
  {
    id: "3",
    name: "Digital Agency",
    logo: "https://via.placeholder.com/120x60/06b6d4/ffffff?text=Digital+Agency",
    position: "Motion Graphics Designer",
    startDate: "2020",
    endDate: "2021",
  },
  {
    id: "4",
    name: "Game Studios",
    logo: "https://via.placeholder.com/120x60/ec4899/ffffff?text=Game+Studios",
    position: "Character Artist",
    startDate: "2019",
    endDate: "2020",
  },
  {
    id: "5",
    name: "Animation House",
    logo: "https://via.placeholder.com/120x60/f59e0b/ffffff?text=Animation",
    position: "Junior Animator",
    startDate: "2018",
    endDate: "2019",
  },
];
