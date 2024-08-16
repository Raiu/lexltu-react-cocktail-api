import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IDrink } from "@interfaces";
import { Cocktail } from "@models/Cocktail";
import { Image, Input, /* Button, */ Pagination, Divider } from "@nextui-org/react";

export default function SearchPage() {
    const navigate = useNavigate();

    /* const [isSubmitDisabled, setIsSubmitDisabled] = useState(true); */
    const [searchSubmit, setSearchSubmit] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchReult, setSearchReult] = useState([] as IDrink[]);
    const [noResults, setNoResults] = useState(false);
    /* const [isLoading, setIsLoading] = useState(false); */

    /* const [isSearching, setIsSearching] = useState(false); */

    const [paginated, setPaginated] = useState([[]] as IDrink[][]);
    const [page, setPage] = useState(1);
    const [pageLimit] = useState(10);

    const debouncedOnChangeSubmit = debounce(() => setSearchSubmit(true), 600);
    /* const debouncedSubmit = debounce(() => setSearchSubmit(true), 100); */

    const handleChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        debouncedOnChangeSubmit();
    };

    /* const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        debouncedSubmit();
    }; */

  /*   useEffect(() => {
        setIsSubmitDisabled(() => searchQuery?.length < 1);
    }, [searchQuery]); */

    useEffect(() => {
        if (searchQuery?.length < 1) {
            setSearchReult([] as IDrink[]);
            return;
        }
        if (!searchSubmit) return;

        let isMounted = true;
        const getDrinks = async () => {
            const data = await Cocktail.drinksByName(searchQuery);
            if (!isMounted) return;

            if (data.length < 1) {
                setNoResults(true);
                setSearchReult([] as IDrink[]);
                return;
            }
            setNoResults(false);
            setSearchReult(data);
        };
        getDrinks()
            .catch(console.error)
            .finally(() => {
                setSearchSubmit(false);
            });
        return () => {
            isMounted = false;
        };
    }, [searchQuery, searchSubmit]);

    useEffect(() => {
        if (searchReult?.length) {
            setPaginated(paginate(searchReult, pageLimit));
        } else {
            setPaginated([[]]);
        }
    }, [searchReult, pageLimit]);

    return (
        <div>
            <div>
                <form className="search-form" /* onSubmit={handleSearchSubmit} */>
                    <div className="flex justify-center items-center gap-4">
                        <div className="search-field ">
                            <Input
                                type="text"
                                label="Search"
                                onChange={handleChangeSearchInput}
                                required
                            />
                        </div>
                        {/* <div className="search-button">
                            <Button type="submit" isDisabled={isSubmitDisabled}>
                                Search
                            </Button>
                        </div> */}
                    </div>
                </form>
            </div>

            <div className="search-results mt-8 mx-auto md:max-w-xl flex flex-col gap-4">
                {paginated &&
                    paginated[page - 1].map((drink, index, arr) => (
                        <div key={index}>
                            <div
                                className="flex gap-4 cursor-pointer items-center hover:bg-zinc-800 rounded-full"
                                onClick={() => navigate(`/drink/${drink.id}`)}
                            >
                                <div>
                                    <Image
                                        src={drink.image}
                                        alt={drink.name}
                                        width={64}
                                        height={64}
                                    />
                                </div>
                                <div>{drink.name}</div>
                            </div>
                            {index !== arr.length - 1 && <Divider />}
                        </div>
                    ))}
            </div>

            {noResults && <div className="text-center text-red-600 text-xl font-bold">No results</div>}

            {paginated?.length > 1 && (
                <div className="flex justify-center my-8">
                    <Pagination
                        isCompact
                        showControls
                        total={paginated.length}
                        initialPage={page}
                        onChange={(page) => setPage(page)}
                    />
                </div>
            )}
        </div>
    );
}

const paginate = <T,>(arr: T[], limit: number): T[][] => {
    return arr.reduce((pages: T[][], item, index) => {
        const pageIndex = Math.floor(index / limit);
        const page = pages[pageIndex] ?? (pages[pageIndex] = []);
        page.push(item);
        return pages;
    }, []);
};

const debounce = <F extends (...args: Parameters<F>) => void>(callback: F, delay: number) => {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: Parameters<F>): void => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(...args);
        }, delay);
    };
};