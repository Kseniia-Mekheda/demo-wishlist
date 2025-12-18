export const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  });
};