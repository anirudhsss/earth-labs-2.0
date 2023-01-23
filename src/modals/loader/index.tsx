import LoadingSpin from "react-loading-spin";

const style = {
    width: '100vh',
    height: '100vh',
    transformTranslate: "50% 50%",

}

export const loader = () => {
    return (
        <div>
            <LoadingSpin />
        </div>
    )
}