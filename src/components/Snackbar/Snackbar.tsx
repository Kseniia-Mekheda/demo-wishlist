import type { NotificationInterface } from "~/types/common/interfaces";
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

const Snackbar = ({ message, type, onClose }: NotificationInterface) => {
	const styles = {
		'success': {
			card: "bg-[#00c95133] border-emerald-700/50",
			icon: (
				<CheckCircleIcon className="size-6 text-emerald-400" />
			),
		},
		'error': {
			card: "bg-red-500/40 border-red-400 text-red-800",
			icon: (
				<XCircleIcon className="size-6 text-red-600" />
			)
		}
	}
	
	const current = styles[type];

	return (
		<div className={`fixed bottom-5 sm:right-5 z-50 flex items-start p-4 border rounded-lg shadow-lg min-w-[320px] ${current.card}`} role="alert">
			<div className={`shrink-0 inline-flex items-center justify-center`}>
				{current.icon}
			</div>

			<div className="ms-3 text-sm flex-1">
				<p className="font-bold">{ type === 'error' ? 'Error' : 'Success' }</p>
				<p>{message}</p>
			</div>

			{onClose && (
				<button
					onClick={onClose}
					type="button"
					className={`ms-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8`}
					aria-label="Close"
				>
					<XMarkIcon className={`size-5 text-${type === 'error' ? 'red-600' : 'emerald-400'}`} />
				</button>
			)}
		</div>
	);
};

export default Snackbar;