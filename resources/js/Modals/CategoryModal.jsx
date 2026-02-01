import { useState } from "react";

export default function CategoryModal({method, category, setMethod = () => {}}){
    console.log(method);

    const defaultForm = {name: ''};
    const [form, setForm] = useState(defaultForm);
      
    const handleChanges = (e) =>{
        setForm({...form, [e.target]: e.target.value} ?? '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        document.getElementById("category_modal").close();
        const formData = new FormData;
        formData.append('name', form.name);
        if(method === create){
            storeCategory(form);
        }else{
            updateCategory(form);
        }
        getCategory()
    };


       return (
        <dialog id="category_modal" className="modal">
            <div className="modal-box">
                <h3 className="text-lg font-bold"> {method === 'create' ? ' Create a new ' : method === 'view' ? 'View ' : 'Edit '} Category</h3>
                <hr />
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                </form>
                
                <form onSubmit={handleSubmit} className="mx-auto">
                    
                   <fieldset className="fieldset">
                        <legend className="fieldset-legend text-lg">
                            Title
                        </legend>
                        <input
                            type="text"
                            name="title"
                            disabled={method === 'view'}
                            value={form.title}
                            onChange={handleChanges}
                            className="input input-secondary w-full"
                            placeholder="What kind of Post is this?"
                        />
                    </fieldset>
                    <hr />
                    {(method === 'create' || method === 'edit') && (
                        <div className="modal-action mt-3">
                            <button type="submit" disabled={JSON.stringify(form) == JSON.stringify(defaultForm)} className="btn btn-primary">{method === 'create' ? 'Create' : 'Edit'}</button>
                        </div>
                    )}
                </form>
                {(method === 'view') && (
                    <div className="modal-action mt-3">
                        <button className="btn btn-primary" onClick={()=>setMethod('edit')}>Edit Post</button>
                        <button className="btn btn-primary" onClick={()=>deleteCategory(category.id)}>Delete</button>
                    </div>
                )}
            </div>
        </dialog>
    );
}