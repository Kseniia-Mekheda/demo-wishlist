export const buildSortParams = (dateFilter: string, priceFilter: string): string => {
  const params = new URLSearchParams();

  const dateSort = dateFilter === "newest" ? "-dateAdded" : "dateAdded";
  const priceSort = priceFilter === "highToLow" ? "-price" : "price";

  params.set("_sort", `${dateSort},${priceSort}`);

  return params.toString();
};