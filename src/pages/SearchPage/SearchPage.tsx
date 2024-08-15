import { IDrink } from "@interfaces";
import { Cocktail } from "@models";
import { useEffect, useState } from "react";

import { Image, Input, Button, Pagination, Divider } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function SearchPage() {
    const navigate = useNavigate();

    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [searchSubmit, setSearchSubmit] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchReult, setSearchReult] = useState([] as IDrink[]);
    /* const [isLoading, setIsLoading] = useState(false); */

    const [paginated, setPaginated] = useState([[]] as IDrink[][]);
    const [page, setPage] = useState(1);
    const [pageLimit] = useState(10);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearchSubmit(true);
    };

    useEffect(() => {
        if (searchQuery?.length) {
            setIsSubmitDisabled(false);
        } else {
            setIsSubmitDisabled(true);
        }
    }, [searchQuery]);

    useEffect(() => {
        if (!searchSubmit) return;
        Cocktail.drinksByName(searchQuery)
            .then((drinks) => {
                setSearchReult(drinks);
            })
            .finally(() => {
                setSearchSubmit(false);
            });
    }, [searchQuery, searchSubmit]);

    useEffect(() => {
        if (!searchReult?.length) return;
        setPaginated(paginate(searchReult, pageLimit));
    }, [searchReult, pageLimit]);

    useEffect(() => {
        if (!searchReult?.length) {
            return;
        }
    }, [searchReult]);

    return (
        <div>
            <div>
                <form className="search-form" onSubmit={handleSubmit}>
                    <div className="flex justify-center items-center gap-4">
                        <div className="search-field ">
                            <Input
                                type="text"
                                label="Search"
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="search-button">
                            <Button type="submit" isDisabled={isSubmitDisabled}>
                                Search
                            </Button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="search-results mt-8 mx-auto md:max-w-xl flex flex-col gap-4">
                {paginated &&
                    paginated[page - 1].map((drink, index, arr) => (
                        <>
                        <div
                            key={index}
                            className="flex gap-4 cursor-pointer items-center hover:bg-zinc-800 rounded-full"
                            onClick={() => navigate(`/drink/${drink.id}`)}
                        >
                            <div>
                                <Image src={drink.image} alt={drink.name} width={64} height={64} />
                            </div>
                            <div>
                                {drink.name}
                            </div>
                        </div>
                            {index !== arr.length - 1 && <Divider key={index + "-divider"} />}
                        </>
                    ))}
            </div>
            
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

function paginate<T>(arr: T[], limit: number): T[][] {
    return arr.reduce((pages: T[][], item, index) => {
        const pageIndex = Math.floor(index / limit);
        const page = pages[pageIndex] ?? (pages[pageIndex] = []);
        page.push(item);
        return pages;
    }, []);
}
