import { createColumnHelper } from "@tanstack/react-table";

interface TableRow {
  approved?: string;
  voc?: string;
  detailJob?: string;
  fir?: string;
  remarks: string;
  amount: number;
  estPrice: number;
  finalPrice: number;

  //  customer vehicle info
  make: string;
  variant: string;
  regNo: string;
  mileage: string;
  chassisNo: string;
  engineNo: string;
  color: string;
}

const columnHelper = createColumnHelper<TableRow>();
export const LabourCol = [
  columnHelper.accessor("approved", {
    header: () => "Approved",
  }),
  columnHelper.accessor("voc", {
    header: () => "VOC",
  }),
  columnHelper.accessor("detailJob", {
    header: () => "Detail Job",
  }),
  columnHelper.accessor("fir", {
    header: () => "Fir",
  }),
  columnHelper.accessor("remarks", {
    header: () => "Remarks",
  }),
  columnHelper.accessor("amount", {
    header: () => "Amount",
  }),
];

export const SubletServiceCol = [
  columnHelper.accessor("approved", {
    header: () => "Approved",
  }),
  columnHelper.accessor("voc", {
    header: () => "VOC",
  }),
  columnHelper.accessor("remarks", {
    header: () => "Remarks",
  }),
  columnHelper.accessor("fir", {
    header: () => "Fir",
  }),
  columnHelper.accessor("estPrice", {
    header: () => "Est Price",
  }),
  columnHelper.accessor("finalPrice", {
    header: () => "Final Price",
  }),
];

export const CustomerVehicleInfo = [
  columnHelper.accessor("make", {
    header: () => "Make",
  }),
  columnHelper.accessor("variant", {
    header: () => "Variant",
  }),
  columnHelper.accessor("regNo", {
    header: () => "Reg No",
  }),
  columnHelper.accessor("mileage", {
    header: () => "Mileage",
  }),
  columnHelper.accessor("chassisNo", {
    header: () => "Chassis No",
  }),
  columnHelper.accessor("engineNo", {
    header: () => "Engine No",
  }),
  columnHelper.accessor("color", {
    header: () => "Color",
  }),
];
