import React from 'react';
import { toast } from "react-toastify";

export const showFailNotification = (text) => {
    toast.error(
        <div>
            <h6>
                {text}
            </h6>
        </div>
    );
}

export const showSuccessNotification = (text) => {
    toast.success(
        <div>
            <h6>
                {text}
            </h6>
        </div>
    );
}