import SelectFilter from '~/components/SelectFilter/SelectFilter'; 
import type { WishFilterProps } from "~/types/common/interfaces";
import { FILTERS } from '~/constants/const';

const WishFilters = ({ 
  dateFilter, 
  priceFilter, 
  onDateFilterChange, 
  onPriceFilterChange 
}: WishFilterProps) => {
  return (
    <div>
      <SelectFilter
        label={FILTERS.byDate.label}
        value={dateFilter}
        options={FILTERS.byDate.options}
        onChange={onDateFilterChange}
      />
      <SelectFilter
        label={FILTERS.byPrice.label}
        value={priceFilter}
        options={FILTERS.byPrice.options}
        onChange={onPriceFilterChange}
      />
    </div>
  );
};

export default WishFilters;