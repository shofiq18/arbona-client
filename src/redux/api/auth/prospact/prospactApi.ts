
// import baseApi from "../../baseApi";
// import Cookies from "js-cookie";

// // Interface for the assignedSalesPerson object
// interface AssignedSalesPerson {
//   _id: string;
//   email: string;
//   role: string;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
//   password?: string; // Optional, as it might not always be returned
// }

// // Interface for packageDimensions within productObjId
// interface PackageDimensions {
//   length: number;
//   width: number;
//   height: number;
//   unit: string;
// }

// // Interface for productObjId within quotedList
// interface ProductObjId {
//   _id: string;
//   name: string;
//   isDeleted: boolean;
//   competitorPrice: number;
//   packetSize: string;
//   weight: number;
//   weightUnit: string;
//   categoryId: string;
//   reorderPointOfQuantity: number;
//   salesPrice: number;
//   purchasePrice: number;
//   barcodeString: string;
//   itemNumber: string;
//   quantity: number;
//   warehouseLocation: string;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
//   incomingQuantity: number;
//   packageDimensions: PackageDimensions;
// }

// // Interface for quotedList items
// interface QuotedListItem {
//   productObjId?: ProductObjId;
//   itemNumber: string;
//   itemName: string;
//   price: number;
//   _id: string;
// }

// // Interface for followUpActivities
// interface FollowUpActivity {
//   activity: string;
//   activityDate: string;
//   activityMedium: string;
//   _id: string;
// }

// // Main Prospect interface
// interface Prospect {
//   _id: string;
//   storeName: string;
//   storePhone: string;
//   storePersonEmail: string;
//   storePersonName: string;
//   storePersonPhone: string;
//   salesTaxId: string;
//   shippingAddress: string;
//   shippingState: string;
//   shippingZipcode: string;
//   miscellaneousDocImage: string;
//   leadSource: string;
//   note: string;
//   status: string;
//   assignedSalesPerson: AssignedSalesPerson;
//   followUpActivities: FollowUpActivity[];
//   quotedList: QuotedListItem[];
//   competitorStatement: string;
//   isDeleted: boolean;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

// // Interface for the API response
// interface ProspectsResponse {
//   success: boolean;
//   message: string;
//   data: Prospect[];
// }

// const prospectApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getProspects: builder.query<ProspectsResponse, void>({
//       query: () => ({
//         url: "/prospect", // Adjust to your backend endpoint
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${Cookies.get("token")}`, // Use token for auth if required
//         },
//       }),
//     }),
//   }),
// });

// export const { useGetProspectsQuery } = prospectApi;
// export default prospectApi;




import baseApi from "../../baseApi";
import Cookies from "js-cookie";

// Interface for the assignedSalesPerson object
interface AssignedSalesPerson {
  _id: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  password?: string; // Optional, as it might not always be returned
}

// Interface for packageDimensions within productObjId
interface PackageDimensions {
  length: number;
  width: number;
  height: number;
  unit: string;
}

// Interface for productObjId within quotedList
interface ProductObjId {
  _id: string;
  name: string;
  isDeleted: boolean;
  competitorPrice: number;
  packetSize: string;
  weight: number;
  weightUnit: string;
  categoryId: string;
  reorderPointOfQuantity: number;
  salesPrice: number;
  purchasePrice: number;
  barcodeString: string;
  itemNumber: string;
  quantity: number;
  warehouseLocation: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  incomingQuantity: number;
  packageDimensions: PackageDimensions;
}

// Interface for quotedList items
interface QuotedListItem {
  productObjId?: ProductObjId;
  itemNumber: string;
  itemName: string;
  price: number;
  _id: string;
}

// Interface for followUpActivities
interface FollowUpActivity {
  activity: string;
  activityDate: string;
  activityMedium: string;
  _id: string;
}

// Main Prospect interface
interface Prospect {
  _id: string;
  storeName: string;
  storePhone: string;
  storePersonEmail: string;
  storePersonName: string;
  storePersonPhone: string;
  salesTaxId: string;
  shippingAddress: string;
  shippingState: string;
  shippingZipcode: string;
  miscellaneousDocImage: string;
  leadSource: string;
  note: string;
  status: string;
  assignedSalesPerson: AssignedSalesPerson;
  followUpActivities: FollowUpActivity[];
  quotedList: QuotedListItem[];
  competitorStatement: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Interface for the API response
interface ProspectsResponse {
  success: boolean;
  message: string;
  data: Prospect[];
}

// Interface for the AddProspect request payload
 export interface AddProspectRequest {
   
  storeName: string;
  storePhone: string;
  storePersonEmail: string;
  storePersonName: string;
  storePersonPhone: string;
  salesTaxId?: string;
  shippingAddress: string;
  shippingState: string;
  shippingZipcode: string;
  shippingCity: string;
  miscellaneousDocImage?: string;
  leadSource: string;
  note?: string;
  status: string;
  competitorStatement?: string
  assignedSalesPerson?: string;

}

const prospectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProspects: builder.query<ProspectsResponse, void>({
      query: () => ({
        url: "/prospect",
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`, // Use token for auth if required
        },
      }),
    }),
    addProspect: builder.mutation<Prospect, AddProspectRequest>({
      query: (body) => ({
        url: "/prospect",
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`, // Use token for auth if required
        },
      }),
    }),
  }),
});

export const { useGetProspectsQuery, useAddProspectMutation } = prospectApi;
export default prospectApi;