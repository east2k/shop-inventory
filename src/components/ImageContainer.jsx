export const ImageContainer = ({ size, imageSrc }) => {
    const small = "w-40 h-40";
    const big = "w-1/2 h-auto";
    return (
        <div
            className={`flex justify-center items-center overflow-hidden rounded-md ${
                size === "small" ? small : big
            }`}
        >
            <img
                src={imageSrc}
                className="w-auto h-full min-w-full object-cover"
            />
        </div>
    );
};
