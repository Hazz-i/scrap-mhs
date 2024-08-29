import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import * as React from "react";

type paginationProps = {
	items: number;
};

const PaginationElement = (props: paginationProps) => {
	return (
		<Pagination>
			{props.items > 0 && (
				<PaginationContent>
					{/* Pagination Previous */}
					<PaginationItem>
						<PaginationPrevious href="#" />
					</PaginationItem>

					{/* Pagination Items */}
					{Array.from({ length: props.items }, (_, index) => {
						const isEllipsisBefore = index === 3;
						const isEllipsisAfter = index === props.items - 2;

						return (
							<React.Fragment key={index}>
								{/* Insert Ellipsis before */}
								{isEllipsisBefore && (
									<PaginationItem>
										<PaginationEllipsis />
									</PaginationItem>
								)}

								<PaginationItem>
									<PaginationLink href="#" isActive={index === 1}>
										{index + 1}
									</PaginationLink>
								</PaginationItem>

								{/* Insert Ellipsis after */}
								{isEllipsisAfter && (
									<PaginationItem>
										<PaginationEllipsis />
									</PaginationItem>
								)}
							</React.Fragment>
						);
					})}

					{/* Pagination Next */}
					<PaginationItem>
						<PaginationNext href="#" />
					</PaginationItem>
				</PaginationContent>
			)}
		</Pagination>
	);
};

export default PaginationElement;
