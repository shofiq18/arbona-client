
import Cookies from "js-cookie";
import baseApi from "../baseApi";

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
interface AddProspectRequest {
  storeName: string;
  storePhone: string;
  storePersonEmail: string;
  storePersonName: string;
  storePersonPhone: string;
  storeAuthorizedPersonName?: string;
  storeAuthorizedPersonNumber?: string;
  billingAddress: string;
  billingCity: string;
  billingState: string;
  billingZipcode: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZipcode: string;
  salesTaxId?: string;
  acceptedDeliveryDays?: string[];
  bankACHAccountInfo: string;
  creditApplication?: string;
  ownerLegalFrontImage?: string;
  ownerLegalBackImage?: string;
  voidedCheckImage?: string;
  termDays?: number;
  shippingStatus?: string;
  note?: string;
  miscellaneous?: string;
  leadSource: string;
  followUpDate?: string;
  competitorStatement?: string;
  quotedList?: string;
}

const prospectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProspects: builder.query<ProspectsResponse, void>({
      query: () => ({
        url: "/prospect",
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`, // Corrected line
        },
      }),
    }),
    addProspect: builder.mutation<Prospect, AddProspectRequest>({
      query: (body) => ({
        url: "/prospect",
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`, // Corrected line
        },
      }),
    }),
 convertProspect: builder.mutation<Prospect,string>({
      query: (id) => ({
        url: `/prospect/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`, // Corrected line
        },
      }),
    }),
    deleteProspect: builder.mutation<Prospect,string>({
      query: (id) => ({
        url: `/prospect/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`, // Corrected line
        },
      }),
    }),
  }),

});

export const { useGetProspectsQuery, useAddProspectMutation,useDeleteProspectMutation,useConvertProspectMutation } = prospectApi;
export default prospectApi;