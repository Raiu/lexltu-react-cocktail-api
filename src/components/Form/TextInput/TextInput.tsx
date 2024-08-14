import { ReactElement } from "react";

import "./index.css";

interface TextInputProps {
    type: string;
    label?: string;
    value?: string;
    className?: string;
    placeholder?: string;
    onChange?: () => void;
    onBlur?: () => void;
    onFocus?: () => void;
    onClick?: () => void;
    onKeyDown?: () => void;
}

export default function TextInput(props: TextInputProps): ReactElement {
    return (
        <div>
            <div>
            <input type={props.type} />

            </div>
        </div>
    );
}
