import StripeCheckout from "@/components/stripe_checkout"
import { Product } from "@/components/types"
export default function Page() {
    const product:Product = {
        id: 1,
        name: "Veda",
        price: 1400,
        description: "Veda",
        image: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
    } 
    return (
        <div className="flex justify-center items-center w-full h-full">
            <StripeCheckout  products={[product]}/>
        </div>
    )
}