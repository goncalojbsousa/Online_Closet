
import Navbar from "@/components/Navbar";
import {useRouter} from "next/router";
import {useState, Fragment, useEffect} from "react";
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import OutfitsComponent from "@/components/OutfitsComponent";


const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false },
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
]
const subCategories = [
    { name: 'Tudo', href: '#' },

]
const filters = [
    {
        id: 'categoria',
        name: 'Categoria',
        options: [
            { value: 'Casacos', label: 'Casacos', checked: true },
            { value: 'Camisolas', label: 'Camisolas', checked: true },
            { value: 'Calçado', label: 'Calçado', checked: false },
            { value: 'Chapéus', label: 'Chapéus', checked: false },
        ],
    },
    {
        id: 'cor',
        name: 'Cor',
        options: [
            { value: 'branco', label: 'Branco', checked: false },
            { value: 'beje', label: 'Beje', checked: false },
            { value: 'azul', label: 'Azul', checked: true },
            { value: 'castanho', label: 'Castanho', checked: false },
            { value: 'verde', label: 'Verde', checked: false },
            { value: 'roxo', label: 'Roxo', checked: false },
        ],
    },
    {
        id: 'tamanho',
        name: 'Tamanho',
        options: [
            { value: 'xs', label: 'S', checked: false },
            { value: 's', label: 'S', checked: false },
            { value: 'm', label: 'M', checked: false },
            { value: 'l', label: 'L', checked: false },
            { value: 'xl', label: 'XL', checked: false },
            { value: 'xxl', label: 'XXL', checked: true },
        ],
    },
    {
        id: 'estação',
        name: 'Estação',
        options: [
            { value: 'primavera', label: 'Primavera', checked: false },
            { value: 'verão', label: 'Verão', checked: false },
            { value: 'outono', label: 'Outono', checked: false },
            { value: 'inverno', label: 'Inverno', checked: false },
        ],
    },
    {
        id: 'marca',
        name: 'Marca',
        options: [
            { value: 'nike', label: 'Nike', checked: false },
            { value: 'adidas', label: 'Adidas', checked: false },
            { value: 'puma', label: 'Puma', checked: false },
            { value: 'vans', label: 'Vans', checked: false },
        ],
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Outfit() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    // manda para a pagina de login quando nao tem token
                    router.push("/auth/login");
                } else {
                    const response = await fetch("/api/auth/check-auth", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();

                    if (!response.ok) {
                        // manda para o login se o token for invalido
                        router.push("/auth/login");
                    } else {
                        // guarda os dados
                        setUser(data.user);
                    }
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        };

        checkAuthentication();
    }, []);

    useEffect(() => {
        const fetchUserProducts = async () => {
            try {
                const response = await fetch(`/api/outfit/outfits?userId=${user.id}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.outfits) {
                        setProducts(data.outfits);
                        console.log("Produtos do usuário recebidos:", data.outfits);
                    } else {
                        console.log("Nenhum produto do usuário recebido ou resposta vazia.");
                    }
                } else {
                    throw new Error("Falha ao obter produtos do usuário");
                }
            } catch (error) {
                console.error("Ocorreu um erro ao buscar produtos do usuário:", error);
            }
        };

        if (user) {
            fetchUserProducts();
        }
    }, [user]);


    const colors = ["primary", "secondary", "success", "warning", "danger"]

    return(
        <>
            <Navbar/>

            <div className="bg-white">
                <div>
                    {/* Mobile filter dialog */}
                    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                            <Transition.Child
                                as={Fragment}
                                enter="transition-opacity ease-linear duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity ease-linear duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-black bg-opacity-25" />
                            </Transition.Child>

                            <div className="fixed inset-0 z-40 flex">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transition ease-in-out duration-300 transform"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transition ease-in-out duration-300 transform"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                        <div className="flex items-center justify-between px-4">
                                            <h2 className="text-lg font-medium text-gray-900">Filtros</h2>
                                            <button
                                                type="button"
                                                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                                onClick={() => setMobileFiltersOpen(false)}
                                            >
                                                <span className="sr-only">Close menu</span>
                                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>

                                        {/* Filters */}
                                        <form className="mt-4 border-t border-gray-200">
                                            <h3 className="sr-only">Categories</h3>
                                            <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                                                {subCategories.map((category) => (
                                                    <li key={category.name}>
                                                        <a href={category.href} className="block px-2 py-3">
                                                            {category.name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>

                                            {filters.map((section) => (
                                                <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                                                    {({ open }) => (
                                                        <>
                                                            <h3 className="-mx-2 -my-3 flow-root">
                                                                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                                    <span className="font-medium text-gray-900">{section.name}</span>
                                                                    <span className="ml-6 flex items-center">
                                  {open ? (
                                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                                                                </Disclosure.Button>
                                                            </h3>
                                                            <Disclosure.Panel className="pt-6">
                                                                <div className="space-y-6">
                                                                    {section.options.map((option, optionIdx) => (
                                                                        <div key={option.value} className="flex items-center">
                                                                            <input
                                                                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                                name={`${section.id}[]`}
                                                                                defaultValue={option.value}
                                                                                type="checkbox"
                                                                                defaultChecked={option.checked}
                                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                            />
                                                                            <label
                                                                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                                className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                            >
                                                                                {option.label}
                                                                            </label>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </Disclosure.Panel>
                                                        </>
                                                    )}
                                                </Disclosure>
                                            ))}
                                        </form>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </Dialog>
                    </Transition.Root>

                    <main className="mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-6">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Os seus outfits!</h1>

                            <div className="flex items-center">
                                <Menu as="div" className="relative inline-block text-left">
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="py-1">
                                                {sortOptions.map((option) => (
                                                    <Menu.Item key={option.name}>
                                                        {({ active }) => (
                                                            <a
                                                                href={option.href}
                                                                className={classNames(
                                                                    option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm'
                                                                )}
                                                            >
                                                                {option.name}
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                                <button
                                    type="button"
                                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                    onClick={() => setMobileFiltersOpen(true)}
                                >
                                    <span className="sr-only">Filtros</span>
                                    <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                        </div>

                        <section aria-labelledby="products-heading" className="pb-24 pt-6">
                            <h2 id="products-heading" className="sr-only">
                                Produtos
                            </h2>
                            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                                {/* Filters */}
                                <div className="col-span-1">
                                    <form className="hidden lg:block">
                                        <h3 className="sr-only">Categorias</h3>
                                        <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                                            {subCategories.map((category) => (
                                                <li key={category.name}>
                                                    <a href={category.href}>{category.name}</a>
                                                </li>
                                            ))}
                                        </ul>

                                        {filters.map((section) => (
                                            <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="-my-3 flow-root">
                                                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                                <span className="ml-6 flex items-center">
                              {open ? (
                                  <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                                                            </Disclosure.Button>
                                                        </h3>
                                                        <Disclosure.Panel className="pt-6">
                                                            <div className="space-y-4">
                                                                {section.options.map((option, optionIdx) => (
                                                                    <div key={option.value} className="flex items-center">
                                                                        <input
                                                                            id={`filter-${section.id}-${optionIdx}`}
                                                                            name={`${section.id}[]`}
                                                                            defaultValue={option.value}
                                                                            type="checkbox"
                                                                            defaultChecked={option.checked}
                                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                        />
                                                                        <label
                                                                            htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                            className="ml-3 text-sm text-gray-600"
                                                                        >
                                                                            {option.label}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </form>
                                </div>
                                {/*os produtos*/}
                                <div className="col-span-3">
                                    <OutfitsComponent
                                        categoria="Casacos"
                                        products={products}
                                    />
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>

        </>
    );
};