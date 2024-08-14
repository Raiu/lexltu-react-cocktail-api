import { IDrink } from "@interfaces";
import { Cocktail } from "@models";
import { useEffect, useState } from "react";

import {Input} from "@nextui-org/react";

export default function SearchPage() {
    const [searchInput, setSearchInput] = useState("");
    const [searchSubmit, setSearchSubmit] = useState(false);
    const [searchReult, setSearchReult] = useState([] as IDrink[]);

/*     const useSearch = () =>        
        useEffect(() => {
            if (!searchInput?.length) {
                return;
            }

            Cocktail.drinksByName(searchInput).then((drinks) => {
                console.log("drinks: ", drinks);
                setSearchReult(drinks);
            })

        }) */

/*     const search = () => {
        Cocktail.drinksByName(searchInput)
            .then((drinks) => {
            })
    } */

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        console.log("form: ", form);
        setSearchSubmit(true);
    }

    useEffect(() => {
        console.log("search input: ", searchInput);
    }, [searchInput]);

    useEffect(() => {
        if (searchSubmit) {
            console.log("search submit");
            setSearchSubmit(false);
            Cocktail.drinksByName(searchInput).then((drinks) => {
                console.log("drinks: ", drinks);
                setSearchReult(drinks);
            })
        }

    }, [searchInput, searchSubmit]);



    return (
        <div>
            <div>
                <form className="search-form" onSubmit={handleSubmit}>
                    <Input type="test" label="Search" onChange={(e) => setSearchInput(e.target.value)} />
                    {/* <input type="text" placeholder="Search..." onChange={(e) => setSearchInput(e.target.value)} style={{ color: "black" }} /> */}
                    <button className="btn" type="submit">Search</button>                    
                </form>
            </div>

            <div className="search-results">
                {searchReult.map((drink, index) => <div key={index}>{drink.name}</div>) ?? null}


            </div>
        </div>
    )
}