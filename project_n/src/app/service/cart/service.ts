
// Get by id
export async function getCartById(id: number){
    const res = await fetch(`/api/cart/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res.json();
}

export async function getCountCartById(id: number) {
    const res = await fetch(`/api/countCart/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
        cache: "no-store"
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch cart count: ${res.statusText}`);
    }

    return res.json();
}

export const createCart = async (data: any) => {
    try {
        const res = await fetch(`/api/cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const data1 = await res.json()
        if (!res.ok) {
            console.log(data1)
            throw new Error(data1.message);
        }

    } catch (error) {
        throw error;
    }
};

// Update by id
export async function updateCartById(id: number, updatedData: any) {
    const response = await fetch(`/api/cart/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
        throw new Error("Failed to update user");
    }
    return await response.json();
};

export async function deleteCartById(id: Number){
    const res = await fetch(`/api/cart/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    });
}