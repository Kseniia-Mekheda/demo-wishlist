import type { NotificationInterface } from "~/types/common/interfaces";

const Snackbar = ({ message, type, onClose }: NotificationInterface) => {
	const styles = {
		'success': {
			card: "bg-emerald-950/95 border-emerald-800 text-emerald-100",
			icon: (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="text-emerald-400" className="size-6">
					<path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
				</svg>
			),
		},
		'error': {
			card: "bg-red-950/95 border-red-800 text-red-100",
			icon: (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="text-red-400" className="size-6">
					<path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
				</svg>
			)
		}
	}
	
	const current = styles[type];

	return (
		<div className={`flex items-start p-4 mb-4 border rounded-lg shadow-lg ${current.card}`} role="alert">
			<div className={`shrink-0 inline-flex items-center justify-center`}>
				{current.icon}
			</div>

			<div className="ms-3 text-sm flex-1">
				<p>Error</p>
				<p className="font-bold">{message}</p>
			</div>

			{onClose && (
				<button
					onClick={onClose}
					type="button"
					className={`ms-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 hover:bg-black/20 focus:ring-2 focus:ring-gray-300 transition-colors`}
					aria-label="Close"
				>
					<span className="sr-only">Close</span>
					<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
						<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
					</svg>
				</button>
			)}
		</div>
	);
};

export default Snackbar;