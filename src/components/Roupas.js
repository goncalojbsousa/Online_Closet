import { Pagination, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import ModalAddRoupa from "@/components/ModalAddRoupa";
import ModalRoupas from "@/components/ModalRoupas";

export default function Roupas({ categoria, products }) {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const filteredProducts = products.filter((product) => {
        const productCategoria = product.categoria.toLowerCase(); // Convertendo para minúsculas
        const categoriaLowerCase = categoria.toLowerCase(); // Convertendo para minúsculas

        if (categoriaLowerCase === 'outros') {
            // Verificando se a categoria não está inclusa nas categorias excluídas
            return !['casaco', 'camisola', 'calças', 'tenis' /* Adicione outras categorias existentes aqui */].includes(productCategoria);
        } else {
            return productCategoria === categoriaLowerCase;
        }
    });
    const displayedProducts = filteredProducts.slice(startIndex, endIndex); // Usar filteredProducts ao invés de products
    const pageCount = Math.ceil(filteredProducts.length / productsPerPage); // Usar o length de filteredProducts

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const { onOpen } = useDisclosure();

    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold mb-4 mt-2">{categoria}</h2>
                    <ModalAddRoupa categoriaInicial={categoria} />
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
            <div className="border-t-2 border-gray-300 w- mb-6"></div>

            {displayedProducts.length === 0 ? (
                <p>Não existe nenhuma peça desta categoria.</p>
            ) : (
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-x-8 w-full">
                    {displayedProducts.map((product) => (
                        <ModalRoupas key={product.id} product={product}/>
                    ))}
                </div>
            )}
        </div>
    );
}
