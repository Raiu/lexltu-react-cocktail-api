import React from "react";


interface IConfig {
    apiUrl: string;
}

const ConfigContext = React.createContext<IConfig>({} as IConfig);

interface IConfigProps {
    children: React.ReactNode;
    configPath: string;
}

export function ConfigProvider({ children, configPath }: IConfigProps): React.ReactElement {
    /* const context = React.useContext(ConfigContext); */

    const [config, setConfig] = React.useState<IConfig>({} as IConfig);

    React.useEffect(() => {
        fetch(configPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch config");
                }
                console.log(response)
                return response.json();
            })
            .then(data => setConfig(data))
            .catch(error => {
                console.error(error)
                throw error;
            });
    }, [configPath, setConfig]);

    
    return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
}

export function useConfig(): IConfig {
    const context = React.useContext(ConfigContext);
    if (!context) {
        throw new Error("useConfig must be used within a ConfigProvider scope");
    }
    return context;
}
