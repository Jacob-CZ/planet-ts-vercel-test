"use client";
import Image from 'next/image';
type ProductSmallProps = {
    product: {
        name: string;
        description: string;
        price: number;
        img_url: string;
        stock: number;
    }
}
export default function ProductSmall({product}: ProductSmallProps) {
    return (
        <div className=" w-full h-24 bg-[#317B2280] rounded-xl p-2 flex flex-row">
            <Image src="/53_ashwagandha-extrakt.jpg" alt={product.name} width={100} height={100} className=' w-fit h-full rounded-full'/>
            <div className='w-full h-full flex flex-col px-2'>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <p>Pocet kusu: {product.price}</p>
            </div>
        </div>
    );
}