import { jobSitesProps } from "./Types";

export function ordenarPorValor(objetos: jobSitesProps[], chave: keyof jobSitesProps) {
    return objetos.sort((a, b) => {

        const valorA = a[chave].toLowerCase();
        const valorB = b[chave].toLowerCase();

        if (valorA < valorB) {
            return -1; 
        }
        if (valorA > valorB) {
            return 1; 
        }
        return 0; 
    });
}