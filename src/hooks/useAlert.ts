import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function useAlert() {
    const success = (message: string, title = "Success") => {
        return Swal.fire({
            title,
            text: message,
            icon: "success",
            confirmButtonColor: "#3085d6",
        });
    };

    const error = (message: string, title = "Error") => {
        return Swal.fire({
            title,
            text: message,
            icon: "error",
            confirmButtonColor: "#d33",
        });
    };

    const warning = (message: string, title = "Warning") => {
        return Swal.fire({
            title,
            text: message,
            icon: "warning",
            confirmButtonColor: "#f6c23e",
        });
    };

    const confirm = async (
        message: string,
        title = "Are you sure?"
    ) => {
        return Swal.fire({
            title,
            text: message,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
        });
    };

    const loading = (title = "Loading...") => {
        return Swal.fire({
            title,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });
    };

    const close = () => Swal.close();

    return {
        success,
        error,
        warning,
        confirm,
        loading,
        close,
    };
}
