export default function BackButton() {
    return (
        <button
            className="bg-transparent text-black text-center mx-auto"
            onClick={() => window.history.back()}
        >
            Back
        </button>
    )
}