import { ImageContainer } from "./ImageContainer";

export const ShirtCard = ({ handleActiveItem, shirtImage, shirtName, currentItem }) => {
    return (
        <div
            onClick={()=>handleActiveItem(currentItem)}
            className="flex flex-col justify-start items-center border border-gray-200 rounded-lg px-8 py-7 cursor-pointer"
        >
            <ImageContainer imageSrc={shirtImage} size="small" />
            <h2 className="text-center mt-4">{shirtName}</h2>
        </div>
    );
};
