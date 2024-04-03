"use client";
import { createClient } from "@/src/lib/supabase/client";
import { useState } from "react";
import ProductSmall from "./product_small";
const ProductSearch: React.FC =  () => {
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const client = createClient();
    const search = async (query: string) => {
        const { data, error } = await client.from('products').select('*').textSearch('name', query);
        if (error) {
            console.log(error);
        }
        console.log(data);
        setSearchResults(data || []);
    }
    const test_product = {
        id : 1,
        name: 'test product',
        description: 'this is a test product',
        price: 100,
        img_url: 'https://via.placeholder.com/150',
        stock: 10
    }
    const products = [test_product]
    return (
        <div>
            <input type="text" className=' p-2 bg-transparent backdrop-blur-2xl border-blue-500 border-2 w-5/6 mx-auto mb-4 rounded-3xl h-[5vh]' onChange={(e) => search(e.target.value)}/>      
            {products.map((result, index) => (
                <ProductSmall product={result} key={result.id}/> 
            ))}
        </div>
    );};
export default ProductSearch;