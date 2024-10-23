
interface CorsOptionsInterface {
    origin: Array<string>;
    optionsSuccessStatus: number;
}

export const corsOptions: CorsOptionsInterface = {
    origin: ["http://localhost:63342"],
    optionsSuccessStatus: 200
};
