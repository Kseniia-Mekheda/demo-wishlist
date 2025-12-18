import type { WishCardProps } from "~/types/common/interfaces";
import { formatDate } from "~/utilities/format-date";
import { IMAGE_PLACEHOLDER } from '~/constants/const';
import ActionButtons from "~/components/ActionButtons/ActionButtons";

const WishCard = ({ wish, onDetails }: WishCardProps) => {
  const { id, imageUrl, title, description, price, lastUpdated } = wish; 
  return (
    <div className="group w-full max-w-sm bg-slate-50 rounded-2xl p-3 transition-all duration-300 border-t border-l border-r border-black border-b-5">
      <div className="relative h-52 w-full overflow-hidden rounded-[20px]">
        <img
          src={imageUrl || IMAGE_PLACEHOLDER}
          alt={title}
          className="h-full w-full object-cover border"
          onError={(e) => {
            (e.target as HTMLImageElement).src = IMAGE_PLACEHOLDER;
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="mt-4 px-2">
        <p className="text-xs text-slate-400 mt-2">
          {lastUpdated
            ? ` Updated: ${formatDate(lastUpdated)}`
            : ` Added: ${formatDate(wish.dateAdded)}`}
        </p>

        <div className="flex justify-between items-start mb-2">
          <h3
            className="text-xl font-bold text-[#1C1E87] truncate pr-2"
            title={title}
          >
            {title}
          </h3>
          <span className="shrink-0 text-lg font-bold text-[#1C1E87]">
            ${price}
          </span>
        </div>

        <p className="text-sm text-slate-500 line-clamp-2 h-10 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-5 flex gap-3 px-2 pb-2">
        <button
          onClick={() => onDetails(id)}
          className="
          flex-1 flex items-center justify-center gap-2 border 
          bg-[#D4D4FA] py-2.5 px-4 rounded-3xl text-md active:scale-95
          hover:bg-[#1C1E87] hover:text-white transition-all
          "
        >
          View details
        </button>

        <ActionButtons
          wish={wish}
          variant="card"
        />
      </div>
    </div>
  );
}

export default WishCard;