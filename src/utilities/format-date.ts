export const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  });
};

export const getDateOnly = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};