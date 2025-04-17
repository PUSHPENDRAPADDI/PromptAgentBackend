import React from "react";
import DynamicHistoryComponent from "./DynamicHistoryComponent";


const HistoryComponent = () => {
    const truncateText = (text, maxLength = 30) =>
        text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

    const customRenderItem = (item) => (
        <>
            <strong>{truncateText(item.prompt_text)}</strong><br />
            <em>{new Date(item.timestamp).toLocaleString()}</em>
        </>
    );

    return (
        <DynamicHistoryComponent
            fetchUrl="http://localhost:5000/api/fetchAllResponse"
            loadingMessage="Please wait while history is loading..."
            errorMessage="Sorry, we couldn't fetch history at the moment."
            renderItem={customRenderItem}
        />
    );
};

export default HistoryComponent;
