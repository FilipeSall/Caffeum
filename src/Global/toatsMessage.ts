import { toast } from "react-toastify";

type MessageType = "info" | "success" | "warning" | "error";

type MessageFunction = (type: MessageType, text: string) => void;

export const toastMessage: MessageFunction = (type, text) => {
    switch (type) {
        case "info":
            toast.info(text);
            break;
        case "success":
            toast.success(text);
            break;
        case "warning":
            toast.warning(text);
            break;
        case "error":
            toast.error(text);
            break;
        default:
            throw new Error("Tipo de mensagem inválido");
    }
}