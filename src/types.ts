


export interface Order {
  _id: string;
  date: string; // e.g., "2025-07-05"
  invoiceNumber: string;
  PONumber: string;
  storeId: string;
  paymentDueDate: string;
  orderAmount: number;
  orderStatus: string;
  isDeleted: boolean;
  paymentAmountReceived: number;
  discountGiven: number;
  openBalance: number;
  profitAmount: number;
  profitPercentage: number;
  paymentStatus: string;
  products: Array<{
    productId: {
      packageDimensions?: {
        length: number;
        width: number;
        height: number;
        unit: string;
      };
      _id: string;
      name: string;
      packetQuantity: number;
      packingUnit: string;
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
    };
    quantity: number;
    discount: number;
    _id: string;
  }>;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ReusableModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

export interface FilterFormValues {
  fromDate: string;
  toDate: string;
  fromDueDate: string;
  toDueDate: string;
  storeName: string;
  productStatus: string;
  orderStatus: string;
  verificationStatus: string;
}

export interface OrderFilterFormProps {
  onSubmit: (values: FilterFormValues) => void;
  onClear?: () => void;
}

export interface AddOrderFormValues {
  date: string;
  invoiceNumber: string;
  PONumber: string;
  storeName: string;
  paymentDueDate: string;
  orderAmount: string;
  orderStatus: string;
  paymentAmountReceived: string;
  discountGiven: string;
  openBalance: string;
  profitAmount: string;
  profitPercentage: string;
  paymentStatus: string;
}

export interface AddOrderFormProps {
  onSubmit: (values: AddOrderFormValues) => void;
  onCancel?: () => void;
}

// customer table data type

// export interface Customer {
//   _id: string;
//   storeName: string;
//   storePhone: string;
//   storePersonEmail: string;
//   storePersonName: string;
//   storePersonPhone: string;
//   billingAddress: string;
//   billingState: string;
//   billingZipcode: string;
//   billingCity: string;
//   shippingAddress: string;
//   shippingState: string;
//   shippingZipcode: string;
//   shippingCity: string;
//   salesTaxId: string;
//   acceptedDeliveryDays: string[];
//   bankACHAccountInfo: string;
//   creditApplication: string;
//   ownerLegalFrontImage: string;
//   ownerLegalBackImage: string;
//   voidedCheckImage: string;
//   isDeleted: boolean;
//   createdAt: string;
//   updatedAt: string;
//   // Optional fields from fakeData, assuming they might exist
//   openBalance?: string;
//   totalOrders?: number;
//   totalOrderAmount?: string;
//   isCustomerSourceProspect?: boolean;
  
// }


// "@/types/index.ts" or similar


export interface Customer {
  _id: string;
  storeName: string;
  storePhone: string;
  storePersonEmail: string;
  salesTaxId: string;
  acceptedDeliveryDays: string[];
  bankACHAccountInfo: string;
  storePersonName: string;
  storePersonPhone: string;
  billingAddress: string;
  billingState: string;
  billingZipcode: string;
  billingCity: string;
  shippingAddress: string;
  shippingState: string;
  shippingZipcode: string;
  shippingCity: string;
  creditApplication?: string;
  ownerLegalFrontImage?: string;
  ownerLegalBackImage?: string;
  voidedCheckImage?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  // Optional fields from fakeData, assuming they might exist
  openBalance?: string;
  totalOrders?: number;
  totalOrderAmount?: string;
  isCustomerSourceProspect?: boolean;
}

// TypeScript type for API response
export interface GetCustomersResponse {
  success: boolean;
  message: string;
  data: Customer[];
}

// add container type
export interface ContainerProduct {
  _id: string;
  category: string;
  itemNumber: string;
  quantity: number;
  perCaseCost: number;
  purchasePrice: number;
  salesPrice: number;
}

export interface Container {
  _id: string;
  containerNumber: string;
  containerName: string;
  isDeleted: boolean;
  containerStatus: "onTheWay" | "delivered" | "pending" | string;
  deliveryDate: string;
  shippingCost: number;
  containerProducts: ContainerProduct[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ContainerApiResponse {
  success: boolean;
  message: string;
  data: Container[];
}

export interface InventoryProduct {
  _id: string;
  name: string;
  category: string;
  packetSize: string;
  perCaseCost: number;
  purchasePrice: number;
  salesPrice: number;
}

export interface InventoryApiResponse {
  success: boolean;
  message: string;
  data: InventoryProduct[];
}

export interface Category {
  _id: string;
  name: string;
}

export interface CategoryApiResponse {
  success: boolean;
  message: string;
  data: Category[];
}

// Dimensions for package size
export interface PackageDimensions {
  length: number;
  width: number;
  height: number;
  unit: string;
}

// Nested category information
export interface CategoryId {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Main product type for products by category
export interface Product {
  packageDimensions: PackageDimensions;
  _id: string;
  name: string;
  isDeleted: boolean;
  competitorPrice: number;
  packetSize: string;
  weight: number;
  weightUnit: string;
  categoryId: CategoryId;
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
}
export interface GetProductResponse {
  success: boolean;
  message: string;
  data: Product[];
}
