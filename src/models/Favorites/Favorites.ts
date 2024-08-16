const PREFIX = "cox_";

const clear = () => localStorage.removeItem(PREFIX + "fav");

const save = <T>(data: T[]) => {
    localStorage.setItem(PREFIX + "fav", JSON.stringify(data));
};

const load = <T>(): T[] => {
    const data = localStorage.getItem(PREFIX + "fav");
    return data ? JSON.parse(data) : [];
};

const exists = <T>(fav: T, key?: keyof T): boolean => {
    const cached = load<T>();
    /* return cached.find(x => x[key] === fav[key]) ? true : false; */
    const favStr = key ? null : JSON.stringify(fav);
    return (
        key
            ? cached.find((x) => x[key] === fav[key])
            : cached.find((x) => JSON.stringify(x) === favStr)
    )
        ? true
        : false;
};

const remove = <T>(fav: T, key?: keyof T) => {
    const cached = load<T>();
    const favStr = key ? null : JSON.stringify(fav);
    const index = key
        ? cached.findIndex((x) => x[key] === fav[key])
        : cached.findIndex((x) => JSON.stringify(x) === favStr);

    if (index > -1) {
        cached.splice(index, 1);
        save(cached);
    }
};

const add = <T>(fav: T, key?: keyof T) => {
    const cached = load<T>();
    const favStr = key ? null : JSON.stringify(fav);
    const index = key
        ? cached.findIndex((x) => x[key] === fav[key])
        : cached.findIndex((x) => JSON.stringify(x) === favStr);

    if (index !== -1) {
        cached[index] = fav;
    } else {
        cached.push(fav);
    }

    save(cached);
};

const Favorites = <T>(): T[] => load<T>();
Favorites.add = add;
Favorites.remove = remove;
Favorites.exists = exists;
Favorites.get = load;
Favorites.set = save;
Favorites.clear = clear;

export default Favorites;

/* const Favorites = <IDrink>(): IDrink[] => load<IDrink>();
Favorites.add = add<IDrink>;
Favorites.remove = remove<IDrink>;
Favorites.exists = exists<IDrink>;
Favorites.get = load<IDrink>;
Favorites.set = save<IDrink>;
Favorites.clear = clear; */
