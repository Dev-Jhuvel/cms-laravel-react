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
        <section className="w-full bg-base-100 pt-15 pb-10">
            {/* TODO: Add React Easy Crop */}
            {productCategory && (
                <div>
                   {Object.entries(productCategory).map(([category, products]) =>(
                        <div key={category} className="w-full">
                            <h1 className="text-3xl font-bold py-5 pl-20">{category}</h1>
                            <div className="w-full flex gap-10 justify-center flex-wrap">
                                {products.map((product) =>(
                                    <div 
                                        key={product.id} 
                                        className="relative card bg-base-100 w-60 h-62 shadow-sm overflow-hidden group">
                                        <div 
                                            className="absolute inset-0 bg-center bg-cover transition-opacity duration-300 group-hover:opacity-50"
                                            style={{backgroundImage: `url(${product.image === "" ? logo : product.image})`}}></div>
                                        <p className="relative font-bold text-2xl text-center z-10 hidden group-hover:block">{product.name}</p>
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