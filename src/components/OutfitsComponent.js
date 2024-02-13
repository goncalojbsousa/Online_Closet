import {Pagination, useDisclosure} from "@nextui-org/react";
import { useState } from "react";

import ModalAddRoupa from "@/components/ModalAddRoupa";
import ModalRoupas from "@/components/ModalRoupas";
import ModalOutfits from "@/components/ModalOutfits";

export default function Roupas({ categoria, products, outfits }) {
    const [currentPage, setCurrentPage] = useState(1);

    const productsPerPage = 12;
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    // Filtrar produtos pela categoria desejada
    const filteredProducts = products

    // Paginação para os produtos filtrados
    const displayedProducts = filteredProducts.slice(startIndex, endIndex);

    const pageCount = Math.ceil(filteredProducts.length / productsPerPage);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };


    const { onOpen } = useDisclosure();


    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold mb-4 mt-2">Outfits criados por si</h2>
                    <ModalAddRoupa />
                </div>
                <Pagination
                    loop
                    showControls
                    total={pageCount}
                    initialPage={currentPage}
                    onChange={(page) => setCurrentPage(page)}
                    color="success"
                />
            </div>
            <div className="border-t-2 border-gray-300 w-full mb-6"></div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-x-8">
                {displayedProducts.map((product) => (
                    <ModalOutfits key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
