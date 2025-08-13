import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    // withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export const getPartnerProfile = (token) => api.get(`/api/partner/profile`,
    {
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            authorization: `Bearer ${token}`
        }
    });

export const getUserProfile = (token) => api.get(`/api/user/profile`,
    {
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            authorization: `Bearer ${token}`
        }
    });

export const allRestaurants = (token) => api.get(`/api/restaurant/PartnerRestaurants`,
    {
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            authorization: `Bearer ${token}`
        }
    });
export const getSingleRestaurant = (id) => api.get(`/api/restaurant/getrestaurant/${id}`,
    {
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    });
export const updateRestaurant = (token, id, newData) => api.put(`/api/restaurant/update/${id}`, newData,
    {
        headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${token}`
        }
    });
export const publishToggleRestaurant = (token, id) => api.post(`/api/restaurant/publishToggleRestaurant/${id}`, {},
    {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }
);
export const getBankInfo = (token) => api.get(`/api/bankInfo/getBankInfo`,
    {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }
);

export const updateBankInfo = (token, id, newData) => api.put(`/api/bankInfo/update/${id}`, newData,
    {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });

export const addRestaurant = (token, newData) => api.post(`/api/restaurant/add`, newData,
    {
        headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${token}`
        }
    });

export const allHomeRestaurants = () => api.get(`/api/restaurant/allRestaurants`,
    {
        headers: {
            "Content-type": "application/json",
        }
    });

export const voucherPurchase = (token, id, voucherData) => api.post(`/api/voucher/voucherPurchase/${id}`,voucherData,
    {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }
);

export const restaurantVouchers = (token,id) => api.get(`/api/voucher/restaurantVouchers/${id}`,
    {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

export const voucherSearch = (token, key, restaurantData) => api.post(`/api/voucher/vouchersearch/${key}`,restaurantData,
    {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }
);
export const voucherCodeVerify = (token, verifyData) => api.post(`/api/voucher/voucherCodeVerify`,verifyData,
    {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }
);

export const updateUserProfile = (token,newData) => api.put(`/api/user/updateProfile`, newData,
    {
        headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${token}`
        }
    });
export const updatePartnerProfile = (token,newData) => api.put(`/api/partner/updateProfile`, newData,
    {
        headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${token}`
        }
    });

// superadmin
export const allPartners = (token) => api.get(`/api/superadmin/allPartners`,
    {
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            authorization: `Bearer ${token}`
        }
    });

export const togglePartnerApproval = (token, id) => api.post(`/api/superadmin/partnerApprovalToggle/${id}`, {},
    {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }
);