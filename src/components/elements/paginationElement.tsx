import { FC } from "react";

interface PaginationElementProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const PaginationElement: FC<PaginationElementProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	const handlePageChange = (page: number) => {
		if (page > 0 && page <= totalPages) {
			onPageChange(page);
		}
	};

	return (
		<div className="flex justify-center items-center space-x-2">
			<button
				className="px-3 py-1 border rounded"
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage === 1}>
				Previous
			</button>
			<span>
				Page {currentPage} of {totalPages}
			</span>
			<button
				className="px-3 py-1 border rounded"
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPages}>
				Next
			</button>
		</div>
	);
};

export default PaginationElement;
