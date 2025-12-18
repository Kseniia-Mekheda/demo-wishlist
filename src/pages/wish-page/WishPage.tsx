import { useParams, useNavigate } from "react-router-dom";
import { IMAGE_PLACEHOLDER } from "~/constants/const";
import useAppContext from "~/hooks/useAppContext";
import ActionButtons from "~/components/ActionButtons/ActionButtons";
import { Link } from "react-router-dom";

const WishPage = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const { wishes } = useAppContext();
	const wish = wishes.find((wish) => wish.id === id);

	if (!wish) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-center text-slate-500">Wish not found</p>
      </main>
    );
	} 

	const { imageUrl, title, description, price } = wish;

	return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white p-10 rounded-3xl border-t border-l border-r border-black border-b-4 max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full pt-6 mb-10">
              <Link
                to="/"
                className="text-xl font-semibold text-[#1C1E87] inline-block relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#1C1E87] after:transition-all after:duration-300 hover:after:w-full"
              >
                &larr; Back to Dashboard
              </Link>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-[#1C1E87]">{title}</h1>
            <p className="text-lg mb-6 text-slate-600">{description}</p>
            <p className="text-3xl font-semibold text-[#1C1E87] mb-8">
              ${price.toFixed(2)}
            </p>
            <ActionButtons
              wish={wish}
              variant="page"
              onAfterDelete={() => navigate("/")}
            />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src={imageUrl || IMAGE_PLACEHOLDER}
              alt={title}
              className="h-full w-full object-cover aspect-square"
              onError={(e) => {
                (e.target as HTMLImageElement).src = IMAGE_PLACEHOLDER;
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default WishPage;