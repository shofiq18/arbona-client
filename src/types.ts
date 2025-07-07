export type Order = {
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
};
