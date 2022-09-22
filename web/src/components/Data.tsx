import React from "react";

export default function Data() {

    interface IFormInputValues {
        repo: string;
        token: string;
    }

    function getFormValues() {
        const storedValues = localStorage.getItem('form');
        if (!storedValues)
            return {
                repo: '',
                token: '',
            };
        return JSON.parse(storedValues);
    }

    const [values] = React.useState<IFormInputValues>(getFormValues);

    return (
        <div>
            <p className="p-3">
                The chosen Repo is: {values.repo} 
                <br></br>
                The chosen Token is: {values.token}
            </p>
        </div>
    );
}