// Função genérica para verificar e filtrar erros
const filterError = <T>(error: T): string => {
    if (error instanceof Error) {
        // Verifica se a mensagem do erro contém uma string específica
        if (error.message.includes('Could not reach Cloud Firestore backend')) {
            return 'Ocorreu um problema de conexão com o Firestore. Verifique sua conexão com a internet e tente novamente.';
        } else {
            return 'Ocorreu um erro inesperado. Tente novamente mais tarde.';
        }
    } else if (typeof error === 'string') {
        // Verifica se o erro é uma string
        return `Erro: ${error}`;
    } else {
        // Caso o erro não seja reconhecido
        return 'Ocorreu um erro inesperado. Tente novamente mais tarde.';
    }
};

export default filterError;