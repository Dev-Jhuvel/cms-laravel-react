import { useEffect } from "react";
import useHomeStore from "../Stores/useHomeStore";
import useThemeStore from "../Stores/useThemeStore";

const MenuPage = () =>{
    const {products: productCategory,  getData} = useHomeStore();
    const {logo} = useThemeStore();
    useEffect(() =>{
        getData();
    }, []);

    return (
        <section className="w-full bg-base-100">
            {productCategory && (
                <div>
                   {Object.entries(productCategory).map(([category, products]) =>(
                        <div key={category} className="w-full">
                            <h1 className="text-5xl font-bold py-10 pl-20">{category}</h1>
                            <div className="w-full flex gap-10   justify-center">
                                {products.map((product) =>(
                                    <div 
                                        key={product.id} 
                                        className="card bg-base-100 w-60 h-82 shadow-sm bg-center bg-cover" 
                                        style={{backgroundImage: `url(${product.image === "" ? logo : product.image})`}}>
                                        <p className="font-bold text-2xl text-center">{product.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                   ))}
                </div>
            )}
        </section>
    )
}

export default MenuPage;