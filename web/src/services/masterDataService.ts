import IDropdownList from "../interfaces/IDropdownList";

const mockData = [
  { id: 1, name: "Farming" },
  { id: 2, name: "Biology" },
  { id: 3, name: "Boundaries" },
  { id: 4, name: "Gaming" },
  { id: 5, name: "Economy" },
  { id: 6, name: "Elevation" },
  { id: 7, name: "Environment" },
  { id: 8, name: "Finance" },
  { id: 9, name: "Chemistry" },
  { id: 10, name: "Engineering" },
  { id: 11, name: "Health" },
  { id: 12, name: "Society & Social" },
  { id: 13, name: "Space" },
  { id: 14, name: "Information Techonology" },
  { id: 15, name: "Travel" },
  { id: 16, name: "Music" },
  { id: 17, name: "Other" },
  { id: 18, name: "Disaster" },
  { id: 19, name: "Sports" },
  { id: 20, name: "Business" },
  { id: 21, name: "Investment" },
  { id: 22, name: "Movie" },
];

const getCategories = async (): Promise<IDropdownList[]> => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData);
    }, 3000);
  });
};

export default {
  getCategories,
};
